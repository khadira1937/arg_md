import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { hero } from "@/data/home";

/**
 * Hero — full-bleed dark band, exactly 100vh. Atmospheric workspace background
 * on the left, fading to solid black on the right where the eyebrow + heading
 * + body + CTA pair sit. Both CTAs are visible at rest (burnt-orange primary
 * pill + outlined ghost pill); no hover-only reveal. Cookie consent is mounted
 * separately as a fixed-bottom banner outside this section.
 */
export function Hero() {
  const isExternal = (href: string) => /^https?:\/\//i.test(href);

  return (
    <header className="relative isolate flex h-screen items-center overflow-hidden bg-black pt-20 text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent"
        />
      </div>

      <div className="am-container relative w-full">
        <div className="max-w-3xl">
          <p className="am-label-caps text-white/60">{hero.eyebrow}</p>
          <h1 className="am-display mt-6 text-white">{hero.heading}</h1>
          <p className="am-body-lg mt-8 max-w-xl text-white/75">{hero.body}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={hero.cta.href}
              className="am-cta"
              {...(isExternal(hero.cta.href)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {hero.cta.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <Link href={hero.secondaryCta.href} className="am-cta-ghost-dark">
              {hero.secondaryCta.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
