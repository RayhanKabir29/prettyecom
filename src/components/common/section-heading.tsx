import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Centered heading between two lilac rules.
 *  eyebrow — Arimo Bold 16 / 2.2px tracking, uppercase (Figma 3313:883 "Popular products")
 *  serif   — Tinos Bold 36 (Figma 3316:80 "Testimonials")
 */
function SectionHeading({
  variant = "eyebrow",
  as: Comp = "h2",
  id,
  className,
  children,
}: {
  id?: string
  variant?: "eyebrow" | "serif"
  as?: React.ElementType
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex items-center gap-[18px]", className)}>
      <span aria-hidden className="h-px min-w-6 flex-1 bg-border-default" />
      <Comp
        id={id}
        className={cn(
          "text-center text-text-primary",
          variant === "eyebrow"
            ? "font-sans text-base leading-[1.125rem] font-bold tracking-[2.2px] uppercase"
            : "type-heading-section"
        )}
      >
        {children}
      </Comp>
      <span aria-hidden className="h-px min-w-6 flex-1 bg-border-default" />
    </div>
  )
}

/** Short purple rule + eyebrow label (Figma 3316:22 "— HEALTHY SKIN"). */
function Eyebrow({ rule = false, className, children }: { rule?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <p className={cn("type-label-eyebrow flex items-center gap-2.5 text-action-default", className)}>
      {rule && <span aria-hidden className="h-0.5 w-[30px] bg-action-default" />}
      {children}
    </p>
  )
}

export { SectionHeading, Eyebrow }
