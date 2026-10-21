# Caliber Concrete LLC — Website

Static marketing site (plain HTML/CSS/JS, no build step) for Logan Wiebe's residential concrete company in Gentry, AR. Local Service **type B** service website — built to rank for NWA concrete searches, then convert with calls and the estimate form.

**Status: live preview at https://caliberconcrete.vercel.app (deployed 2026-10-20). Round-2 revisions from Logan's 2026-10-20 call are BUILT LOCALLY (2026-10-21) and NOT pushed yet — Kennedy reviews at localhost first.** Repo customleadz-sites/caliberconcrete, git repo lives inside `site/`, Vercel project `caliberconcrete` under team custom-leadz, GitHub-connected so **a push to `main` auto-deploys** — don't push until Kennedy says go. Form key is still a placeholder.

## Pages (13)
| File | URL | What |
|---|---|---|
| `index.html` | `/` | Home — hero, trust strip, 4 service rows, Why Caliber, process, completed-jobs teaser, reviews slot, service area, FAQ |
| `services.html` | `/services` | Services hub + "what we don't do" |
| `driveways.html` | `/driveways` | Driveways & approaches (≈1,000 words) |
| `patios.html` | `/patios` | Patios (≈900 words) |
| `sidewalks.html` | `/sidewalks` | Sidewalks, walkways, steps, small slabs (≈780 words) |
| `stamped-decorative.html` | `/stamped-decorative` | Stamped & colored concrete (≈800 words) |
| `completed-jobs.html` | `/completed-jobs` | Project write-ups with lightbox galleries (Logan's "Completed Jobs" idea) |
| `about.html` | `/about` | Logan's story, how he runs a job |
| `service-area.html` | `/service-area` | Leaflet map (OpenStreetMap tiles, dark filter) + town list |
| `contact.html` | `/contact` | Estimate form + contact details |
| `thank-you.html` | `/thank-you` | Form redirect target (noindex) |
| `privacy.html` | `/privacy` | Privacy policy |
| `404.html` | — | Custom 404 with phone + links |

## Brand (from his logo + letterpress business card — `../info/brand-notes.md`)
- Navy `#0D335C`, steel gray `#979697`, near-black `#14181F` sections, paper `#F4F2EE`. **No orange, red, or bright white** (Logan's rule).
- **Chakra Petch** headings (closest match to the chamfered logo type), **Cinzel** eyebrow labels, **EB Garamond** body + italic accents — mirrors the industrial-logo-plus-letterpress pairing on his card.
- Chamfered corners on buttons/cards/images echo the big "C" in the logo. The bullet from the logo is the list marker in "Why Caliber".
- Layout follows cmiconstruction.com (the reference he loved): dark-overlay photo hero, scroll-reveal sections, alternating photo-card/text service rows, dark band, photo grid, single testimonial, contact block. No text-over-photo sections mid-page (what he disliked on Milestone).

## The logo is an inline SVG traced from the mockup
Master vector: `../assets/logo/vector/caliber-concrete-logo.svg` (+ 2400px navy and white PNGs). It was traced 2026-10-21 from `../assets/logo/actual logo 3.jpg` with `../assets/logo/vector/trace-from-mockup.py` (colour masks → potrace → every edge snapped to 0/45/90°, bullet drawn by hand from row measurements), then compared against the mockup over six rounds until the letterforms matched. The same paths are inlined in `.brand` and `.footer__logo` on every page (and in `tools/build-pages.py`), recolored via `--logo-primary` / `--logo-secondary`. The bullet from the logo is also the `.bullets` list marker on the home page, and the big C is the favicon (`images/favicon.svg`, `favicon.ico`, `apple-touch-icon.png` — white background, navy C). If Logan sends the designer's original vector, diff it against ours and swap if it's cleaner.

## Photos
- **Real (his):** `images/work/` — one stamped patio job (3 angles) + one fresh slab, WebP with `-sm` variants. Originals in `../assets/photos/`.
- **Holdeman Concrete photos (approved):** `images/photos/` — 17 job photos from `clients/Holdeman Concrete/assets/photos/`, used with Holdeman's permission (Kennedy, 2026-10-21) as stand-ins until Logan has his own. Re-encoded to WebP with all EXIF/GPS stripped and renamed by subject. They appear on the home page service rows, services hub, the four service-page heroes and in-body photo pairs, service-area hero, and the About page (hero + the "owner" slot, which is a Holdeman finisher, not Logan — swap when Logan sends his photo). They are deliberately NOT on Completed Jobs, which stays Logan's own work only.
- `images/stock/` (old Pexels placeholders) is no longer referenced by any page. Kept on disk so cached pages don't 404; delete after launch.

## Contact form — NOT CONNECTED YET
`contact.html` posts to Web3Forms but the access key is the placeholder `YOUR_WEB3FORMS_ACCESS_KEY`. Until it's replaced the JS skips sending and just shows `/thank-you` so the flow can be reviewed. **To go live:** create a Web3Forms key for `caliberconcretellcnwa@gmail.com`, paste it into the hidden `access_key` input, submit the form once as a live test. Spam protection: honeypot `botcheck` field + US-phone validation + Web3Forms filtering (same setup as North Shade Lawn).

## Deliberately NOT on the site (Kennedy / Logan decisions)
- **No cost or pricing sections anywhere** (Kennedy, 2026-10-09).
- No concrete repair, commercial, exposed aggregate, financing. **Foundations are deliberately NOT mentioned either way** (Kennedy 2026-10-12: Logan will likely add them soon, so the site must not say he doesn't do them).
- No reviews, review counts, years-in-business, job counts — none exist yet. The reviews slot on the home page says so honestly; fill it when real reviews arrive.
- No Facebook link yet (page exists as "Caliber Concrete LLC" but URL not provided). Add to footer/contact + JSON-LD `sameAs` when he sends it.
- No Google Business Profile link yet — same.
- No analytics / Ads tags (noted in each page's `<head>`).

## Claims that ARE on the site and are true per his intake
Licensed and insured (not bonded); owner on every job; free written estimates after a pre-qualification call; warranty option when the customer goes with the recommended prep; full cleanup; start usually within about a week.

## Domain / canonicals
**caliberconcretenwa.com** — bought by Kennedy 2026-10-20 at Squarespace Domains. Added to the Vercel project (apex + www) 2026-10-21. Canonicals, og:url, sitemap, robots and JSON-LD all point at `https://caliberconcretenwa.com`. **DNS still to do at Squarespace:** `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com`; Vercel issues the SSL cert automatically once it sees the record. Until DNS is set the site is only reachable at caliberconcrete.vercel.app.

## Preview locally
Double-click **`Preview Site.command`** (gitignored). It uses port 8765 and automatically moves to the next free port if another site's preview is already running — read the port in the terminal window it opens.

## Editing
Pages are plain HTML — edit them directly. They were first generated from `../tools/build-pages.py` (shared header/footer/NAP in one place); re-running that script **overwrites every page**, so only use it if you're changing the shared chrome everywhere and haven't hand-edited pages since.

Cache-busting: `css/styles.css?v=N` and `js/site.js?v=N` — bump N in every page when those files change.

## Deploy (when Kennedy says go)
Read the **git-deploy** skill first. Repo under **customleadz-sites**, Vercel project `caliberconcrete` → `caliberconcrete.vercel.app` (no hyphens). Zero config; `vercel.json` has cleanUrls + cache headers. Stage specific files — never `git add -A` from the client folder.

## Decisions from Logan's review call (2026-10-20, transcript in `../recordings/`)
Reviews section removed from home until he has 3–4 real reviews · sticky right column removed from the four service pages (full-width article + photo pairs instead) · "35 miles" paragraph removed from service area · map is a polygon that stops at the Oklahoma line, not a circle (Logan avoids Oklahoma jobs) · contact form lost the "Finish" dropdown and the "What happens next" box (type of job, rough size and timeframe stay) · favicon = white with navy C · hero services line uses vertical bars, italics kept · "Shop Slabs" stays in the hero line on purpose (rank for it before offering it).

## Before launch checklist
- [ ] Kennedy reviews round-2 locally → push to main (auto-deploys)
- [ ] DNS at Squarespace (A + CNAME above) → check https://caliberconcretenwa.com
- [ ] Real Web3Forms key + one live test submission
- [ ] Logan's own photos: About (owner), then replace Holdeman stand-ins over time
- [ ] Logan's designer logo files (Fiverr) if they turn up — compare with our trace
- [ ] Facebook page URL + Google Business Profile URL into footer/contact/JSON-LD
- [ ] Business email: Logan may move to logan@caliberconcretenwa.com — update contact/footer/JSON-LD when he does
- [ ] Run `Website Structure/seo-launch-audit.md` (target 85+), save scorecard in the client folder
- [ ] GA4 property + tag if Kennedy wants analytics
