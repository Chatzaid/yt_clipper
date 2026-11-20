from pathlib import Path
import json,subprocess,wave
O=Path(__file__).resolve().parents[1]/"out"
j=json.loads(subprocess.check_output(["ffprobe","-v","error","-show_streams","-show_format","-of","json",str(O/"visuals.mp4")],text=True))
v=[s for s in j["streams"] if s["codec_type"]=="video"]; a=[s for s in j["streams"] if s["codec_type"]=="audio"]
assert len(v)==1 and not a, "Visual master must contain video only"
assert (v[0]["width"],v[0]["height"],v[0]["r_frame_rate"])==(1080,1920,"30/1"),v[0]
assert 57.9<=float(j["format"]["duration"])<=58.1
with wave.open(str(O/"sfx.wav"),"rb") as w:
 assert (w.getframerate(),w.getnchannels(),w.getnframes())==(48000,1,2784000)
print("PASS: silent 1080x1920 30fps / 58.000s + 48kHz 58.000s SFX")
