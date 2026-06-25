"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * App-wide theme provider. The site is forced to the ARGANA dark theme on every
 * page (to match the landing page), so we pin next-themes to `dark` via
 * `forcedTheme`. The `.dark` class is also set statically on <html> in the root
 * layout, so the first paint is already dark with no flash.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      forcedTheme="dark"
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
