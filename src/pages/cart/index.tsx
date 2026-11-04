import * as React from "react"
import { ArrowLeft, ArrowRight, RefreshCw, ShoppingBag, Truck } from "lucide-react"
import { Link } from "react-router"

import { Button, Eyebrow, PageBreadcrumb, QuantityStepper } from "@/components/common"
import { formatPrice } from "@/data/products"
import { useCart } from "@/lib/cart"
import { priceLines, summarize } from "@/lib/pricing"

import { OrderSummary } from "./order-summary"

/*
 * Shopping bag — built from the "Your shopping bag" screenshot (Figma MCP
 * limit reached). Route: /cart. Uses the minimal footer (route handle).
 */
export default function CartPage() {
  const cart = useCart()
  const lines = priceLines(cart.lines)
  const summary = summarize(lines, cart.discountCode)
  const [announcement, setAnnouncement] = React.useState("")

  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-16 md:px-8 lg:px-[60px]">
      <PageBreadcrumb className="pt-5" items={[{ label: "Home", to: "/" }, { label: "Shopping bag" }]} />

      <header className="mt-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <Eyebrow className="text-[0.6875rem] leading-4">Your daily ritual, almost home</Eyebrow>
          <h1 className="type-heading-section mt-2 text-text-primary sm:type-heading-page">Your shopping bag</h1>
          <p className="mt-2 text-[0.8125rem] text-text-secondary">A little care, a little glow. Your feel-good essentials are here.</p>
        </div>
        {lines.length > 0 && (
          <p className="type-utility-caption text-text-secondary">
            {lines.length} lovely little {lines.length === 1 ? "thing" : "things"}
          </p>
        )}
      </header>
      <p role="status" className="sr-only">
        {announcement}
      </p>

      {lines.length === 0 ? (
        <section className="mt-8 flex flex-col items-center gap-4 rounded-[18px] bg-surface-subtle px-6 py-16 text-center">
          <ShoppingBag aria-hidden className="size-8 text-action-default" />
          <h2 className="type-heading-card text-text-primary">Your bag is waiting for a little something</h2>
          <p className="type-body-compact max-w-sm text-text-secondary">Find the feel-good essentials for your daily ritual.</p>
          <Button asChild className="gap-1.5">
            <Link to="/catalog">
              Shop the collection <ArrowRight aria-hidden className="size-[13px]" />
            </Link>
          </Button>
        </section>
      ) : (
        <div className="mt-7 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_368px] lg:gap-[37px]">
          <div>
            {/* Free shipping notice */}
            <div className="flex items-center gap-3 rounded-[12px] bg-surface-subtle px-5 py-4">
              <Truck aria-hidden className="size-5 shrink-0 text-action-default" />
              {summary.freeShipping ? (
                <p className="flex flex-col">
                  <span className="text-xs font-bold text-text-primary">A little extra, on us — your shipping is free.</span>
                  <span className="type-utility-caption text-text-secondary">Your bag qualifies for free standard shipping on orders over $60.</span>
                </p>
              ) : (
                <p className="flex flex-col">
                  <span className="text-xs font-bold text-text-primary">
                    You're {formatPrice(summary.toFreeShipping)} away from free shipping.
                  </span>
                  <span className="type-utility-caption text-text-secondary">Free standard shipping on orders over $60.</span>
                </p>
              )}
            </div>

            {/* Line items — one row each; 4 columns on desktop, stacked on mobile */}
            <div
              aria-hidden
              className="type-utility-caption mt-6 hidden grid-cols-[minmax(0,1fr)_90px_130px_80px] border-b border-border-subtle pb-3 tracking-[1px] text-text-muted uppercase md:grid"
            >
              <span>Product</span>
              <span>Price</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
            </div>
            <ul aria-label="Items in your bag" className="mt-2 md:mt-0">
              {lines.map((l) => (
                <li
                  key={`${l.productId}-${l.size}`}
                  className="grid grid-cols-[90px_minmax(0,1fr)] items-center gap-x-4 gap-y-3 border-b border-border-subtle py-5 md:grid-cols-[85px_minmax(0,1fr)_90px_130px_80px] md:gap-y-0"
                >
                  <Link to={`/products/${l.product.slug}`} tabIndex={-1} aria-hidden className="row-span-3 self-start md:row-span-1">
                    <img src={l.product.image} alt="" className="h-[80px] w-[90px] rounded-[10px] object-cover md:h-[75px] md:w-[85px]" />
                  </Link>
                  <LineInfo
                    line={l}
                    onRemove={() => {
                      cart.remove(l.productId, l.size)
                      setAnnouncement(`${l.product.name} removed from your bag.`)
                    }}
                  />
                  <p className="text-xs text-text-secondary">
                    <span className="md:sr-only">Price: </span>
                    {formatPrice(l.product.price)}
                    {l.product.compareAtPrice && (
                      <s className="type-utility-caption ml-1.5 text-text-muted md:ml-0 md:block">{formatPrice(l.product.compareAtPrice)}</s>
                    )}
                  </p>
                  <div className="col-start-2 flex items-center justify-between gap-3 md:col-start-auto md:contents">
                    <div className="md:flex md:justify-center">
                      <QuantityStepper
                        size="sm"
                        value={l.quantity}
                        max={10}
                        label={`Quantity for ${l.product.name}`}
                        onChange={(q) => cart.setQuantity(l.productId, l.size, q)}
                      />
                    </div>
                    <p className="text-sm font-bold text-text-primary md:text-right">
                      <span className="sr-only">Total: </span>
                      {formatPrice(l.lineTotal)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              to="/catalog"
              className="mt-6 inline-flex items-center gap-2 rounded-sm text-xs font-bold text-action-default underline underline-offset-4 hover:text-action-hover outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            >
              <ArrowLeft aria-hidden className="size-3.5" />
              Continue shopping
            </Link>

            <div className="mt-12">
              <h2 className="type-heading-card text-text-primary">Love your ritual. We'll make sure of it.</h2>
              <p className="type-utility-caption mt-2 flex items-center gap-2 text-text-secondary">
                <RefreshCw aria-hidden className="size-4 text-action-default" />
                Shop with confidence. Every order comes with our 30-day happiness guarantee.
              </p>
            </div>
          </div>

          <OrderSummary summary={summary} code={cart.discountCode} onApplyCode={cart.setDiscountCode} />
        </div>
      )}
    </div>
  )
}

function LineInfo({ line, onRemove }: { line: ReturnType<typeof priceLines>[number]; onRemove: () => void }) {
  return (
    <div className="flex flex-col gap-1">
      <Link
        to={`/products/${line.product.slug}`}
        className="rounded-sm text-sm font-bold text-text-primary hover:text-action-default outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
      >
        {line.product.name}
      </Link>
      <span className="type-utility-caption text-text-secondary">{line.size}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${line.product.name}`}
        className="type-utility-caption self-start rounded-sm text-action-default underline underline-offset-2 hover:text-action-hover outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
      >
        Remove
      </button>
    </div>
  )
}
