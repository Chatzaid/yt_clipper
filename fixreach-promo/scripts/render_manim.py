from pathlib import Path
import subprocess
import shutil
ROOT = Path(__file__).resolve().parents[1]
MANIM = ROOT / "manim"
OUT = ROOT / "public" / "manim"
OUT.mkdir(parents=True, exist_ok=True)
scenes = [("scene2_flow.py", "Scene2Flow", "scene2_flow"), ("scene5_roi.py", "Scene5ROI", "scene5_roi")]
for source, cls, target in scenes:
    subprocess.run([
        "manim", "-ql", "--fps", "30", "--format", "mp4",
        "--media_dir", str(ROOT / ".manim-media"), str(MANIM / source), cls,
    ], check=True)
    candidates = list((ROOT / ".manim-media" / "videos").rglob(f"{cls}.mp4"))
    if not candidates:
        raise FileNotFoundError(f"Manim did not emit {cls}.mp4")
    candidates.sort(key=lambda p: p.stat().st_mtime, reverse=True)
    shutil_target = OUT / f"{target}.mp4"
    shutil_target.write_bytes(candidates[0].read_bytes())
