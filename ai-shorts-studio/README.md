# yt_clipper AI Shorts Studio

A separate, mobile-first browser editor added alongside the original yt_clipper project. The existing userscript, Python package, and FFmpeg CLI are not modified.

## Current MVP
- Load a local video file in the browser.
- Select a 30–60 second segment.
- Preview a YouTube URL using the official privacy-enhanced embed (preview only).
- Add a custom opening hook and caption beats.
- Crop to a centered 9:16 frame (720 × 1280).
- Export WebM using browser MediaRecorder where supported. Processing stays on the user's device.

## Honest limitations
- YouTube embeds do not expose the underlying media file. This tool does not download or extract arbitrary YouTube videos. Use a local video you own or are authorized to edit.
- Highlight selection, speech transcription, and AI hook/caption generation are not implemented in this first MVP. Text is user-supplied; no fake AI processing.
- MP4 export is not guaranteed across Android browsers; this MVP exports WebM only. A reliable MP4/AI pipeline needs a separately provisioned encoder/inference runtime, which is not assumed to be free.
- Browser export runs in real time and may be demanding on lower-powered phones. Keep the tab open during export.

## Run locally
Serve this folder with any static file server, then open the index.html file. No backend, database, API key, or paid service is required.

## Next milestones
1. Add browser/device capability checks and stronger export recovery.
2. Add local speech-to-text and highlight ranking only after benchmarking viable free models on target devices.
3. Integrate with the existing Python/FFmpeg pipeline as an optional local desktop workflow without changing its current CLI contract.
