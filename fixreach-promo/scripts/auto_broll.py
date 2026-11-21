#!/usr/bin/env python3
"""Find, download, and composite Creative Commons YouTube cutaways for FixReach."""
import json, os, re, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "out"
CACHE = OUT / "broll"
CACHE.mkdir(parents=True, exist_ok=True)

# Voiceover-aligned cutaways. Search is automatic; only videos explicitly marked
# Creative Commons by YouTube metadata are eligible for automatic download.
BEATS = [
    {"id":"technician-race","start":8.65,"end":15.55,"query":"air conditioner repair technicians working service repair creative commons"},
    {"id":"price-bargaining","start":19.30,"end":22.20,"query":"customer negotiating repair service price mechanic creative commons"},
    {"id":"social-scroll","start":28.50,"end":34.50,"query":"person scrolling Instagram social media smartphone creative commons"},
    {"id":"local-map","start":39.50,"end":49.20,"query":"city map location pins GPS map animation creative commons"},
    {"id":"whatsapp-lead","start":59.80,"end":63.75,"query":"person receiving WhatsApp message smartphone creative commons"},
    {"id":"appliance-repair","start":74.45,"end":81.55,"query":"technician repairing refrigerator washing machine creative commons"},
]

def run(args, capture=True):
    p = subprocess.run(args, text=True, stdout=subprocess.PIPE if capture else None,
                       stderr=subprocess.PIPE if capture else None)
    if p.returncode:
        raise RuntimeError(f"Command failed ({p.returncode}): {' '.join(args)}\n{(p.stderr or '')[-4000:]}")
    return p.stdout if capture else ""

def yt_auth_args():
    cookie_file = os.environ.get('YOUTUBE_COOKIES_FILE')
    if cookie_file and Path(cookie_file).is_file() and Path(cookie_file).stat().st_size:
        return ['--cookies', cookie_file]
    return []

def seconds(s):
    return f"{s:.3f}"

def main():
    manifest = []
    overlays = []
    for beat in BEATS:
        duration = beat["end"] - beat["start"]
        print(f"Searching: {beat['id']} — {beat['query']}", flush=True)
        try:
            data = json.loads(run(["yt-dlp", *yt_auth_args(), "--skip-download","--dump-single-json",
                                   f"ytsearch12:{beat['query']}"]))
        except Exception as exc:
            print(f"WARNING: YouTube search blocked/unavailable for {beat['id']}: {exc}. Keeping original designed scene.", flush=True)
            continue
        entries = data.get("entries") or []
        eligible = []
        for e in entries:
            license_name = str(e.get("license") or "").lower().replace("_","").replace(" ","")
            if "creativecommon" in license_name and e.get("id"):
                eligible.append(e)
        if not eligible:
            print(f"WARNING: no YouTube Creative Commons results for {beat['id']}; leaving designed scene visible.", flush=True)
            continue
        chosen = eligible[0]
        video_id = chosen["id"]
        source_url = chosen.get("webpage_url") or f"https://www.youtube.com/watch?v={video_id}"
        target = CACHE / f"{beat['id']}.mp4"
        if not target.exists() or target.stat().st_size < 10000:
            try:
                run(["yt-dlp", *yt_auth_args(), "--no-playlist","--no-warnings","--no-progress",
                     "-f","bv*[height>=720][ext=mp4]/bv*[height>=720]/bestvideo[height>=480]",
                     "--merge-output-format","mp4","--remux-video","mp4","--max-filesize","180M",
                     "-o",str(target),source_url], capture=False)
            except Exception as exc:
                print(f"WARNING: could not download {video_id}: {exc}. Keeping original scene.", flush=True)
                continue
        probe = json.loads(run(["ffprobe","-v","error","-show_entries","format=duration",
                                "-of","json",str(target)]))
        source_duration = float(probe["format"]["duration"])
        if source_duration < min(2.0, duration):
            print(f"WARNING: source too short for {beat['id']}; skipping.", flush=True)
            continue
        # Pick a deterministic mid-clip section, keeping source audio out of the master.
        clip_len = min(duration, source_duration)
        offset = max(0.0, (source_duration - clip_len) * 0.35)
        cut = CACHE / f"{beat['id']}-cut.mp4"
        run(["ffmpeg","-y","-v","error","-ss",seconds(offset),"-i",str(target),
             "-t",seconds(clip_len),"-an","-vf",
             "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,fps=30",
             "-c:v","libx264","-preset","veryfast","-crf","23","-pix_fmt","yuv420p",
             str(cut)], capture=False)
        overlays.append((cut, beat["start"], beat["end"]))
        manifest.append({
            "beat":beat["id"],"query":beat["query"],"title":chosen.get("title"),
            "video_id":video_id,"url":source_url,"license":chosen.get("license"),
            "uploader":chosen.get("uploader"),"start":beat["start"],"end":beat["end"],
            "source_offset":offset
        })
    (OUT / "broll_sources.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
    if not overlays:
        # YouTube may block anonymous cloud runners with bot checks. Keep the render
        # moving, preserve the original designed visuals, and record the sourcing failure.
        run(["ffmpeg","-y","-v","error","-i",str(OUT/"base_visuals.mp4"),"-c","copy",
             str(OUT/"visuals_with_broll.mp4")],capture=False)
        (OUT/"broll_sources.json").write_text(json.dumps({
            "status":"fallback_no_downloaded_clips",
            "reason":"YouTube search/download was unavailable to this GitHub Actions runner; original visuals preserved.",
            "sources":[]
        },indent=2))
        print("WARNING: no B-roll clips downloaded; original visuals preserved so audio/caption render can complete.",flush=True)
        return
    inputs = ["-i",str(OUT/"base_visuals.mp4")]
    for path, _, _ in overlays:
        inputs += ["-i",str(path)]
    graph = []
    last = "[0:v]"
    for i, (_, start, end) in enumerate(overlays, start=1):
        label = f"[v{i}]"
        graph.append(f"[{i}:v]trim=duration={seconds(end-start)},setpts=PTS-STARTPTS+{seconds(start)}/TB[{label[1:-1]}]")
        out = f"[mix{i}]"
        graph.append(f"{last}{label}overlay=0:0:eof_action=pass:enable='between(t,{seconds(start)},{seconds(end)})'{out}")
        last = out
    cmd = ["ffmpeg","-y","-v","error",*inputs,"-filter_complex",";".join(graph),
           "-map",last,"-an","-c:v","libx264","-preset","veryfast","-crf","18",
           "-pix_fmt","yuv420p","-r","30","-movflags","+faststart",str(OUT/"visuals_with_broll.mp4")]
    run(cmd,capture=False)
    print(f"PASS: composed {len(overlays)} licensed cutaways; source manifest: out/broll_sources.json",flush=True)

if __name__ == "__main__":
    try: main()
    except Exception as exc:
        print(f"::error::{exc}",file=sys.stderr)
        raise
