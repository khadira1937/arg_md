# PHASE 2 — PART 1 COMPLETED
### The "What We Build" (Solutions) page

**Date:** 2026-06-27
**Route:** `/what-we-build` → [app/(public)/what-we-build/page.tsx](app/(public)/what-we-build/page.tsx)
**Status:** ✅ Built, type-checked (`tsc` exit 0), production build green, and verified rendering server-side (HTTP 200, all sections present in the HTML).
**Not committed / not pushed**, as instructed — staged locally for your review.

> Review it at **`/what-we-build`** (e.g. `arg-md.vercel.app/what-we-build` once deployed, or `localhost:3000/what-we-build`). It is **not yet linked in the navigation** — see "Recommendations" below.

---

## What was implemented

A single, server-rendered page (no client JS required) built on the site's existing premium design system (`amx-ui`, Clash Display, teal/gold on deep navy), with eight sections:

1. **Hero** — "Modern websites & applications, built with intent", concise human supporting copy, Calendly CTA + a "See how we work" anchor.
2. **Where we focus** — the six categories as **alternating editorial blocks** (large image one side, copy the other, flipping left/right for rhythm). Each block has an icon + number tag, a consultant-style description, a 2-column key-features list, technology pills, and a small "Discuss a project like this" link that scrolls to the booking section (`#book`) — **not** a fake project page. The six:
   - Corporate Websites · E-commerce · Booking Platforms · Marketing Websites · Custom Web Applications · Developer Documentation
3. **The principles behind every build** — 9 design-philosophy cards (Simplicity, Accessibility, Performance, Scalability, Maintainability, Conversion, UX, Technical SEO, Mobile-first), each with a one-line *why it matters to clients*.
4. **How we work** — a 7-step process (Discovery → Research → Design → Development → QA → Launch → Long-term Support) as numbered cards with a gradient accent bar, not a generic vertical list.
5. **Technologies we work with** — grouped by category (Frontend, Backend, CMS & Commerce, Databases, Cloud & DevOps, Blockchain, Design) as elegant circular **"tech balls"** with a subtle 3-D treatment and hover lift (no spinning logo cloud).
6. **What you can count on** — 8 factual trust cards (Transparent Communication, Performance First, Modern Technologies, Accessible Design, Security Focused, Long-term Support, Collaborative Process, UK Registered Company). **No testimonials, no stats, no fake proof.** The "UK Registered Company" card links to the **real Companies House record** (No. 17296255).
7. **Common questions** — an 8-item FAQ using native `<details>`/`<summary>` (keyboard-accessible, no JS), with honest, specific answers.
8. **Start with a conversation** — premium booking panel reusing the Phase-1 **Calendly** integration, plus phone (with hours), email, a "Send a message" link to `/contact`, and reassuring, no-pressure copy.

**Images:** the six files you placed in `public/wath we build/` were optimised to WebP (`public/what-we-build/*.webp`, 40–198 KB each, all ≤ 200 KB), served via `next/image` with `sizes`, lazy-loading and descriptive `alt` text. The original ~20 MB source folder was removed. Mapping used:

| Your file | Category |
|---|---|
| modern business office meeting laptop | Corporate Websites |
| ecomerce-solution | E-commerce |
| business consultation calendar laptop | Booking Platforms |
| creative agency brainstorming | Marketing Websites |
| software developer workspace | Custom Web Applications |
| rlock doc *(real RLock docs site)* | Developer Documentation |

**SEO / structured data:** `pageMetadata` for the page, plus JSON-LD for `BreadcrumbList`, `Service`, and `FAQPage`.

---

## Design decisions

- **Framed as expertise, never as client work.** The section is titled "Where we focus" and explicitly says *"areas of expertise — not client logos."* No category is presented as a delivered client project, matching the audit's honesty requirements and your instruction.
- **Honesty about being new.** The trust section opens with *"No testimonials to quote yet — so here are the factual qualities you can hold us to."* This turns the absence of proof into a credibility signal rather than hiding it.
- **The RLock screenshot** (Developer Documentation) is a genuine, polished docs site — real craft, not an AI mock. It also makes the Rust/Solana entries in the stack honest. I did **not** caption it as "client work"; it illustrates the *documentation* capability.
- **Technology honesty.** The stack is framed as *"technologies we work with… we choose tools to fit the project."* It includes the stack this repository actually uses (Next.js, TypeScript, Tailwind, PostgreSQL, Prisma, Node, Docker, Vercel, Git/GitHub) plus standard agency capabilities (WordPress, Shopify, Laravel/PHP, MySQL/MongoDB, Cloudflare, Rust/Solana, Figma). No version numbers or false specifics are claimed.
- **Copy tone.** Written as an experienced consultant would speak — measured and specific. Avoided every banned cliché ("cutting-edge", "world-class", "game-changing", "unlock", "revolutionary", etc.).
- **Verifiable trust only.** The single outbound trust link is the **Companies House** record — real and checkable. No fake awards, logos, reviews or numbers.
- **Accessibility & performance.** Server-rendered; semantic `<article>`/`<ol>`/`<details>`; alt text on every image; decorative monograms `aria-hidden`; a `prefers-reduced-motion` block disabling all hover transforms/transitions; optimised WebP via `next/image`; contrast kept above the low-contrast value the audit flagged.
- **Interactions are CSS-only** (image zoom, card/ball lift, FAQ accordion), so the page needs no client JavaScript and stays fast and robust.
- **No unrelated changes.** I did not touch other Phase-2 items (founder, About, case studies, testimonials), the navigation, or any shared component, and made no commits.

---

## Recommendations for the next Phase 2 tasks

1. **Link this page in the navigation.** It's currently reachable only by URL. Natural placement: a top-level **"What We Build"** item, or under the Services mega-menu, plus a footer link. (Quick to wire — say the word and I'll do it in isolation.)
2. **Founder / team block** (audit C-4, P1): a real name, photo, one-paragraph bio and LinkedIn — the single highest-leverage trust addition. This page's "What you can count on" pairs well with a human face.
3. **Real / own-brand case studies** (audit C-2): when a project can be shown, add 1–2 real case studies (the RLock docs build is a genuine candidate for a first one). Keep presenting *categories* as expertise until then.
4. **Testimonials** only when real (audit C-4) — leave the honest "no testimonials yet" framing until you have genuine quotes.
5. **About / company story** with a dated milestone or two.
6. When ready, **reconcile pricing to one source** (audit A-2) and link `/what-we-build` from the relevant service pages.

---

## Files

```
app/(public)/what-we-build/page.tsx        (new — the page)
public/what-we-build/*.webp                (new — 6 optimised images, 40–198 KB)
public/wath we build/                      (removed — ~20 MB of source originals)
```

No other files were modified.
