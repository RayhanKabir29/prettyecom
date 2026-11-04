/**
 * Sample review data for the product page. Replace with your reviews API —
 * the page only needs `getReviewSummary()` and `getReviews()`.
 */
export type Review = {
  id: string
  productSlug: string
  rating: number
  title: string
  body: string
  author: string
  /** ISO date */
  date: string
}

export type ReviewSummary = {
  average: number
  total: number
  /** count per star, index 0 = 5★ … index 4 = 1★ */
  distribution: [number, number, number, number, number]
}

const summaries: Record<string, ReviewSummary> = {
  "cerave-moisturizing-cream": { average: 4.8, total: 12540, distribution: [11537, 752, 125, 126, 0] },
  "aloe-vera-freshness-cream": { average: 4.8, total: 24, distribution: [20, 3, 1, 0, 0] },
}

const reviews: Review[] = [
  { id: "c1", productSlug: "cerave-moisturizing-cream", rating: 5, title: "Absolutely love this cream!", body: "My skin feels so soft and healthy.", author: "Jesmin Akter", date: "2025-10-28" },
  { id: "c2", productSlug: "cerave-moisturizing-cream", rating: 5, title: "Best moisturizer ever", body: "Highly recommended!", author: "Lora Ahmed", date: "2025-10-12" },
  { id: "r1", productSlug: "aloe-vera-freshness-cream", rating: 5, title: "My morning favourite", body: "Light and lovely under my everyday routine. My skin feels soft, and I love taking a little extra time for myself.", author: "Jessica J.", date: "2025-10-28" },
  { id: "r2", productSlug: "aloe-vera-freshness-cream", rating: 5, title: "A lovely everyday cream", body: "The texture feels so comfortable. A little goes a long way, and the jar looks beautiful on my shelf.", author: "Lora A.", date: "2025-10-12" },
  { id: "r3", productSlug: "aloe-vera-freshness-cream", rating: 5, title: "A fresh start to the day", body: "Easy to smooth on and a lovely finish. It has become one of the little things I look forward to each morning.", author: "Isabella M.", date: "2025-10-05" },
  { id: "r4", productSlug: "aloe-vera-freshness-cream", rating: 4, title: "Soft and simple", body: "Sinks in quickly and doesn't feel heavy. I'd love a bigger jar!", author: "Chloris L.", date: "2025-09-21" },
  { id: "r5", productSlug: "aloe-vera-freshness-cream", rating: 5, title: "Gentle and calming", body: "Feels gentle on my skin after a long day. A calm little ritual before bed.", author: "Amara K.", date: "2025-09-02" },
  { id: "r6", productSlug: "aloe-vera-freshness-cream", rating: 3, title: "Nice, but light for winter", body: "Lovely texture for warmer days. In winter I layer it with something richer.", author: "Sofia R.", date: "2025-08-14" },
]

export function getReviewSummary(slug: string): ReviewSummary {
  return summaries[slug] ?? { average: 0, total: 0, distribution: [0, 0, 0, 0, 0] }
}

export function getReviews(slug: string): Review[] {
  return reviews.filter((r) => r.productSlug === slug)
}

export const formatReviewDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(`${iso}T00:00:00`))
