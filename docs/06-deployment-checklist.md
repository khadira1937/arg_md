# Production Deployment Checklist

## Environment & secrets
- [ ] Set strong `AUTH_SECRET` (`openssl rand -base64 48`)
- [ ] Set 32-byte `ENCRYPTION_KEY` (`openssl rand -base64 32`) — store in a secrets manager/KMS
- [ ] `NODE_ENV=production`, `APP_URL` / `NEXT_PUBLIC_APP_URL` set to the real domain
- [ ] `STRIPE_PLACEHOLDER_MODE=false` with live **test→live** keys as appropriate
- [ ] `STRIPE_WEBHOOK_SECRET` from the production webhook endpoint
- [ ] Real SMTP or `RESEND_API_KEY` configured; verify sender domain (SPF/DKIM/DMARC)
- [ ] Rotate the seeded demo passwords / delete demo users

## Database
- [ ] Managed Postgres (Neon/Supabase/RDS) with backups + PITR
- [ ] `prisma migrate deploy` in the release pipeline (not `migrate dev`)
- [ ] Connection pooling (PgBouncer / Prisma Accelerate / driver adapter) for serverless
- [ ] Run `npm run db:seed` once (or a production-safe subset) for catalog data

## Stripe
- [ ] Create products/prices via `npm run stripe:sync` against the live account
- [ ] Configure the live webhook → `/api/webhooks/stripe` for required events
- [ ] Verify signature checking is on (it is, in the handler)
- [ ] Test the full checkout → webhook → provisioning → email flow in test mode first

## Provisioning
- [ ] Replace MockProvider with a real provider per `Product.providerKey`
- [ ] Supply provider API credentials via env/secrets
- [ ] Configure the job worker (cron hitting `/api/worker/tick` or a queue consumer)
- [ ] Confirm credentials are encrypted at rest (`lib/crypto`)

## Security
- [ ] HTTPS everywhere; HSTS; secure cookies (already gated on `NODE_ENV=production`)
- [ ] Swap in a real rate limiter (Redis/Upstash) behind `lib/rate-limit`
- [ ] Review RBAC on every admin action + ownership checks on customer resources
- [ ] CSP headers; review `next.config.mjs` headers
- [ ] Dependency audit (`npm audit`), enable Dependabot/renovate
- [ ] Ensure stack traces are not leaked (production error boundaries)

## SEO & performance
- [ ] `sitemap.xml` + `robots.txt` reachable; submit to Search Console
- [ ] Verify JSON-LD (Organization, Product, FAQ, Breadcrumb) with Rich Results test
- [ ] OG image, favicon, canonical URLs
- [ ] Lighthouse pass; image optimization; caching headers

## Observability
- [ ] Error tracking (Sentry), uptime monitoring, log aggregation
- [ ] Stripe + provisioning failure alerts
- [ ] DB and app metrics/dashboards

## Release
- [ ] CI: typecheck + lint + build on PRs
- [ ] Staging environment mirrors production
- [ ] Rollback plan + database migration safety review
