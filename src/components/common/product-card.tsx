import { ArrowRight } from "lucide-react"
import { Link } from "react-router"

import { discountPercent, formatPrice, type Product } from "@/data/products"
import { cn } from "@/lib/utils"

import { Button } from "./button"

type ProductCardProps = {
  product: Product
  /**
   * compact — home best sellers: compact product image, name, price, and direct action.
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
      <span className="type-price text-action-default">{formatPrice(product.price)}</span>
      {product.compareAtPrice && (
        <>
          <span className="sr-only">, was</span>
          <s className="type-body-small text-text-muted">{formatPrice(product.compareAtPrice)}</s>
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
          <h3 className="type-product-title text-text-primary">
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
    <article className={cn("group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-raised shadow-sm transition-all hover:-translate-y-0.5 hover:border-border-default hover:shadow-md", className)}>
        <Link to={href} aria-label={`View ${product.name}`} className="relative block aspect-[4/3] w-full overflow-hidden bg-surface-subtle outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus-ring">
          <img
            src={product.image}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-accent-promotion-strong px-2.5 py-1 text-[0.625rem] leading-none font-bold tracking-wide text-action-on-solid shadow-sm sm:top-3 sm:left-3 sm:text-xs">
              {discount}% OFF<span className="sr-only"> on {product.name}</span>
            </span>
          )}
        </Link>
        <div className="flex flex-1 flex-col px-2.5 pt-2.5 pb-3 sm:px-3 sm:pt-3 sm:pb-3.5">
          <h3 className="type-product-title line-clamp-2 min-h-8 text-xs leading-4 text-text-primary sm:min-h-10 sm:text-[0.9375rem] sm:leading-5">
            <Link to={href} className="rounded-sm outline-none hover:text-action-default focus-visible:underline">{product.name}</Link>
          </h3>
          <div className="mt-2 flex flex-1 flex-col items-center justify-end">
            <Price product={product} />
            <Button asChild size="small" fullWidth className="mt-2 min-h-9 min-w-0 gap-1 px-2 sm:px-3">
            <Link to={href} aria-label={`Shop now: ${product.name}`}>
              Shop now <ArrowRight aria-hidden className="size-3" />
            </Link>
            </Button>
          </div>
        </div>
    </article>
  )
}

export { ProductCard }
export type { ProductCardProps }
