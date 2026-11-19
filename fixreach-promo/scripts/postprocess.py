#!/usr/bin/env python3
"""Mix finished base visuals with normalized VO, sidechain-ducked BGM and burned captions."""
from pathlib import Path
import argparse
import subprocess

ROOT = Path(__file__).resolve().parents[1]

def run(cmd):
    print('+', ' '.join(map(str, cmd)), flush=True)
    subprocess.run(list(map(str, cmd)), check=True)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--base', required=True)
    ap.add_argument('--out', default=str(ROOT / 'out' / 'FixReach_Final_Promo.mp4'))
    ap.add_argument('--voice', default=str(ROOT / 'public/audio/voiceover.wav'))
    ap.add_argument('--bgm', default=str(ROOT / 'public/audio/bgm.mp3'))
    ap.add_argument('--srt', default=str(ROOT / 'public/audio/subtitles.srt'))
    args = ap.parse_args()
    out = Path(args.out).resolve(); out.parent.mkdir(parents=True, exist_ok=True)
    tmp = out.with_name(out.stem + '.mixed.mp4')
    audio_filter = (
        "[1:a]loudnorm=I=-16:TP=-1.5:LRA=10,asplit=2[vo_sc][vo_mix];"
        "[2:a]volume=0.22[bgm];"
        "[bgm][vo_sc]sidechaincompress=threshold=0.035:ratio=10:attack=18:release=280:makeup=1[duck];
       "[vo_mix][duck]amix=inputs=2:duration=first:dropout_transition=2,alimiter=limit=0.95[a]"    )
    run(['ffmpeg','-y','-i',args.base,'-i',args.voice,'-stream_loop','-1','-i',args.bgm,
        '-filter_complex',audio_filter,'-map','0:v:0','-map','[a]','-c:v','copy','-c:a','aac','-b:a','192k',
        '-shortest','-movflags','+faststart',tmp])
    srt_filter = f"subtitles='{Path(args.srt).resolve().as_posix()}':force_style='FontName=DejaVu Sans,FontSize=18,Bold=1,PrimaryColour=&H00FFFFFF,OutlineColour=&H00101827,BorderStyle=1,Outline=3,Shadow=1,Alignment=2,MarginV=155,MarginL=70,MarginR=70'"
    run(['ffmpeg','-y','-i',tmp,'-vf',srt_filter,'-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-c:a','copy','-movflags','+faststart',out])
    tmp.unlink(missing_ok=True)
    print(out)

if __name__ == '__main__': main()
