# Competitor Research Summary & Pricing Matrix

> **Purpose:** Commercial / UX / pricing reference only. We study Hostinger and VSYS to
> understand service categories, tier structure, discount logic, and feature-comparison
> patterns. We copy **none** of their UI, copy, assets, logos, colors, icons, or brand.
> All figures below are **approximate market-reference values** used to position our
> original catalog; they are not scraped verbatim and will drift over time.

---

## 1. Hostinger-style product taxonomy

Hostinger positions as a **mass-market, shared-first** host that ladders customers upward
into managed cloud and VPS. Key categories:

| Product | Positioning | Buyer | Commercial hook |
|---|---|---|---|
| Web Hosting | Entry shared hosting | First site / hobby / SMB | Very low intro price, high renewal |
| WordPress Hosting | Managed WP on shared infra | WP users, bloggers | Managed updates, WP tooling |
| WooCommerce Hosting | WP + store tuning | Small online stores | Store-ready stack |
| Cloud Hosting | Isolated resources, still managed | Growing sites / agencies | Dedicated resources w/o sysadmin |
| VPS Hosting | KVM virtual machines | Developers / power users | Root access, scalable specs |
| Website Builder | DIY drag-drop | Non-technical | All-in-one site + hosting |
| Domains | Registration / transfer | Everyone | Loss-leader / first-year cheap |
| Business Email | Mailboxes | SMB | Per-mailbox monthly |
| SSL Certificates | Security add-on | Everyone | Often bundled free, upsell EV/wildcard |
| Migration Service | Done-for-you move | Switchers | Free/cheap to reduce switching cost |
| Agency Hosting | Multi-site + client mgmt | Agencies / freelancers | Seats, client billing, bulk |

**Discount logic (Hostinger pattern):** deep first-term discount (e.g. 48-month term shows
~70–80% off), **renewal at full price**, longer term = lower effective monthly. Always shows
"most popular" middle tier and a struck-through anchor price.

## 2. VSYS-style product taxonomy

VSYS positions as an **infrastructure / unmanaged-to-managed** provider for heavier workloads:

| Product | Positioning | Buyer | Commercial hook |
|---|---|---|---|
| VPS Hosting | KVM VPS, multi-region | Devs, resellers | Cheap monthly, hourly-ish flexibility |
| Dedicated Servers | Bare metal | High-load apps | Raw performance, full hardware |
| USA Dedicated Servers | Geo SKU | US-latency buyers | Location-specific stock |
| Europe Dedicated Servers | Geo SKU | EU/GDPR buyers | Location-specific stock |
| Storage Servers | High-capacity HDD | Backup / media | $/TB efficiency |
| Backup Storage | Offsite backup space | Everyone | Flat $/TB tiers |
| GPU Servers | Accelerated compute | AI/ML, rendering | Per-GPU pricing, high ticket |
| DDoS Protection | Network security | Anyone exposed | Always-on mitigation tiers |
| Managed Private Cloud | Dedicated virtualization | Enterprise | Inquiry / quote-based |
| DevOps Services | Professional services | Teams without ops | Retainer / inquiry |
| Kubernetes / Cloud Solutions | Managed k8s | Cloud-native teams | Cluster pricing / inquiry |
| 10Gbps Servers | High-bandwidth SKU | Streaming/CDN | Premium uplink |
| Streaming Servers | Media delivery | Broadcasters | Bandwidth-heavy |

**Discount logic (VSYS pattern):** flatter monthly pricing, **term commitment discounts**
(quarterly/semi-annual/annual), **setup fees** on some bare-metal SKUs, geo/stock-based
availability, and **inquiry-only** pricing for enterprise (private cloud, DevOps, k8s).

---

## 3. Competitor pricing matrix (approximate reference)

Monthly = effective monthly on the promoted term. Renewal = post-term monthly. Currency USD.

### Hostinger-style (shared / managed)

| Competitor | Category | Plan | Monthly | Yearly | Renewal | Setup | CPU | RAM | Storage | Bandwidth | Location | Key features | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hostinger | Web Hosting | Single | ~$2.99 | ~$35 | ~$7.99 | $0 | shared | shared | 50 GB SSD | ~10k visits | Multi | 1 site, 1 mailbox, free SSL | Intro term deep discount |
| Hostinger | Web Hosting | Premium | ~$3.49 | ~$42 | ~$8.99 | $0 | shared | shared | 100 GB SSD | ~25k visits | Multi | 100 sites, free domain, free email | "Most popular" |
| Hostinger | Web Hosting | Business | ~$4.49 | ~$54 | ~$11.99 | $0 | shared+ | shared+ | 200 GB NVMe | ~100k visits | Multi | Daily backups, CDN, more CPU | Upsell tier |
| Hostinger | WordPress | WP Premium | ~$3.49 | ~$42 | ~$8.99 | $0 | shared | shared | 100 GB | ~25k visits | Multi | Managed WP, staging | Same infra as web |
| Hostinger | WordPress | WP Business | ~$4.49 | ~$54 | ~$11.99 | $0 | shared+ | shared+ | 200 GB NVMe | ~100k visits | Multi | WP-CLI, object cache | Most popular |
| Hostinger | WordPress | WP Cloud Startup | ~$9.99 | ~$120 | ~$19.99 | $0 | 2 vCPU | 3 GB | 200 GB NVMe | ~200k visits | Multi | Dedicated resources | Cloud ladder |
| Hostinger | WooCommerce | Woo Starter | ~$3.99 | ~$48 | ~$9.99 | $0 | shared | shared | 100 GB | ~25k visits | Multi | Store-ready WP | |
| Hostinger | Cloud Hosting | Cloud Startup | ~$9.99 | ~$120 | ~$19.99 | $0 | 2 vCPU | 3 GB | 200 GB NVMe | ~200k visits | Multi | Dedicated IP, isolated | |
| Hostinger | Cloud Hosting | Cloud Professional | ~$14.99 | ~$180 | ~$29.99 | $0 | 4 vCPU | 6 GB | 250 GB NVMe | ~300k visits | Multi | More resources | Most popular |
| Hostinger | Cloud Hosting | Cloud Enterprise | ~$29.99 | ~$360 | ~$49.99 | $0 | 6 vCPU | 12 GB | 300 GB NVMe | ~400k visits | Multi | Top shared-cloud | |
| Hostinger | VPS | KVM 1 | ~$4.99 | ~$60 | ~$8.99 | $0 | 1 vCPU | 4 GB | 50 GB NVMe | 4 TB | Multi | Root, full KVM | |
| Hostinger | VPS | KVM 2 | ~$6.99 | ~$84 | ~$11.99 | $0 | 2 vCPU | 8 GB | 100 GB NVMe | 8 TB | Multi | | Most popular |
| Hostinger | VPS | KVM 4 | ~$9.99 | ~$120 | ~$17.99 | $0 | 4 vCPU | 16 GB | 200 GB NVMe | 16 TB | Multi | | |
| Hostinger | VPS | KVM 8 | ~$19.99 | ~$240 | ~$29.99 | $0 | 8 vCPU | 32 GB | 400 GB NVMe | 32 TB | Multi | | |
| Hostinger | Business Email | Email Starter | ~$0.99/mbx | ~$12 | ~$1.59 | $0 | n/a | n/a | 10 GB/mbx | n/a | Multi | Per-mailbox | |
| Hostinger | Domains | .com | n/a | ~$9.99 | ~$15.99 | $0 | n/a | n/a | n/a | n/a | n/a | First-year cheap | Loss leader |
| Hostinger | Website Builder | Builder | ~$2.99 | ~$36 | ~$8.99 | $0 | shared | shared | 100 GB | ~25k visits | Multi | Drag-drop | |
| Hostinger | Agency | Agency/Cloud | ~$19.99+ | n/a | ~$39.99 | $0 | varies | varies | varies | varies | Multi | Seats, client mgmt | |

### VSYS-style (infrastructure / bare-metal)

| Competitor | Category | Plan | Monthly | Yearly | Renewal | Setup | CPU | RAM | Storage | Bandwidth | Location | Key features | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| VSYS | VPS | VPS S | ~$7 | ~$76 | ~$7 | $0 | 1 vCPU | 2 GB | 25 GB NVMe | ~3 TB / 1 Gbps | US/EU | KVM, full root | Flat renewal |
| VSYS | VPS | VPS M | ~$14 | ~$152 | ~$14 | $0 | 2 vCPU | 4 GB | 50 GB NVMe | ~5 TB | US/EU | | |
| VSYS | VPS | VPS L | ~$28 | ~$305 | ~$28 | $0 | 4 vCPU | 8 GB | 100 GB NVMe | ~10 TB | US/EU | | |
| VSYS | Dedicated | Dedi Entry | ~$80 | n/a | ~$80 | ~$0–49 | Xeon E-2xxx 4c | 32 GB | 2×1 TB SSD | ~20 TB / 1 Gbps | US/EU | Bare metal | Setup sometimes |
| VSYS | Dedicated | Dedi Pro | ~$130 | n/a | ~$130 | ~$0–49 | Xeon 8c | 64 GB | 2×2 TB NVMe | ~30 TB | US/EU | IPMI | |
| VSYS | Dedicated | Dedi Performance | ~$220 | n/a | ~$220 | ~$49 | Dual Xeon 16c+ | 128 GB | 4×2 TB NVMe | 1–10 Gbps | US/EU | High core | |
| VSYS | USA Dedicated | US 10Gbps | ~$199 | n/a | ~$199 | ~$0 | 8–16c | 64–128 GB | NVMe | 10 Gbps | US | High uplink | Geo SKU |
| VSYS | EU Dedicated | EU Perf | ~$150 | n/a | ~$150 | ~$0 | 8–16c | 64 GB | NVMe | 1 Gbps | EU | GDPR region | |
| VSYS | Storage | Storage 1 | ~$50 | n/a | ~$50 | $0 | 4c | 16 GB | 4×4 TB HDD | 1 Gbps | US/EU | High capacity | $/TB |
| VSYS | Storage | Storage Massive | ~$180 | n/a | ~$180 | $0 | 8c | 32 GB | 12×8 TB HDD | 1 Gbps | US/EU | ~96 TB raw | |
| VSYS | Backup Storage | 1 TB | ~$5 | ~$54 | ~$5 | $0 | n/a | n/a | 1 TB | metered | US/EU | Offsite | Flat $/TB |
| VSYS | Backup Storage | 10 TB | ~$40 | ~$432 | ~$40 | $0 | n/a | n/a | 10 TB | metered | US/EU | | |
| VSYS | GPU | GPU Starter | ~$0.5–1/hr or ~$350/mo | n/a | ~$350 | $0 | 8c | 64 GB | NVMe | 1 Gbps | US/EU | 1× mid GPU | High ticket |
| VSYS | GPU | GPU Pro | ~$900/mo | n/a | ~$900 | $0 | 16c | 128 GB | NVMe | 10 Gbps | US/EU | 1–2× high GPU | |
| VSYS | DDoS Protection | Standard / Advanced | ~$20–200 | n/a | same | $0 | n/a | n/a | n/a | scrubbing | Global | Always-on | Add-on or SKU |
| VSYS | Managed Private Cloud | — | inquiry | — | — | — | custom | custom | custom | custom | US/EU | Quote-based | Inquiry-only |
| VSYS | DevOps Services | — | inquiry | — | — | — | n/a | n/a | n/a | n/a | n/a | Retainer | Inquiry-only |
| VSYS | Kubernetes | Managed k8s | inquiry / ~$ per node | — | — | — | per node | per node | per node | — | US/EU | Managed clusters | Inquiry/metered |
| VSYS | 10Gbps Servers | 10G SKU | ~$199+ | n/a | same | $0 | 8–16c | 64 GB+ | NVMe | 10 Gbps | US/EU | Premium uplink | |

---

## 4. Key takeaways that drive our catalog

1. **Two pricing philosophies** must coexist:
   - *Shared/managed (Hostinger-style):* deep intro discount + higher renewal, term-length
     drives effective monthly, free domain/SSL bundling, clear 3-tier ladders.
   - *Infrastructure (VSYS-style):* flatter monthly, term-commit discounts, occasional setup
     fees, geo SKUs, **inquiry-only** enterprise products.
2. **Billing cycles** needed: monthly, 3, 6, 12, 24 months — discount grows with term.
3. **Renewal price** is a first-class field, distinct from promo price.
4. **Location** is a pricing dimension for VPS/dedicated/storage/GPU (per-location price).
5. **Add-ons** are a major revenue lever (backups, extra IPv4, management, DDoS, SSL, etc.).
6. **Inquiry-only** mode is required for Private Cloud / DevOps / Kubernetes.
7. **"Most popular" / "recommended" / "sale"** badges drive conversion on the middle tier.
8. **Feature comparison tables** and **FAQ** are conversion + SEO essentials on every product.

These observations map directly to our Prisma schema (`PlanPrice` per billing cycle,
`PlanLocationPrice`, `Addon`/`PlanAddon`, `inquiryOnly` flag, badge booleans) and to our
public pricing UI (cycle toggle, discount badges, comparison tables).
