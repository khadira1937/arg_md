# CloudynHost — Original Product Catalog & Pricing Plan

Original brand, names, and copy. Pricing **mirrors competitor structure/positioning** (tier
gaps, term discounts, renewal uplift, setup fees, inquiry-only enterprise) without copying
exact numbers. All values live in the DB (seed) and are admin-editable.

## Billing cycles & term discount logic

| Cycle | Months | Term discount vs monthly (managed) | Term discount (infra) |
|---|---|---|---|
| MONTHLY | 1 | 0% | 0% |
| QUARTERLY | 3 | ~5% | ~5% |
| SEMIANNUAL | 6 | ~10% | ~8% |
| ANNUAL | 12 | ~25% | ~12% |
| BIENNIAL | 24 | ~40% (promo) | ~18% |

Managed/shared products use **promo price now, higher renewal** (Hostinger pattern).
Infrastructure products use **flatter pricing, renewal ≈ promo** (VSYS pattern). Setup fees
apply to some bare-metal SKUs. `discountPercentage` on `PlanPrice` drives the struck-through
anchor + "Save X%" badge.

## Categories & products (seeded)

### Category: Web Hosting — product **Web Hosting** (type SHARED)
| Plan | Monthly | Annual eff. | Renewal | Specs |
|---|---|---|---|---|
| Launch | $2.79 | $2.09/mo | $7.99 | 1 site, 50 GB NVMe, 1 mailbox, free SSL |
| Grow (popular) | $3.49 | $2.59/mo | $8.99 | 100 sites, 100 GB NVMe, free domain+email |
| Scale | $4.99 | $3.79/mo | $11.99 | 200 GB NVMe, daily backups, CDN, more CPU |

### Category: Web Hosting — product **WordPress Hosting** (type WORDPRESS)
| Plan | Monthly | Renewal | Specs |
|---|---|---|---|
| WP Start | $3.49 | $8.99 | Managed WP, staging, 100 GB |
| WP Business (popular) | $4.99 | $11.99 | WP-CLI, object cache, 200 GB |
| WP Pro | $9.99 | $19.99 | 2 vCPU/3 GB dedicated, 200 GB NVMe |

### Category: Web Hosting — product **WooCommerce Hosting** (type WOOCOMMERCE)
| Plan | Monthly | Renewal | Specs |
|---|---|---|---|
| Store Start | $4.49 | $9.99 | Store-ready WP, 100 GB |
| Store Growth (popular) | $6.99 | $13.99 | 200 GB NVMe, dedicated resources |
| Store Pro | $12.99 | $22.99 | 4 vCPU/6 GB, 250 GB NVMe |

### Category: Web Hosting — product **Cloud Hosting** (type CLOUD)
| Plan | Monthly | Renewal | Specs |
|---|---|---|---|
| Cloud Start | $9.99 | $19.99 | 2 vCPU, 3 GB, 200 GB NVMe, dedicated IP |
| Cloud Pro (popular) | $14.99 | $29.99 | 4 vCPU, 6 GB, 250 GB NVMe |
| Cloud Enterprise | $29.99 | $49.99 | 6 vCPU, 12 GB, 300 GB NVMe |

### Category: Web Hosting — product **Agency Hosting** (type AGENCY)
| Plan | Monthly | Renewal | Specs |
|---|---|---|---|
| Agency 10 | $24.99 | $44.99 | 10 client sites, seats, client billing |
| Agency 25 (popular) | $49.99 | $79.99 | 25 sites, white-label |
| Agency Unlimited | $99.99 | $149.99 | Unlimited sites, priority support |

### Category: Servers — product **VPS Hosting** (type VPS)
| Plan | Monthly | Renewal | Specs |
|---|---|---|---|
| KVM Nano | $4.99 | $8.99 | 1 vCPU, 4 GB, 50 GB NVMe, 4 TB |
| KVM Core (popular) | $7.99 | $12.99 | 2 vCPU, 8 GB, 100 GB NVMe, 8 TB |
| KVM Plus | $11.99 | $18.99 | 4 vCPU, 16 GB, 200 GB NVMe, 16 TB |
| KVM Max | $22.99 | $32.99 | 8 vCPU, 32 GB, 400 GB NVMe, 32 TB |

### Category: Servers — product **Dedicated Servers** (type DEDICATED)
| Plan | Monthly | Setup | Specs |
|---|---|---|---|
| Metal Start | $89 | $0 | 4c Xeon, 32 GB, 2×1 TB SSD, 20 TB |
| Metal Pro (popular) | $139 | $0 | 8c Xeon, 64 GB, 2×2 TB NVMe, 30 TB |
| Metal Performance | $229 | $49 | 16c+ dual Xeon, 128 GB, 4×2 TB NVMe |

### Category: Servers — product **USA Dedicated Servers** (type DEDICATED, location-locked US)
| Plan | Monthly | Specs |
|---|---|---|
| US Start | $99 | 8c, 32 GB, NVMe, 1 Gbps, Ashburn/LA |
| US Business (popular) | $159 | 16c, 64 GB, NVMe, 1 Gbps |
| US 10Gbps Pro | $239 | 16c, 128 GB, NVMe, **10 Gbps** |

### Category: Servers — product **Europe Dedicated Servers** (type DEDICATED, EU-locked)
| Plan | Monthly | Specs |
|---|---|---|
| EU Start | $89 | 8c, 32 GB, NVMe, Frankfurt/Amsterdam |
| EU Performance (popular) | $149 | 16c, 64 GB, NVMe |
| EU Enterprise | $239 | dual Xeon, 128 GB, NVMe |

### Category: Servers — product **GPU Servers** (type GPU)
| Plan | Monthly | Specs |
|---|---|---|
| GPU Start | $349 | 1× mid GPU, 8c, 64 GB, NVMe |
| GPU Pro (popular) | $899 | 1× high GPU, 16c, 128 GB, NVMe, 10 Gbps |
| GPU Enterprise | $1,799 | 2× high GPU, 32c, 256 GB |

### Category: Servers — product **Storage Servers** (type STORAGE)
| Plan | Monthly | Specs |
|---|---|---|
| Storage Slim | $49 | 4c, 16 GB, 2×4 TB HDD (~8 TB) |
| Storage Thick (popular) | $89 | 4c, 16 GB, 4×4 TB HDD (~16 TB) |
| Storage Big | $139 | 8c, 32 GB, 6×8 TB HDD (~48 TB) |
| Storage Massive | $199 | 8c, 32 GB, 12×8 TB HDD (~96 TB) |

### Category: Servers — product **10Gbps Servers** (type DEDICATED)
| Plan | Monthly | Specs |
|---|---|---|
| 10G Core | $199 | 8c, 64 GB, NVMe, 10 Gbps unmetered* |
| 10G Pro (popular) | $329 | 16c, 128 GB, NVMe, 10 Gbps |
| 10G Max | $499 | dual Xeon, 256 GB, 10 Gbps |

### Category: Domains & Email — product **Business Email** (type EMAIL)
| Plan | Monthly/mbx | Renewal | Specs |
|---|---|---|---|
| Mail Basic | $0.99 | $1.59 | 10 GB/mailbox |
| Mail Pro (popular) | $2.49 | $3.49 | 50 GB/mailbox, larger attach |

### Category: Domains & Email — product **Domains** (type DOMAIN, inquiry/search UI)
Domain search UI; price examples seeded as reference TLD table (.com $9.99 reg / $15.99 renew).

### Category: Security — product **SSL Certificates** (type SSL)
| Plan | Yearly | Specs |
|---|---|---|
| SSL DV | $0 (free) / $12 | Domain-validated |
| SSL Wildcard (popular) | $59 | *.domain |
| SSL EV | $129 | Extended validation |

### Category: Security — product **DDoS Protection** (type SECURITY)
| Plan | Monthly | Specs |
|---|---|---|
| Shield Standard | $19 | Always-on L3/4, up to X Gbps |
| Shield Advanced (popular) | $79 | L3/4/7, higher capacity |
| Shield Enterprise | $199 | Custom scrubbing |

### Category: Security — product **Backup Storage** (type BACKUP)
| Plan | Monthly | Specs |
|---|---|---|
| Backup 1 TB | $5 | Offsite, encrypted |
| Backup 5 TB (popular) | $22 | |
| Backup 10 TB | $40 | |
| Backup 50 TB | $180 | |

### Category: Services — products (mostly inquiry-only)
- **Website Migration** (type MIGRATION): Free with annual plans / $29 standalone.
- **Managed Private Cloud** (type MANAGED_CLOUD): **inquiry-only**.
- **DevOps Services** (type DEVOPS): **inquiry-only** (retainer tiers shown as "from $1,500/mo").
- **Kubernetes Solutions** (type KUBERNETES): **inquiry-only** / "from $99/node".
- **Website Builder** (type BUILDER): Builder Basic $2.99 / Builder Pro $5.99.

## Add-ons (seeded, attachable to plans)
Daily Backups ($2.99/mo), Weekly Backups ($1.49/mo), Extra IPv4 ($3/mo), DDoS Protection
($19/mo), Server Management ($25/mo), Priority Support ($15/mo), Website Migration ($29 once),
SSL Certificate ($12/yr), Control Panel License ($14/mo), Extra Storage ($5/50 GB/mo), Extra
Bandwidth ($9/TB/mo), Malware Scanner ($4/mo), CDN ($6/mo), Domain Privacy ($9.99/yr).

## Server locations (seeded)
Ashburn US-East, Los Angeles US-West, Frankfurt DE, Amsterdam NL, London UK, Singapore SG,
São Paulo BR, Sydney AU. VPS/dedicated/storage/GPU expose location selector; some SKUs
location-locked (USA/EU dedicated).

## Badges & merchandising
`popular`, `recommended`, `onSale` booleans per plan drive "Most Popular" / "Recommended" /
"Sale" badges. Middle tier is popular by default. Discount badge derived from
`renewalAmount` vs promo `amount` and from `discountPercentage`.
