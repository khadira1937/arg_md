"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * App-wide theme provider. Uses the `class` strategy (toggles `.dark` on <html>),
 * defaults to the OS preference, and persists the choice to localStorage
 * (next-themes handles both automatically). Wrap the app once in the root layout.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
