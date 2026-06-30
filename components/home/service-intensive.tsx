"use client";

import Image from "next/image";
import { useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";
import { serviceIntensive } from "@/data/home";
import { industries } from "@/data/industries";
import { FadeUp } from "./fade-up";

/**
 * Light "Who we work with" band. Sector tab strip across the top (active tab
 * uses burnt-orange underline — accent #3). Clicking a tab swaps the hero
 * image and the headline overlay together. Below the figure sits a single
 * NDA disclaimer line — no fake testimonials, no fake stars.
 */
export function ServiceIntensive() {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <section
      id="customers"
      className="am-band-light am-section border-t border-[color:var(--argana-outline-variant)]"
    >
      <div className="am-container">
        <FadeUp className="mb-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end md:gap-12">
          <div className="flex items-center gap-3">
            <h2 className="am-headline-md text-[color:var(--argana-on-surface)]">
              {serviceIntensive.heading}
            </h2>
            <ArrowUpRight className="h-7 w-7 text-[color:var(--argana-outline)]" aria-hidden />
          </div>
          <p className="am-body-md max-w-md text-[color:var(--argana-on-surface-variant)]">
            {current.body}
          </p>
        </FadeUp>

        <FadeUp index={1}>
          <div
            role="tablist"
            aria-label="Sectors"
            className="mb-12 flex flex-wrap gap-x-10 gap-y-3 border-b border-[color:var(--argana-outline-variant)] pb-2"
          >
            {industries.map((tab, i) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-controls="industry-panel"
                onClick={() => setActive(i)}
                className="am-tab am-label-caps cursor-pointer bg-transparent"
                data-active={active === i ? "true" : "false"}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeUp>

        <FadeUp index={2}>
          <figure
            id="industry-panel"
            role="tabpanel"
            aria-label={current.label}
            className="relative overflow-hidden rounded-lg"
          >
            <Image
              key={current.id}
              src={current.image.src}
              alt={current.image.alt}
              width={1920}
              height={1080}
              sizes="(min-width: 1024px) 1100px, 100vw"
              loading="lazy"
              className="h-[420px] w-full object-cover sm:h-[500px]"
            />
            <div aria-hidden className="absolute inset-0 bg-black/30" />
            <button
              type="button"
              aria-label="Play sector intro"
              className="absolute left-1/2 top-1/2 inline-flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
            >
              <Play className="ml-1 h-7 w-7 fill-white" aria-hidden />
            </button>
            <figcaption className="absolute bottom-8 left-8 right-8 max-w-2xl text-white sm:bottom-12 sm:left-12">
              <p className="am-label-caps text-white/70">{current.label}</p>
              <p className="mt-3 text-xl font-medium leading-snug sm:text-2xl">
                {current.headline}
              </p>
            </figcaption>
          </figure>
        </FadeUp>

        <FadeUp index={3} className="py-16 text-center">
          <p className="am-body-md text-[color:var(--argana-on-surface-muted)]">
            Selected work — under NDA until launch. Speak to us about specific case studies.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
