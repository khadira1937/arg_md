import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "./fade-up";

/**
 * Forward-Deployed Teams + Growth Operations — dark 2-card band that sits
 * after Stats. Each card is a hairline-outlined tile; on hover the surface
 * deepens a touch and the arrow nudges 4px to the right. No accent here —
 * burnt orange is reserved for primary CTAs and active indicators.
 */
const CARDS = [
  {
    eyebrow: "Forward-Deployed Teams",
    title: "Studio-Embedded Teams",
    body: "Senior strategists, designers and engineers embed alongside your team to deliver real-world commercial outcomes at unprecedented speed.",
    href: "/services",
  },
  {
    eyebrow: "Process Automation",
    title: "Growth Operations",
    body: "A system of repeatable processes architected to deliver commercial outcomes — measured, reported and improved every quarter.",
    href: "/services",
  },
] as const;

export function ForwardDeployed() {
  return (
    <section className="am-band-dark am-section border-t border-white/10">
      <div className="am-container">
        <ul className="grid gap-6 md:grid-cols-2">
          {CARDS.map((card, i) => (
            <FadeUp as="li" key={card.title} index={i + 1}>
              <Link
                href={card.href}
                className="group flex h-full flex-col justify-between rounded-lg border border-white/15 bg-white/[0.02] p-10 transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.05]"
              >
                <div>
                  <p className="am-label-caps text-white/55">{card.eyebrow}</p>
                  <h3 className="am-headline-sm mt-5 max-w-md text-white">{card.title}</h3>
                  <p className="am-body-md mt-4 max-w-md text-white/70">{card.body}</p>
                </div>
                <span className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Learn more
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            </FadeUp>
          ))}
        </ul>
      </div>
    </section>
  );
}
