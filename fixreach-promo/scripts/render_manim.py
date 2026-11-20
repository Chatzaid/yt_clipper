from pathlib import Path
import shutil,subprocess
ROOT=Path(__file__).resolve().parents[1]; MANIM=ROOT/"manim"; MEDIA=ROOT/".manim-media"; OUT=ROOT/"public"/"manim"
OUT.mkdir(parents=True,exist_ok=True); shutil.rmtree(MEDIA,ignore_errors=True)
for source,cls,target in [("scene2_flow.py","Scene2Flow","scene2_flow"),("scene5_roi.py","Scene5ROI","scene5_roi")]:
    subprocess.run(["manim","-ql","-r","1080,1920","--fps","30","--format","mp4","--media_dir",str(MEDIA),str(MANIM/source),cls],check=True)
    candidates=list((MEDIA/"videos").rglob(f"{cls}.mp4"))
    if not candidates: raise FileNotFoundError(f"Manim did not emit {cls}.mp4")
    candidates.sort(key=lambda p:p.stat().st_mtime,reverse=True); dest=OUT/f"{target}.mp4"; shutil.copy2(candidates[0],dest)
    print(f"Rendered {dest} ({dest.stat().st_size} bytes)")
