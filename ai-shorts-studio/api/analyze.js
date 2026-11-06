const MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";
const recentRequests = new Map();
function json(res, status, body) {
  res.status(status).setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  return res.send(JSON.stringify(body));
}
function extractText(payload) {
  if (typeof payload.output_text === "string") return payload.output_text;
  const parts = [];
  for (const step of payload.steps || []) for (const part of step.content || []) if (part.text) parts.push(part.text);
  if (parts.length) return parts.join("\n");
  for (const item of payload.output || []) for (const part of item.content || []) if (part.text) parts.push(part.text);
  return parts.join("\n");
}
function parseModelJson(text) {
  const first = text.indexOf("{"), last = text.lastIndexOf("}");
  if (first < 0 || last <= first) throw new Error("Gemini returned an unreadable response.");
  return JSON.parse(text.slice(first, last + 1));
}
module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Use POST." });
  const origin = req.headers.origin, host = req.headers.host;
  if (origin && host) {
    try { if (new URL(origin).host !== host) return json(res, 403, { error: "Cross-origin requests are not allowed." }); }
    catch { return json(res, 403, { error: "Invalid request origin." }); }
  }
  const expectedAccess = process.env.STUDIO_ACCESS_TOKEN;
  const suppliedAccess = String(req.headers["x-studio-access"] || "");
  if (!expectedAccess) return json(res, 503, { error: "Studio access is not configured. Add STUDIO_ACCESS_TOKEN in Vercel." });
  const crypto = require("crypto");
  const supplied = Buffer.from(suppliedAccess), expected = Buffer.from(expectedAccess);
  if (supplied.length !== expected.length || !crypto.timingSafeEqual(supplied, expected)) return json(res, 401, { error: "Enter the correct studio access code." });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return json(res, 503, { error: "Gemini is not configured yet. Add GEMINI_API_KEY in Vercel project environment variables." });
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  const now = Date.now(), previous = recentRequests.get(ip) || 0;
  if (now - previous < 15000) return json(res, 429, { error: "Please wait 15 seconds before another Gemini analysis." });
  recentRequests.set(ip, now);
  if (recentRequests.size > 500) for (const [key, time] of recentRequests) if (now - time > 60000) recentRequests.delete(key);
  const youtubeUrl = req.body && req.body.youtubeUrl;
  if (typeof youtubeUrl !== "string" || youtubeUrl.length > 500) return json(res, 400, { error: "Provide one public YouTube URL." });
  let parsed;
  try { parsed = new URL(youtubeUrl); } catch { return json(res, 400, { error: "Invalid YouTube URL." }); }
  const allowed = parsed.hostname === "youtu.be" || parsed.hostname === "youtube.com" || parsed.hostname.endsWith(".youtube.com");
  if (!allowed || !/^https?:$/.test(parsed.protocol)) return json(res, 400, { error: "Only public YouTube URLs are supported." });
  const videoId = parsed.hostname === "youtu.be" ? parsed.pathname.slice(1) : parsed.searchParams.get("v");
  if (!videoId || !/^[A-Za-z0-9_-]{11}$/.test(videoId)) return json(res, 400, { error: "Use a standard YouTube watch or youtu.be link." });
  const canonicalUrl = "https://www.youtube.com/watch?v=" + videoId;
  const prompt = [
    "Analyze this video for short-form vertical clips. Return ONLY valid JSON, no markdown, with this shape:",
    '{"clips":[{"title":"short label","startSeconds":12.0,"endSeconds":52.0,"reason":"why this moment works","hook":"a punchy opening hook","captions":["caption beat one","caption beat two"]}]}',
    "Find up to 5 distinct moments. Each must be 30 to 60 seconds, use accurate video timestamps, have a clear beginning and payoff, and work as a standalone short.",
    "Prefer surprising information, emotion, a strong opinion, a reveal, a useful tip, or a complete mini-story. Avoid intros, dead air, repeated moments, and invented events.",
    "Hooks must be concise and specific. Captions should be short readable paraphrase beats, not fabricated verbatim quotes.",
    'If no good moments exist, return {"clips":[]}.'
  ].join("\n");
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
      method: "POST",
      headers: { "x-goog-api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({ model: MODEL, input: [{ type: "video", uri: canonicalUrl }, { type: "text", text: prompt }] })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const detail = data.error && data.error.message ? data.error.message : "Gemini API request failed.";
      return json(res, response.status === 429 ? 429 : 502, { error: detail });
    }
    const result = parseModelJson(extractText(data));
    const clips = (Array.isArray(result.clips) ? result.clips : []).filter(clip => {
      const start = Number(clip.startSeconds), end = Number(clip.endSeconds);
      return Number.isFinite(start) && Number.isFinite(end) && start >= 0 && end > start && end - start >= 30 && end - start <= 60;
    }).slice(0, 5);
    return json(res, 200, { clips, model: MODEL });
  } catch (error) {
    return json(res, 502, { error: error.message || "Could not analyze this video." });
  }
};