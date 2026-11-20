#!/usr/bin/env python3
"""Generate lightweight, original FixReach UI sound effects."""
from pathlib import Path
import numpy as np
from scipy.io.wavfile import write

OUT = Path(__file__).resolve().parents[1] / "public" / "sfx"
SR = 48000
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(20261119)

def envelope(n, attack=0.008, release=0.06):
    t = np.arange(n) / SR
    e = np.ones(n)
    a = max(1, int(attack * SR)); r = max(1, int(release * SR))
    e[:a] = np.linspace(0, 1, a)
    e[-r:] = np.linspace(1, 0, r)
    return e

def save(name, x):
    x = np.asarray(x, dtype=np.float64)
    peak = max(1e-9, np.max(np.abs(x)))
    pcm = np.int16(np.clip(x / peak * 0.72, -1, 1) * 32767)
    write(OUT / name, SR, pcm)

# 0.35s airy whoosh: filtered noise with a smooth band/swell sweep.
dur = 0.35; n = int(SR * dur); t = np.arange(n) / SR
noise = rng.normal(0, 1, n)
# One-pole smoothing gives a clean, soft noise texture without extra dependencies.
smooth = np.empty(n); smooth[0] = 0
for i in range(1, n):
    smooth[i] = 0.16 * noise[i] + 0.84 * smooth[i-1]
swell = np.sin(np.pi * np.clip(t / dur, 0, 1)) ** 1.5
save("whoosh.wav", smooth * swell)

# 0.12s sine pitch-drop pop.
dur = 0.12; n = int(SR * dur); t = np.arange(n) / SR
phase = 2 * np.pi * (780*t - 260*t*t/dur)
pop = np.sin(phase) * np.exp(-t * 27)
save("pop.wav", pop)

# 0.50s soft harmonic chime.
dur = 0.50; n = int(SR * dur); t = np.arange(n) / SR
chime = (np.sin(2*np.pi*880*t) + .48*np.sin(2*np.pi*1320*t) + .22*np.sin(2*np.pi*1760*t))
chime *= np.exp(-t * 7.5) * np.minimum(1, t / .012)
save("ding.wav", chime)

# 0.25s low, restrained double-pulse warning.
dur = 0.25; n = int(SR * dur); t = np.arange(n) / SR
pulse_env = np.exp(-t * 12) * ((np.sin(2*np.pi*8*t) > 0).astype(float))
alert = (np.sin(2*np.pi*115*t) + .25*np.sin(2*np.pi*172*t)) * pulse_env
save("alert.wav", alert)


dur=.22; n=int(SR*dur); t=np.arange(n)/SR
save("ping.wav",(np.sin(2*np.pi*1046.5*t)+.55*np.sin(2*np.pi*1318.5*t))*np.exp(-t*19)*np.minimum(1,t/.006))
dur=.32; n=int(SR*dur); t=np.arange(n)/SR
save("hit.wav",.72*np.sin(2*np.pi*(92-24*t/dur)*t)*np.exp(-t*20)+.28*np.sin(2*np.pi*1850*t)*np.exp(-t*34))
print("Generated whoosh, pop, ding, alert, ping and hit WAVs in", OUT)
