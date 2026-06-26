# VISUAL_POLISH_COMPLETED.md
### ARGANA MEDIA — Phase 1: Visual Polish & Premium Experience

**Date:** 2026-06-26
**Scope:** Frontend visual polish only. No business-legitimacy elements were invented
(no team, founders, testimonials, case studies, client logos, or fabricated stats).
No real content, people, or projects were made up — gaps are left as honest copy or
`TODO` markers. Brand identity (teal `#35E0E8` / gold `#F3CD86` on deep navy `#070B14`)
was preserved throughout.

**Build status:** ✅ `npm run build` passes clean (full route table, no errors).

---

## 1. Calendly integration (all primary CTAs)

Every "Book a Call" / "Schedule a call" / primary CTA now opens Calendly in a new tab.

- **New config:** [`config/cta.ts`](config/cta.ts) — `CALENDLY_URL` (reads
  `NEXT_PUBLIC_CALENDLY_URL`, falls back to `https://calendly.com/mbenzakatako/30min`)
  plus an `isExternal()` helper.
- **`amx-ui.tsx` `Btn`** is now external-link aware: `http(s)` hrefs render with
  `target="_blank" rel="noopener noreferrer"`. `HeroActions` and the `Cta` primary
  button default to `CALENDLY_URL`, so **every page using them inherits Calendly**
  (home of each service page, About, Portfolio, Services, Pricing, Contact, Blog…).
- **Updated directly:** navbar (desktop, mobile, mega-menu CTA), homepage (5 CTAs),
  `service-page.tsx` (3), `pricing-preview.tsx`, `pricing/page.tsx`, `contact/page.tsx`.
- **`/book-a-call`** now leads with an instant **"Pick a time on Calendly"** button,
  an "or send us a message" divider, and the existing form kept as the alternative.

> Action for you: set `NEXT_PUBLIC_CALENDLY_URL` in Vercel (and `.env`) if the link
> ever changes. The hard-coded fallback means it already works without it.

## 2. Removed all AI-looking / fake assets

- **Fabricated client-portal dashboard** in the homepage "One calm place to run
  everything" section (fake `portal.arganamedia.co.uk` browser chrome, "Welcome back",
  invented stats `3 / 2 / 1`, progress bars `70% / 45%`, fake invoice **£480.00 Paid**,
  fake ticket **#2041 Replied**) → **deleted**, replaced with a brandless, calm
  **"digital ecosystem" illustration** (glowing core, orbiting nodes on concentric
  rings, two frosted glass panels — **no text, no fake data, no UI**). Marked
  `aria-hidden`.
- **10 AI-generated raster mockups deleted** (~30 MB total), including
  `service_brand_website.png` (the fake **"NEXORA"** brand) and the entire
  `public/portfolio/` folder:
  - `service_brand_website.png`, `service_digital_marketing.png`,
    `service_digital_media.png`, `service_hosting_care.png`
  - `portfolio/portfolio_business_website.png`, `…_online_store.png`,
    `…_brand_identity.png`, `…_content_social.png`, `…_marketing_campaign.png`,
    `…_hosting_care.png`
- **"Placeholder project types shown …"** label (looked unfinished) reworded to
  **"Sample project types — real case studies are shared on request."**

## 3. Abstract, brandless card visuals (replacing the deleted images)

Both the homepage "Built across media, marketing & the web" cards and the `/portfolio`
cards now use **hand-built layered CSS gradients** (per-category navy gradient + soft
top-left sheen + teal corner glow) instead of raster art. Result: brandless, premium,
on-brand, **~0 KB**, and impossible to mistake for an AI template. The icon badge +
category chip overlays were retained for clarity.

> The old `img:` fields in the two data arrays are now unused string literals (kept to
> avoid churn). They can be deleted in a cleanup pass — see Phase-2 TODOs.

## 4. Hero is now server-rendered (SSR / SEO fix)

The homepage renders its full design by injecting `root.innerHTML` on mount, so search
engines / social unfurlers / no-JS users previously saw an **empty page**. The hero now
ships as **real server-rendered HTML** (eyebrow + `<h1>Build, Grow & Scale Your Digital
Presence</h1>` + sub-copy + primary CTA) inside `am-root`, and is seamlessly replaced by
the animated design on mount. Crawlers and link previews now get real content.

## 5. Accessibility & performance

- **`prefers-reduced-motion`:** the JS starfield canvas now renders a **single static
  frame** (no `requestAnimationFrame` loop) and the scroll-reveal entrance animations are
  **skipped** (content shown immediately) for users who request reduced motion.
- **Contrast:** the low-contrast micro-text colour `#54607A` (footer headings, legal
  lines, captions across home, footer, About, Portfolio) was lightened to `#7E8AA3`.
- **Decorative images** marked `aria-hidden`; the logo keeps `alt="ARGANA MEDIA"`.
- **Logo optimised in place:** `argana_media_logo_concept_2.png` **1920×1920 / 925 KB →
  256×256 / 27 KB** (−97%). No reference changes needed; favicon untouched.
- **Fonts:** added `preconnect` to `api.fontshare.com` and `cdn.fontshare.com` to cut the
  font handshake latency. (Full self-hosting is a Phase-2 TODO — see below.)
- **Payload:** `public/` went from ~31 MB of imagery to **2 files** (27 KB logo +
  709 KB hero webp).

## 6. Contact / booking UX

- Contact form **success state is now honest** and always gives a guaranteed path:
  the confirmation adds *"We usually reply within one business day. Prefer to talk it
  through now?"* + a **"Book a call instead"** Calendly button (covers the case where the
  transactional-email backend isn't fully wired in production).
- **Phone shown professionally with hours:** `+44 7882 737419` with
  **"Mon–Fri · 9am–6pm UK time"** on both `/book-a-call` and `/contact`.

---

## Files changed

```
config/cta.ts                                   (new)
app/layout.tsx                                  (font preconnect, comment fix)
components/marketing/amx-ui.tsx                  (Btn external-aware, Calendly defaults)
components/marketing/navbar.tsx                  (3 CTAs → Calendly)
components/marketing/argana-landing.tsx          (dashboard→illustration, card visuals,
                                                  SSR hero, reduced-motion, contrast,
                                                  Calendly CTAs, label reword)
components/marketing/contact-form.tsx            (honest success + Calendly fallback)
components/marketing/footer.tsx                  (contrast)
app/(public)/portfolio/page.tsx                  (abstract card visuals, contrast)
app/(public)/about/page.tsx                      (contrast)
app/(public)/contact/page.tsx                    (Calendly, phone hours)
app/(public)/pricing/page.tsx                    (Calendly)
app/(public)/book-a-call/page.tsx               (Calendly instant-booking + hours)
components/marketing/service-page.tsx            (Calendly)
components/marketing/pricing-preview.tsx         (Calendly)
components/marketing/cta-section.tsx             (Calendly default, used by [slug])
app/(public)/services/page.tsx                   (removed duplicate "Book a Call")
public/  — deleted 10 AI PNGs; logo resized 925KB→27KB
```

---

## Remaining Phase-2 TODOs (not in this phase)

These are **business legitimacy / content** items, deliberately out of scope for visual
polish, or items that need assets/decisions only you can supply:

1. **Self-host fonts (remove Fontshare).** Download the Clash Display + General Sans
   `woff2` files into `public/fonts/`, wire them with `next/font/local`, and remove the
   Fontshare `<link>` + the runtime font-link injection in `argana-landing.tsx`. Removes a
   third-party request and improves privacy/LCP.
2. **Pricing single-source-of-truth.** Three pricing sources disagree
   (`config/marketing.ts` `SERVICE_PACKAGES` vs `config/services-content.ts`
   `SERVICE_DETAILS` vs homepage packages). Consolidate to one.
3. **Verify transactional email in production** (Resend/SMTP) so contact + booking
   messages actually deliver; until then the honest "or book a call" fallback stands in.
4. **Real portfolio / case studies.** When real projects exist, replace the abstract
   cards with genuine work. Do **not** fabricate.
5. **Cleanup:** remove the now-unused `img:` string fields from the homepage `portfolio`
   array and the `/portfolio` `WORK` array.
6. **`og.png` / social preview image** is referenced but not a real branded asset yet.
7. **Rotate the secrets** pasted in chat earlier (Supabase DB password, service-role key,
   JWT secret) and remove/rotate the seeded prod admin (`admin@arganamedia.co.uk`).
8. **Optional:** consider whether the homepage domain-search block still fits the agency
   positioning — kept for now because it is wired to a real registrar API.

---

## Image-generation prompts (for future raster illustrations, if desired)

The CSS visuals above are intentionally brandless and lightweight. If you later want
richer raster art, generate **WebP/AVIF ≤ 200 KB each**, abstract, **no text / no logos /
no fake brands**, on deep navy `#070B14` with glassmorphism + teal `#35E0E8` / gold
`#F3CD86` accents and soft glows:

- **Web & Design:** abstract floating glass panels and layered cards over a deep-navy
  gradient, faint wireframe grid, teal/gold edge glow. No UI text.
- **Digital Marketing:** abstract upward-flowing particle streams and concentric signal
  rings on navy, gold highlights. No charts, no numbers.
- **Digital Media & Content:** abstract overlapping translucent media shapes / soft light
  ribbons on navy, teal accents. No photos of people.
- **Hosting & Website Care:** abstract glowing server-less "core" with orbiting nodes and
  a protective ring on navy, gold/teal glow. No logos.
- **Portfolio (generic):** six abstract, distinct gradient compositions (glass shards,
  light arcs, particle fields) — brandless, premium, consistent palette.
- **Hero / OG image:** wide abstract navy field with a central teal-gold luminous core and
  soft orbiting nodes; leave negative space for the H1 overlay.
