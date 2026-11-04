import * as React from "react"
import { CircleHelp, CreditCard, LoaderCircle, Lock, LockKeyhole } from "lucide-react"
import { Link, useNavigate } from "react-router"

import { Button, Field, InputWithIcon, inputClass, PageBreadcrumb } from "@/components/common"
import { Checkbox } from "@/components/ui/checkbox"
import { formatPrice } from "@/data/products"
import { countries } from "@/data/regions"
import { useCart } from "@/lib/cart"
import { priceLines, shippingCost, shippingMethods, summarize, type ShippingMethod } from "@/lib/pricing"
import { LAST_ORDER_KEY, type PlacedOrder } from "@/lib/order"
import { cn } from "@/lib/utils"
import { cardBrand, digitsOnly, formatCardNumber, formatExpiry } from "@/lib/validation"

import { AddressFields } from "./address-fields"
import { CheckoutSummary } from "./checkout-summary"
import { initialForm, validate, type CheckoutForm, type Errors } from "./form"

/*
 * Checkout — built from the "A little closer to your glow." screenshot (Figma
 * MCP limit reached). Route: /checkout (checkout header + minimal footer).
 *
 * Payment is simulated: no card data leaves the browser. Wire `placeOrder`
 * to your payment provider (Stripe Elements, Adyen, …) before going live —
 * those collect card details in their own secure fields.
 */

/** Demo order reference, e.g. "FP-482913". Your order API will return the real one. */
const nowIso = () => new Date().toISOString()
const newOrderNumber = () => `FP-${String(Math.floor(100000 + Math.random() * 900000))}`

function SectionTitle({ n, title, aside }: { n: number; title: string; aside?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-3">
        <span aria-hidden className="inline-flex size-6 items-center justify-center rounded-full bg-surface-subtle text-[0.6875rem] font-bold text-action-default">
          {n}
        </span>
        <span className="type-heading-subsection text-text-primary">{title}</span>
      </h2>
      {aside}
    </div>
  )
}

const choiceCard =
  "flex cursor-pointer items-center gap-3.5 rounded-[10px] border px-4 py-3.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus-ring"

/** Native radio styled as the design's ring — keeps keyboard + form semantics for free. */
const radioDot =
  "size-[18px] shrink-0 appearance-none rounded-full border-2 border-border-default bg-surface-raised checked:border-[5px] checked:border-action-default outline-none"

export default function CheckoutPage() {
  const cart = useCart()
  const navigate = useNavigate()
  const [form, setForm] = React.useState<CheckoutForm>(initialForm)
  const [errors, setErrors] = React.useState<Errors>({})
  const [submitted, setSubmitted] = React.useState(false)
  const [placing, setPlacing] = React.useState(false)
  const formRef = React.useRef<HTMLFormElement>(null)

  const lines = priceLines(cart.lines)
  const summary = summarize(lines, cart.discountCode, form.method)
  const brand = cardBrand(form.cardNumber)

  /** Update a field; once the user has tried to submit, re-validate live. */
  const update = (patch: Partial<CheckoutForm>) => {
    const next = { ...form, ...patch }
    setForm(next)
    if (submitted) setErrors(validate(next))
  }

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const found = validate(form)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setPlacing(true)
    await new Promise((r) => setTimeout(r, 900)) // simulated payment authorisation
    const a = form.shipping
    const order: PlacedOrder = {
      number: newOrderNumber(),
      placedAt: nowIso(),
      email: form.email.trim(),
      firstName: a.firstName.trim(),
      items: lines.map((l) => ({
        name: l.product.name,
        slug: l.product.slug,
        image: l.product.image,
        size: l.size,
        quantity: l.quantity,
        lineTotal: l.lineTotal,
      })),
      itemCount: summary.items,
      subtotal: summary.subtotal,
      discount: summary.discount,
      discountCode: cart.discountCode,
      shipping: summary.shipping,
      tax: summary.tax,
      total: summary.total,
      method: form.method,
      shipTo: [
        `${a.firstName} ${a.lastName}`.trim(),
        a.address1,
        a.address2,
        `${a.city}, ${a.state} ${a.zip}`.trim(),
        countries.find((c) => c.code === a.country)?.name ?? a.country,
      ].filter(Boolean),
      cardLast4: digitsOnly(form.cardNumber).slice(-4),
      cardBrand: brand,
    }
    try {
      sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order))
    } catch {
      /* storage unavailable — router state still carries the order */
    }
    cart.clear()
    navigate("/order-confirmation", { replace: true, state: { order } })
  }

  const errorCount = Object.keys(errors).length

  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-16 md:px-8 lg:px-[50px]">
      <PageBreadcrumb className="pt-5" items={[{ label: "Shopping bag", to: "/cart" }, { label: "Checkout" }]} />

      <h1 className="type-heading-section mt-6 text-text-primary sm:type-heading-page">A little closer to your glow.</h1>
      <p className="mt-2 text-[0.8125rem] text-text-secondary">Checkout as a guest. Just the essentials, then a little care.</p>

      {lines.length === 0 ? (
        <div className="mt-8 flex flex-col items-start gap-4 rounded-[18px] bg-surface-subtle p-8">
          <p className="type-body-default text-text-secondary">Your bag is empty, so there's nothing to check out yet.</p>
          <Button asChild>
            <Link to="/catalog">Shop the collection</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-[60px]">
          <form ref={formRef} onSubmit={placeOrder} noValidate className="order-2 flex flex-col lg:order-1">
            {submitted && errorCount > 0 && (
              <p role="alert" className="mb-6 rounded-[10px] border border-destructive/30 bg-surface-raised px-4 py-3 text-xs text-destructive">
                Please check {errorCount === 1 ? "1 field" : `${errorCount} fields`} below — we've marked what needs a little attention.
              </p>
            )}

            {/* 1 · Contact */}
            <section aria-label="Contact" className="flex flex-col gap-4 border-b border-border-subtle pb-8">
              <SectionTitle
                n={1}
                title="Contact"
                aside={
                  <Link to="/sign-in" className="type-utility-caption rounded-sm text-action-default underline underline-offset-2 hover:text-action-hover">
                    Have an account? Sign in
                  </Link>
                }
              />
              <Field label="Email address" error={errors.email}>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => update({ email: e.target.value })}
                  placeholder="jessica.james@example.com"
                />
              </Field>
              <label className="flex items-center gap-2.5 text-xs text-text-secondary">
                <Checkbox
                  checked={form.newsletter}
                  onCheckedChange={(v) => update({ newsletter: v === true })}
                  className="size-[18px] rounded-[4px] border-border-default bg-surface-raised"
                />
                Send me skincare tips and a little Fresh &amp; Pretty news.
              </label>
            </section>

            {/* 2 · Shipping address */}
            <section aria-label="Shipping address" className="flex flex-col gap-4 border-b border-border-subtle py-8">
              <SectionTitle n={2} title="Shipping address" />
              <p className="type-utility-caption -mt-1 text-text-secondary">All fields are required unless marked optional.</p>
              <AddressFields prefix="shipping" value={form.shipping} errors={errors} withPhone onChange={(shipping) => update({ shipping })} />
            </section>

            {/* 3 · Delivery */}
            <section aria-label="Delivery" className="flex flex-col gap-3 border-b border-border-subtle py-8">
              <SectionTitle n={3} title="Delivery" />
              <fieldset className="mt-1 flex flex-col gap-3">
                <legend className="sr-only">Delivery method</legend>
                {(Object.keys(shippingMethods) as ShippingMethod[]).map((m) => {
                  const cost = shippingCost(m, summary.subtotal)
                  const checked = form.method === m
                  return (
                    <label
                      key={m}
                      className={cn(choiceCard, checked ? "border-border-default bg-surface-subtle" : "border-border-subtle bg-surface-raised hover:bg-surface-subtle/60")}
                    >
                      <input type="radio" name="method" value={m} checked={checked} onChange={() => update({ method: m })} className={radioDot} />
                      <span className="flex flex-1 flex-col">
                        <span className="text-xs font-bold text-text-primary">{shippingMethods[m].label}</span>
                        <span className="type-utility-caption text-text-secondary">{shippingMethods[m].eta}</span>
                      </span>
                      <span className={cn("text-xs", cost === 0 ? "text-text-primary" : "font-bold text-action-default")}>
                        {cost === 0 ? "Free" : formatPrice(cost)}
                      </span>
                    </label>
                  )
                })}
              </fieldset>
              <p className="type-utility-caption text-text-secondary">A little extra, on us. Free standard shipping on orders over $60.</p>
            </section>

            {/* 4 · Payment */}
            <section aria-label="Payment" className="flex flex-col gap-4 pt-8">
              <SectionTitle n={4} title="Payment" />
              <p className="type-utility-caption -mt-1 flex items-center gap-1.5 text-text-secondary">
                <Lock aria-hidden className="size-3.5 text-action-default" />
                Your payment details are encrypted and secure.
              </p>

              <div className="overflow-hidden rounded-[10px] border border-border-default">
                <div className="flex items-center justify-between gap-3 bg-surface-subtle px-4 py-3">
                  <label className="flex items-center gap-3 text-xs font-bold text-text-primary">
                    <input type="radio" name="paymentType" defaultChecked className={radioDot} />
                    Credit or debit card
                  </label>
                  <ul className="flex gap-1.5" aria-label="Accepted cards">
                    {(["visa", "mastercard", "amex"] as const).map((b) => (
                      <li
                        key={b}
                        className={cn(
                          "rounded-[4px] border bg-surface-raised px-1.5 py-0.5 text-[0.5625rem] font-bold transition-colors",
                          brand === b ? "border-action-default text-action-default" : "border-transparent text-text-primary"
                        )}
                      >
                        {b === "mastercard" ? "Mastercard" : b.toUpperCase()}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-4 bg-surface-canvas p-4">
                  <Field label="Card number" error={errors.cardNumber}>
                    <InputWithIcon
                      icon={<CreditCard aria-hidden />}
                      name="cardNumber"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      value={form.cardNumber}
                      onChange={(e) => update({ cardNumber: formatCardNumber(e.target.value) })}
                      placeholder="1234 1234 1234 1234"
                    />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Expiration date" error={errors.expiry}>
                      <input
                        name="expiry"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        className={inputClass}
                        value={form.expiry}
                        onChange={(e) => update({ expiry: formatExpiry(e.target.value) })}
                        placeholder="MM / YY"
                      />
                    </Field>
                    <Field label="Security code" error={errors.cvc} hint="3 digits on the back (4 on the front for Amex).">
                      <InputWithIcon
                        icon={<CircleHelp aria-hidden />}
                        name="cvc"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        value={form.cvc}
                        onChange={(e) => update({ cvc: digitsOnly(e.target.value).slice(0, 4) })}
                        placeholder="CVC"
                      />
                    </Field>
                  </div>
                  <Field label="Name on card" error={errors.nameOnCard}>
                    <input
                      name="nameOnCard"
                      autoComplete="cc-name"
                      className={inputClass}
                      value={form.nameOnCard}
                      onChange={(e) => update({ nameOnCard: e.target.value })}
                      placeholder="Full name as shown on card"
                    />
                  </Field>
                </div>
              </div>

              <fieldset className="mt-2 flex flex-col gap-2.5">
                <legend className="mb-2.5 text-xs font-bold text-text-primary">Billing address</legend>
                <label className="flex cursor-pointer items-center gap-2.5 text-xs text-text-secondary">
                  <input type="radio" name="billingSame" checked={form.billingSame} onChange={() => update({ billingSame: true })} className={radioDot} />
                  Same as shipping address
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 text-xs text-text-secondary">
                  <input type="radio" name="billingSame" checked={!form.billingSame} onChange={() => update({ billingSame: false })} className={radioDot} />
                  Use a different billing address
                </label>
              </fieldset>
              {!form.billingSame && (
                <div className="rounded-[10px] border border-border-subtle p-4">
                  <AddressFields prefix="billing" value={form.billing} errors={errors} onChange={(billing) => update({ billing })} />
                </div>
              )}

              <Button type="submit" size="large" fullWidth disabled={placing} className="mt-4 gap-2" aria-describedby="order-terms">
                {placing ? (
                  <>
                    <LoaderCircle aria-hidden className="size-4 animate-spin" /> Placing your order…
                  </>
                ) : (
                  <>
                    Place order — {formatPrice(summary.total)} <LockKeyhole aria-hidden className="size-4" />
                  </>
                )}
              </Button>
              <p id="order-terms" className="type-utility-caption text-center text-text-secondary">
                By placing your order, you agree to our{" "}
                <Link to="/terms" className="underline underline-offset-2 hover:text-action-default">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="underline underline-offset-2 hover:text-action-default">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>
          </form>

          <div className="order-1 lg:order-2">
            <CheckoutSummary lines={lines} summary={summary} code={cart.discountCode} onCodeChange={cart.setDiscountCode} />
          </div>
        </div>
      )}
    </div>
  )
}
