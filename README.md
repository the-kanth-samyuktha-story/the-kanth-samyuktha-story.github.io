# The Story of Kanth ♥ Samyuktha

A traditional Indian, cinematic engagement invitation built with Next.js, React, TypeScript, Motion for React, and custom CSS. Created in `/home/surya/personal2`.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000 or the computer's LAN address on port 3000. The development and production commands bind to `0.0.0.0` for access from your network.

```sh
npm run build
npm start
```

## Confirmed content

- Chandra Kanth and Samyuktha
- Engagement Invitation
- Thursday, 12 November 2026, at 10:30 AM IST
- Gopalraopet, Medak, Telangana, India
- Invited by Thodupunuri Prabhakar and Thodupunuri Amrutha
- Maps link: https://googlemaps.com (the exact link provided; replace it with a venue-specific link if desired)
- Designed and developed with ♥ by Surya Teja Gupta

Edit `lib/invitation.ts` to change the content. The visual date components derive from `startsAt` in the Asia/Kolkata timezone. Keep `date` and `time` in sync if changing it. Update `public/engagement.ics` and re-render the film captions when changing event information. Calendar download uses 05:00 UTC, equivalent to 10:30 AM IST, and intentionally specifies no invented event end time. RSVP appears only after a real HTTPS destination is supplied.

## Experience

The main invitation is a continuous full-screen sticky scene. Actual scroll progress drives the camera zoom, vertical movement, crossfades between the temple and ceremonial rings, and the timing of four text chapters. Chapter dots jump to their corresponding scroll positions. No scroll hijacking or required autoplay is used. A separate playable MP4 presents the artwork with camera movement, transitions, and the event details.

The supporting Pinterest-inspired editorial arrangement uses staggered image proportions, a floral arch crop, ceremonial rings, gold, jasmine, burgundy silk, and traditional Indian attire. The final invitation contains the complete details, an external maps link, and a downloadable calendar event. All former Western wedding media is unused by the current site.

Reduced motion uses a stationary opening and the complete accessible invitation below it, without the prolonged scroll timeline. Petals can be paused independently. The film dialog uses native keyboard focus management, Escape dismissal, native video controls, and muted inline playback. No background videos or sound start without clicking “Play invitation.” The film is a silent illustrated invitation, not footage of the actual couple or venue.

## Artwork and film

Three original artworks were generated using the built-in Imagegen tool, inspired by the supplied reference screenshots:

- `public/media/indian/temple-portrait.png` and `.webp`
- `public/media/indian/temple-landscape.png` and `.webp`
- `public/media/indian/engagement-ritual.png` and `.webp`

These are AI-generated cinematic illustrations, not photos of the couple or a verified depiction of the event venue. PNG originals are preserved. Optimized WebP copies are served on the page, with distinct portrait/landscape art direction. See `ART_DIRECTION.md` for the final generation prompts.

`public/media/indian/invitation-film.mp4` is rendered from these artworks with separate caption layers. To regenerate it, install Pillow and imageio-ffmpeg in a Python environment, edit the caption scenes in `scripts/render-film.py`, and run:

```sh
python3 scripts/render-film.py
```

The film uses H.264, crossfades, and fast-start metadata for browser playback. Its duration is approximately 21 seconds. No audio has been added.

Typography: locally served Cormorant Garamond, DM Sans, and Pinyon Script. SIL Open Font License files are in `public/fonts/`.

## Verification

Production build and TypeScript checks pass. The page, new artwork, calendar event, and film are checked over HTTP, including video byte-range requests. The calendar timezone and event date are checked against the supplied details. The final film is decoded to confirm it is playable.

No connected browser is available in this environment. Actual desktop/mobile visual and interaction verification remains outstanding. Check the invitation at 1440px, 768px, 390px, and 320px widths; scroll forward and backward through all chapters; test scene navigation, film controls, Escape dismissal, map link, calendar download, pause-petals control, and reduced motion.

The invitation is local only. Search indexing remains disabled while the site is being reviewed.
