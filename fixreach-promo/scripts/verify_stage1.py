from pathlib import Path
import json
import re
import subprocess
import wave

ROOT = Path(__file__).resolve().parents[1]
AUDIO = ROOT / "public" / "audio"
OUT = ROOT / "out"
TIMING = ROOT / "scene-timing.json"
RATE = 48000

def probe(path):
    return json.loads(subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(path)],
        text=True,
    ))

def timestamp(value):
    hours, minutes, rest = value.split(":")
    seconds, millis = rest.split(",")
    return int(hours) * 3600 + int(minutes) * 60 + int(seconds) + int(millis) / 1000

timing = json.loads(TIMING.read_text(encoding="utf-8"))
fps = int(timing["fps"])
duration = float(timing["duration_seconds"])
expected_frames = int(timing["total_frames"])
assert fps == 30, f"Expected 30fps timeline, got {fps}"
assert expected_frames == round(duration * fps), (expected_frames, duration, fps)

# Confirm the six chapter ranges form one contiguous timeline with no missing or overlapping frames.
cursor = 0
for scene in timing["scenes"]:
    start = int(scene["start_frame"])
    end = int(scene["end_frame_exclusive"])
    frames = int(scene["frames"])
    assert start == cursor, f"Scene {scene['scene']} starts at {start}, expected {cursor}"
    assert end - start == frames, f"Scene {scene['scene']} frame count mismatch"
    cursor = end
assert cursor == expected_frames, f"Scene ranges end at {cursor}, expected {expected_frames}"

# Stage 1 deliberately excludes voiceover.wav. Validate the narration timing against the committed SRT instead.
srt_path = AUDIO / "subtitles.srt"
assert srt_path.is_file(), f"Missing narration timing reference: {srt_path}"
srt = srt_path.read_text(encoding="utf-8")
pattern = re.compile(
    r"(?m)^\s*\d+\s*\n(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})\s*$"
)
cues = [(timestamp(a), timestamp(b)) for a, b in pattern.findall(srt)]
assert cues, "No valid SRT cues found"
previous_start = -1.0
previous_end = -1.0
for index, (start, end) in enumerate(cues, 1):
    assert start >= previous_start, f"SRT cue {index} is out of order"
    assert end > start, f"SRT cue {index} has non-positive duration"
    assert start >= previous_end - 0.001, f"SRT cue {index} overlaps the previous cue"
    previous_start, previous_end = start, end
srt_end = max(end for _, end in cues)
assert abs(srt_end - duration) < 0.01, f"SRT ends at {srt_end:.3f}s, timeline is {duration:.3f}s"

# 20 five-second visual beats; the final beat occupies the remaining 2.32 seconds.
expected_beats = (expected_frames + 149) // 150
assert expected_beats == 20, f"Expected 20 five-second visual beats, got {expected_beats}"

video = probe(OUT / "visuals.mp4")
video_streams = [s for s in video["streams"] if s["codec_type"] == "video"]
audio_streams = [s for s in video["streams"] if s["codec_type"] == "audio"]
assert len(video_streams) == 1 and not audio_streams, "Stage 1 visuals.mp4 must be video-only (no VO, BGM or embedded audio)"
vs = video_streams[0]
assert (vs["width"], vs["height"], vs["r_frame_rate"]) == (1080, 1920, "30/1"), vs
assert int(vs.get("nb_frames", expected_frames)) == expected_frames, vs
video_duration = float(video["format"]["duration"])
expected_video_duration = expected_frames / fps
assert abs(video_duration - expected_video_duration) < 0.04, (
    f"Video duration {video_duration:.3f}s, expected {expected_video_duration:.3f}s"
)

with wave.open(str(OUT / "sfx.wav"), "rb") as audio:
    expected_samples = expected_frames * (RATE // fps)
    assert (audio.getframerate(), audio.getnchannels(), audio.getnframes()) == (
        RATE, 1, expected_samples
    ), (audio.getframerate(), audio.getnchannels(), audio.getnframes())

print(
    f"PASS: {duration:.3f}s narration/SRT reference; {len(cues)} cues; "
    f"{expected_frames} frames / {expected_video_duration:.3f}s silent 1080x1920 30fps visuals; "
    f"{expected_beats} visual beats; synced 48kHz mono SFX."
)
