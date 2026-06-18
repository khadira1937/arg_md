import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional leading icon (e.g. <Mail className="h-4 w-4" />). Adds left padding. */
  icon?: React.ReactNode;
  /** className applied to the wrapper when an icon is present. */
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, wrapperClassName, ...props }, ref) => {
    const input = (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/[0.18] disabled:cursor-not-allowed disabled:opacity-50",
          icon && "pl-9",
          className,
        )}
        {...props}
      />
    );

    if (!icon) return input;

    return (
      <div className={cn("relative", wrapperClassName)}>
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:h-4 [&_svg]:w-4">
          {icon}
        </span>
        {input}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
