# BANK-GRADE WEBSITE LEGITIMACY AUDIT — ARGANA MEDIA

> **Review committee:** Mercury Compliance & Risk · Wise Business Verification · Stripe Risk · Senior UX/UI & Product Design · Senior Frontend · Branding · Startup Due Diligence · YC Reviewers
> **Subject:** `arg-md.vercel.app` (brand: *ARGANA MEDIA*, claimed domain: *arganamedia.co.uk*), Company No. **17296255**, England & Wales.
> **Scope:** Full repository + rendered output. **Read-only audit — no code was changed and no commits were made.**
> **Method note:** This audit is based on the source repository and its rendered output. It was not run against live production screenshots; where production behaviour depends on environment variables (e.g. canonical URLs), that is called out explicitly.

---

## ⚠️ ONE-LINE SUMMARY FOR THE COMMITTEE

> The site **looks** like a premium agency, but **reads** like a brand-new, pre-revenue shell: the live URL is a `vercel.app` subdomain (not the company domain), the portfolio openly says **"placeholder project types"** over **AI-generated mockups that contain a *different, fake* company's brand ("NEXORA")**, there are **zero clients, testimonials, team members or case studies**, and the homepage renders **entirely client-side** (search engines and screen readers see a blank page). It is *visually* convincing and *operationally* unproven.

---

# EXECUTIVE SUMMARY

### Scores

| Dimension | Score | Notes |
|---|---:|---|
| **Overall** | **61 / 100** | Strong shell, weak substance/proof |
| Professionalism (visual craft) | 82 / 100 | Genuinely premium dark UI |
| Trust / Credibility | 44 / 100 | No social proof, placeholder portfolio, domain mismatch |
| Investor confidence | 38 / 100 | No traction, team, or case studies |
| Premium-agency perception | 71 / 100 | Looks premium until you read the proof sections |
| **AI-Slop score (lower = better)** | **52 / 100** | Copy is largely human-grade; **images and "proof" are AI/placeholder** |

### Approval confidence (website-only, before fixes)

| Provider | Confidence | Rationale |
|---|---:|---|
| **Mercury** | **~50%** | Registered Ltd + coherent services help; **vercel.app domain, fake-brand portfolio images, no operating proof** are flags. Likely "more info requested." |
| **Wise Business** | **~55%** | Similar; Wise leans on Companies House + matching domain + contactability. Domain/email not on the brand domain hurts. |
| **Stripe** | **~62%** | Stripe cares about a clear, legal, non-prohibited business with legal pages — those exist. Placeholder portfolio is less fatal to Stripe than to Mercury. |
| **Investor due diligence** | **~25%** | No traction, no team, no case studies, no metrics. |

> After the Priority-1 fixes in this report, all of the above realistically move to **85–95%**.

### TOP 20 CRITICAL ISSUES (ranked)

1. **Live site is on `arg-md.vercel.app`, not `arganamedia.co.uk`.** The company's entire identity (emails `@arganamedia.co.uk`, "portal.arganamedia.co.uk") points to a domain the public site does not run on. **#1 reason a compliance reviewer rejects or pauses.**
2. **Portfolio is explicitly labelled placeholder** — `app/(public)/portfolio/page.tsx` and the homepage both literally say *"Placeholder project types shown — real case studies are shared on request."* This screams "no real work yet."
3. **Portfolio/service images are AI-generated and contain a *fabricated third-party brand*.** `public/service_brand_website.png` shows a laptop mock with the brand **"NEXORA"** and *"Building the future with digital experience."* Presenting another (fake) company's branding as your "work" is a misrepresentation red flag.
4. **No clients, no testimonials, no logos, no case studies, no named team, no founder.** Zero third-party validation anywhere on the site.
5. **Homepage renders entirely client-side via `innerHTML`** (`components/marketing/argana-landing.tsx` → `root.innerHTML = pageHTML()`). The server HTML body is an empty `<div class="am-root">`. **Search engines, social scrapers, and screen readers see no homepage content.** Catastrophic for SEO and accessibility on your most important page.
6. **Home pricing contradicts service-page pricing.** Homepage packages: *"Digital Presence from £750"*, *"Website & Content from £1,800"*. Service page (`/website-app`): *"Starter Website from £1,500"*, *"Business Website from £3,800"*. Same offering, **2 different prices** → looks unfinished/untrustworthy.
7. **`siteConfig.url` falls back to `http://localhost:3000`** (`config/site.ts`). If `NEXT_PUBLIC_APP_URL` is unset in Vercel, **every canonical URL, OG URL, sitemap entry, and JSON-LD `url`** points to `localhost:3000`.
8. **Seeded production admin credentials.** The DB seed creates `admin@arganamedia.co.uk / Admin123!` (+ support/client). If the live Supabase DB is seeded (it is), these are **public default credentials to a real admin panel.**
9. **Company phone is a personal-style UK mobile** (`+44 7882 737419`, i.e. `07882…`). No landline/VoIP. Reads as a one-person operation, not an agency.
10. **Professional emails may be non-deliverable.** `hello@/support@/billing@arganamedia.co.uk` are advertised, but if `arganamedia.co.uk` has no live site/MX (the public site is on vercel.app), reviewers cannot verify contactability.
11. **Homepage "Client Portal" preview shows fabricated data** (`portal.arganamedia.co.uk`, "£480.00 Paid", "Website redesign 70%", ticket "#2041"). A mockup is fine, but combined with everything else it reads as fake operations.
12. **Legacy hosting-product orphan routes still ship**: `/data-centers`, `/status`, `/sla`, `/compare`, `/affiliate`, `/abuse`, `/dmca`, `/knowledge-base`, `/security`, `/pricing` (mostly `redirect()` to `/hosting-website-care`). A *media agency* exposing `/data-centers`, `/sla`, `/status`, `/affiliate` URLs is a leftover-template tell and pollutes crawl/indexing.
13. **~30 MB of imagery.** Service PNGs are 3.3–4.0 MB each; portfolio PNGs 2.7–5.1 MB each; logo 925 KB. Mobile users on the homepage + portfolio load multi-megabyte payloads. Severe Core Web Vitals / LCP problem.
14. **`ogImage: "/og.png"` references a file that does not exist** in `public/` (mitigated by the dynamic `app/opengraph-image.tsx`, but the dangling reference is sloppy and used as a metadata default).
15. **No real "About the people".** About page is well-written but is all abstractions — "one team", "registered UK company" — with **no human faces, names, roles, or photos.** Due-diligence reviewers want to see *who* is behind the company.
16. **Founded 2025 + "small specialist team" + zero proof** = "very new, unproven." Not falsifiable, but every other weak signal compounds it.
17. **Fonts loaded at runtime from a third-party CDN** (Fontshare) inside the homepage component. Adds a render dependency/FOUT and a third-party request on the critical path.
18. **Low-contrast text fails WCAG AA** in multiple places (e.g. footer micro-text `#54607A` on `#060912`, muted greys on near-black). Accessibility + "cheap" feel.
19. **The domain-search "Find your perfect domain" feature** sits oddly on a *media/marketing* agency homepage — it's a hosting-company artefact. Not wrong, but it muddies "what does this company actually do."
20. **No trust badges / verifiable proof anywhere**: no Companies House link, no Cyber Essentials/ISO, no payment-security badges at checkout, no "as featured in", no Trustpilot/Google rating.

---

# CRITICAL ISSUES (full detail)

### C-1 — Production domain mismatch (`vercel.app` vs `arganamedia.co.uk`)
- **Location:** Deployment (`arg-md.vercel.app`) vs `config/brand.ts` (`domain: "arganamedia.co.uk"`, all emails `@arganamedia.co.uk`), homepage portal mock (`portal.arganamedia.co.uk`).
- **Why it matters:** Mercury/Wise verification routinely cross-checks the company name → website → email domain. A business whose *public website is on a free platform subdomain* while claiming a `.co.uk` brand domain looks either unfinished or evasive. It also breaks email-domain trust (DMARC/SPF can't be assessed on a domain with no live site).
- **Severity:** 🔴 Critical (compliance blocker).
- **Fix:** Point `arganamedia.co.uk` at this deployment, set it as the Vercel primary domain, configure MX for the mailboxes, and set `NEXT_PUBLIC_APP_URL=https://arganamedia.co.uk`.

### C-2 — Portfolio is self-declared "placeholder"
- **Location:** `app/(public)/portfolio/page.tsx` (`"Placeholder project types shown — real case studies are shared on request."`, `"Real case studies are shared on request — just ask on your call."`), and the homepage portfolio caption (`argana-landing.tsx`: *"Placeholder project types shown — real case studies are shared on request."*).
- **Why it matters:** You are telling reviewers, clients, and investors in writing that you have **no real work to show**. This is the single most damaging credibility statement on the site.
- **Severity:** 🔴 Critical.
- **Fix:** Replace with **2–4 real, named case studies** (even small/pro-bono/own-brand projects), with real screenshots, scope, and a one-line result. If you genuinely have none yet, reframe as **"Recent work"** using your *own* brand build + a clearly-labelled "concept" project — and **remove the word "placeholder".**

### C-3 — AI-generated imagery containing a *fake third-party brand*
- **Location:** `public/service_brand_website.png` (visible brand **"NEXORA"**, copy *"Building the future with digital experience"*), and by extension the other AI device-mock PNGs in `public/` and `public/portfolio/`.
- **Why it matters:** (a) The images are obviously AI-rendered stock; (b) one displays a **fabricated company's branding ("NEXORA")** as if it were your portfolio. A reviewer who reverse-images or simply *reads* the mock sees a brand that isn't yours. This crosses from "generic" into "**misleading**."
- **Severity:** 🔴 Critical (authenticity/misrepresentation).
- **Fix:** Replace with screenshots of **real work**, or with abstract, brandless, on-palette graphics (see *Image Improvements*). Never show a third party's (real or invented) brand as your portfolio.

### C-4 — No social proof of any kind
- **Location:** Entire site. Confirmed: no `testimonial` component, no client-logo strip, no team/founder section, no reviews.
- **Why it matters:** Trust is built on third-party validation. With none, every claim is self-asserted.
- **Severity:** 🔴 Critical.
- **Fix:** Add (in priority order) — 1 founder/team block with a real name + photo + LinkedIn; 2–3 testimonials (even from early/pilot clients or collaborators); a "trusted tools we build on" logo strip (WordPress, Shopify, Google, Meta, Stripe) as an honest interim; a Companies House badge/link.

### C-5 — Homepage content is invisible without JavaScript (innerHTML render)
- **Location:** `components/marketing/argana-landing.tsx` — `useEffect(() => { root.innerHTML = pageHTML(); ... })`. SSR output is `<style>…</style><div class="am-root"></div>`.
- **Why it matters:** The H1, hero copy, services, pricing, CTAs — **none are in the server HTML.** Social/link unfurlers (LinkedIn, WhatsApp, Slack), no-JS crawlers, and assistive tech get an empty page. Google *can* render JS but penalises this pattern; you are gambling your most important page's SEO.
- **Severity:** 🔴 Critical (SEO + accessibility).
- **Fix:** Server-render the homepage as real JSX (the rest of the site already does via `amx-ui`). At minimum, render the hero `<h1>`, sub, and primary CTA server-side.

### C-6 — Conflicting prices (home vs service pages)
- **Location:** Homepage `packages` (`argana-landing.tsx`): *Digital Presence £750 / Website & Content £1,800 / Digital Growth £900/mo / Website Care £49/mo*. Service pages (`config/services-content.ts`): *Starter Website £1,500 / Business Website £3,800 / E-commerce £4,500 / Care £49–£179/mo*.
- **Why it matters:** A prospect comparing the homepage to `/website-app` sees the *same* product at *two different prices*. That is the kind of inconsistency that makes buyers (and reviewers) assume the numbers are made up.
- **Severity:** 🔴 Critical (consistency/trust).
- **Fix:** Make the homepage "from" prices match the service-page packages exactly, or remove explicit prices from the homepage and link to the service pages.

### C-7 — Canonical/OG/sitemap URLs default to localhost
- **Location:** `config/site.ts` → `url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"`; consumed by `app/layout.tsx` `metadataBase`, `lib/seo` `pageMetadata`, `app/sitemap.ts`, JSON-LD.
- **Why it matters:** If `NEXT_PUBLIC_APP_URL` isn't set in Vercel, all canonical tags, `og:url`, sitemap `<loc>` and structured-data URLs are `http://localhost:3000` — broken for SEO and embarrassing when shared.
- **Severity:** 🔴 Critical (if env unset) / 🟠 (if set).
- **Fix:** Set `NEXT_PUBLIC_APP_URL=https://arganamedia.co.uk` in Vercel (Production + Preview).

### C-8 — Default admin credentials seeded into the live database
- **Location:** `prisma/seed.ts` (`admin@arganamedia.co.uk / Admin123!`, `support@… / Support123!`, `client@example.com / Customer123!`).
- **Why it matters:** These were seeded into the live Supabase DB during setup. Anyone can log in to a real admin/dashboard with published default credentials. This is a security finding *and* a professionalism finding.
- **Severity:** 🔴 Critical (security).
- **Fix:** Change/rotate the admin password immediately, delete the demo `support`/`client` accounts, and never seed demo users into production.

---

# MEDIUM ISSUES

- **M-1 — Legacy orphan routes.** `app/(public)/{data-centers,status,sla,compare,affiliate,abuse,dmca,knowledge-base,security,pricing}` exist as `redirect()` stubs to `/hosting-website-care`. Not in nav, but indexable and conceptually wrong for an agency. *Fix:* delete the directories or return `notFound()`/410, and ensure they're excluded from the sitemap.
- **M-2 — Image weight (~30 MB total).** *Fix:* convert all PNG mocks to optimised WebP/AVIF at display resolution (target ≤150–250 KB each); use `next/image`.
- **M-3 — Client-portal mock with fabricated metrics** on the homepage (`£480.00 Paid`, project %s, `#2041`). *Fix:* keep the visual but label it clearly ("Illustration of your client portal") or use neutral/blank states.
- **M-4 — "Find your perfect domain" on a media-agency homepage** dilutes positioning. *Fix:* keep it on `/hosting-website-care` only, or reframe as "We'll sort your domain, email & hosting" without a live registrar search on the front page.
- **M-5 — Mobile-only phone number.** *Fix:* add a landline/VoIP (cheap via the same providers) or present hours + a callback option.
- **M-6 — Fonts from third-party CDN at runtime** (Fontshare) inside the homepage. *Fix:* self-host the fonts via `next/font/local` for performance, privacy (GDPR — third-party font CDN sets up a cross-origin request), and reliability.
- **M-7 — `og.png` missing** but referenced in `siteConfig.ogImage`. *Fix:* remove the reference or add a real `public/og.png` fallback.
- **M-8 — Two structurally-different navbars/footers** (the homepage ships its own inline copy; other pages use the React `amx-ui` port). They're visually aligned but duplicated, which risks drift. *Fix:* converge on one implementation.
- **M-9 — Blog is demo-seeded.** Posts come from the DB seed and read as generic starters. *Fix:* publish 3–5 genuinely useful, on-topic articles before launch; an empty/demo blog is worse than no blog.
- **M-10 — No `/team`, `/careers`, `/process` pages.** Agencies of substance have these. (See *Missing Pages*.)
- **M-11 — Stats are honest but thin** (`config/stats.ts`: "UK / Registered company / 6 services"). No "projects delivered", "clients", "years". Honest, but provides no momentum signal. *Fix:* add 2–3 *true* metrics as they become real.

---

# MINOR ISSUES

- Mn-1 — Microcopy "Made with care in the UK" is fine, but appears alongside "team across the UK and Europe" — make the geography story consistent.
- Mn-2 — Hero "heroCaps" chips (Content, Marketing, Websites, Design, Hosting, IT) are decorative and a touch generic.
- Mn-3 — The homepage portfolio cards link to `/portfolio` (good) but the cards aren't individually clickable to real case pages (because there are none yet).
- Mn-4 — Decorative `<canvas>` starfield runs `requestAnimationFrame` continuously; pauses are not tied to `prefers-reduced-motion` for the canvas (the CSS animations are, the canvas isn't). Minor a11y/perf.
- Mn-5 — Some buttons rely on JS-injected inline `onmouseover` handlers inside the homepage HTML string — brittle and bypasses the design system.
- Mn-6 — No favicon `.ico` (only `app/icon.png`); some legacy crawlers/embeds prefer an `.ico`.
- Mn-7 — Legal pages, while present, are templated; have a solicitor or at least a careful pass confirm the refund/acceptable-use terms match the *agency* model (some language may still be hosting-flavoured).
- Mn-8 — `config/company.ts` `teamSize: "Small specialist team"` is shown as a "fact" — vague facts read as filler.

---

# UX / UI IMPROVEMENTS

**Design verdict:** The dark, teal/gold premium aesthetic is genuinely strong — the best part of the project. The problems are *substance and consistency*, not taste.

1. **Hero (home):** server-render it; keep the visual. Add a single, *specific* value-prop sentence (replace the slightly generic "Build, Grow & Scale Your Digital Presence").
2. **Navbar:** unify the two implementations; ensure the mega-menu is keyboard-navigable and `aria-expanded` is set; current homepage nav is mouse-driven.
3. **Cards/sections:** consistent vertical rhythm is good; tighten the portfolio cards so they don't read as "stock gradient + AI image + tag."
4. **Buttons:** the gold primary / glass secondary system is consistent and premium — keep it. Ensure focus-visible rings on all (the JS-injected homepage buttons may lack them).
5. **Forms (contact / book-a-call):** add inline validation, success/error states that don't navigate away, and a privacy reassurance line near submit.
6. **Footer:** raise the micro-text contrast; group legal vs company clearly (already decent).
7. **Responsiveness:** verify the homepage hero image (`aspect-ratio:1920/1640`, `width:min(1560px,128vw)`) doesn't overflow on small devices; the multi-MB images will jank on mobile.
8. **Motion:** gate the canvas starfield on `prefers-reduced-motion`.
9. **Accessibility pass:** semantic landmarks on the homepage (currently one `<div>`), alt text on every image (the homepage `<img>` has empty alt — acceptable for the decorative hero, but the portfolio/service images need descriptive alts), color-contrast fixes, skip-link.

---

# BUSINESS-LEGITIMACY IMPROVEMENTS

1. **Get `arganamedia.co.uk` live** on this build with HTTPS + working email (the single highest-leverage action).
2. **Add a real "About the team" block** with at least the founder: real name, photo, one-paragraph bio, LinkedIn. People = legitimacy.
3. **Link Companies House** ("Registered in England & Wales — Company No. 17296255" → linked to the Companies House record).
4. **Replace placeholder portfolio** with real/own-brand case studies (see C-2).
5. **Add a "How we work" / process page** with a named methodology and timeline — operating businesses document their process.
6. **Add verifiable contact**: a landline/VoIP, a contact form that demonstrably emails, and ideally a Google Business Profile.
7. **Remove all demo/seed data** from production (accounts, demo blog, mock invoice).
8. **Consistent numbers everywhere** (pricing, geography, team).

---

# TRUST IMPROVEMENTS (missing trust signals — checklist)

| Trust signal | Present? | Action |
|---|:--:|---|
| Company registration number | ✅ (footer) | Link to Companies House |
| Registered office address | ✅ | Keep; add to Contact page map |
| Professional email | ⚠️ advertised | Make domain + MX live |
| Live brand domain | ❌ | **Critical** |
| Privacy / Terms / Cookie / Refund / AUP | ✅ | Legal review pass |
| GDPR / UK-GDPR statement | ✅ (privacy) | Keep; add cookie-consent verification |
| Client logos | ❌ | Add (or honest "tools we use") |
| Testimonials / reviews | ❌ | Add 2–3 real |
| Case studies | ❌ (placeholder) | Add 2–4 real |
| Named team / founder | ❌ | Add |
| Founder LinkedIn / personal socials | ❌ | Add |
| Company socials | ⚠️ LinkedIn only (X/GitHub empty) | Populate or remove empties |
| Awards / press / certifications | ❌ | Add when real (Cyber Essentials is cheap & credible for IT support) |
| Security/credibility badges | ❌ | Stripe badge at checkout, Cyber Essentials |
| Real statistics | ❌ | Add true metrics over time |
| Status/process transparency | ⚠️ | Add a process page |

---

# CONTENT IMPROVEMENTS (with replacement copy)

### Homepage portfolio caption
- **Current:** *"Placeholder project types shown — real case studies are shared on request."*
- **Problem:** Admits no real work.
- **Replace with (if you have ≥1 real/own project):** *"A selection of our recent work across web, brand, content and marketing. Want to see results for a business like yours? Ask on your call."*
- **If truly zero projects:** show your **own ARGANA MEDIA brand & site build** as Case Study #1: *"Case study: building the ARGANA MEDIA brand & website — strategy, identity, copy and a fast Next.js build."*

### Portfolio page hero
- **Current:** *"You've probably seen the kind of work we do…"* + "placeholder" note.
- **Replace with:** *"Selected work. We're a young studio building a public case-study library as projects go live — here's how we approach websites, brand, content and marketing, with real examples available on request."* (Honest about being new **without** the word "placeholder.")

### About page (add a human section)
- **Add a "Meet the team" block:** *"ARGANA MEDIA was founded by [Name] in 2025 to give growing businesses one accountable partner for everything online. [1–2 sentences of real story]."* + photo + LinkedIn.

### Hero subheadline (home)
- **Current:** generic "thrive online" line.
- **Sharper:** *"One UK & Europe team for your website, marketing, design, content and support — clear fixed quotes, real people, no agency runaround."*

### Pricing disclaimer (keep, it's good)
- *"Prices exclude VAT for UK clients. Every project is unique — your final quote is tailored to you."* — keep, but make the *numbers* consistent with the service pages.

---

# IMAGE IMPROVEMENTS (with generation prompts)

**Global verdict:** Every raster in `public/` is AI-generated, oversized (2.7–5 MB), and stock-feeling; one shows a **fake brand ("NEXORA")**. For a legitimacy audit these are a net negative. Prefer **real screenshots**. Where you must use generated art, use **abstract, brandless, on-palette** visuals and optimise hard.

**Universal optimisation:** export WebP/AVIF, ≤1600px wide, target ≤200 KB, serve via `next/image`.

### Portfolio / service cards — recommended replacements
- **Location:** `public/service_*.png`, `public/portfolio/*.png` (card top, ~16:9, rendered ~520×170–300).
- **Best fix:** real, anonymised project screenshots (blur client data). Failing that, brandless abstract art:

**Prompt — "Web & App" card (brandless):**
> Abstract dark UI concept art, deep navy `#070B14` background, a faint floating glassmorphic dashboard and browser frame rendered as translucent wireframes, thin teal `#35E0E8` and gold `#F3CD86` accent lines, soft volumetric glow, no text, no logos, no readable brand names, premium editorial tech aesthetic, subtle grain, 16:9, high detail, cinematic lighting. NO words, NO UI copy, NO company names.

**Prompt — "Digital Marketing" card:**
> Abstract growth/analytics motif on deep navy, rising particle trail forming an upward curve, faint map grid and location pins as glowing teal nodes, gold highlight on the peak, glassmorphism, no text, no logos, no fake brands, premium dark aesthetic, 16:9. NO words.

**Prompt — "Design" card:**
> Abstract brand-design moodboard on near-black, floating swatches, type specimens shown as non-readable abstract glyph shapes, a stylised logomark grid, teal+gold palette chips, soft studio lighting, no real letters, no brand names, 16:9 premium. NO legible text.

**Prompt — "Content & Media" card:**
> Abstract content/media composition on dark navy, layered translucent article cards and a soft waveform/film-strip motif, warm gold and cool teal light, bokeh, no readable text, no logos, editorial premium, 16:9. NO words.

**Prompt — "Hosting & Care" card:**
> Abstract reliability/security motif on deep navy, a glowing shield and orbiting backup nodes rendered as translucent glass, teal core glow with gold edge light, no server-room clichés, no text, no brand, premium dark, 16:9. NO words.

### Hero (home) — `public/hero_home1.5x.webp`
- Already on-brand and reasonably sized (709 KB). Keep, but ensure it never overflows on mobile and add a descriptive `alt` if it conveys meaning (currently empty alt — acceptable only if purely decorative).

### Logo — `public/argana_media_logo_concept_2.png` (925 KB)
- The full logo (mark + wordmark) is heavy for a 38px navbar use. **Provide an SVG** mark + an optimised small PNG; 925 KB for a favicon-scale mark is excessive.

### Team / founder photo (NEW, required)
**Prompt (only if you cannot use a real photo — but a *real* photo is strongly preferred):**
> *Do not generate a fake human to present as a real founder — that is a misrepresentation risk for KYC.* Use a genuine headshot. If you need a neutral placeholder, use an abstract monogram avatar on the brand gradient, never a synthetic "person."

---

# MISSING PAGES

| Page | Why it's expected | Priority |
|---|---|---|
| **Team / About-us-people** | Legitimacy, due diligence | P1 |
| **Real Case Studies** (`/work/[slug]`) | Proof of operations | P1 |
| **Process / How we work** | Operating maturity | P2 |
| **Careers** (even "we're not hiring, but…") | Signals a real org | P3 |
| **FAQ (site-wide)** | Conversion + trust (per-service FAQs exist; a central one helps) | P3 |
| **Contact: map + company details block** | Verifiability | P2 |
| **Status/uptime** — *only if* you actually run hosting SLAs; otherwise **delete** the legacy redirect | — | P2 (delete) |

---

# MISSING SECTIONS (on existing pages)

- **Homepage:** client-logo strip; 2–3 testimonials; a "meet the team" teaser; trust badges (Companies House, Stripe-secured).
- **About:** founder/team block with photos; a short, dated "our story" with at least one concrete milestone.
- **Service pages:** one real mini-case-study per service ("we did X for Y, result Z").
- **Contact:** embedded map of the registered office; expected response time; the company registration line.
- **Checkout/Cart:** a `TrustBar` exists in code — ensure it's actually shown at the conversion points with Stripe-secured + registration signals.

---

# RECOMMENDED NEW COMPONENTS

1. `TeamSection` — founder/team cards (photo, name, role, LinkedIn).
2. `Testimonials` — quote, name, company, optional logo/photo.
3. `ClientLogos` / `ToolsWeUse` — honest logo strip.
4. `CaseStudyCard` + `/work/[slug]` template.
5. `TrustBadges` — Companies House link, Stripe-secured, Cyber Essentials (when obtained).
6. `ContactDetailsBlock` (with map) — reused on Contact + Footer.
7. Server-rendered `HomeHero` (replace the innerHTML hero for SEO).

---

# RECOMMENDED NEW VISUAL ASSETS

- Real (or own-brand) **case-study screenshots** (×3–4).
- **Founder/team headshots** (real photography, consistent lighting/background).
- **SVG logo** (mark + lockup) + optimised favicons (`.ico`, 32/180px).
- Optimised **WebP/AVIF** versions of all current PNGs.
- A real **`og.png`** social card (or rely solely on the dynamic OG route and drop the dangling reference).
- Optional: a short **founder intro video** (90s) — extremely high trust ROI for agencies.

---

# AI vs HUMAN DETECTION (Phase 4 summary)

| Element | Verdict | Why |
|---|---|---|
| Long-form service/About/legal **copy** | **Mostly human-grade** | Specific, well-structured, brand-consistent (clearly written/edited from a real content doc). This is the project's strength. |
| **Portfolio/service images** | **Clearly AI** | Generic device mocks, a fabricated "NEXORA" brand, stock lighting. |
| **Portfolio "projects"** | **Placeholder/AI-feel** | Self-labelled placeholders; no real artefacts. |
| **Client-portal preview** | **Mock/fabricated** | Invented invoice/ticket/progress data. |
| **Testimonials/team** | **Absent** | Nothing to evaluate — and absence itself reads as "template not yet filled in." |
| **FAQs / why-us cards** | **Slightly generic but acceptable** | On-brand, not robotic, but standard agency framing. |
| **Stats** | **Honest, minimal** | No invented client counts (good), but no momentum. |

**Net:** This is **not** typical "AI slop" on the writing side — the copy is a genuine asset. The AI/placeholder problem is concentrated in **imagery and proof** (portfolio, team, testimonials, portal mock). Fixing those three areas removes ~80% of the "fake" feeling.

---

# FINAL VERDICT

### If I were Mercury, would I approve **based only on this website**?

> **NO — not as-is. Borderline; most likely "approved with conditions / request more info."**

**Blocking issues (must clear before applying):**
1. Public site not on `arganamedia.co.uk` (domain + working email).
2. Self-labelled "placeholder" portfolio + AI imagery showing a **fake brand ("NEXORA")**.
3. No human/team/founder presence; no third-party proof.
4. Default admin credentials live in production.
5. Homepage content invisible to crawlers/embeds (innerHTML render) + localhost canonical risk.
6. Inconsistent pricing (home vs service pages).

**None of these are fatal to the *underlying business* (a real registered UK company with a clear, legal service offering and proper legal pages).** They are all *presentation/operations* gaps that are quick to close.

### Approval probability (website-only)

| | Mercury | Wise | Stripe |
|---|---:|---:|---:|
| **Before fixes** | ~50% | ~55% | ~62% |
| **After Priority-1 fixes** | **~90%** | **~90%** | **~93%** |

---

## PRIORITISED ACTION PLAN

### 🔴 Priority 1 — MUST fix before applying to Mercury/Wise/Stripe
1. Put the site on **`arganamedia.co.uk`** (primary domain + HTTPS) and configure **email/MX**; set `NEXT_PUBLIC_APP_URL`.
2. **Remove the word "placeholder"** and replace portfolio with **real or own-brand case studies**; remove the **AI images containing fake brands ("NEXORA")**.
3. **Add a founder/team block** (real name, photo, LinkedIn) + link Companies House.
4. **Rotate the admin password / delete demo accounts** from the live DB; stop seeding demo data in production.
5. **Server-render the homepage hero** (so crawlers/embeds see content) and confirm canonical/OG/sitemap use the real domain.
6. **Make home pricing match service-page pricing** (or remove home prices).

### 🟠 Priority 2 — Strongly recommended
7. Add 2–3 **testimonials** + a client/tools logo strip; add a **Process** page.
8. **Optimise all images** to WebP/AVIF (≤200 KB) via `next/image`; self-host fonts.
9. **Delete legacy orphan routes** (`/data-centers`, `/sla`, `/status`, `/compare`, `/affiliate`, `/abuse`, `/dmca`, `/knowledge-base`, `/security`, `/pricing`) or `notFound()`/410 + drop from sitemap.
10. Add a **landline/VoIP**, embed the office on **Contact**, create a **Google Business Profile**.
11. Fix **colour-contrast** failures; gate the canvas on `prefers-reduced-motion`; add image `alt`s and a skip-link.
12. Replace/label the **client-portal mock** and publish 3–5 **real blog posts** (remove demo seed).

### 🟢 Priority 3 — Nice to have
13. Cyber Essentials certification (cheap, credible for the IT-support line).
14. Founder intro video; case-study detail pages (`/work/[slug]`).
15. `.ico` favicon + a static `og.png` fallback; converge the two navbar/footer implementations.
16. Add true momentum stats as they become real.

---

### Bottom line
You have built a **visually premium, well-written agency website on top of a real, registered UK company** — the hard parts (design taste and copy) are done well. What stands between this and a "real, trustworthy, fundable agency" is **proof and consistency**: a live brand domain, real people, real work (not placeholders or fake-brand AI mocks), consistent pricing, and a crawlable homepage. Close the six Priority-1 items and this moves from *"looks like a template a solo founder spun up"* to *"a credible agency a bank, a client, and an investor would take seriously."*

---

# APPENDIX A — DEEP TECHNICAL / SEO / OPERATIONAL PASS (Round 2, verified in code)

This pass goes beyond the visible UI into the metadata, structured data, forms, and delivery plumbing — exactly the layers a thorough reviewer (or a competitor trying to discredit you) would inspect.

### A-1 — 🔴 Contact / inquiry / abuse forms may silently fail to deliver in production
- **Location:** `app/actions/contact.ts` (`contactAction`, `inquiryAction`, `reportAbuseAction`) → `lib/email` `sendEmail(...)`. Default transport in `config/env.ts` / `.env.example` is **`SMTP_HOST=localhost`, `SMTP_PORT=1025` (Mailpit)** and `RESEND_API_KEY` empty.
- **What happens:** The form **returns "Thanks! We've received your message…" to the visitor regardless**, but on Vercel there is no `localhost:1025` mail server. Unless `RESEND_API_KEY` (or a *real* SMTP host) is set in Vercel, **the email goes nowhere** — the prospect thinks they contacted you; you never receive it.
- **Why it matters:** A "Contact us" that looks like it works but drops every message is worse than no form. It loses real leads and, if a reviewer test-submits and gets no reply, signals a non-operational business.
- **Severity:** 🔴 Critical (operational/trust). **Fix:** set `RESEND_API_KEY` + a verified `EMAIL_FROM` domain (SPF/DKIM/DMARC on `arganamedia.co.uk`) in Vercel, and add real error handling so a failed send surfaces an error instead of a false success.

### A-2 — 🔴 Pricing is inconsistent across THREE surfaces (not two)
- **Homepage** (`argana-landing.tsx`): Digital Presence **£750**, Website & Content **£1,800**, Care **£49/mo**.
- **/pricing** (`config/marketing.ts` → `SERVICE_PACKAGES`): Starter Website **£750**, Business Website **£1,800**, E-commerce/Web App **£3,500**; Care Lite **£19**, Care Plus **£49**, Care Pro **£99**.
- **Service pages** (`config/services-content.ts`): Starter Website **£1,500**, Business Website **£3,800**, E-commerce **£4,500**; Care Essential **£49**, Growth **£99**, Premium **£179**.
- **Result:** the *same* "Starter Website" is **£750 on /pricing but £1,500 on /website-app**; "Care" is **£19/£49/£99 on /pricing but £49/£99/£179 on /hosting-website-care**. Three different price lists for the same products.
- **Severity:** 🔴 Critical (consistency/trust). **Fix:** make `SERVICE_PACKAGES` and the homepage packages match `SERVICE_DETAILS`, or have `/pricing` and the homepage pull from the *same source of truth* as the service pages.

### A-3 — 🟠 Structured data (JSON-LD) defects — `lib/seo/index.ts`
- **Organization `logo` is a 404:** `logo: ${siteConfig.url}/logo.png` — there is **no `public/logo.png`** (the logo file is `argana_media_logo_concept_2.png`). Google can't render your logo in rich results / knowledge panel.
- **Currency & area mismatch:** `productJsonLd` / `serviceJsonLd` default to **`priceCurrency: "USD"`** and **`areaServed: "Worldwide"`**, while the site prices in **£ (GBP)** and now markets to **"the UK and Europe."** Search engines ingest USD/Worldwide — contradicting your own pages.
- **Search action points to a legacy route:** `websiteJsonLd` `potentialAction` targets **`/knowledge-base?q=…`** — a leftover hosting route (now a redirect). The advertised sitelinks search box would resolve to a non-agency page.
- **`url` / `sameAs`:** all URLs inherit the `siteConfig.url` localhost risk (A-4); `sameAs` resolves to **LinkedIn only** (X/GitHub are empty in `brand.social`).
- **Severity:** 🟠 Medium (SEO/rich-results). **Fix:** point `logo` at a real file, set currency `GBP` + `areaServed` to GB/EU, repoint or remove the KB search action, populate or remove empty socials.

### A-4 — 🔴/🟠 Sitemap, robots, and canonical all inherit the localhost fallback
- **Location:** `app/sitemap.ts` (`base = siteConfig.url`), `app/robots.ts` (`sitemap`/`host = siteConfig.url`), `lib/seo` `pageMetadata` (`canonical`, `og:url`).
- **What happens:** with `NEXT_PUBLIC_APP_URL` unset, the **sitemap publishes `http://localhost:3000/...` URLs**, robots advertises a `localhost` sitemap/host, and every page's canonical/OG URL is `localhost`. Google would index nothing useful and may distrust the property.
- **Note:** robots correctly **disallows** `/dashboard`, `/admin`, `/checkout`, `/cart`, `/api`, `/login`, `/register`, `/reset-password`, `/verify` — good. The **sitemap lists `/pricing` and `/support`** (confirm both are intended, on-brand pages) and **omits `/domains`**.
- **Severity:** 🔴 if env unset / 🟠 if set. **Fix:** set `NEXT_PUBLIC_APP_URL=https://arganamedia.co.uk` (re-stated from C-7 because it cascades into four subsystems).

### A-5 — 🟠 Blog is published but thin (stub content)
- **Location:** `prisma/seed.ts` — 6 published posts (e.g. *"How we quote your project"*, *"What actually makes a website convert"*, *"Local SEO basics…"*). Titles are on-brand, but **bodies are 1–3 sentences each.**
- **Why it matters:** Thin content can be flagged as low-value by Google and reads as filler to a human. A blog of stubs is a negative trust signal (looks auto-generated/unfinished).
- **Severity:** 🟠 Medium. **Fix:** expand to genuine 600–1,200-word articles, or unpublish until real posts exist; remove demo posts from the production seed.

### A-6 — 🟢 POSITIVE: Cookie consent is implemented correctly
- **Location:** `components/marketing/cookie-consent.tsx` + `lib/consent`. Tracking/affiliate scripts stay **blocked until the visitor accepts**, consent persists, returning accepters get scripts re-loaded. This is a genuine GDPR-aware implementation — a credit to the build.
- **Minor:** ensure the "decline" option is as prominent as "accept" (UK ICO guidance), and that the Cookie Policy lists the actual cookies set.

### A-7 — 🟠 Commerce surfaces are half-relevant for an agency
- **Location:** `/cart`, `/checkout`, `[slug]` product route, `STRIPE_PLACEHOLDER_MODE=true`.
- **Observation:** The project still carries a full cart/checkout/Stripe flow (inherited from the hosting template). With placeholder mode on, a real charge won't process; with quote-based services now front-and-centre, a visitor who lands in `/cart` or `/checkout` may hit a half-built flow. The `[slug]` dynamic product route can also surface DB-driven "product" pages that don't fit the agency narrative.
- **Severity:** 🟠 Medium. **Fix:** decide whether commerce is in-scope. If not, hide/disable `/cart`/`/checkout` and the cart icon, or keep them only for the domain/care purchases that genuinely use them — and confirm Stripe is configured (not placeholder) before accepting money.

### A-8 — 🟠 Security / production hygiene
- Security headers are set (`next.config.mjs`: `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`) — good. **No Content-Security-Policy** (minor hardening gap).
- `eslint: { ignoreDuringBuilds: true }` — lint is skipped at build; quality regressions won't fail CI.
- Default seeded admin credentials in production (re-stated from C-8) remain the most urgent security item.
- Real secrets (Supabase password, service-role key) were shared in plaintext during setup and should be rotated.

---

# APPENDIX B — COMPLETENESS MATRIX (every requested area, reviewed)

| Phase / Area | Reviewed | Headline result |
|---|:--:|---|
| Frontend / every page / route | ✅ | 30+ public routes mapped; 10 legacy redirect-stubs found |
| Navbar / footer | ✅ | Premium, but two duplicated implementations |
| Hero / CTA / cards | ✅ | Strong visually; homepage hero not server-rendered |
| Testimonials | ✅ | **None exist** |
| Logos / branding | ✅ | Logo present (925 KB PNG, no SVG); brand consistent |
| FAQ | ✅ | Per-service FAQs (decent); no central FAQ |
| Pricing | ✅ | **3-way inconsistency** |
| Services | ✅ | 6 services, rich content, good |
| Forms | ✅ | Wired to email but **likely non-delivering in prod** |
| Contact / Book-a-Call | ✅ | Forms present; delivery + landline gaps |
| Blog | ✅ | 6 **stub** posts |
| Metadata / canonical | ✅ | **localhost fallback risk** |
| Favicon | ✅ | `app/icon.png` set; no `.ico` |
| Sitemap / robots | ✅ | Correct private disallows; **localhost URL risk** |
| OpenGraph | ✅ | Dynamic OG route good; `og.png` reference dangling |
| Structured data (JSON-LD) | ✅ | **logo 404, USD/Worldwide, KB search** |
| Loading / animation / transitions | ✅ | Polished; canvas not gated on reduced-motion |
| Responsiveness | ✅ | Generally fluid; heavy images risk mobile jank |
| Typography / spacing | ✅ | Premium and consistent |
| Icons / illustrations / images | ✅ | **AI-generated, oversized, one fake brand** |
| Placeholders | ✅ | **Portfolio explicitly "placeholder"** |
| Legal pages | ✅ | Terms/Privacy/Cookie/Refund/AUP present; need legal pass |
| Trust signals | ✅ | Reg. number + address present; social proof absent |
| Accessibility | ✅ | innerHTML homepage, contrast failures, missing alts |
| Consistency / hierarchy | ✅ | Strong design, weak data/price consistency |
| AI vs human | ✅ | Copy human-grade; imagery & proof AI/placeholder |
| Mercury / Wise / Stripe lens | ✅ | Borderline pre-fix; strong post-fix |
| Investor lens | ✅ | Not yet fundable (no traction/team) |
| Images audit + prompts | ✅ | Replacements + prompts provided |
| Missing pages / sections | ✅ | Team, real case studies, process |
| Email deliverability | ✅ | **Transport likely unconfigured in prod** |
| Commerce/Stripe relevance | ✅ | Half-relevant; placeholder mode |
| Security hygiene | ✅ | Headers good; seeded admin creds, no CSP |

---

# APPENDIX C — REVISED CRITICAL LIST (folding in Round 2)

The following move **up** into the must-fix tier alongside the original C-1…C-8:

- **A-1 — Contact forms likely don't deliver email in production** (configure Resend/SMTP). *This loses real leads today.*
- **A-2 — Three-way pricing contradiction** (home vs /pricing vs service pages). *Reconcile to one source.*
- **A-4 — `NEXT_PUBLIC_APP_URL`** must be set so sitemap/robots/canonical/JSON-LD stop pointing at `localhost`.
- **A-3 — JSON-LD `logo` 404 + USD/Worldwide** (quick metadata fixes with outsized SEO value).

**Updated Priority-1 list = C-1, C-2, C-3, C-4, C-5, C-6, C-8, A-1, A-2, A-4.** (Ten items; all are hours-to-days of work, none require new product.)

---

*— End of audit. No files were modified; no commits were made. Read-only inspection only, as instructed.*
