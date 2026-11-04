import { ArrowRight, Lock } from "lucide-react"
import { Link } from "react-router"

import { Button, DiscountCodeForm } from "@/components/common"
import { formatPrice } from "@/data/products"
import { summarize, TAX_REGION } from "@/lib/pricing"

type Summary = ReturnType<typeof summarize>

const row = "flex items-center justify-between text-xs text-text-secondary"

/** Right-hand "Order summary" card (lavender, sticky on desktop). */
function OrderSummary({
  summary,
  code,
  onApplyCode,
}: {
  summary: Summary
  code?: string
  onApplyCode: (code: string | undefined) => void
}) {
  const savings = summary.saleSavings + summary.discount

  return (
    <aside aria-labelledby="summary-title" className="rounded-[18px] bg-surface-subtle p-6 lg:sticky lg:top-6 lg:p-[26px]">
      <h2 id="summary-title" className="type-heading-subsection text-text-primary">
        Order summary
      </h2>
      {savings > 0 && (
        <p className="type-utility-caption mt-2 text-action-default">
          A little treat: you're saving {formatPrice(savings)} on your bag.
        </p>
      )}

      <hr className="my-5 border-border-subtle" />

      <DiscountCodeForm code={code} onChange={onApplyCode} />

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
          <dt>Standard shipping</dt>
          <dd>{summary.shipping === 0 ? "Free" : formatPrice(summary.shipping)}</dd>
        </div>
        <div className={row}>
          <dt>Estimated tax</dt>
          <dd>{formatPrice(summary.tax)}</dd>
        </div>
      </dl>

      <hr className="my-5 border-border-subtle" />

      <div className="flex items-baseline justify-between gap-3">
        <p className="type-heading-card text-text-primary">Estimated total</p>
        <p className="flex items-baseline gap-2">
          <span className="type-utility-caption text-text-secondary">USD</span>
          <span className="text-2xl font-bold text-text-primary">{formatPrice(summary.total)}</span>
        </p>
      </div>
      <p className="type-utility-caption mt-2 text-text-secondary">
        Tax estimated for {TAX_REGION}. Final tax is calculated at checkout.
      </p>

      <Button asChild fullWidth className="mt-5 gap-1.5">
        <Link to="/checkout">
          Continue to checkout <ArrowRight aria-hidden className="size-[13px]" />
        </Link>
      </Button>
      <p className="type-utility-caption mt-4 flex items-center justify-center gap-1.5 text-text-secondary">
        <Lock aria-hidden className="size-3.5 text-action-default" />
        Secure checkout · Encrypted payments
      </p>
    </aside>
  )
}

export { OrderSummary }
