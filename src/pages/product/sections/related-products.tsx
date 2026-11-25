import * as React from "react"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Link } from "react-router"

import { Button, SectionHeading } from "@/components/common"
import { formatPrice, type Product } from "@/data/products"
import { useCart } from "@/lib/cart"

function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="related-title" className="mx-auto max-w-[1200px] px-5 pt-6 pb-4 md:px-8 lg:px-[66px]">
      <SectionHeading id="related-title" variant="serif">You May Also Like</SectionHeading>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {products.map((product) => <li key={product.id}><RelatedCard product={product} /></li>)}
      </ul>
    </section>
  )
}

function RelatedCard({ product }: { product: Product }) {
  const { add } = useCart()
  const [saved, setSaved] = React.useState(false)
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface-raised p-2.5 shadow-[0_6px_20px_rgba(40,24,32,0.14)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(40,24,32,0.22)] motion-reduce:transform-none motion-reduce:transition-none sm:p-3">
      <button type="button" aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} aria-pressed={saved} onClick={() => setSaved((value) => !value)} className="absolute top-3 right-3 z-10 inline-flex size-7 items-center justify-center rounded-full bg-surface-raised/90 text-text-primary outline-none hover:text-accent-promotion-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring">
        <Heart aria-hidden className={`size-4 ${saved ? "fill-current text-accent-promotion-strong" : ""}`} />
      </button>
      <Link to={`/products/${product.slug}`} className="flex flex-1 flex-col items-center text-center outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring">
        <span className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg bg-surface-raised p-2">
          <img src={product.image} alt="" loading="lazy" className="size-full object-contain transition-transform duration-500 ease-out group-hover:scale-105" />
        </span>
        <span className="type-product-title mt-2 line-clamp-2 min-h-10 text-text-primary">{product.name}</span>
      </Link>
      <p className="mt-1 flex items-center justify-center gap-1 text-[0.625rem] text-accent-promotion">
        <span aria-hidden className="flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-2.5 fill-current" />)}</span>
        <span className="text-text-secondary">({product.rating?.toFixed(1) ?? "4.8"})</span>
      </p>
      <p className="type-price mt-1 flex items-baseline justify-center gap-1.5 text-action-default">
        {formatPrice(product.price)}{product.compareAtPrice && <s className="type-body-small font-normal text-text-muted">{formatPrice(product.compareAtPrice)}</s>}
      </p>
      <Button size="small" className="mt-2 min-h-9 w-full min-w-0 gap-1 px-2 text-[0.6875rem] sm:px-3" onClick={() => add({ productId: product.id, size: "Standard", quantity: 1 })}>
        <ShoppingCart aria-hidden className="size-3.5" /> Add to Cart
      </Button>
    </article>
  )
}

export { RelatedProducts }
