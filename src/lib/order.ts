import type { ShippingMethod } from "./pricing"

/** Snapshot of a placed order, handed from checkout to the confirmation page. */
export type PlacedOrder = {
  number: string
  placedAt: string
  email: string
  firstName: string
  items: { name: string; slug: string; image: string; size: string; quantity: number; lineTotal: number }[]
  itemCount: number
  subtotal: number
  discount: number
  discountCode?: string
  shipping: number
  tax: number
  total: number
  method: ShippingMethod
  /** Address lines, ready to print */
  shipTo: string[]
  cardLast4: string
  cardBrand?: string
}

/** Last order is kept for the session so the confirmation page survives a refresh. */
export const LAST_ORDER_KEY = "fp-last-order"

/** Order from router state, falling back to the one saved for this session. */
export function readLastOrder(fromState: unknown): PlacedOrder | undefined {
  const state = fromState as { order?: PlacedOrder } | null
  if (state?.order) return state.order
  try {
    const raw = sessionStorage.getItem(LAST_ORDER_KEY)
    return raw ? (JSON.parse(raw) as PlacedOrder) : undefined
  } catch {
    return undefined
  }
}
