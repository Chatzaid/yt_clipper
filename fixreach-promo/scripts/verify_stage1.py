from pathlib import Path
import json,re,subprocess,wave
ROOT=Path(__file__).resolve().parents[1]; AUDIO=ROOT/"public"/"audio"; OUT=ROOT/"out"
FPS=30; RATE=48000
def probe(path):
 return json.loads(subprocess.check_output(["ffprobe","-v","error","-show_streams","-show_format","-of","json",str(path)],text=True))
with wave.open(str(AUDIO/"voiceover.wav"),"rb") as w: vo_duration=w.getnframes()/w.getframerate()
expected_frames=round(vo_duration*FPS); expected_video_duration=expected_frames/FPS
assert abs(vo_duration-97.320)<0.01, f"Unexpected voiceover duration: {vo_duration:.3f}s"
srt=(AUDIO/"subtitles.srt").read_text(encoding="utf-8")
ends=re.findall(r"\d{2}:\d{2}:\d{2},\d{3} --> (\d{2}:\d{2}:\d{2},\d{3})",srt)
assert ends, "No valid SRT cues found"
h,m,rest=ends[-1].split(":"); ss,ms=rest.split(",")
srt_end=int(h)*3600+int(m)*60+int(ss)+int(ms)/1000
assert abs(srt_end-vo_duration)<0.02, f"SRT ends at {srt_end:.3f}s, VO is {vo_duration:.3f}s"
video=probe(OUT/"visuals.mp4"); v=[s for s in video["streams"] if s["codec_type"]=="video"]; a=[s for s in video["streams"] if s["codec_type"]=="audio"]
assert len(v)==1 and not a, "Stage 1 visuals.mp4 must be video-only (no VO, BGM or embedded audio)"
vs=v[0]; assert (vs["width"],vs["height"],vs["r_frame_rate"])==(1080,1920,"30/1"),vs
assert int(vs.get("nb_frames",expected_frames))==expected_frames,vs
duration=float(video["format"]["duration"]); assert abs(duration-expected_video_duration)<0.04,f"Video duration {duration:.3f}s, expected {expected_video_duration:.3f}s"
with wave.open(str(OUT/"sfx.wav"),"rb") as w:
 assert (w.getframerate(),w.getnchannels(),w.getnframes())==(RATE,1,expected_frames*(RATE//FPS)),(w.getframerate(),w.getnchannels(),w.getnframes())
print(f"PASS: {vo_duration:.3f}s VO/SRT; {expected_frames} frames / {expected_video_duration:.3f}s silent 1080x1920 30fps visuals; synced 48kHz mono SFX.")
