"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { workflow } from "@/data/home";
import { FadeUp } from "./fade-up";

/**
 * Dark "How we work" band. Hub-and-spoke radial layout — the central
 * ARGANA STUDIO pulse with six labelled phase nodes (DISCOVERY, STRATEGY,
 * DESIGN, BUILD, LAUNCH, GROW) placed around it. Labels are interactive
 * buttons: click swaps the active step shown in the bottom-right context
 * box. An auto-rotate timer advances every 5s (paused entirely when the
 * visitor has prefers-reduced-motion on). Manual clicks reset the timer
 * so the visitor always gets the full 5s read window. A burnt-orange
 * progress bar under the hub shows the cycle position.
 *
 * Burnt-orange usage here is the "active indicator" role — same family
 * as the nav active indicator. Accent budget unchanged.
 */
const AUTO_ROTATE_MS = 5000;

export function WorkflowDiagram() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function clearTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function startTimer() {
    clearTimer();
    if (reduced) return;
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % workflow.steps.length);
    }, AUTO_ROTATE_MS);
  }

  useEffect(() => {
    startTimer();
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  function handleSelect(i: number) {
    setActive(i);
    startTimer();
  }

  const activeStep = workflow.steps[active];

  return (
    <section
      id="platform"
      className="am-band-dark am-section relative isolate overflow-hidden border-t border-white/10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #000 55%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #000 55%, transparent 100%)",
        }}
      />
      <div className="am-container relative">
        <FadeUp className="mx-auto mb-20 max-w-3xl text-center">
          <p className="am-label-caps text-white/60">{workflow.eyebrow}</p>
          <h2 className="am-headline-md mt-5 text-white">{workflow.heading}</h2>
          <p className="am-body-lg mt-6 text-white/70">{workflow.body}</p>
        </FadeUp>

        <FadeUp index={1}>
          <div className="relative mx-auto h-[560px] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent sm:h-[600px]">
            {/* DISCOVERY — top centre */}
            <div className="absolute left-1/2 top-10 -translate-x-1/2">
              <StepButton index={0} active={active} onSelect={handleSelect} layout="vertical" dotPosition="after" />
            </div>

            {/* STRATEGY — top-left */}
            <div className="absolute left-10 top-24 sm:left-20">
              <StepButton index={1} active={active} onSelect={handleSelect} layout="horizontal" dotPosition="after" />
            </div>

            {/* DESIGN — top-right */}
            <div className="absolute right-10 top-24 sm:right-20">
              <StepButton index={2} active={active} onSelect={handleSelect} layout="horizontal" dotPosition="before" />
            </div>

            {/* Central hub */}
            <div className="absolute left-1/2 top-1/2 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
              <div className="relative flex h-48 w-48 items-center justify-center">
                <span aria-hidden className="am-engine-pulse absolute inset-0 rounded-full border border-white/20" />
                <span aria-hidden className="absolute inset-4 rounded-full border border-white/10" />
                <span aria-hidden className="absolute inset-8 rounded-full border border-white/5" />
                <span className="am-label-caps relative z-10 rounded-md border border-white/20 bg-black px-4 py-2 text-white">
                  {workflow.hubLabel}
                </span>
              </div>
            </div>

            {/* Progress bar — below the hub. Hidden when reduced motion. */}
            {!reduced && (
              <div className="pointer-events-none absolute left-1/2 top-[calc(50%+108px)] w-[200px] -translate-x-1/2">
                <div className="relative h-px w-full bg-white/10">
                  <motion.div
                    key={active}
                    className="absolute inset-y-0 left-0 bg-[color:var(--argana-burnt)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTO_ROTATE_MS / 1000, ease: "linear" }}
                  />
                </div>
              </div>
            )}

            {/* BUILD — bottom-left */}
            <div className="absolute bottom-32 left-10 sm:left-20">
              <StepButton index={3} active={active} onSelect={handleSelect} layout="horizontal" dotPosition="after" />
            </div>

            {/* LAUNCH — bottom-right */}
            <div className="absolute bottom-32 right-10 sm:right-20">
              <StepButton index={4} active={active} onSelect={handleSelect} layout="horizontal" dotPosition="before" />
            </div>

            {/* GROW — bottom centre */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
              <StepButton index={5} active={active} onSelect={handleSelect} layout="vertical" dotPosition="before" />
            </div>

            {/* Context box — bottom-right. Content crossfades on step change. */}
            <aside className="absolute bottom-8 right-6 max-w-[280px] rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:bottom-12 sm:right-12">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.24, ease: "linear" }}
              >
                <p className="am-label-caps text-white/50">{activeStep.eyebrow}</p>
                <p className="mt-3 text-[12.5px] leading-relaxed text-white/75">{activeStep.body}</p>
              </motion.div>
            </aside>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

type StepButtonProps = {
  index: number;
  active: number;
  onSelect: (i: number) => void;
  layout: "horizontal" | "vertical";
  dotPosition: "before" | "after";
};

function StepButton({ index, active, onSelect, layout, dotPosition }: StepButtonProps) {
  const isActive = active === index;
  const step = workflow.steps[index];
  const flexLayout = layout === "horizontal" ? "flex-row items-center gap-2" : "flex-col items-center gap-3";

  const dot = (
    <span
      aria-hidden
      style={{ transitionDuration: "240ms" }}
      className={[
        "block rounded-full transition-all ease-out",
        isActive
          ? "h-2 w-2 bg-white ring-1 ring-[color:var(--argana-burnt)]"
          : "h-1 w-1 bg-white/40 group-hover:h-2 group-hover:w-2",
      ].join(" ")}
    />
  );

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-pressed={isActive}
      aria-label={`Show ${step.label} details`}
      className={`group inline-flex ${flexLayout} cursor-pointer bg-transparent`}
    >
      {dotPosition === "before" && dot}
      <span
        className={[
          "am-label-caps relative transition-colors duration-200",
          isActive ? "text-white" : "text-white/60 group-hover:text-white",
        ].join(" ")}
      >
        {step.label}
        <span
          aria-hidden
          className={[
            "absolute left-0 right-0 -bottom-1 h-px transition-opacity duration-200",
            isActive
              ? "bg-[color:var(--argana-burnt)] opacity-100"
              : "bg-[color:var(--argana-burnt)] opacity-0 group-hover:opacity-100",
          ].join(" ")}
        />
      </span>
      {dotPosition === "after" && dot}
    </button>
  );
}
