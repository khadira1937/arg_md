import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, PhoneCall } from "lucide-react";
import { FadeUp } from "./fade-up";

/**
 * Pre-footer CTA — solid black band that sits between Stats / Forward-Deployed
 * and the site footer. Two hover-image cards on top (What We Build + Start a
 * Conversation), then a large centred "Speak to a Deployment Specialist" call
 * with the Book a Call burnt-orange primary CTA — accent #1.
 */
const CALENDLY = "https://calendly.com/arganamedia";

const CARDS = [
  {
    eyebrow: "What we build",
    title: "Sites that ship",
    body:
      "Brand systems, websites and content built to be judged on. We design the thing, we build the thing, we measure the thing.",
    href: "/what-we-build",
    external: false,
    image: {
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80&auto=format&fit=crop",
      alt: "Designers reviewing work on a studio wall",
    },
  },
  {
    eyebrow: "Start a conversation",
    title: "Book a working call",
    body:
      "Tell us what you're building. 30 minutes, no pitch, plain answers — and a clear next step you can act on.",
    href: CALENDLY,
    external: true,
    image: {
      src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80&auto=format&fit=crop",
      alt: "Two people on a working call at a desk",
    },
  },
] as const;

export function PreFooterCta() {
  return (
    <section className="am-band-dark am-section border-t border-white/10">
      <div className="am-container">
        <ul className="grid gap-6 md:grid-cols-2">
          {CARDS.map((card, i) => {
            const inner = (
              <div className="relative h-full overflow-hidden rounded-lg border border-white/15 bg-black p-10 transition-colors duration-200 hover:border-white/30">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <Image
                    src={card.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/70" />
                </div>

                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <p className="am-label-caps text-white/55">{card.eyebrow}</p>
                    <h3 className="am-headline-sm mt-5 max-w-md text-white">{card.title}</h3>
                    <p className="am-body-md mt-4 max-w-md text-white/75">{card.body}</p>
                  </div>
                  <span className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    {card.external ? "Book a call" : "Explore"}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </div>
            );

            return (
              <FadeUp as="li" key={card.title} index={i + 1}>
                {card.external ? (
                  <a href={card.href} target="_blank" rel="noopener noreferrer" className="group block h-full">
                    {inner}
                  </a>
                ) : (
                  <Link href={card.href} className="group block h-full">
                    {inner}
                  </Link>
                )}
              </FadeUp>
            );
          })}
        </ul>

        <FadeUp index={3} className="mx-auto mt-24 max-w-3xl text-center sm:mt-32">
          <p className="am-label-caps text-white/55">Solve your commercial challenges</p>
          <h2 className="am-headline-md mt-6 text-white">Speak to a Deployment Specialist</h2>
          <p className="am-body-lg mx-auto mt-6 max-w-xl text-white/70">
            30 minutes with someone who&apos;s built this before — no slide deck, no pitch.
            Tell us where you want to be, and we&apos;ll show you the shortest line to it.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="am-cta"
            >
              <PhoneCall className="h-4 w-4" aria-hidden /> Book a Call
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <Link href="/contact" className="am-cta-ghost-dark">
              Send a message
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
