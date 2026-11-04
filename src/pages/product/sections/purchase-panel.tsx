import * as React from "react"
import { Heart, Leaf, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react"

import { Button, QuantityStepper, StarRating } from "@/components/common"
import type { ProductDetails } from "@/data/product-details"
import { formatPrice, type Product } from "@/data/products"
import type { ReviewSummary } from "@/data/reviews"
import { useCart } from "@/lib/cart"
import { cn } from "@/lib/utils"

/** Product summary, variant, cart controls, and service promises. */
function PurchasePanel({ product, details, summary }: { product: Product; details: ProductDetails; summary: ReviewSummary }) {
  const { add } = useCart()
  const [size, setSize] = React.useState(details.sizes[0])
  const [qty, setQty] = React.useState(1)
  const [saved, setSaved] = React.useState(false)
  const [status, setStatus] = React.useState("")

  return (
    <div className="flex flex-col pt-1">
      <span className="inline-flex w-fit items-center gap-1 rounded-full bg-surface-subtle px-3 py-1 text-[0.6875rem] font-bold text-text-primary">
        <Star aria-hidden className="size-3 fill-current text-accent-promotion" />
        {details.eyebrow.replace(/^★\s*/, "")}
      </span>
      <h1 className="type-heading-section mt-2 text-text-primary lg:type-heading-page">{product.name}</h1>
      <p className="mt-1 text-sm text-text-secondary">{details.summary}</p>

      {summary.total > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StarRating value={summary.average} filled size="sm" className="[&_svg]:text-accent-promotion" />
          <span className="text-xs text-text-primary">{summary.average.toFixed(1)}</span>
          <a href="#reviews" className="text-xs text-text-secondary underline underline-offset-2 hover:text-action-default">
            ({summary.total.toLocaleString()} Reviews)
          </a>
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-[1.75rem] leading-none font-bold text-accent-promotion-strong">{formatPrice(product.price)}</span>
        {product.compareAtPrice && <s className="text-sm text-text-muted">{formatPrice(product.compareAtPrice)}</s>}
        {product.compareAtPrice && (
          <span className="rounded-full bg-accent-promotion/10 px-3 py-1 text-xs font-bold text-accent-promotion-strong">
            Save {formatPrice(product.compareAtPrice - product.price)}
          </span>
        )}
      </div>

      <hr className="mt-4 border-border-subtle" />

      <fieldset className="mt-3">
        <legend className="mb-2 text-xs font-bold text-text-primary">Size:</legend>
        <div className="flex flex-wrap gap-2.5">
          {details.sizes.map((s) => (
            <label
              key={s}
              className={cn(
                "inline-flex h-9 cursor-pointer items-center rounded-xl border px-4 text-xs text-text-primary transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus-ring",
                s === size ? "border-action-default bg-action-default font-bold text-action-on-solid" : "border-border-subtle bg-surface-raised hover:bg-surface-subtle"
              )}
            >
              <input type="radio" name="size" value={s} checked={s === size} onChange={() => setSize(s)} className="sr-only" />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 flex items-center gap-2.5">
        <QuantityStepper value={qty} onChange={setQty} />
        <Button
          className="min-h-11 flex-1 gap-2 px-3"
          onClick={() => {
            add({ productId: product.id, size, quantity: qty })
            setStatus(`Added ${qty} × ${product.name} to your bag.`)
          }}
        >
          <ShoppingCart aria-hidden className="size-4" /> Add to Cart
        </Button>
        <button
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={saved}
          onClick={() => setSaved((v) => !v)}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border-default bg-surface-raised text-accent-promotion-strong transition-colors hover:bg-surface-subtle outline-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus-ring"
        >
          <Heart aria-hidden className={cn("size-[18px]", saved && "fill-current")} />
        </button>
      </div>
      <p role="status" className="sr-only">{status}</p>

      <ul className="mt-4 grid grid-cols-3 divide-x divide-border-default rounded-2xl bg-surface-subtle px-2 py-3 text-center">
        <li className="flex items-center justify-center gap-2 px-1 text-[0.6875rem] leading-4 font-bold text-text-primary">
          <Leaf aria-hidden className="size-5 shrink-0 text-accent-promotion-strong" /> <span>100% Authentic<br />Products</span>
        </li>
        <li className="flex items-center justify-center gap-2 px-1 text-[0.6875rem] leading-4 font-bold text-text-primary">
          <Truck aria-hidden className="size-5 shrink-0 text-accent-promotion-strong" /> <span>Free Shipping<br />Over $60</span>
        </li>
        <li className="flex items-center justify-center gap-2 px-1 text-[0.6875rem] leading-4 font-bold text-text-primary">
          <ShieldCheck aria-hidden className="size-5 shrink-0 text-accent-promotion-strong" /> <span>Secure Payment</span>
        </li>
      </ul>
    </div>
  )
}

export { PurchasePanel }
