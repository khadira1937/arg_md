# HostynCloud — Implementation Roadmap

Built in dependency order so the platform is runnable as early as possible and every later
feature reads from the same DB catalog.

## Phase 1 — Foundation (scaffold & data)
- [ ] Next.js + TS + Tailwind + shadcn + Framer Motion + Prisma + Auth.js + Stripe + Zod deps
- [ ] Config (`brand.ts`, `site.ts`, `nav.ts`, env schema), Tailwind theme, globals
- [ ] Complete `prisma/schema.prisma` (all models/enums from docs/03)
- [ ] Docker Postgres (`docker-compose.yml`), migrate
- [ ] `lib/` layer: db, pricing, crypto, permissions, validators, seo, email, providers, stripe
- [ ] `prisma/seed.ts` — categories, products, plans, prices, addons, locations, coupons,
      KB/blog, admin + customer users
- [ ] `.env.example`, README, deployment checklist

## Phase 2 — Design system & marketing
- [ ] shadcn UI primitives + brand tokens, gradients, motion presets
- [ ] Sticky navbar + mega menu + responsive mobile menu, footer
- [ ] Reusable marketing components: Hero, PricingCard, CycleToggle, ComparisonTable,
      FAQAccordion, Testimonials, TrustBadges, DataCenterMap, LocationSelector, CTA, etc.
- [ ] Home page + SEO + JSON-LD

## Phase 3 — Public catalog pages
- [ ] Dynamic product page renderer reading DB (hero, plans, features, FAQ, comparison)
- [ ] All 35 public pages (product, pricing, compare, locations, support, KB, blog, contact,
      about, policies: ToS, Privacy, Refund, AUP, SLA)
- [ ] sitemap.xml + robots.txt + per-page metadata + JSON-LD

## Phase 4 — Auth
- [ ] Auth.js credentials + register/login/logout, email verification, forgot/reset password
- [ ] RBAC middleware + guards, profile

## Phase 5 — Cart & checkout
- [ ] Plan configurator (cycle, location, add-ons) → cart (DB + guest cookie)
- [ ] Coupon apply, checkout page, Stripe Checkout session creation
- [ ] Success / cancel pages

## Phase 6 — Stripe billing & fulfillment
- [ ] Stripe client + product/price sync service + placeholder mode
- [ ] Webhook receiver (signature verified, idempotent): order, invoice, payment,
      subscription, service instance, provisioning enqueue
- [ ] Invoice generation, payment status, renewal tracking, cancel, upgrade/downgrade

## Phase 7 — Provisioning
- [ ] `CloudProvider` interface, MockProvider (working), provider placeholders, registry
- [ ] Job worker (route/cron tick) processes `ProvisioningJob`, encrypts credentials,
      activates service, sends welcome email

## Phase 8 — Customer dashboard
- [ ] Services (active/pending/suspended), service detail + credentials, provisioning status
- [ ] Orders, invoices (pay unpaid), subscriptions, renewals
- [ ] Support tickets (create/reply), profile, billing info, usage placeholder
- [ ] Cancel / upgrade / downgrade flows

## Phase 9 — Admin dashboard
- [ ] Users/staff, categories/products/plans/features/prices/addons/locations/coupons CRUD
- [ ] Orders, invoices, payments, subscriptions, service instances, provisioning jobs
- [ ] Support tickets, KB articles, blog posts, announcements
- [ ] Suspend/unsuspend/cancel/activate services, Stripe sync status + sync action
- [ ] Admin audit logs, analytics dashboard

## Phase 10 — Emails, security, polish
- [ ] All transactional emails wired
- [ ] Rate-limit + audit + safe errors + AUP/abuse structure verified
- [ ] Loading skeletons, empty states, error boundaries, mobile QA
- [ ] README finalization, deployment checklist, production hardening notes

## Status legend
Each phase is committed incrementally. MockProvider + Stripe placeholder mode keep the app
runnable from end of Phase 1 onward.
