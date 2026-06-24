"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Globe, Megaphone, Palette, PenLine, ServerCog, LifeBuoy,
  Check, TrendingUp, Sparkles,
} from "lucide-react";

const ORBIT = [
  { icon: Globe, label: "Web" },
  { icon: Megaphone, label: "Marketing" },
  { icon: Palette, label: "Design" },
  { icon: PenLine, label: "Content" },
  { icon: ServerCog, label: "Hosting" },
  { icon: LifeBuoy, label: "IT" },
];

/**
 * ARGANA MEDIA hero visual — a slowly rotating ring of service disciplines
 * around a central brand mark, with two gently floating status cards. Pure
 * presentation; respects prefers-reduced-motion.
 */
export function HeroVisual({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const R = 41; // orbit radius as % of container

  return (
    <div className={className}>
      <div className="relative mx-auto aspect-square w-full max-w-[460px]">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-brand-gradient opacity-20 blur-3xl" />

        {/* Dashed guide ring */}
        <div className="absolute inset-[7%] rounded-full border border-dashed border-primary/25" />
        <div className="absolute inset-[20%] rounded-full border border-primary/10" />

        {/* Rotating orbit */}
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 42, ease: "linear", repeat: Infinity }}
        >
          {ORBIT.map((item, i) => {
            const angle = (i / ORBIT.length) * Math.PI * 2 - Math.PI / 2;
            const top = 50 + R * Math.sin(angle);
            const left = 50 + R * Math.cos(angle);
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${top}%`, left: `${left}%` }}
                animate={reduce ? undefined : { rotate: -360 }}
                transition={{ duration: 42, ease: "linear", repeat: Infinity }}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card text-primary shadow-premium">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-background/70 px-2 py-0.5 text-[11px] font-medium text-muted-foreground backdrop-blur">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Center brand mark */}
        <div className="absolute left-1/2 top-1/2 flex aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[28%] bg-band text-band-foreground shadow-premium ring-1 ring-band-border">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-2xl font-extrabold text-white">
            A
          </span>
          <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-band-foreground">
            Argana
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-band-muted">Media</span>
        </div>

        {/* Floating status cards */}
        <motion.div
          className="absolute -left-2 top-[16%] sm:-left-6"
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
        >
          <div className="flex items-center gap-2.5 rounded-xl border bg-card/95 px-3.5 py-2.5 shadow-premium backdrop-blur">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/15 text-success">
              <Check className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-xs font-semibold">New website</p>
              <p className="text-[11px] text-muted-foreground">Live &amp; cared for</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute -right-2 bottom-[15%] sm:-right-6"
          animate={reduce ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        >
          <div className="flex items-center gap-2.5 rounded-xl border bg-card/95 px-3.5 py-2.5 shadow-premium backdrop-blur">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <TrendingUp className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-xs font-semibold">Found on Google</p>
              <p className="text-[11px] text-muted-foreground">SEO in progress</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-1 -translate-x-1/2"
          animate={reduce ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-card/95 px-3 py-1 text-[11px] font-medium shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> One team, fully managed
          </span>
        </motion.div>
      </div>
    </div>
  );
}
