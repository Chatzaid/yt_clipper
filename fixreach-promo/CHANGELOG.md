# FixReach visual changelog

## 2026-11-20 — hyper-local targeting scene retimed and clarified
- Rebuilt Scene 3 as a three-beat sequence that follows the narration: local intent, the Varachha-to-Vesu cross-city travel example, then a clearly labelled 5 km core / 10 km outer service radius.
- Replaced the ambiguous radar-only graphic with a schematic street map, explicit distance rings, a shop-centred target, and a disclaimer that the radius must be set from the actual shop location.
- Timed the transitions to the existing caption cues so the cross-city route appears during the Varachha/Vesu line and the 5–10 km rings arrive with the radius explanation.
- Validation: reviewed the scene source and frame timing against the existing 32.99–54.17 second scene window; no TypeScript build or render was run, and no GitHub Actions workflow was triggered.

## 2026-11-20 — word-level caption highlight repaired
- Fixed the cue tokenizer to split on actual whitespace instead of the literal characters \\s, restoring per-word timing/highlight progression across Hindi captions.
- Trimmed cue edges and filtered empty tokens so extra spaces cannot skew the active-word calculation.
- Validation: inspected the committed source and exercised the whitespace split against representative Hindi caption text; no typecheck/render or GitHub Actions run was started.

## 2026-11-20 — ROI scene rebuilt as a repair-margin comparison
- Replaced the unlabeled rising-bar graphic with a service work-order visual connected to three daily ad-spend tiles, matching the voiceover's one-repair-versus-multiple-days explanation.
- Added an explicit illustrative-only label and a note that actual repair margins and ad costs vary; the scene does not invent rupee values or guaranteed returns.
- Kept the comparison and qualifier in the central safe area, above the bottom caption band.
- Validation note: source reviewed statically; no typecheck or render was run, and no GitHub Actions workflow was triggered.

## 2026-11-20 — CTA rebuilt as a service work order
- Replaced the generic circular logo end-card with a branded service-work-order layout.
- Added a restrained technical grid, numbered proof points, orange-to-green service stripe, and a single high-contrast next-step CTA.
- Kept the close aligned with the existing voiceover: link in bio, more local enquiries, and protecting the shop's service rate.
- Kept the primary card and the small footer above the subtitle safe zone; no important CTA copy sits behind captions.
- Validation note: source reviewed statically; a render/typecheck was intentionally not run in this automation pass to avoid starting GitHub Actions.
