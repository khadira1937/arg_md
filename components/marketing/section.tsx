import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("py-16 sm:py-24", className)} {...props}>
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center && "mx-auto text-center", "max-w-2xl", className)}>
      {eyebrow && (
        <p className={cn("mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary", center && "justify-center")}>
          <span className="h-1 w-1 rounded-full bg-primary" />
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-pretty text-lg text-muted-foreground">{description}</p>}
    </div>
  );
}
