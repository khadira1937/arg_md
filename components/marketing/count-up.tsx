"use client";

import * as React from "react";
import { useInView } from "framer-motion";

/**
 * Counts up to a numeric value when scrolled into view. Non-numeric values
 * (e.g. "Stripe", "24/7") render as-is. `prefix`/`suffix` keep the surrounding
 * text (like "%" or "+") intact and let the number animate.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  durationMs = 1200,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
