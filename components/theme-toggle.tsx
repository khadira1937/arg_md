"use client";

/**
 * The theme toggle is intentionally a no-op. The site is forced to the ARGANA
 * dark theme everywhere to match the landing page, so there is nothing to
 * toggle. Kept as an empty component so existing imports in the navbar and
 * dashboard top bar keep working without edits.
 */
export function ThemeToggle(_props: { className?: string }) {
  return null;
}
