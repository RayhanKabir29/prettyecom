import { ArrowRight, Check, CreditCard, Mail, MapPin, Package, Truck } from "lucide-react"
import { Link, useLocation } from "react-router"

import { AssuranceStrip, Button, Eyebrow } from "@/components/common"
import { formatPrice } from "@/data/products"
import { readLastOrder, type PlacedOrder } from "@/lib/order"
import { shippingMethods } from "@/lib/pricing"
import { cn } from "@/lib/utils"

/*
 * Order confirmation — no Figma frame for this page; designed in the same
 * system as cart and checkout (lavender summary card, Tinos headings, numbered
 * steps). Route: /order-confirmation. Reads the order from router state, or
 * from sessionStorage after a refresh.
 */
const brandLabel: Record<string, string> = { visa: "Visa", mastercard: "Mastercard", amex: "Amex" }

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(iso))

export default function OrderConfirmationPage() {
  const location = useLocation()
  const order = readLastOrder(location.state)

  if (!order) return <NoOrder />

  const method = shippingMethods[order.method]
  const steps = [
    { icon: Check, title: "Order confirmed", text: `We've received your order and sent a receipt to ${order.email}.`, done: true },
    { icon: Package, title: "Packed with care", text: "Your essentials are wrapped by hand, usually within 1 business day.", done: false },
    { icon: Truck, title: "On its way", text: `${method.eta}. We'll email your tracking link as soon as it ships.`, done: false },
  ]

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-5 pt-8 pb-14 md:px-8 lg:px-[60px]">
        {/* Thank-you banner */}
        <section className="flex flex-col items-center rounded-[18px] bg-surface-subtle px-6 py-10 text-center md:py-12">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-action-default text-action-on-solid">
            <Check aria-hidden className="size-7" strokeWidth={2.5} />
          </span>
          <Eyebrow className="mt-5 text-[0.6875rem] leading-4">Order confirmed</Eyebrow>
          <h1 className="type-heading-section mt-2 text-text-primary sm:type-heading-page">
            Thank you{order.firstName ? `, ${order.firstName}` : ""}.
          </h1>
          <p className="type-body-default mt-3 max-w-[520px] text-text-secondary">
            Your little ritual is on its way. We've sent a confirmation to{" "}
            <span className="font-bold text-text-primary">{order.email}</span>.
          </p>
          <p className="type-utility-caption mt-5 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full bg-surface-raised px-4 py-2 text-text-secondary">
            <span>
              Order <span className="font-bold text-text-primary">{order.number}</span>
            </span>
            <span aria-hidden>·</span>
            <span>Placed {formatDate(order.placedAt)}</span>
          </p>
        </section>

        <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-[60px]">
          <div>
            {/* What happens next */}
            <section aria-labelledby="next-title">
              <h2 id="next-title" className="type-heading-subsection text-text-primary">
                What happens next
              </h2>
              <ol className="mt-6 flex flex-col">
                {steps.map((s, i) => (
                  <li key={s.title} className="relative flex gap-4 pb-7 last:pb-0">
                    {i < steps.length - 1 && (
                      <span aria-hidden className={cn("absolute top-9 bottom-1 left-[17px] w-0.5", s.done ? "bg-action-default" : "bg-border-subtle")} />
                    )}
                    <span
                      className={cn(
                        "inline-flex size-9 shrink-0 items-center justify-center rounded-full",
                        s.done ? "bg-action-default text-action-on-solid" : "border-2 border-border-default bg-surface-raised text-action-default"
                      )}
                    >
                      <s.icon aria-hidden className="size-4" />
                    </span>
                    <div className="pt-1.5">
                      <h3 className="text-sm font-bold text-text-primary">
                        {s.title}
                        <span className="sr-only">{s.done ? " (done)" : " (coming up)"}</span>
                      </h3>
                      <p className="type-body-small mt-1 text-text-secondary">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Delivery & payment details */}
            <section aria-label="Order details" className="mt-10 grid gap-4 sm:grid-cols-3">
              <DetailCard icon={MapPin} title="Shipping to">
                {order.shipTo.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </DetailCard>
              <DetailCard icon={Truck} title="Delivery">
                <span className="block">{method.label}</span>
                <span className="block">{method.eta}</span>
              </DetailCard>
              <DetailCard icon={CreditCard} title="Payment">
                <span className="block">
                  {order.cardBrand ? brandLabel[order.cardBrand] : "Card"} ending {order.cardLast4}
                </span>
                <span className="block">{formatPrice(order.total)} USD</span>
              </DetailCard>
            </section>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild className="gap-1.5">
                <Link to="/catalog">
                  Continue shopping <ArrowRight aria-hidden className="size-[13px]" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/">Back to home</Link>
              </Button>
            </div>
            <p className="type-utility-caption mt-5 flex items-center gap-2 text-text-secondary">
              <Mail aria-hidden className="size-3.5 text-action-default" />
              Questions about your order?{" "}
              <Link to="/contact" className="text-action-default underline underline-offset-2 hover:text-action-hover">
                We're here to help
              </Link>
            </p>
          </div>

          <OrderSummaryCard order={order} />
        </div>
      </div>
      <AssuranceStrip />
    </>
  )
}

function DetailCard({ icon: Icon, title, children }: { icon: typeof MapPin; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[12px] border border-border-subtle bg-surface-raised p-4">
      <h3 className="flex items-center gap-2 text-xs font-bold text-text-primary">
        <Icon aria-hidden className="size-4 text-action-default" />
        {title}
      </h3>
      <p className="type-utility-caption mt-2 text-text-secondary">{children}</p>
    </div>
  )
}

function OrderSummaryCard({ order }: { order: PlacedOrder }) {
  const row = "flex items-center justify-between text-xs text-text-secondary"
  return (
    <aside aria-labelledby="summary-title" className="rounded-[18px] bg-surface-subtle p-6 lg:p-[26px]">
      <h2 id="summary-title" className="type-heading-subsection text-text-primary">
        Order summary
      </h2>
      <p className="type-utility-caption mt-2 text-text-secondary">
        {order.itemCount} {order.itemCount === 1 ? "item" : "items"} for your daily ritual
      </p>

      <ul className="mt-4 flex flex-col gap-4">
        {order.items.map((it) => (
          <li key={`${it.slug}-${it.size}`} className="grid grid-cols-[64px_1fr_auto] items-center gap-3">
            <span className="relative">
              <img src={it.image} alt="" className="size-14 rounded-[10px] object-cover" />
              <span
                aria-hidden
                className="absolute -top-1.5 right-0 inline-flex size-[18px] items-center justify-center rounded-full bg-action-default text-[0.625rem] font-bold text-action-on-solid"
              >
                {it.quantity}
              </span>
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <Link to={`/products/${it.slug}`} className="text-xs font-bold text-text-primary hover:text-action-default">
                {it.name}
              </Link>
              <span className="type-utility-caption text-text-secondary">
                {it.size} · Qty {it.quantity}
              </span>
            </span>
            <span className="text-xs font-bold text-text-primary">{formatPrice(it.lineTotal)}</span>
          </li>
        ))}
      </ul>

      <hr className="my-5 border-border-subtle" />
      <dl className="flex flex-col gap-3">
        <div className={row}>
          <dt>Subtotal</dt>
          <dd>{formatPrice(order.subtotal)}</dd>
        </div>
        {order.discount > 0 && (
          <div className={row}>
            <dt>Discount{order.discountCode ? ` (${order.discountCode})` : ""}</dt>
            <dd className="text-action-default">−{formatPrice(order.discount)}</dd>
          </div>
        )}
        <div className={row}>
          <dt>{shippingMethods[order.method].label}</dt>
          <dd>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</dd>
        </div>
        <div className={row}>
          <dt>Tax</dt>
          <dd>{formatPrice(order.tax)}</dd>
        </div>
      </dl>
      <hr className="my-5 border-border-subtle" />
      <div className="flex items-baseline justify-between gap-3">
        <p className="type-heading-card text-text-primary">Total paid</p>
        <p className="flex items-baseline gap-2">
          <span className="type-utility-caption text-text-secondary">USD</span>
          <span className="text-2xl font-bold text-text-primary">{formatPrice(order.total)}</span>
        </p>
      </div>
    </aside>
  )
}

function NoOrder() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-4 px-5 py-20 md:px-8 lg:px-[60px]">
      <Eyebrow className="text-[0.6875rem] leading-4">Order confirmation</Eyebrow>
      <h1 className="type-heading-section text-text-primary">We couldn't find a recent order.</h1>
      <p className="type-body-default max-w-md text-text-secondary">
        If you've just placed one, your confirmation email has every detail. Otherwise, there's a little glow waiting in the collection.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/catalog">Shop the collection</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/contact">Contact us</Link>
        </Button>
      </div>
    </div>
  )
}
