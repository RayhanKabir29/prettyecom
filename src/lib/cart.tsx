import * as React from "react"


export type CartLine = { productId: string; size: string; quantity: number }

type CartContextValue = {
  lines: CartLine[]
  count: number
  add: (line: CartLine) => void
  remove: (productId: string, size: string) => void
  setQuantity: (productId: string, size: string, quantity: number) => void
  clear: () => void
  /** Discount code applied in the bag; carried through to checkout */
  discountCode?: string
  setDiscountCode: (code: string | undefined) => void
}

const CartContext = React.createContext<CartContextValue | null>(null)
const STORAGE_KEY = "fp-cart"

function readStored(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartLine[]) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = React.useState<CartLine[]>(readStored)
  const [discountCode, setDiscountCode] = React.useState<string>()

  React.useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* storage unavailable — cart stays in memory */
    }
  }, [lines])

  const value = React.useMemo<CartContextValue>(() => {
    const same = (l: CartLine, id: string, size: string) => l.productId === id && l.size === size
    return {
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      add: (line) =>
        setLines((prev) =>
          prev.some((l) => same(l, line.productId, line.size))
            ? prev.map((l) => (same(l, line.productId, line.size) ? { ...l, quantity: l.quantity + line.quantity } : l))
            : [...prev, line]
        ),
      remove: (id, size) => setLines((prev) => prev.filter((l) => !same(l, id, size))),
      setQuantity: (id, size, quantity) =>
        setLines((prev) =>
          quantity <= 0 ? prev.filter((l) => !same(l, id, size)) : prev.map((l) => (same(l, id, size) ? { ...l, quantity } : l))
        ),
      clear: () => {
        setLines([])
        setDiscountCode(undefined)
      },
      discountCode,
      setDiscountCode,
    }
  }, [lines, discountCode])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>")
  return ctx
}
