import Link from "next/link";
import { cn } from "@/lib/utils";
import { brand } from "@/config/brand";

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("flex items-center gap-2 font-display", className)}>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-md shadow-primary/30">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path
            d="M6 16.5A4.5 4.5 0 0 1 6.7 7.6 6 6 0 0 1 18 9a3.5 3.5 0 0 1-.5 7H6.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12.5" r="1.4" fill="currentColor" />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight">{brand.shortName}</span>
    </Link>
  );
}
