# Caliber Concrete LLC — Website

Static marketing site (plain HTML/CSS/JS, no build step) for Logan Wiebe's residential concrete company in Gentry, AR. Local Service **type B** service website — built to rank for NWA concrete searches, then convert with calls and the estimate form.

**Status: v1 built 2026-10-09, revised through 2026-10-12. DEPLOYED 2026-10-20 to https://caliberconcrete.vercel.app as the client preview** (repo customleadz-sites/caliberconcrete, git repo lives inside `site/`, Vercel project `caliberconcrete` under team custom-leadz, GitHub-connected so a push to `main` auto-deploys). Still a staging URL: form key is a placeholder and stock photos remain.

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

## The logo is an inline SVG, not an image
We could not get the original logo file — `../assets/logo/actual logo 3.jpg` is an embossed mockup and a pixel cutout came out ragged. The wordmark is rebuilt as inline SVG inside `.brand` and `.footer__logo` (text in Chakra Petch + a drawn bullet + boxed LLC). It recolors via CSS variables `--logo-primary` / `--logo-secondary`, which is how the footer gets the light version. If Logan ever sends a real PNG/SVG, swap the SVG for an `<img>` in the header/footer of every page.

## Photos
- **Real (his):** `images/work/` — one stamped patio job (3 angles) + one fresh slab, WebP with `-sm` variants. Originals in `../assets/photos/`.
- **PLACEHOLDERS (Pexels, swap ASAP):** `images/stock/` — driveway, sidewalk, crew, power trowel, and the "owner" photo on About. Sources listed in `../assets/stock-placeholders/SOURCES.txt`. Every placeholder use is in `images/stock/`; grep `images/stock/` to find them all. The About photo is labelled "Placeholder" on the page itself — remove that note when the real photo goes in.

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
Everything (canonicals, og:url, sitemap, robots, JSON-LD) points at the **staging URL `https://caliberconcrete.vercel.app`** so nothing points at a domain that doesn't resolve. When Logan buys the domain (recommended: `caliberconcretenwa.com`, available as of 2026-10-08), find-and-replace `caliberconcrete.vercel.app` → the real domain across all `.html`, `sitemap.xml` and `robots.txt`.

## Preview locally
Double-click **`Preview Site.command`** (gitignored). It uses port 8765 and automatically moves to the next free port if another site's preview is already running — read the port in the terminal window it opens.

## Editing
Pages are plain HTML — edit them directly. They were first generated from `../tools/build-pages.py` (shared header/footer/NAP in one place); re-running that script **overwrites every page**, so only use it if you're changing the shared chrome everywhere and haven't hand-edited pages since.

Cache-busting: `css/styles.css?v=N` and `js/site.js?v=N` — bump N in every page when those files change.

## Deploy (when Kennedy says go)
Read the **git-deploy** skill first. Repo under **customleadz-sites**, Vercel project `caliberconcrete` → `caliberconcrete.vercel.app` (no hyphens). Zero config; `vercel.json` has cleanUrls + cache headers. Stage specific files — never `git add -A` from the client folder.

## Before launch checklist
- [ ] Real Web3Forms key + one live test submission
- [ ] Swap placeholder photos in `images/stock/` (at least the About photo)
- [ ] Facebook page URL + Google Business Profile URL into footer/contact/JSON-LD
- [ ] Domain bought → replace staging URL everywhere
- [ ] Run `Website Structure/seo-launch-audit.md` (target 85+), save scorecard in the client folder
- [ ] GA4 property + tag if Kennedy wants analytics
