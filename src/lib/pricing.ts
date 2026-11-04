import { products, type Product } from "@/data/products"

import type { CartLine } from "./cart"

/**
 * Store pricing rules used by the cart (and later checkout).
 * Values marked ASSUMPTION aren't in the design — replace with your real rules.
 */
export const FREE_SHIPPING_THRESHOLD = 60
export const STANDARD_SHIPPING = 5.95 // ASSUMPTION: only "Free" appears in the design
export const EXPRESS_SHIPPING = 12 // Checkout design: "Express shipping $12.00"

export type ShippingMethod = "standard" | "express"

export const shippingMethods: Record<ShippingMethod, { label: string; eta: string }> = {
  standard: { label: "Standard shipping", eta: "Arrives in 3–5 business days" },
  express: { label: "Express shipping", eta: "Arrives in 1–2 business days" },
}

export const shippingCost = (method: ShippingMethod, subtotal: number) =>
  method === "express" ? EXPRESS_SHIPPING : subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING
export const TAX_RATE = 0.08875 // New York, NY 10012 — matches $13.58 on $153.00 in the design
export const TAX_REGION = "New York, NY 10012"

/** ASSUMPTION: sample codes so the "Have a little treat?" field works end to end. */
export const discountCodes: Record<string, { percent: number; label: string }> = {
  GLOW10: { percent: 10, label: "10% off your ritual" },
}

export type PricedLine = CartLine & { product: Product; lineTotal: number; lineSavings: number }

export function priceLines(lines: CartLine[]): PricedLine[] {
  return lines.flatMap((l) => {
    const product = products.find((p) => p.id === l.productId)
    if (!product) return []
    return [
      {
        ...l,
        product,
        lineTotal: product.price * l.quantity,
        lineSavings: product.compareAtPrice ? (product.compareAtPrice - product.price) * l.quantity : 0,
      },
    ]
  })
}

const round = (n: number) => Math.round(n * 100) / 100

export function summarize(lines: PricedLine[], discountCode?: string, method: ShippingMethod = "standard") {
  const subtotal = round(lines.reduce((n, l) => n + l.lineTotal, 0))
  const items = lines.reduce((n, l) => n + l.quantity, 0)
  const saleSavings = round(lines.reduce((n, l) => n + l.lineSavings, 0))
  const code = discountCode ? discountCodes[discountCode] : undefined
  const discount = code ? round((subtotal * code.percent) / 100) : 0
  const afterDiscount = subtotal - discount
  const shipping = shippingCost(method, subtotal)
  const tax = round(afterDiscount * TAX_RATE)
  const total = round(afterDiscount + shipping + tax)
  return {
    subtotal,
    items,
    saleSavings,
    discount,
    shipping,
    tax,
    total,
    method,
    freeShipping: subtotal >= FREE_SHIPPING_THRESHOLD,
    toFreeShipping: round(Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)),
  }
}
