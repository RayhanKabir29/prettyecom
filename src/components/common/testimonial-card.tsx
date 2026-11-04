import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

export type Testimonial = {
  quote: string
  name: string
  role: string
  avatar: string
  rating?: number
}

/** filled — solid stars (product page); default outline stars (landing testimonials). */
function StarRating({
  value = 5,
  max = 5,
  filled = false,
  size = "md",
  className,
}: {
  value?: number
  max?: number
  filled?: boolean
  size?: "sm" | "md"
  className?: string
}) {
  return (
    <div className={cn("flex", size === "sm" ? "gap-0.5" : "gap-1", className)} role="img" aria-label={`${value} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn(
            "text-action-default",
            size === "sm" ? "size-3.5" : "size-4",
            i < Math.round(value) ? (filled ? "fill-current" : "fill-transparent") : "opacity-30"
          )}
        />
      ))}
    </div>
  )
}

/** Figma 3316:85 — 2px lilac border, 18px radius, stars + quote + reviewer. */
function TestimonialCard({ testimonial: t, className }: { testimonial: Testimonial; className?: string }) {
  return (
    <figure
      className={cn(
        "flex min-h-[216px] flex-col gap-4 rounded-[18px] border-2 border-border-default bg-surface-canvas px-[18px] py-5",
        className
      )}
    >
      <StarRating value={t.rating ?? 5} />
      <blockquote className="type-body-default text-text-secondary">“{t.quote}”</blockquote>
      <figcaption className="flex items-center gap-3">
        <img src={t.avatar} alt="" className="size-[42px] rounded-full object-cover" />
        <span className="flex flex-col gap-0.5">
          <span className="type-label-small text-text-primary">{t.name}</span>
          <span className="type-body-small text-text-secondary">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export { TestimonialCard, StarRating }
