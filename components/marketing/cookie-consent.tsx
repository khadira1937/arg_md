"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getConsent, setConsent, loadTrackingScripts, type ConsentValue } from "@/lib/consent";

/**
 * Bottom cookie-consent banner. Tracking/affiliate cookies stay blocked until
 * the visitor accepts; returning visitors who already accepted get their
 * tracking scripts re-loaded on mount.
 */
export function CookieConsent() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const consent = getConsent();
    if (consent === null) setVisible(true);
    else if (consent === "accepted") loadTrackingScripts();
  }, []);

  function choose(value: ConsentValue) {
    setConsent(value);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-50 p-4"
        >
          <div className="container flex max-w-4xl flex-col gap-4 rounded-2xl border bg-card/95 p-5 shadow-premium backdrop-blur sm:flex-row sm:items-center">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Cookie className="h-5 w-5" />
            </span>
            <p className="flex-1 text-sm text-muted-foreground">
              We use essential cookies to run the site, and analytics/affiliate cookies only with your
              consent. See our{" "}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
            <div className="flex shrink-0 gap-2">
              <Button variant="outline" size="sm" onClick={() => choose("rejected")}>Decline</Button>
              <Button variant="gradient" size="sm" onClick={() => choose("accepted")}>Accept</Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
