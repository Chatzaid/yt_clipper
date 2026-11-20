## 2026-11-20 — Removed Scene 2 footer that collided with captions
- Removed the redundant `LOCAL REPAIR NEED → SURAT FEED → DIRECT ENQUIRY` footer. Frame inspection showed it physically colliding with the live Hindi caption line during the call-to-action beat.
- Kept the phone ad, local shop marker, route, and call CTA; the spoken narration and captions already communicate the journey, so the extra footer added clutter rather than information.
- Validation: exact source block removal checked; final frame geometry reviewed against the existing caption overlay. No TypeScript build or Remotion render was run; no GitHub Actions workflow was triggered.

## 2026-11-20 — Scene 2 quote and sponsored-ad reveals aligned to narration
- Moved the ₹200 customer quote reveal from local frame 44 to frame 159, matching the 19.3s spoken quote after the scene's 14.0s start; it clears at the 22.3s cue boundary.
- Delayed the sponsored repair ad from local frame 326 to frame 435 (28.5s), when the narration reaches Instagram/Facebook scrolling; the direct-call CTA remains timed to the 31.05s call line.
- Added a neutral feed-skeleton bridge between the phone's arrival and the sponsored creative so the screen does not sit empty while the narration describes people scrolling.
- Validation: checked scene-local frames against CaptionOverlay cue timestamps and Root.tsx's 420-frame scene start. No TypeScript build or Remotion render was run; no GitHub Actions workflow was triggered.

## 2026-11-20 — ROI and CTA compositions moved clear of the caption band
- Shifted the Scene 5 repair-economics composition upward so the three ad-spend tiles and illustrative qualifier no longer compete with the lower subtitle region.
- Compressed Scene 6's service work-order card to end above the caption-safe band, shortened the proof rows and CTA slightly, and removed the redundant low footer that sat behind captions.
- Kept the repair-work-order visual language, proof-point order, CTA wording, and all scene timing/audio cues unchanged.
- Validation: checked the source geometry against the 1080×1920 caption-safe region (content now ends above y=1220); no TypeScript build or Remotion render was run, and no GitHub Actions workflow was triggered.

## 2026-11-20 — Scene 2 price-race and social-feed reveal retimed
- Replaced the generic customer quote card with a repair-shop message slip and a visible ₹200 undercut stamp, making the margin-pressure beat read as a real customer interaction.
- Re-timed the quote to enter with the spoken bargaining line and clear before the social-feed visual begins; the old version showed the quote too early and let it overlap the ad-feed handoff.
- Staged the Surat repair-shop tile, connector route, sponsored local ad, and direct-call CTA so each appears in the order described by the narration.
- Kept the composition centred in the portrait safe area; raised the final sequence label to 430 px above the bottom edge so it clears the lower subtitle band.
- Validation: checked scene-local frame windows against Root.tsx's 420-frame scene start and the existing 15.65–34.65 second caption cues; fetched the updated source back from GitHub. No TypeScript build or Remotion render was run, and no GitHub Actions workflow was triggered.

## 2026-11-20 — shared-lead dispatch routes staggered by technician
- Changed the five orange branches from a simultaneous draw into a left-to-right dispatch sequence, with each technician card beginning its reveal as its route reaches the endpoint.
- Kept the original request ticket, Surat/Ring Road context, five technician cards, 180-frame composition, and lower caption-safe band intact.
- Validation: checked the stagger windows for all five paths and their matching card reveals; no TypeScript build or render was run, and no GitHub Actions workflow was triggered.

## 2026-11-20 — Scene 3 phase transitions de-overlapped
- Removed the 20-frame local-targeting/cross-city overlap and the 40-frame cross-city/service-radius overlap, which could stack two headings and two map stories during handoffs.
- Re-timed the three visual phases to fade out before the next phase fades in, keeping the shared street-map background visible as a clean transition bed.
- Preserved the 635-frame Scene 3 duration and the existing voiceover chapter window; no narration, captions, or audio assets were changed.
- Validation: sampled 16 transition frames and confirmed no adjacent phase opacity overlap; source fetched back after commit. No TypeScript build or render was run, and no GitHub Actions workflow was triggered.

# FixReach visual changelog

## 2026-11-20 — opening hook rebuilt as a shared-lead dispatch board
- Replaced the generic shared-lead card and loosely moving technician row with a single service-request ticket that visibly branches to five technicians.
- Added a consistent request ID, a clear `SHARED ×5` stamp, and matching `SAME REQUEST` labels so the viewer understands the competition at a glance.
- Animated the five dispatch routes and staggered technician arrivals; retained the Surat/Ring Road context and the existing orange/red problem-state palette.
- Kept the headline, ticket, route diagram, and technicians above the bottom caption band.
- Validation: source reviewed and fetched back after commit; no TypeScript build or render was run, and no GitHub Actions workflow was triggered.

## 2026-11-20 — direct enquiry flow rebuilt as a repair dispatch board
- Replaced the stacked generic WhatsApp/call cards with one customer request that branches into two real contact paths and reconverges at the shop's repair desk.
- Animated the message/call routes into a single shop destination so the visual explains the direct path rather than merely claiming there is no middleman.
- Delayed the no-price-race proof point until the matching narration beat, then revealed the exclusive-enquiry line near the end of the scene.
- Kept the full diagram inside the central portrait safe area, leaving the bottom caption band clear.
- Validation: source reviewed and fetched back after commit; no TypeScript build or render was run, and no GitHub Actions workflow was triggered.

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
