from pathlib import Path
import numpy as np
from scipy.io.wavfile import read,write
import json
ROOT=Path(__file__).resolve().parents[1]; SFX=ROOT/"public"/"sfx"; OUT=ROOT/"out"
TIMING=json.loads((ROOT/"scene-timing.json").read_text(encoding="utf-8"))
RATE=48000; FPS=int(TIMING["fps"]); TOTAL_FRAMES=int(TIMING["total_frames"])
if RATE % FPS: raise ValueError(f"Sample rate {RATE} is not divisible by {FPS}fps")
SAMPLES_PER_FRAME=RATE//FPS; N=TOTAL_FRAMES*SAMPLES_PER_FRAME
# Frame positions follow the six chapter cuts and narration cue moments; the 20 visual beats remain silent overlays.
events=[
 (24,"pop.wav",.24),(420,"whoosh.wav",.32),(470,"pop.wav",.26),
 (990,"whoosh.wav",.32),(1089,"pop.wav",.22),
 (1625,"whoosh.wav",.32),(1692,"pop.wav",.24),(2075,"ping.wav",.30),
 (2132,"whoosh.wav",.28),(2195,"pop.wav",.22),
 (2554,"whoosh.wav",.30),(2592,"hit.wav",.42)]
mix=np.zeros(N,dtype=np.float64)
for frame,name,gain in events:
 at=frame*SAMPLES_PER_FRAME; sr,a=read(SFX/name)
 if sr!=RATE: raise ValueError(f"{name}: sample rate {sr}, expected {RATE}")
 if a.ndim==2: a=a.mean(axis=1)
 if np.issubdtype(a.dtype,np.integer): a=a.astype(np.float64)/32768
 end=min(N,at+len(a))
 if end>at: mix[at:end]+=a[:end-at]*gain
peak=float(np.max(np.abs(mix)))
if peak>.92: mix*=.92/peak
OUT.mkdir(parents=True,exist_ok=True); write(OUT/"sfx.wav",RATE,np.int16(np.clip(mix,-1,1)*32767))
print(f"Wrote {N} samples ({N/RATE:.3f}s) of scene-synced SFX")
