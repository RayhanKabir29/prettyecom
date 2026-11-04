import * as React from "react"

import { ImageSlot } from "@/components/common"
import { cn } from "@/lib/utils"

/**
 * Main photo + three thumbnails. Thumbnails with no image render as empty
 * blocks (and can't be selected) until artwork is added in product-details.ts.
 */
function Gallery({ images, caption, productName, badge }: { images: (string | undefined)[]; caption: string; productName: string; badge?: string }) {
  const [active, setActive] = React.useState(0)
  const current = images[active]

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[74px_minmax(0,1fr)] lg:gap-3">
      <ul className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible" aria-label="Product photos">
        {images.map((src, i) => (
          <li key={i} className="w-[74px] shrink-0">
            <button
              type="button"
              disabled={!src}
              aria-label={`Show photo ${i + 1}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "block w-full overflow-hidden rounded-[10px] border-2 bg-surface-subtle transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-default",
                i === active ? "border-action-default" : "border-transparent hover:border-border-default"
              )}
            >
              <ImageSlot src={src} imgClassName="object-contain p-1" className="aspect-[74/82] w-full rounded-[8px] bg-surface-raised" />
            </button>
          </li>
        ))}
      </ul>
      <div className="relative order-1 aspect-square w-full lg:order-2">
        <ImageSlot
          src={current}
          alt={current ? `${productName}, photo ${active + 1} of ${images.length}` : ""}
          imgClassName="object-contain p-3 sm:p-6"
          className="size-full rounded-[16px] border border-border-subtle bg-surface-raised"
        />
        {badge && <span className="absolute top-3 right-3 rounded-full bg-accent-promotion px-3 py-1 text-sm font-bold text-action-on-solid">{badge}</span>}
      </div>
      <p className="type-utility-caption order-3 text-fp-purple-300 lg:col-start-2">{caption}</p>
    </div>
  )
}

export { Gallery }
