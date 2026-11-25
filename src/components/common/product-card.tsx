import { ShoppingCart } from "lucide-react"
import { Link } from "react-router"

import { discountPercent, formatPrice, type Product } from "@/data/products"
import { useCart } from "@/lib/cart"
import { cn } from "@/lib/utils"

import { Button } from "./button"

type ProductCardProps = {
  product: Product
  /** catalog cards can include a description beneath the product name. */
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
  const { add } = useCart()
  const discount = discountPercent(product)
  const href = `/products/${product.slug}`
  const cardClass = "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-default bg-surface-raised shadow-[0_3px_12px_rgba(40,24,32,0.09)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-action-default hover:shadow-[0_14px_30px_rgba(40,24,32,0.16)] motion-reduce:transform-none motion-reduce:transition-none"

  if (variant === "catalog") {
    return (
      <article className={cn(cardClass, className)}>
        <Link to={href} tabIndex={-1} aria-hidden className="relative block aspect-[4/3] overflow-hidden bg-surface-subtle">
          <img
            src={product.image}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>
        {discount > 0 && (
          <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-accent-promotion-strong px-2.5 py-1 text-xs font-bold text-action-on-solid shadow-sm sm:top-3 sm:left-3">
            {discount}%<span className="sr-only"> off</span>
          </span>
        )}
        <div className="flex flex-1 flex-col items-center px-3 pt-3 pb-3.5 text-center sm:px-4 sm:pt-4 sm:pb-4">
          <h3 className="type-product-title line-clamp-2 min-h-10 text-sm text-text-primary sm:text-base">
            <Link to={href} className="rounded-sm outline-none after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring">
              {product.name}
            </Link>
          </h3>
          {showDescription && <p className="mt-2 line-clamp-2 min-h-10 text-[0.8125rem] leading-5 text-text-secondary">{product.description}</p>}
          <div className="mt-auto pt-3">
            <Price product={product} />
          </div>
          {showAction && (
            <Button size="small" fullWidth className="relative z-10 mt-2 min-w-0 gap-1 px-2 sm:px-3" aria-label={`Add ${product.name} to cart`} onClick={() => add({ productId: product.id, size: "Standard", quantity: 1 })}>
              <ShoppingCart aria-hidden className="size-3.5" /> Add to cart
            </Button>
          )}
        </div>
      </article>
    )
  }

  return (
    <article className={cn(cardClass, className)}>
        <Link to={href} aria-label={`View ${product.name}`} className="relative block aspect-[4/3] w-full overflow-hidden bg-surface-subtle outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus-ring">
          <img
            src={product.image}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
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
            <Button
              size="small"
              fullWidth
              className="mt-2 min-h-9 min-w-0 gap-1 px-2 sm:px-3"
              aria-label={`Add ${product.name} to cart`}
              onClick={() => add({ productId: product.id, size: "Standard", quantity: 1 })}
            >
              <ShoppingCart aria-hidden className="size-3.5" /> Add to cart
            </Button>
          </div>
        </div>
    </article>
  )
}

export { ProductCard }
export type { ProductCardProps }
