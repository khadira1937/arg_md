import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * HostynCloud brand logo. Renders the official wordmark image
 * (cloud + server mark with the "HostynCloud" wordmark).
 * The PNG lives in /public/brand and is optimized by next/image.
 */
export function Logo({
  className,
  href = "/",
  /** When false, the link is omitted and a bare image is returned. */
  asLink = true,
  /** Display height in pixels; width scales to the 3:1 logo ratio. */
  height = 34,
  priority = false,
}: {
  className?: string;
  href?: string;
  asLink?: boolean;
  height?: number;
  priority?: boolean;
}) {
  const img = (
    <Image
      src="/brand/hostyncloud-logo.png"
      alt="HostynCloud logo"
      width={Math.round(height * 3)}
      height={height}
      priority={priority}
      className="h-auto w-auto select-none"
      style={{ height, width: "auto" }}
    />
  );

  if (!asLink) return <span className={cn("inline-flex items-center", className)}>{img}</span>;

  return (
    <Link
      href={href}
      aria-label="HostynCloud home"
      className={cn("inline-flex shrink-0 items-center transition-opacity hover:opacity-90", className)}
    >
      {img}
    </Link>
  );
}
