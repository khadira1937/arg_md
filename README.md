# CloudynHost

A production-grade **cloud hosting platform** MVP — marketing site, DB-driven product
catalog & pricing, authentication, cart, checkout (Stripe), provisioning, and customer +
admin dashboards. Built with Next.js (App Router), TypeScript, Tailwind, Prisma & PostgreSQL.

> Brand, copy, design and pricing are **original**. Hostinger & VSYS were used only as
> commercial/UX references (see [`docs/01-competitor-research.md`](docs/01-competitor-research.md)).
> Payments are **Stripe only** — no PayPal anywhere in the stack.

## Tech stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS · shadcn-style UI · Framer Motion ·
Prisma · PostgreSQL · custom JWT auth (jose + bcrypt) · Stripe · Zod · Nodemailer/Resend ·
provider abstraction (MockProvider + placeholders).

## Documentation

- [`docs/01-competitor-research.md`](docs/01-competitor-research.md) — research + pricing matrix
- [`docs/02-architecture.md`](docs/02-architecture.md) — architecture plan
- [`docs/03-database-design.md`](docs/03-database-design.md) — data model
- [`docs/04-catalog-and-pricing.md`](docs/04-catalog-and-pricing.md) — original catalog & pricing
- [`docs/05-roadmap.md`](docs/05-roadmap.md) — implementation roadmap
- [`docs/06-deployment-checklist.md`](docs/06-deployment-checklist.md) — production checklist

## Prerequisites

- Node.js 20+ (tested on 24)
- Docker (for local Postgres + mail) — or your own Postgres
- A Stripe test account (optional; the app runs in **placeholder mode** without one)

## Quick start (local)

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env        # defaults already match docker-compose

# 3. Start Postgres (+ Mailpit mail catcher) via Docker
docker compose up -d        # or: docker-compose up -d   (Compose v1)

# 4. Apply the schema and seed the catalog + demo users
npx prisma migrate dev
npm run db:seed

# 5. Run the app
npm run dev                 # http://localhost:3000
```

> **WSL + Docker Desktop note:** if `docker` errors with `docker-credential-desktop.exe
> not installed`, run commands with a clean config: `DOCKER_CONFIG=/tmp/dockercfg
> docker-compose up -d` after `mkdir -p /tmp/dockercfg && echo '{}' > /tmp/dockercfg/config.json`.

### Demo accounts (created by the seed)

| Role | Email | Password |
|---|---|---|
| Admin | `admin@cloudynhost.com` | `Admin123!` |
| Support | `support@cloudynhost.com` | `Support123!` |
| Customer | `customer@example.com` | `Customer123!` |

Local mail (verification, reset, receipts) is viewable at **http://localhost:8025** (Mailpit).

## Stripe (test mode)

The app ships with `STRIPE_PLACEHOLDER_MODE=true`, which seeds deterministic placeholder
price ids so the full catalog/cart/checkout UI works **without** a Stripe account.

To use real Stripe test mode:

1. Add `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `.env`.
2. Set `STRIPE_PLACEHOLDER_MODE=false`.
3. Sync the catalog into Stripe: `npm run stripe:sync` (creates Products + Prices, stores ids).
4. Forward webhooks locally:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   Copy the printed `whsec_...` into `STRIPE_WEBHOOK_SECRET`.

## Provisioning

Services are fulfilled through a `CloudProvider` abstraction. Locally everything uses
**MockProvider** (generates realistic credentials/IPs). Real providers (Hetzner,
DigitalOcean, Vultr, WHM/cPanel, domain registrar, email hosting) are stubbed in
[`lib/providers/`](lib/providers/) with clear `TODO`s — drop in API clients to go live.

## Useful scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (runs `prisma generate`) |
| `npm run db:seed` | Seed catalog, locations, add-ons, demo users |
| `npm run db:reset` | Drop, re-migrate and re-seed |
| `npm run prisma:studio` | Browse the database |
| `npm run stripe:sync` | Sync DB catalog → Stripe products/prices |
| `npm run email:test [addr]` | Send a test email via the active transport |
| `npm run typecheck` | `tsc --noEmit` |

## Transactional email

Email works with **either Resend or SMTP** — Resend is used automatically when
`RESEND_API_KEY` is set, otherwise SMTP. The active transport, a config checklist
and a "send test email" button are available to staff at **`/admin/email`**.

**Local development (default):** `docker compose up -d` starts **Mailpit**. All
email is captured at **http://localhost:8025** — nothing leaves your machine and
no credentials are required.

**Production — Resend (recommended):**
```bash
RESEND_API_KEY=re_xxx
EMAIL_FROM="CloudynHost <no-reply@yourdomain.com>"   # domain verified in Resend
```

**Production — SMTP (Postmark / SES / Mailgun / etc.):**
```bash
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587            # 465 if using TLS
SMTP_USER=...
SMTP_PASS=...
SMTP_SECURE=false        # true for port 465
EMAIL_FROM="CloudynHost <no-reply@yourdomain.com>"
```

Verify delivery any time with `npm run email:test you@example.com` or from `/admin/email`.

**Events sent:** email verification, password reset, order confirmation, payment
confirmation, invoice paid, admin new-order notification, support ticket
created/replied, and **service delivered** (manual fulfillment — sends the
management link only). Emails **never** contain passwords or internal admin notes.

## Project structure

```
app/         (public) marketing & catalog · (auth) · dashboard · admin · api · actions
components/  ui · marketing · pricing · dashboard · auth · seo
lib/         db · auth · stripe · providers · email · seo · validators · permissions · pricing · cart · crypto · audit · rate-limit
prisma/      schema.prisma · migrations · seed
config/      brand · site · nav · env
docs/        planning docs + deployment checklist
emails/      transactional templates
```

## Pricing is database-driven

No price is hardcoded in the UI. Public pages, cart, checkout and invoices all read
`Plan` / `PlanPrice` / `PlanLocationPrice` / `Addon`. Admins edit prices in the DB/admin and
the whole site reflects it; `npm run stripe:sync` mirrors them into Stripe.

## License

Proprietary — sample project scaffold. Replace branding in [`config/brand.ts`](config/brand.ts).
