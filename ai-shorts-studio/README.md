# yt_clipper AI Shorts Studio

A separate mobile-first browser editor in the existing repository. The original userscript, Python package, and FFmpeg CLI are not modified.

## Features in this branch
- Public YouTube video analysis through Google's Gemini Interactions API.
- Up to five suggested 30–60 second moments with timestamps, hook drafts, and caption beats.
- Local authorized video input, manual range editing, centered 9:16 crop, hook/caption overlays, and browser WebM export.
- YouTube embed preview.
- Gemini API key and private studio access code stay server-side; neither is shipped to the browser.

## Deployment
Create a Vercel project connected to `Chatzaid/yt_clipper` and set its **Root Directory** to `ai-shorts-studio`. No build command is required; the project is static HTML/JS plus one Vercel serverless function at `api/analyze.js`.

Add these Vercel environment variables for Production, Preview, and Development:

- `GEMINI_API_KEY` — required. Create it in [Google AI Studio](https://aistudio.google.com/app/apikey).
- `STUDIO_ACCESS_TOKEN` — required. Choose a long private password yourself. Enter the same value in the app's access-code field.
- `GEMINI_MODEL` — optional. Defaults to `gemini-3.6-flash`; only change this to a model enabled for your AI Studio project's free tier.

A sample file is provided as `.env.example`. Never commit real keys or tokens.

## Free-tier and operational limits
Gemini's free tier has model-specific RPM, TPM, and daily request quotas; they can change and are visible in AI Studio. The API endpoint enforces a lightweight per-instance cooldown, but this is not a durable global rate limiter. Keep the app private and do not publish the access code.

## Important limitations
- Gemini analysis accepts public YouTube URLs only. Private/unlisted videos are not supported by this workflow.
- YouTube analysis provides candidate timestamps; the user must load the matching local video file they own or are authorized to edit. The app does not download or extract YouTube media.
- AI captions are draft paraphrase beats, not word-perfect speech transcription. Automatic word-level ASR/subtitle timing is not implemented yet.
- Export is WebM via browser MediaRecorder where supported. MP4 is not guaranteed across Android browsers.
- Rendering is real-time on the device and may be demanding on lower-powered phones.
