import Link from "next/link";
import { cn } from "@/lib/utils";

/** CloudynHost wordmark: a cloud + upward "scale" spark in a gradient tile. */
export function Logo({
  className,
  href = "/",
  showText = true,
}: {
  className?: string;
  href?: string;
  showText?: boolean;
}) {
  return (
    <Link href={href} className={cn("group flex items-center gap-2.5 font-display", className)}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-md shadow-primary/30 ring-1 ring-white/20 transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path
            d="M7 17.5a4 4 0 0 1 .5-7.96A5.5 5.5 0 0 1 18 9.2a3.3 3.3 0 0 1 .2 6.3"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8.5l-2.4 4.2h2.1l-1 3.3 3.6-4.6h-2.2l1.1-2.9z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {showText && (
        <span className="text-lg font-bold tracking-tight">
          Cloudyn<span className="text-primary">Host</span>
        </span>
      )}
    </Link>
  );
}
