# Aethon Cloud — Database Design

PostgreSQL via Prisma. Money stored as **integer minor units** (cents) + `currency` to avoid
float errors. Timestamps `createdAt`/`updatedAt` on all mutable models. Soft flags
(`isActive`) instead of hard deletes where catalog history matters.

## Enums

- `Role`: CUSTOMER | SUPPORT | ADMIN
- `BillingCycle`: MONTHLY | QUARTERLY | SEMIANNUAL | ANNUAL | BIENNIAL
- `ProductType`: SHARED | WORDPRESS | WOOCOMMERCE | CLOUD | VPS | DEDICATED | STORAGE | BACKUP | GPU | EMAIL | DOMAIN | SSL | SECURITY | MIGRATION | AGENCY | MANAGED_CLOUD | DEVOPS | KUBERNETES | BUILDER | ADDON
- `OrderStatus`: PENDING | PAID | PROCESSING | ACTIVE | CANCELLED | REFUNDED | FAILED
- `InvoiceStatus`: DRAFT | OPEN | PAID | VOID | UNCOLLECTIBLE | REFUNDED
- `PaymentStatus`: PENDING | SUCCEEDED | FAILED | REFUNDED
- `SubscriptionStatus`: ACTIVE | TRIALING | PAST_DUE | CANCELED | INCOMPLETE | UNPAID | PAUSED
- `ServiceStatus`: PENDING | PROVISIONING | ACTIVE | SUSPENDED | CANCELLED | FAILED | EXPIRED
- `ProvisioningStatus`: QUEUED | RUNNING | SUCCEEDED | FAILED | RETRYING
- `TicketStatus`: OPEN | PENDING | ANSWERED | CLOSED
- `TicketPriority`: LOW | NORMAL | HIGH | URGENT
- `CouponType`: PERCENT | FIXED
- `DiscountScope`: ALL | CATEGORY | PRODUCT | PLAN

## Models (grouped)

### Identity / auth
- **User** — id, email (unique), name, hashedPassword?, role, emailVerified?, image?,
  twoFactorEnabled, stripeCustomerId?, relations to everything customer-owned.
- **Account / Session / VerificationToken** — Auth.js adapter models.
- **UserProfile** — 1:1 User: company, phone, address, city, country, postalCode, taxId.
- **PasswordResetToken** — token, userId, expiresAt.
- **AdminLog** — actorId, action, entityType, entityId, metadata(JSON), ip, createdAt.

### Catalog
- **ProductCategory** — name, slug, description, icon, sortOrder, isActive.
- **Product** — name, slug, shortDescription, description, categoryId, type(ProductType),
  providerKey, isActive, inquiryOnly, featured, sortOrder, seoTitle, seoDescription,
  heroHeadline, heroSubheadline, specs(JSON), faq(JSON), stripeProductId?.
- **Plan** — productId, name, slug, description, supportLevel, isActive, popular, recommended,
  onSale, stockStatus, sortOrder, specs(JSON: cpu, ram, storage, bandwidth, websites,
  emailAccounts, ssl, backups, ddos, ...), configurable(JSON resource ranges).
- **PlanFeature** — planId, label, value?, included(bool), sortOrder, highlight.
- **PlanPrice** — planId, billingCycle, currency, amount(cents), renewalAmount(cents),
  setupFee(cents), discountPercentage, isActive, stripePriceId?, stripeProductId?. Unique
  (planId, billingCycle, currency).
- **ServerLocation** — name, slug, city, country, countryCode, region, flagEmoji, latitude,
  longitude, isActive, sortOrder.
- **PlanLocationPrice** — planId, locationId, priceModifier(cents, +/-), isAvailable. Unique
  (planId, locationId). Optional per-location override of base price.
- **Addon** — name, slug, description, type, billingType(ONE_TIME|RECURRING), currency,
  amount(cents), renewalAmount?, billingCycle?, isActive, stripePriceId?, stripeProductId?.
- **PlanAddon** — planId, addonId, required(bool), defaultSelected(bool). Which add-ons apply
  to which plans.

### Commerce
- **Cart** — userId? (nullable for guest), sessionToken?, currency, relations CartItem.
- **CartItem** — cartId, planId, billingCycle, locationId?, quantity, configSnapshot(JSON),
  selectedAddonIds(JSON), unitAmount(cents snapshot), couponCode?.
- **Coupon** — code(unique), type(CouponType), value, scope(DiscountScope), targetId?,
  maxRedemptions?, timesRedeemed, perUserLimit, minSubtotal?, startsAt?, endsAt?, isActive.
- **CouponRedemption** — couponId, userId, orderId, amountDiscounted, createdAt.
- **Order** — number(unique), userId, status(OrderStatus), currency, subtotal, discountTotal,
  setupTotal, taxTotal, total, couponCode?, stripeCheckoutSessionId?, notes?, relations.
- **OrderItem** — orderId, productId, planId, addonId?, description, billingCycle?, locationId?,
  quantity, unitAmount, setupFee, lineTotal, configSnapshot(JSON).
- **Invoice** — number(unique), userId, orderId?, subscriptionId?, status(InvoiceStatus),
  currency, subtotal, discountTotal, taxTotal, total, amountPaid, dueAt?, paidAt?,
  stripeInvoiceId?, hostedInvoiceUrl?, pdfUrl?, relations InvoiceItem.
- **InvoiceItem** — invoiceId, description, quantity, unitAmount, lineTotal.
- **Payment** — userId, invoiceId?, orderId?, status(PaymentStatus), currency, amount,
  method, stripePaymentIntentId?, stripeChargeId?, failureReason?, createdAt.
- **Subscription** — userId, planId, status(SubscriptionStatus), billingCycle, currency,
  amount, currentPeriodStart, currentPeriodEnd, cancelAtPeriodEnd, canceledAt?,
  stripeSubscriptionId?, stripePriceId?, relations ServiceInstance.

### Provisioning / services
- **ServiceInstance** — userId, orderId?, subscriptionId?, productId, planId, locationId?,
  label, status(ServiceStatus), providerKey, providerRef?, primaryIp?, hostname?,
  credentialsEncrypted?(text), specsSnapshot(JSON), addonsSnapshot(JSON), renewsAt?,
  suspendedAt?, cancelledAt?, expiresAt?, relations ProvisioningJob.
- **ProvisioningJob** — serviceInstanceId, type(PROVISION|SUSPEND|RESUME|CANCEL|UPGRADE),
  status(ProvisioningStatus), attempts, maxAttempts, lastError?, payload(JSON), result(JSON),
  scheduledAt, startedAt?, finishedAt?.

### Support / content
- **SupportTicket** — number(unique), userId, serviceInstanceId?, subject, status, priority,
  category, assignedToId?, lastReplyAt, relations TicketMessage.
- **TicketMessage** — ticketId, authorId, body, isStaff, attachments(JSON?), createdAt.
- **KnowledgeBaseCategory** — name, slug, description, icon, sortOrder.
- **KnowledgeBaseArticle** — categoryId, title, slug, excerpt, body(MD), tags(JSON),
  published, views, seoTitle, seoDescription, publishedAt.
- **BlogPost** — title, slug, excerpt, body(MD), coverImage?, authorId, tags(JSON), published,
  seoTitle, seoDescription, publishedAt, views.
- **Announcement** — title, body, level(INFO|WARNING|CRITICAL), audience(ALL|CUSTOMERS|ADMINS),
  startsAt, endsAt?, isActive.

## Relationship highlights

```
User ─1:1─ UserProfile
User ─1:N─ Order, Invoice, Payment, Subscription, ServiceInstance, SupportTicket, Cart
ProductCategory ─1:N─ Product ─1:N─ Plan ─1:N─ PlanPrice, PlanFeature, PlanAddon
Plan ─N:M (via PlanLocationPrice)─ ServerLocation
Plan ─N:M (via PlanAddon)─ Addon
Order ─1:N─ OrderItem ; Order ─1:N─ Invoice ; Order ─1:1?─ Subscription
Subscription ─1:N─ ServiceInstance ─1:N─ ProvisioningJob
Invoice ─1:N─ InvoiceItem, Payment
SupportTicket ─1:N─ TicketMessage
Coupon ─1:N─ CouponRedemption
```

## Money & pricing rules

- All amounts integer cents; display via `lib/pricing.formatMoney`.
- `PlanPrice.amount` = promo effective price for that cycle; `renewalAmount` = post-term.
- Effective monthly = amount / months(cycle); discount badge derived from renewal vs promo.
- Location can adjust price via `PlanLocationPrice.priceModifier`.
- Coupons applied server-side at checkout; redemption recorded for limits.
