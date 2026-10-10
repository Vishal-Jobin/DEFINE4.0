# Fling — Lost & Found Prototype

A responsive plain HTML/CSS/JavaScript prototype using a Solarized Dark palette and Material 3-inspired controls. No frontend framework or build step is required.

## Run locally

Serve the folder from an HTTP origin before opening it. This lets the map provider receive the page referrer required by its tile usage policy. For example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Included
- Expandable community profiles with public listing history and active/returned statistics.
- Interactive map selector in the potentially lost-item report dialog, saving selected coordinates with the report.

- The latest uploaded white SVG is used as the Fling launch-button logo in `fling-logo.svg`.
- The uploaded white F illustration is used inside the squircle brand marks beside “fling” in the header and login screen (`brand-f.svg`).

- Demo login screen with two one-tap demo profiles (Asha Menon and Arjun Nair), plus a local profile saved in `localStorage`.
- Minimal landing hero with “Tap to Fling”, the subheading “fling to find a lost item”, and a prominent central Fling button.
- Animated create/edit bottom sheet with multi-photo previews, reward, description, manual location entry, and an embedded Leaflet/OpenStreetMap map where users can click to pin the last-seen location. Selected coordinates are stored with the listing when available.
- My Flings cards offer Edit and Delete only. When an item is returned, delete its listing; there is no Mark returned action.
- Find listings with search, distance/reward filters, sorting, and a single “View details” action. Find and My Flings feeds use compact cards without map embeds; maps are shown on each listing’s details page.
- Listing details with an embedded OpenStreetMap/Leaflet map, abuse reporting, and a contact action that starts a chat.
- Past chats accessible from the persistent chat icon in the top bar, next to the profile button (hidden while an active conversation is open).
- Local persistence for listings, profile, reports, and chat messages.
- A potentially lost-item reporting workflow with optional photo and browser-based object detection to suggest the item name and a natural starter description, plus location/details, per-account report management, status updates (new / being checked / resolved), editing, and deletion. Reports are saved locally and do not create public listings.
- Reports tab search across item name, description and location; status filtering; newest/oldest and alphabetical sorting.
- Custom Solarized Dark dropdown menus for sort, filter, location choice, abuse-report reason, and report status controls, with keyboard navigation and viewport-aware opening direction. The potentially lost-item photo chooser uses a themed button and filename preview instead of a raw browser file-input button.
- Bottom navigation with Lost, Find, and Reports tabs; listing details and chats keep Find selected.
- Dedicated Reports tab for submitting, viewing, editing, status-updating, and deleting potentially lost-item reports.

- Expandable community profiles with listing-history cards and live counts for total, active, and returned listings.

## Important prototype limitations

Authentication is a local demo sign-in, not secure account authentication. Listings, reports, and chat messages are stored in the current browser only; the shared reports board is visible to both demo logins and synchronizes across tabs on the same origin, but data is not synchronized across devices. To make this a real multi-user app, connect a hosted backend such as Supabase for authentication, database records, image storage, and realtime messaging. Listing detail pages show a location map. The Start a Fling form includes an interactive map that requires an internet connection for Leaflet and OpenStreetMap tiles. It uses the documented `https://tile.openstreetmap.org/{z}/{x}/{y}.png` endpoint and visible attribution; run the app over HTTP/HTTPS rather than opening it through `file://`. Place-name lookup uses the OpenStreetMap Nominatim service.

## Deploy to Vercel

Import the folder/repository into Vercel as a static site. No build command is needed; set the output directory to the project root (or leave the static defaults).

## Image recognition note

Image recognition runs in the browser for both Start a Fling photos and potentially-lost report photos using TensorFlow.js and the COCO-SSD object-detection model, loaded on demand from jsDelivr the first time a photo is uploaded. The sheet grab handle can be tapped to expand/collapse, dragged upward to expand, or dragged down to close. It can identify some common object categories, not every item or fine-grained attributes. Please review the suggested name and description before posting. The selected image is processed in the browser rather than uploaded to an image-analysis API. An internet connection is needed to download the model.


## Potentially lost-item claims

- Community members can choose **I think this is mine** on an unresolved potential-lost report.
- A short claim message creates a claim chat and is saved to the shared report record.
- The reporter sees **Claim requests** on their report and can open the chat to follow up.
- Claimants can reopen their claim conversation from the report card. Messages include sender identity for switching between the two demo profiles in the same browser.
- Reports search/sort/filter dropdown controls highlight the complete outer control and keep the chevron inside the sort/filter box.

Claim chats and reports use browser `localStorage` in this prototype. This is for demonstration only; use an authenticated backend for secure multi-user access across devices.

## Demo-account behavior

- Asha Menon and Arjun Nair have separate personal **My Flings** lists, stored under an account-specific localStorage key.
- A user's own listings are added to the shared Find feed for the other account; they are hidden from that user's own Find results. Editing or deleting an owned fling updates/removes only that user's public listing.
- Public potentially-lost reports remain a shared community board. The reporter controls editing, deletion, and status; each account has its own claim action, while a claim conversation is shared only between its participants.
- Chat history is stored as shared conversation records but each account only sees conversations in which it is a participant. Switching demo accounts refreshes the personal list and badge.
- This is still a same-browser prototype using localStorage, not real authentication or cross-device synchronization. For real online account separation and shared chats, use a backend with authenticated ownership checks.


## Demo admin moderation console

Use the **Admin sign in** entry on the login screen to open the moderation console.

- Email: `moderator@fling.demo`
- Password: `FlingMod#2026`

The console includes a seeded abuse-report queue, search, status filters, newest/oldest sorting, moderator notes, review/dismiss/reopen actions, and a remove-listing action. Removing a listing removes it from demo community feeds and account listing arrays while preserving the abuse report record as an actioned moderation case.

**Security limitation:** This is a frontend-only demo. The demo credential is present in client JavaScript and is not secure authentication. Do not use this for real moderation or expose private reporter details in production. A deployed app needs server-side admin authentication and authorization, plus audited moderation actions in a backend such as Supabase with appropriate row-level security.
