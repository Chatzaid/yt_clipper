from pathlib import Path
import json, wave
ROOT=Path(__file__).resolve().parents[1]
scenes=[]; total=0.0; prev=0
for i in range(1,7):
 p=ROOT/f'public/audio/scenes/scene_{i:02d}.wav'
 with wave.open(str(p),'rb') as w: dur=w.getnframes()/w.getframerate()
 total+=dur; end=round(total*30)
 scenes.append({'scene':i,'duration_seconds':dur,'start_frame':prev,'end_frame_exclusive':end,'frames':end-prev})
 prev=end
out={'fps':30,'duration_seconds':total,'total_frames':prev,'video_duration_seconds':prev/30,'scenes':scenes}
(ROOT/'scene-timing.json').write_text(json.dumps(out,indent=2))
print(json.dumps(out,indent=2))
