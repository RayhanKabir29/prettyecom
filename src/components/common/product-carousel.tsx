import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import type { Product } from "@/data/products"
import { cn } from "@/lib/utils"

import { ProductCard } from "./product-card"

const control =
  "absolute top-1/2 z-10 hidden size-[39px] -translate-y-1/2 items-center justify-center rounded-full border border-border-default bg-surface-canvas text-action-default transition-colors hover:bg-surface-subtle disabled:opacity-40 outline-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus-ring md:inline-flex [&_svg]:size-[15px]"

/**
 * Figma 3313:887 — horizontal product row (4 × 243px cards, 15px gap) with
 * round prev / next controls. Scroll-snap on touch, buttons on desktop.
 */
function ProductCarousel({ products, label, className }: { products: Product[]; label: string; className?: string }) {
  const track = React.useRef<HTMLUListElement>(null)
  const [edge, setEdge] = React.useState({ start: true, end: false })

  const update = React.useCallback(() => {
    const el = track.current
    if (!el) return
    setEdge({ start: el.scrollLeft <= 1, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 })
  }, [])

  React.useEffect(() => {
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [update])

  const scroll = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.querySelector("li")
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.clientWidth + 15), behavior: "smooth" })
  }

  return (
    <div className={cn("relative", className)} role="region" aria-roledescription="carousel" aria-label={label}>
      <button type="button" aria-label="Previous products" className={cn(control, "left-0 lg:-left-[66px]")} onClick={() => scroll(-1)} disabled={edge.start}>
        <ChevronLeft aria-hidden />
      </button>
      <ul
        ref={track}
        onScroll={update}
        className="-mx-5 flex snap-x snap-mandatory gap-[15px] overflow-x-auto scroll-px-5 px-5 pt-3 pb-2 [scrollbar-width:none] md:mx-12 md:scroll-px-0 md:px-0 lg:mx-0 [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <li key={p.id} className="w-[min(243px,72vw)] shrink-0 snap-start">
            <ProductCard product={p} className="h-[237px]" />
          </li>
        ))}
      </ul>
      <button type="button" aria-label="Next products" className={cn(control, "right-0 lg:-right-[51px]")} onClick={() => scroll(1)} disabled={edge.end}>
        <ChevronRight aria-hidden />
      </button>
    </div>
  )
}

export { ProductCarousel }
