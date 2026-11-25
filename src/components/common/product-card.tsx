import * as React from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router";

import { discountPercent, formatPrice, type Product } from "@/data/products";
import { getReviewSummary } from "@/data/reviews";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

import { Button } from "./button";

type ProductCardProps = {
  product: Product;
  variant?: "compact" | "catalog";
  showDescription?: boolean;
  showAction?: boolean;
  className?: string;
};

function ProductCard({
  product,
  showDescription = true,
  showAction = true,
  className,
}: ProductCardProps) {
  const { add } = useCart();
  const [saved, setSaved] = React.useState(false);
  const discount = discountPercent(product);
  const href = `/products/${product.slug}`;
  const reviewSummary = getReviewSummary(product.slug);
  const categoryLabel = product.category.replaceAll("-", " ");
  const cardClass =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface-raised shadow-[0_6px_20px_rgba(40,24,32,0.14)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(40,24,32,0.22)] motion-reduce:transform-none motion-reduce:transition-none";

  return (
    <article className={cn(cardClass, className)}>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#fde8eb] sm:aspect-[1/0.82]">
        <Link
          to={href}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 block outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus-ring"
        >
          <img
            src={product.image}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>
        {discount > 0 && (
          <span className="pointer-events-none absolute top-2 left-2 rounded-full bg-accent-promotion-strong px-2.5 py-1 text-[0.625rem] font-bold text-action-on-solid shadow-sm sm:top-3 sm:left-3 sm:text-xs">
            {discount}% off
          </span>
        )}
        <span className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-surface-raised/95 px-3 py-1.5 text-[0.625rem] font-bold uppercase tracking-[0.12em] text-action-default shadow-sm sm:bottom-3 sm:left-3 sm:text-xs">
          {categoryLabel}
        </span>
        <button
          type="button"
          aria-label={
            saved
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={saved}
          onClick={() => setSaved((value) => !value)}
          className="absolute top-2 right-2 z-10 inline-flex size-9 items-center justify-center rounded-full bg-surface-raised/95 text-action-default shadow-sm transition-[color,transform] duration-200 hover:scale-105 hover:text-accent-promotion-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring sm:top-3 sm:right-3 sm:size-10"
        >
          <Heart
            aria-hidden
            className={cn("size-[18px]", saved && "fill-current")}
          />
        </button>
      </div>
      <div className="flex flex-1 flex-col items-center px-3 pt-4 pb-3.5 text-center sm:px-4 sm:pt-5 sm:pb-4">
        <h3 className="type-product-title line-clamp-2 min-h-10 text-base leading-5 text-text-primary sm:text-lg sm:leading-6">
          <Link
            to={href}
            className="rounded-sm outline-none hover:text-action-default focus-visible:underline"
          >
            {product.name}
          </Link>
        </h3>
        {showDescription && (
          <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-text-secondary sm:text-sm">
            {product.description}
          </p>
        )}
        {product.rating !== undefined && (
          <div
            className="mt-3 flex items-center gap-1.5 text-xs text-text-muted sm:text-sm"
            aria-label={`${product.rating} out of 5 stars${reviewSummary.total ? `, ${reviewSummary.total} reviews` : ""}`}
          >
            <span aria-hidden className="flex text-amber-500">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={cn(
                    "size-3.5",
                    index < Math.round(product.rating!) && "fill-current",
                  )}
                />
              ))}
            </span>
            <span>
              {product.rating.toFixed(1)}
              {reviewSummary.total > 0
                ? ` (${reviewSummary.total.toLocaleString()})`
                : ""}
            </span>
          </div>
        )}
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-1 pt-4">
          <span className="type-price text-xl text-text-primary sm:text-2xl">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <s className="text-xs text-text-muted sm:text-sm">
              {formatPrice(product.compareAtPrice)}
            </s>
          )}
          {discount > 0 && (
            <span className="text-xs font-bold text-accent-promotion-strong sm:text-sm">
              {discount}% off
            </span>
          )}
        </div>
        {showAction && (
          <Button
            size="small"
            fullWidth
            className="relative z-10 mt-3 min-h-10 min-w-0 gap-1 px-2 sm:min-h-11 sm:px-3"
            aria-label={`Add ${product.name} to cart`}
            onClick={() =>
              add({ productId: product.id, size: "Standard", quantity: 1 })
            }
          >
            <ShoppingCart aria-hidden className="size-3.5" /> Add to cart
          </Button>
        )}
      </div>
    </article>
  );
}

export { ProductCard };
export type { ProductCardProps };
