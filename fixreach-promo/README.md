# FixReach promo render

Vertical 1080x1920, 30fps Remotion project with two Manim vector scenes.

## Timing
The supplied voiceover, subtitles, and six scene WAV assets each total **97.320 seconds** (not ~50s). Scene end boundaries are rounded cumulatively onto the 30fps timeline so duration rounding does not accumulate: 420, 570, 635, 507, 422, 366 frames (2,920 total / 97.333s video container duration). Audio and SRT retain their exact 97.320s timeline. Scene WAVs are bundled for traceability/reference.

## Render
Manim scenes render to `public/manim/scene2_flow.mp4` and `public/manim/scene5_roi.mp4`, then Remotion renders `out/base_visuals.mp4`.

```bash
python scripts/render_manim.py
npm ci
npm run build
```

All additions are isolated under `fixreach-promo/` except the GitHub Actions workflow requested at `.github/workflows/render-fixreach-video.yml`.


## Narration-driven visual rhythm
The six chapter compositions are the backbone, not the only visual changes. `NarrativeBeatOverlay` adds 20 story-specific visual information beats at 5-second intervals across the 97.32-second supplied narration. Adjacent beats overlap with 12-frame crossfades at 30fps. Each beat changes its headline, explanatory line, diagram motif, and signal colour while remaining above the reserved 78%–84% caption-safe band. The overlay is visual-only: no voiceover, BGM, subtitles, or extra audio are embedded in Stage 1.
