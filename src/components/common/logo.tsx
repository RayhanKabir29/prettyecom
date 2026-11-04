import { Link } from "react-router"

import { cn } from "@/lib/utils"

/**
 * Fresh & Pretty wordmark.
 *  header  — Tinos 22 / -0.5px, centred "SKINCARE" tag (Figma 3316:5)
 *  footer  — Tinos 26 on deep plum, left-aligned tag (Figma 3316:130)
 */
function Logo({ variant = "header", className }: { variant?: "header" | "footer"; className?: string }) {
  const footer = variant === "footer"
  return (
    <Link
      to="/"
      aria-label="Fresh & Pretty skincare — home"
      className={cn(
        "inline-flex flex-col rounded-sm leading-none outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring",
        footer ? "items-start" : "items-center",
        className
      )}
    >
      <span
        className={cn(
          "font-serif font-bold",
          footer
            ? "text-[1.625rem] leading-[1.875rem] text-fp-neutral-000"
            : "text-[1.375rem] leading-[1.5625rem] tracking-[-0.5px] text-text-primary"
        )}
      >
        Fresh &amp; Pretty
      </span>
      <span
        className={cn(
          "font-sans tracking-[2px] uppercase",
          footer ? "text-[0.6875rem] leading-[0.8125rem] text-text-inverse" : "text-[0.625rem] leading-[0.6875rem] text-text-muted"
        )}
      >
        Skincare
      </span>
    </Link>
  )
}

export { Logo }
