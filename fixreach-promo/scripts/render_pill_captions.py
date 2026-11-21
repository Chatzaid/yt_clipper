#!/usr/bin/env python3
"""Create timed, max-three-word rounded caption pills as a transparent overlay video."""
from __future__ import annotations
import json, re, subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "out"
SRT = ROOT / "public" / "audio" / "subtitles.srt"
W, H, FPS = 1080, 1920, 30
FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_SIZE = 58
MAX_WORDS = 3
BOTTOM_Y = 1585
BG = (13, 24, 42, 238)
BORDER = (255, 194, 48, 255)
FG = (255, 255, 255, 255)

def stamp(value: str) -> float:
    hh, mm, rest = value.split(":")
    ss, ms = rest.split(",")
    return int(hh)*3600 + int(mm)*60 + int(ss) + int(ms)/1000

def parse_srt(text: str):
    cues=[]
    for block in re.split(r"\n\s*\n", text.strip()):
        lines=block.strip().splitlines()
        if len(lines)<3 or "-->" not in lines[1]:
            continue
        a,b=[x.strip() for x in lines[1].split("-->",1)]
        words=" ".join(lines[2:]).split()
        if not words: continue
        chunks=[words[i:i+MAX_WORDS] for i in range(0,len(words),MAX_WORDS)]
        start,end=stamp(a),stamp(b)
        weights=[sum(len(w) for w in chunk) for chunk in chunks]
        total=sum(weights)
        cursor=start
        for i,(chunk,weight) in enumerate(zip(chunks,weights)):
            stop=end if i==len(chunks)-1 else cursor+(end-start)*weight/total
            cues.append((cursor,stop," ".join(chunk)))
            cursor=stop
    return cues

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    text=SRT.read_text(encoding="utf-8-sig")
    cues=parse_srt(text)
    if not cues: raise SystemExit("No valid caption cues")
    font=ImageFont.truetype(FONT_PATH,FONT_SIZE)
    concat=OUT/"caption_pills.ffconcat"
    entries=["ffconcat version 1.0"]
    pngs=[]
    for i,(start,end,label) in enumerate(cues):
        image=Image.new("RGBA",(W,H),(0,0,0,0))
        draw=ImageDraw.Draw(image)
        bbox=draw.textbbox((0,0),label,font=font,stroke_width=0)
        tw,th=bbox[2]-bbox[0],bbox[3]-bbox[1]
        pad_x,pad_y=42,24
        bw,bh=tw+pad_x*2,th+pad_y*2
        x=(W-bw)//2
        y=BOTTOM_Y-bh//2
        draw.rounded_rectangle((x,y,x+bw,y+bh),radius=34,fill=BG,outline=BORDER,width=4)
        draw.text((W/2-tw/2-bbox[0],y+pad_y-bbox[1]),label,font=font,fill=FG)
        path=OUT/f"caption-pill-{i:03d}.png"
        image.save(path)
        pngs.append(path)
        entries += [f"file '{path.as_posix()}'",f"duration {max(0.001,end-start):.6f}"]
    # concat demuxer applies each image for its cue duration; repeat final frame.
    entries.append(f"file '{pngs[-1].as_posix()}'")
    concat.write_text("\n".join(entries)+"\n",encoding="utf-8")
    target=OUT/"caption_pills.mov"
    subprocess.run([
        "ffmpeg","-y","-hide_banner","-loglevel","error","-f","concat","-safe","0",
        "-i",str(concat),"-vsync","vfr","-r",str(FPS),"-c:v","qtrle","-pix_fmt","argb",str(target)
    ],check=True)
    manifest=[{"start":round(a,3),"end":round(b,3),"text":t,"word_count":len(t.split())} for a,b,t in cues]
    assert all(x["word_count"]<=MAX_WORDS for x in manifest)
    (OUT/"caption_manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
    print(f"PASS: generated {len(cues)} rounded highlight-pill captions; max {MAX_WORDS} words each.")
if __name__=="__main__": main()
