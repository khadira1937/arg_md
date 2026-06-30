import { services } from "@/data/home";
import { FadeUp } from "./fade-up";

/**
 * "Drive real-world outcomes" — light band with a large grid-lined hero mockup
 * + three illustrated feature cards. Card mockups are pure CSS/SVG (no images)
 * so the page never depends on a screenshot CDN. Burnt-orange appears only as
 * a tiny accent dot inside the mockups (decorative, not interactive).
 */
function HeroMockup() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[color:var(--argana-outline-variant)] bg-[color:var(--argana-surface-container)] p-10 sm:p-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--argana-outline) 1px, transparent 1px), linear-gradient(to bottom, var(--argana-outline) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.08,
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, #000 55%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, #000 55%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[22%] top-[28%] h-3 w-3 rounded-full bg-[color:var(--argana-outline)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[24%] bottom-[26%] h-3 w-3 rounded-full bg-[color:var(--argana-outline)]"
      />
      <div className="relative mx-auto max-w-md rounded-xl border border-[color:var(--argana-outline-variant)] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--argana-surface-container)]">
            <svg
              aria-hidden
              className="h-4 w-4 text-[color:var(--argana-on-surface)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-[color:var(--argana-on-surface)]">Argana Studio</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--argana-on-surface-variant)]">
              • Project live
            </p>
          </div>
          <div className="ml-auto inline-flex h-4 w-4 items-center justify-center rounded-full bg-[color:var(--argana-on-surface)]">
            <svg aria-hidden className="h-2 w-2 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardMockupAgent() {
  return (
    <div className="relative mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-[color:var(--argana-outline-variant)] bg-[color:var(--argana-surface-container)] p-8">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--argana-outline) 1px, transparent 1px), linear-gradient(to bottom, var(--argana-outline) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.08,
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, #000 55%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, #000 55%, transparent 100%)",
        }}
      />
      <div className="relative w-full max-w-[200px] rounded-lg bg-white p-6 shadow-md">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-[color:var(--argana-surface-container)]">
            <svg
              aria-hidden
              className="h-3 w-3 text-[color:var(--argana-on-surface)]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--argana-on-surface)]">
            Studio
          </span>
        </div>
      </div>
    </div>
  );
}

function CardMockupHandover() {
  return (
    <div className="relative mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-[color:var(--argana-outline-variant)] bg-[color:var(--argana-surface-container)] p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--argana-outline) 1px, transparent 1px), linear-gradient(to bottom, var(--argana-outline) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.08,
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, #000 55%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, #000 55%, transparent 100%)",
        }}
      />
      <div className="relative w-full max-w-[240px]">
        <div className="mb-2 flex items-center gap-2 rounded border border-[color:var(--argana-outline-variant)] bg-white p-3">
          <span className="text-[10px] font-bold text-[color:var(--argana-outline)]">↑ Organic Traffic</span>
        </div>
        <div className="ml-8 space-y-2 border-l-2 border-[color:var(--argana-outline-variant)] pl-4">
          <div className="flex items-center justify-between rounded border border-[color:var(--argana-outline-variant)] bg-white p-3 text-[10px] text-[color:var(--argana-on-surface)]">
            <span>This quarter</span>
          </div>
          <div className="space-y-1 rounded border border-[color:var(--argana-outline-variant)] bg-white p-3 text-[10px] text-[color:var(--argana-on-surface)]">
            <div className="flex items-center gap-2">
              <span aria-hidden className="block h-2 w-2 rounded-sm bg-[color:var(--argana-on-surface)]" />
              New rankings won
            </div>
            <div className="flex items-center gap-2">
              <span aria-hidden className="block h-2 w-2 rounded-sm bg-[color:var(--argana-on-surface)]" />
              CRO experiments shipped
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardMockupNotify() {
  return (
    <div className="relative mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-[color:var(--argana-outline-variant)] bg-[color:var(--argana-surface-container)] p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--argana-outline) 1px, transparent 1px), linear-gradient(to bottom, var(--argana-outline) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.08,
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, #000 55%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, #000 55%, transparent 100%)",
        }}
      />
      <div className="w-full max-w-[220px] rounded-lg border border-[color:var(--argana-outline-variant)] bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-[color:var(--argana-on-surface)]">
            <svg
              aria-hidden
              className="h-3 w-3 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--argana-on-surface)]">
            Care
          </span>
        </div>
        <p className="text-[10px] text-[color:var(--argana-on-surface-variant)]">
          Lighthouse passed. Deploy is healthy.
        </p>
      </div>
    </div>
  );
}

const MOCKUPS = {
  agent: CardMockupAgent,
  handover: CardMockupHandover,
  notify: CardMockupNotify,
} as const;

export function Services() {
  return (
    <section id="solutions" className="am-band-light am-section">
      <div className="am-container">
        <FadeUp className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:gap-12">
          <h2 className="am-headline-md max-w-xl text-[color:var(--argana-on-surface)]">
            {services.heading}
          </h2>
          <p className="am-body-md max-w-sm text-[color:var(--argana-on-surface-variant)]">
            {services.body}
          </p>
        </FadeUp>

        <FadeUp index={1} className="mb-12">
          <HeroMockup />
        </FadeUp>

        <ul className="grid gap-8 md:grid-cols-3">
          {services.cards.map((card, i) => {
            const Mockup = MOCKUPS[card.mockup];
            return (
              <FadeUp as="li" key={card.title} index={i + 1}>
                <Mockup />
                <p className="am-label-caps mb-2 text-[color:var(--argana-burnt)]">
                  {card.eyebrow}
                </p>
                <h3 className="am-headline-sm text-sm font-bold text-[color:var(--argana-on-surface)]">
                  {card.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--argana-on-surface-variant)]">
                  {card.body}
                </p>
              </FadeUp>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
