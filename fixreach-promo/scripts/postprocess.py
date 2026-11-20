#!/usr/bin/env python3
"""Build the final FixReach master: normalized VO, ducked BGM, preserved UI SFX and safe captions."""
from __future__ import annotations

from pathlib import Path
import argparse
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]


def run(cmd: list[str]) -> subprocess.CompletedProcess[str]:
    print('+', ' '.join(map(str, cmd)), flush=True)
    return subprocess.run(cmd, check=True, text=True, capture_output=True)


def probe(path: Path) -> dict:
    result = subprocess.run(
        ['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(path)],
        check=True, text=True, capture_output=True,
    )
    return json.loads(result.stdout)


def duration(path: Path) -> float:
    return float(probe(path)['format']['duration'])


def srt_end(path: Path) -> float:
    text = path.read_text(encoding='utf-8-sig')
    matches = re.findall(r'(?m)^\s*\d+\s*\n\d{2}:\d{2}:\d{2},\d{3}\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})', text)
    if not matches:
        raise ValueError(f'No valid SRT cues found in {path}')

    def seconds(value: str) -> float:
        hh, mm, rest = value.split(':')
        ss, ms = rest.split(',')
        return int(hh) * 3600 + int(mm) * 60 + int(ss) + int(ms) / 1000

    return max(seconds(value) for value in matches)


def escape_filter_path(path: Path) -> str:
    value = path.resolve().as_posix()
    for char in ('\\', ':', "'", ',', '[', ']'):
        value = value.replace(char, '\\' + char)
    return value


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--base', required=True, help='Silent 1080x1920 Stage 1 visuals')
    parser.add_argument('--out', default=str(ROOT / 'out' / 'FixReach_Final_Master.mp4'))
    parser.add_argument('--voice', default=str(ROOT / 'public' / 'audio' / 'voiceover.wav'))
    parser.add_argument('--bgm', default=str(ROOT / 'public' / 'audio' / 'bgm.mp3'))
    parser.add_argument('--sfx', default=str(ROOT / 'out' / 'sfx.wav'), help='Synced UI SFX stem from Stage 1')
    parser.add_argument('--srt', default=str(ROOT / 'public' / 'audio' / 'subtitles.srt'))
    parser.add_argument('--captions-already-burned', action='store_true', help='Keep existing burned captions; still validate the SRT timeline')
    parser.add_argument('--bgm-gain', type=float, default=0.16)
    parser.add_argument('--sfx-gain', type=float, default=0.9)
    args = parser.parse_args()

    base, voice, bgm, sfx, srt, out = map(Path, (args.base, args.voice, args.bgm, args.sfx, args.srt, args.out))
    for path in (base, voice, bgm, sfx, srt):
        if not path.is_file() or path.stat().st_size == 0:
            raise FileNotFoundError(f'Missing or empty required FixReach source asset: {path}')
    resolved_out = out.resolve()
    if resolved_out in {p.resolve() for p in (base, voice, bgm, sfx, srt)}:
        raise ValueError('Output path must not overwrite a source asset')
    if not 0.0 <= args.bgm_gain <= 1.0 or not 0.0 <= args.sfx_gain <= 2.0:
        raise ValueError('BGM gain must be 0–1 and SFX gain must be 0–2')

    base_probe = probe(base)
    video_streams = [stream for stream in base_probe['streams'] if stream['codec_type'] == 'video']
    base_audio = [stream for stream in base_probe['streams'] if stream['codec_type'] == 'audio']
    if len(video_streams) != 1 or base_audio:
        raise ValueError('Stage 1 base must contain exactly one video stream and no audio streams')
    video = video_streams[0]
    if (video['width'], video['height'], video['r_frame_rate']) != (1080, 1920, '30/1'):
        raise ValueError(f'Expected silent 1080x1920 30fps base, got {video["width"]}x{video["height"]} at {video["r_frame_rate"]}')

    total = float(base_probe['format']['duration'])
    voice_duration = duration(voice)
    sfx_duration = duration(sfx)
    subtitle_end = srt_end(srt)
    if abs(voice_duration - subtitle_end) > 0.03:
        raise ValueError(f'Voiceover/SRT mismatch: {voice_duration:.3f}s vs {subtitle_end:.3f}s')
    if abs(sfx_duration - total) > 0.05:
        raise ValueError(f'UI SFX/base mismatch: {sfx_duration:.3f}s vs {total:.3f}s')
    if abs(total - voice_duration) > 0.08:
        raise ValueError(f'Base/voiceover mismatch: {total:.3f}s vs {voice_duration:.3f}s')

    out = resolved_out
    out.parent.mkdir(parents=True, exist_ok=True)
    mixed = out.with_name(out.stem + '.audio-mixed.tmp.mp4')
    bgm_gain = f'{args.bgm_gain:.4f}'
    sfx_gain = f'{args.sfx_gain:.4f}'
    audio_filter = (
        '[1:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,'
        'loudnorm=I=-16:TP=-1.5:LRA=10:linear=true:print_format=summary,asplit=2[vo_sc][vo_mix];'
        f'[2:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,volume={bgm_gain}[bgm];'
        '[bgm][vo_sc]sidechaincompress=threshold=0.035:ratio=10:attack=18:release=320:makeup=1[duck];'
        f'[3:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,volume={sfx_gain}[sfx];'
        '[vo_mix][duck][sfx]amix=inputs=3:duration=longest:dropout_transition=0:normalize=0,'
        'loudnorm=I=-16:TP=-1.5:LRA=10:linear=true,alimiter=limit=0.92:attack=5:release=50:level=disabled[a]'
    )
    try:
        run([
            'ffmpeg', '-y', '-hide_banner', '-loglevel', 'warning',
            '-i', str(base), '-i', str(voice), '-stream_loop', '-1', '-i', str(bgm), '-i', str(sfx),
            '-filter_complex', audio_filter, '-map', '0:v:0', '-map', '[a]',
            '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2',
            '-t', f'{total:.6f}', '-movflags', '+faststart', str(mixed),
        ])
        if args.captions_already_burned:
            mixed.replace(out)
        else:
            # The SRT filter's default ASS canvas is 384x288; keep these values small
            # so captions land at about 40px and around 170px above the bottom on 1080x1920.
            subtitle_style = (
                'FontName=DejaVu Sans,FontSize=6,Bold=1,PrimaryColour=&H00FFFFFF,'
                'OutlineColour=&H00101827,BorderStyle=1,Outline=1,Shadow=0.5,Alignment=2,'
                'MarginV=26,MarginL=30,MarginR=30'
            )
            subtitle_filter = f"subtitles='{escape_filter_path(srt)}':force_style='{subtitle_style}'"
            run([
                'ffmpeg', '-y', '-hide_banner', '-loglevel', 'warning', '-i', str(mixed),
                '-vf', subtitle_filter, '-c:v', 'libx264', '-preset', 'medium', '-crf', '18',
                '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-movflags', '+faststart', str(out),
            ])
    finally:
        mixed.unlink(missing_ok=True)

    final_probe = probe(out)
    final_video = [stream for stream in final_probe['streams'] if stream['codec_type'] == 'video']
    final_audio = [stream for stream in final_probe['streams'] if stream['codec_type'] == 'audio']
    if len(final_video) != 1 or len(final_audio) != 1:
        raise RuntimeError('Final master must contain exactly one video and one audio stream')
    if (final_video[0]['width'], final_video[0]['height'], final_video[0]['r_frame_rate']) != (1080, 1920, '30/1'):
        raise RuntimeError('Final master video format changed unexpectedly')
    if abs(float(final_probe['format']['duration']) - total) > 0.08:
        raise RuntimeError('Final master duration changed unexpectedly')
    run(['ffmpeg', '-v', 'error', '-i', str(out), '-f', 'null', '-'])
    print(json.dumps({
        'output': str(out),
        'duration_seconds': round(float(final_probe['format']['duration']), 3),
        'voiceover_seconds': round(voice_duration, 3),
        'sfx_seconds': round(sfx_duration, 3),
        'subtitle_end_seconds': round(subtitle_end, 3),
        'video': {'width': final_video[0]['width'], 'height': final_video[0]['height'], 'fps': final_video[0]['r_frame_rate']},
        'audio': {'codec': final_audio[0]['codec_name'], 'sample_rate': final_audio[0].get('sample_rate'), 'channels': final_audio[0].get('channels')},
        'bgm_gain': args.bgm_gain,
        'sfx_gain': args.sfx_gain,
        'verification': 'PASS',
    }, indent=2))


if __name__ == '__main__':
    main()
