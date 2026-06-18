"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Light/dark toggle. Renders a stable placeholder until mounted to avoid a
 * hydration mismatch (the server can't know the resolved theme). Slot into the
 * navbar and dashboard top bar. Respects prefers-color-scheme via next-themes
 * `system` default; clicking switches between explicit light/dark.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      title={mounted ? (isDark ? "Switch to light" : "Switch to dark") : "Toggle theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-input bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      {/* Both icons render; we cross-fade with CSS so there's no layout shift
          and no flash before hydration resolves the theme. */}
      <Sun className="h-[1.15rem] w-[1.15rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.15rem] w-[1.15rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
