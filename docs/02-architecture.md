# CloudynHost — Architecture Plan

## 1. Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + React Server Components |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + shadcn/ui (Radix primitives) |
| Animation | Framer Motion (client islands only) |
| ORM / DB | Prisma + PostgreSQL |
| Auth | Auth.js (NextAuth v5) — Credentials + email verification, JWT sessions, RBAC |
| Payments | Stripe Checkout, Billing/Subscriptions, Webhooks (test mode) |
| Validation | Zod (shared client/server schemas) |
| Email | Nodemailer (dev: Ethereal/Mailpit) with Resend-compatible interface |
| Provisioning | `CloudProvider` interface + MockProvider + real-provider placeholders |
| Hosting (prod) | Vercel or Node server; Postgres on Neon/Supabase/RDS |

## 2. Runtime topology

```
Browser
  │
  ├── Public marketing (RSC, cached, SEO)  ──► Prisma (read) ──► Postgres
  ├── /dashboard (auth: customer)          ──► Server Actions / API ──► Prisma
  ├── /admin (auth: admin|support)         ──► Server Actions / API ──► Prisma
  └── Stripe Checkout (hosted)
                 │
                 └── webhook ──► /api/webhooks/stripe ──► order/invoice/sub/service
                                            │
                                            └── ProvisioningJob ──► CloudProvider
                                                                         └── MockProvider (local)
```

## 3. Directory structure

```
app/
  (public)/            marketing + product + policy + blog/KB pages, sitemap, robots
  (auth)/              login, register, verify, forgot/reset password
  dashboard/           customer area (RBAC: customer+)
  admin/               admin area (RBAC: admin/support)
  checkout/            cart review + checkout start + success/cancel
  api/
    webhooks/stripe/   Stripe webhook receiver (signature verified)
    cron/              renewal reminders, job worker tick (placeholder)
components/
  ui/                  shadcn primitives
  marketing/ pricing/ checkout/ dashboard/ admin/ forms/
lib/
  db/                  Prisma client singleton
  auth/                Auth.js config, password hashing, RBAC guards
  stripe/              client, product/price sync, checkout, webhook handlers
  providers/           CloudProvider interface + Mock + placeholders + registry
  email/               transport + typed templates
  seo/                 metadata helpers + JSON-LD builders
  validators/          Zod schemas
  permissions/         role/permission matrix + guards
  pricing/             price math (term discount, totals, currency)
  crypto/              credential encryption abstraction (AES-GCM)
  rate-limit/          rate limit abstraction (in-memory dev / Redis prod)
prisma/                schema.prisma, seed.ts, migrations
emails/                react/html email templates
types/                 shared TS types
config/                brand.ts, site.ts, nav.ts, env.ts
docs/                  these planning docs + deployment checklist
```

## 4. Authentication & RBAC

- **Auth.js (NextAuth v5)** with Credentials provider; passwords hashed with `bcrypt`.
- Email verification token required before login is "fully" enabled (sign-in allowed but
  gated features flagged); password reset via signed token.
- JWT session stores `userId` + `role`. Roles: `CUSTOMER`, `SUPPORT`, `ADMIN`.
- **Guards** in `lib/permissions`: `requireUser()`, `requireRole(role)`, `can(user, action)`.
- Middleware protects `/dashboard/*` (any authed) and `/admin/*` (admin|support); per-action
  server-side authorization re-checked in every Server Action / route (never trust middleware
  alone). Ownership checks on all customer resources (order/invoice/service belongs to user).
- 2FA: schema + UI placeholder (`twoFactorEnabled`), enforcement stubbed.

## 5. Pricing — single source of truth

- **No price is ever hardcoded in UI.** Public pages, cart, checkout, invoices, and Stripe
  all read from `Plan` / `PlanPrice` / `PlanLocationPrice` / `Addon`.
- `lib/pricing` computes term discounts, totals, setup fees, coupon application — used
  identically server-side (checkout/invoice) and for display.
- Admin edits prices → optional "Sync to Stripe" creates/updates Stripe Price objects and
  stores `stripePriceId`. Checkout refuses to start if a required `stripePriceId` is missing
  (clear admin-facing error), unless running in **seeded placeholder mode** for local dev.

## 6. Checkout & fulfillment pipeline

1. Configure plan (cycle, location, add-ons) → Cart (DB-backed, also guest cookie cart).
2. Auth (register/login) → billing details (Zod-validated).
3. Apply coupon (validated server-side).
4. Create Stripe Checkout Session (subscription line for plan + one-time lines for setup/add-ons).
5. Stripe webhook (`checkout.session.completed`, `invoice.paid`, `customer.subscription.*`,
   `invoice.payment_failed`) → idempotent handlers:
   - upsert `Subscription`, create `Order`(paid) + `Invoice`(paid) + `Payment`,
   - create `ServiceInstance` (status `PENDING`),
   - enqueue `ProvisioningJob`.
6. Provisioning worker runs job → `CloudProvider.provision()` (Mock) → store encrypted
   credentials → `ServiceInstance` `ACTIVE` → send welcome email.
7. Success page + dashboard reflect new service.

Webhook handlers are **idempotent** (keyed on Stripe event id + resource id) so retries are safe.

## 7. Provisioning provider abstraction

```ts
interface CloudProvider {
  id: string;
  provision(input: ProvisionInput): Promise<ProvisionResult>;   // returns credentials/endpoints
  suspend(ref): Promise<void>;
  resume(ref): Promise<void>;
  cancel(ref): Promise<void>;
  upgrade(ref, plan): Promise<void>;
  status(ref): Promise<ProviderStatus>;
}
```

Implementations: `MockProvider` (fully working locally — generates fake IP/host/root creds),
plus placeholders `HetznerProvider`, `DigitalOceanProvider`, `VultrProvider`, `WhmCpanelProvider`,
`DomainRegistrarProvider`, `EmailHostingProvider` (throw `NotImplemented` with clear TODOs).
A `registry` maps `Product.providerKey` → provider; default `mock`.

## 8. Security

Zod on every input; RBAC + ownership server-side; bcrypt passwords; Stripe webhook signature
verification; AES-256-GCM credential encryption (`lib/crypto`, key from env); rate-limit
abstraction; admin audit log on every privileged mutation; no secrets client-side; safe error
handler that hides stack traces in production; Acceptable Use Policy + abuse-prevention fields.

## 9. SEO & performance

Per-page `generateMetadata`; JSON-LD (Organization, WebSite, Product, Service, FAQ,
BreadcrumbList); dynamic `sitemap.xml` + `robots.txt`; RSC-first with client islands only for
interactivity; image optimization; loading skeletons + empty states; internal linking between
product pages; cached marketing queries.

## 10. Local-first guarantee

Everything runs locally with Docker Postgres + Stripe test keys + MockProvider. Stripe can run
in **placeholder mode** (seeded fake price ids) so the UI/flow works even before real Stripe
setup; `stripe listen` instructions provided for full webhook testing.
