from pathlib import Path
import numpy as np
from scipy.io.wavfile import read,write
ROOT=Path(__file__).resolve().parents[1]; SFX=ROOT/"public"/"sfx"; OUT=ROOT/"out"
RATE=48000; FPS=30; FRAMES=1740; N=FRAMES*RATE//FPS
events=[(24,"pop.wav",.24),(250,"whoosh.wav",.32),(345,"pop.wav",.28),(590,"whoosh.wav",.32),(705,"pop.wav",.22),(968,"whoosh.wav",.32),(1236,"ping.wav",.30),(1270,"whoosh.wav",.28),(1395,"ding.wav",.20),(1521,"whoosh.wav",.30),(1556,"hit.wav",.42)]
mix=np.zeros(N,dtype=np.float64)
for frame,name,gain in events:
 at=round(frame*RATE/FPS); sr,a=read(SFX/name)
 if sr!=RATE: raise ValueError(f"{name}: sample rate {sr}")
 if a.ndim==2: a=a.mean(axis=1)
 if np.issubdtype(a.dtype,np.integer): a=a.astype(np.float64)/32768
 end=min(N,at+len(a))
 if end>at: mix[at:end]+=a[:end-at]*gain
peak=np.max(np.abs(mix))
if peak>.92: mix*=.92/peak
OUT.mkdir(parents=True,exist_ok=True); write(OUT/"sfx.wav",RATE,np.int16(np.clip(mix,-1,1)*32767))
