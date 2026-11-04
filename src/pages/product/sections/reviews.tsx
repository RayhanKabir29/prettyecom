import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import avatar1 from "@/assets/images/avatars/avatar-1.jpg"
import avatar2 from "@/assets/images/avatars/avatar-2.jpg"
import { SectionHeading, StarRating } from "@/components/common"
import type { Product } from "@/data/products"
import type { Review, ReviewSummary } from "@/data/reviews"

function Reviews({ product, summary, reviews }: { product: Product; summary: ReviewSummary; reviews: Review[] }) {
  const track = React.useRef<HTMLUListElement>(null)
  const max = Math.max(...summary.distribution, 1)
  const avatars = [avatar1, avatar2]

  const scroll = (direction: -1 | 1) => {
    track.current?.scrollBy({ left: direction * 280, behavior: "smooth" })
  }

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="mx-auto max-w-[1200px] scroll-mt-6 px-5 pt-7 pb-3 md:px-8 lg:px-[66px]">
      <SectionHeading id="reviews-title" variant="serif">Customer Reviews</SectionHeading>

      <div className="mt-5 grid items-center gap-4 md:grid-cols-[125px_260px_minmax(0,1fr)] lg:gap-6">
        <div className="text-center">
          <p className="font-serif text-[3rem] leading-none font-bold text-text-primary">{summary.average.toFixed(1)}</p>
          <StarRating value={summary.average} filled className="mt-1 justify-center [&_svg]:text-accent-promotion" />
          <p className="mt-1 text-[0.625rem] text-text-secondary">Based on {summary.total.toLocaleString()} Reviews</p>
        </div>

        <ul className="rounded-xl border border-border-subtle bg-surface-subtle px-4 py-3" aria-label="Review rating breakdown">
          {summary.distribution.map((count, i) => {
            const stars = 5 - i
            const percentage = summary.total ? Math.round((count / summary.total) * 100) : 0
            return (
              <li key={stars} className="grid grid-cols-[38px_1fr_34px] items-center gap-2 text-[0.6875rem] leading-4 text-text-secondary">
                <span>{stars} Star</span>
                <span className="h-1.5 overflow-hidden rounded-full bg-surface-raised"><span className="block h-full rounded-full bg-accent-promotion-strong" style={{ width: `${(count / max) * 100}%` }} /></span>
                <span className="text-right">{percentage}%</span>
              </li>
            )
          })}
        </ul>

        <div className="relative min-w-0">
          <button type="button" aria-label="Previous reviews" onClick={() => scroll(-1)} className="absolute -left-3 top-1/2 z-10 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border-default bg-surface-raised text-action-default md:inline-flex"><ChevronLeft aria-hidden className="size-4" /></button>
          <ul ref={track} className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {reviews.map((review, i) => <li key={review.id} className="w-[min(270px,82vw)] shrink-0 snap-start"> <ReviewQuote review={review} avatar={avatars[i % avatars.length]} /> </li>)}
            {reviews.length === 0 && <li className="flex min-h-[116px] w-full items-center justify-center rounded-xl border border-border-subtle bg-surface-subtle p-5 text-center text-sm text-text-secondary">Be the first to share your thoughts about {product.name}.</li>}
          </ul>
          <button type="button" aria-label="Next reviews" onClick={() => scroll(1)} className="absolute -right-3 top-1/2 z-10 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border-default bg-surface-raised text-action-default md:inline-flex"><ChevronRight aria-hidden className="size-4" /></button>
        </div>
      </div>
    </section>
  )
}

function ReviewQuote({ review, avatar }: { review: Review; avatar: string }) {
  return (
    <article className="flex min-h-[116px] gap-3 rounded-xl border border-border-subtle bg-surface-raised p-3">
      <img src={avatar} alt="" className="size-10 shrink-0 rounded-full object-cover" />
      <div className="min-w-0">
        <StarRating value={review.rating} filled size="sm" className="[&_svg]:text-accent-promotion" />
        <p className="mt-1 text-[0.6875rem] leading-4 text-text-secondary">{review.title} {review.body}</p>
        <p className="mt-1 text-[0.625rem] font-bold text-text-primary">{review.author}</p>
      </div>
    </article>
  )
}

export { Reviews }
