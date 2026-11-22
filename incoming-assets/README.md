# Production asset intake

Upload the next production-assets ZIP into this folder using GitHub's web uploader:

1. Open the upload link supplied in the project handoff.
2. Choose **Add file → Upload files** if GitHub does not open the upload screen directly.
3. Upload the ZIP containing the voice-over audio, SRT subtitles, and logo.
4. Commit the upload to `feat/blocky-shorts-production-pipeline` only.

## Expected ZIP contents

- Voice-over audio: preferably WAV or high-quality MP3.
- Subtitles: SRT file, UTF-8 encoded.
- Logo: PNG or SVG (transparent PNG preferred).

Keep the original filenames. If there are multiple voice tracks or subtitle versions, include a short README identifying the intended final versions.

## Handling rules

- Treat uploaded assets as source material; do not overwrite or recompress originals.
- Do not publish private assets or credentials.
- Do not commit API keys, cookies, access tokens, or other secrets.
- After upload, inspect the archive, validate audio duration and SRT timing, and check the logo dimensions/transparency before wiring assets into the render pipeline.
- Keep generated renders and temporary frame dumps out of Git unless explicitly requested.

This folder is an intake location, not a public release location.
