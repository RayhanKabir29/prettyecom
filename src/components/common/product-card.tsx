import { ArrowRight } from "lucide-react"
import { Link } from "react-router"

import { discountPercent, formatPrice, type Product } from "@/data/products"
import { cn } from "@/lib/utils"

import { Button } from "./button"

type ProductCardProps = {
  product: Product
  /**
   * compact — landing carousel (Figma 3313:888): 3px lilac border, name + price,
   *           bright rose badge clipped by the card edge. Whole card is the link.
   * catalog — catalog grid: 1px border, description, full-width "Shop now"
   *           secondary button, dark rose badge in the photo corner.
   */
  variant?: "compact" | "catalog"
  /** catalog variant only — hide the one-line description ("More to love" cards) */
  showDescription?: boolean
  /** catalog variant only — hide the "Shop now" button; the whole card stays clickable */
  showAction?: boolean
  className?: string
}

function Price({ product }: { product: Product }) {
  return (
    <p className="flex items-baseline justify-center gap-[9px]">
      <span className="sr-only">Price</span>
      <span className="text-base text-action-default">{formatPrice(product.price)}</span>
      {product.compareAtPrice && (
        <>
          <span className="sr-only">, was</span>
          <s className="text-[0.8125rem] text-fp-purple-300">{formatPrice(product.compareAtPrice)}</s>
        </>
      )}
    </p>
  )
}

function ProductCard({ product, variant = "compact", showDescription = true, showAction = true, className }: ProductCardProps) {
  const discount = discountPercent(product)
  const href = `/products/${product.slug}`

  if (variant === "catalog") {
    return (
      <article
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-[18px] border border-border-default bg-surface-canvas transition-colors hover:border-action-default",
          className
        )}
      >
        <Link to={href} tabIndex={-1} aria-hidden className="block aspect-[406/250] overflow-hidden bg-surface-subtle">
          <img
            src={product.image}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {discount > 0 && (
          <span className="absolute top-0 left-0 inline-flex h-11 min-w-16 items-center justify-center rounded-tl-[18px] rounded-br-md bg-accent-promotion-strong px-3 text-base font-bold text-fp-neutral-000">
            {discount}%<span className="sr-only"> off</span>
          </span>
        )}
        <div className="flex flex-1 flex-col items-center gap-2 px-5 pt-5 pb-5 text-center">
          <h3 className="text-[0.9375rem] leading-5 font-bold text-text-primary">
            <Link to={href} className="rounded-sm outline-none after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring">
              {product.name}
            </Link>
          </h3>
          {showDescription && <p className="mt-3 text-[0.8125rem] leading-5 text-text-secondary">{product.description}</p>}
          <div className={showDescription ? "" : "mt-auto pt-4"}>
            <Price product={product} />
          </div>
          {showAction && (
            <Button asChild variant="secondary" size="small" fullWidth className="relative z-10 mt-1 gap-[5px]">
              <Link to={href} aria-label={`Shop now: ${product.name}`}>
                Shop now <ArrowRight aria-hidden className="size-[13px]" />
              </Link>
            </Button>
          )}
        </div>
      </article>
    )
  }

  return (
    <article className={cn("group relative", className)}>
      <Link
        to={href}
        className="relative flex h-full flex-col items-center gap-[11px] overflow-hidden rounded-[18px] border-3 border-border-default bg-surface-canvas pb-4 transition-colors hover:border-action-default outline-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus-ring"
      >
        <div className="aspect-[243/138] w-full overflow-hidden">
          <img
            src={product.image}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <h3 className="line-clamp-2 min-h-10 px-1.5 text-center text-[0.9375rem] leading-5 font-bold text-text-primary">
          {product.name}
        </h3>
        <Price product={product} />
        {discount > 0 && (
          /* Sits partly above the card edge and is clipped by it, as in Figma */
          <span className="pointer-events-none absolute -top-3 left-0.5 inline-flex h-[33px] w-[51px] items-center justify-center rounded-md bg-accent-promotion text-sm leading-4 font-bold text-fp-neutral-000">
            {discount}%<span className="sr-only"> off</span>
          </span>
        )}
      </Link>
    </article>
  )
}

export { ProductCard }
export type { ProductCardProps }
