import { formatReviewDate, type Review } from "@/data/reviews"
import { cn } from "@/lib/utils"

import { StarRating } from "./testimonial-card"

/** Product page review: filled stars, bold title, quote, author + date. */
function ReviewCard({ review, className }: { review: Review; className?: string }) {
  return (
    <article className={cn("flex flex-col gap-3 rounded-[18px] border border-border-default bg-surface-canvas p-6", className)}>
      <StarRating value={review.rating} filled size="sm" />
      <h3 className="text-[0.8125rem] font-bold text-text-primary">{review.title}</h3>
      <p className="flex-1 text-[0.8125rem] leading-5 text-text-secondary">“{review.body}”</p>
      <footer className="flex flex-col gap-0.5">
        <span className="text-xs font-bold text-text-primary">{review.author}</span>
        <time dateTime={review.date} className="type-utility-caption text-fp-purple-300">
          {formatReviewDate(review.date)}
        </time>
      </footer>
    </article>
  )
}

export { ReviewCard }
