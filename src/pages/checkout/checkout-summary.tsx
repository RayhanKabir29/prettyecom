import { MessageCircle, RefreshCw } from "lucide-react"
import { Link } from "react-router"

import { DiscountCodeForm } from "@/components/common"
import { formatPrice } from "@/data/products"
import type { PricedLine, summarize } from "@/lib/pricing"

type Summary = ReturnType<typeof summarize>
const row = "flex items-center justify-between text-xs text-text-secondary"

/** Right-hand "Your order" card: items with quantity badges, code, totals, reassurance. */
function CheckoutSummary({
  lines,
  summary,
  code,
  onCodeChange,
}: {
  lines: PricedLine[]
  summary: Summary
  code?: string
  onCodeChange: (code: string | undefined) => void
}) {
  const savings = summary.saleSavings + summary.discount
  return (
    <aside aria-labelledby="order-title" className="rounded-[18px] bg-surface-subtle p-6 lg:sticky lg:top-6 lg:p-[26px]">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="order-title" className="type-heading-subsection text-text-primary">
          Your order
        </h2>
        <Link to="/cart" className="type-utility-caption rounded-sm text-action-default underline underline-offset-2 hover:text-action-hover">
          Edit bag
        </Link>
      </div>
      <p className="type-utility-caption mt-2 text-text-secondary">
        {lines.length} little {lines.length === 1 ? "thing" : "things"} for your daily ritual
      </p>

      <ul className="mt-4 flex flex-col gap-4">
        {lines.map((l) => (
          <li key={`${l.productId}-${l.size}`} className="grid grid-cols-[64px_1fr_auto] items-center gap-3">
            <span className="relative">
              <img src={l.product.image} alt="" className="size-14 rounded-[10px] object-cover" />
              <span
                aria-hidden
                className="absolute -top-1.5 right-0 inline-flex size-[18px] items-center justify-center rounded-full bg-action-default text-[0.625rem] font-bold text-action-on-solid"
              >
                {l.quantity}
              </span>
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-xs font-bold text-text-primary">{l.product.name}</span>
              <span className="type-utility-caption text-text-secondary">
                {l.size} · Qty {l.quantity}
              </span>
              <span className="type-utility-caption text-text-secondary">{formatPrice(l.product.price)} each</span>
            </span>
            <span className="text-xs font-bold text-text-primary">{formatPrice(l.lineTotal)}</span>
          </li>
        ))}
      </ul>

      {savings > 0 && (
        <p className="type-utility-caption mt-4 text-action-default">Your bag includes {formatPrice(savings)} in savings. A little treat.</p>
      )}

      <hr className="my-5 border-border-subtle" />
      <DiscountCodeForm code={code} onChange={onCodeChange} />
      <hr className="my-5 border-border-subtle" />

      <dl className="flex flex-col gap-3">
        <div className={row}>
          <dt>Subtotal · {summary.items} {summary.items === 1 ? "item" : "items"}</dt>
          <dd>{formatPrice(summary.subtotal)}</dd>
        </div>
        {summary.discount > 0 && (
          <div className={row}>
            <dt>Discount</dt>
            <dd className="text-action-default">−{formatPrice(summary.discount)}</dd>
          </div>
        )}
        <div className={row}>
          <dt>{summary.method === "express" ? "Express shipping" : "Standard shipping"}</dt>
          <dd>{summary.shipping === 0 ? "Free" : formatPrice(summary.shipping)}</dd>
        </div>
        <div className={row}>
          <dt>Tax</dt>
          <dd>{formatPrice(summary.tax)}</dd>
        </div>
      </dl>

      <hr className="my-5 border-border-subtle" />

      <div className="flex items-baseline justify-between gap-3">
        <p className="type-heading-card text-text-primary">Total</p>
        <p className="flex items-baseline gap-2">
          <span className="type-utility-caption text-text-secondary">USD</span>
          <span className="text-2xl font-bold text-text-primary" aria-live="polite">
            {formatPrice(summary.total)}
          </span>
        </p>
      </div>
      <p className="type-utility-caption mt-2 text-text-secondary">Includes {formatPrice(summary.tax)} tax for your shipping address.</p>

      <hr className="my-5 border-border-subtle" />

      <div className="flex items-start gap-3">
        <RefreshCw aria-hidden className="mt-0.5 size-5 shrink-0 text-action-default" />
        <div>
          <p className="type-heading-card text-text-primary">Shop with confidence</p>
          <p className="type-utility-caption mt-1 text-text-secondary">Love your ritual: 30-day happiness guarantee.</p>
        </div>
      </div>
      <Link
        to="/contact"
        className="type-utility-caption mt-4 inline-flex items-center gap-2 rounded-sm text-action-default underline underline-offset-2 hover:text-action-hover"
      >
        <MessageCircle aria-hidden className="size-3.5" />
        A little help? Contact us
      </Link>
    </aside>
  )
}

export { CheckoutSummary }
