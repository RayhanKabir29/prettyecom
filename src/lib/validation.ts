/** Small, dependency-free validators and input formatters for checkout. */

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

export const isUsZip = (v: string) => /^\d{5}(-\d{4})?$/.test(v.trim())

export const digitsOnly = (v: string) => v.replace(/\D/g, "")

/** Luhn checksum — catches most mistyped card numbers. */
export function isCardNumber(v: string) {
  const d = digitsOnly(v)
  if (d.length < 13 || d.length > 19) return false
  let sum = 0
  for (let i = 0; i < d.length; i++) {
    let n = Number(d[d.length - 1 - i])
    if (i % 2 === 1) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
  }
  return sum % 10 === 0
}

export type CardBrand = "visa" | "mastercard" | "amex" | undefined

export function cardBrand(v: string): CardBrand {
  const d = digitsOnly(v)
  if (/^4/.test(d)) return "visa"
  if (/^(5[1-5]|2[2-7])/.test(d)) return "mastercard"
  if (/^3[47]/.test(d)) return "amex"
  return undefined
}

/** "4242424242424242" → "4242 4242 4242 4242" (Amex: 4-6-5). */
export function formatCardNumber(v: string) {
  const d = digitsOnly(v).slice(0, 19)
  if (cardBrand(d) === "amex") return [d.slice(0, 4), d.slice(4, 10), d.slice(10, 15)].filter(Boolean).join(" ")
  return d.replace(/(.{4})/g, "$1 ").trim()
}

/** "1228" → "12 / 28" */
export function formatExpiry(v: string) {
  const d = digitsOnly(v).slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d
}

/** MM / YY that is a real month and not in the past. */
export function isFutureExpiry(v: string, now = new Date()) {
  const d = digitsOnly(v)
  if (d.length !== 4) return false
  const month = Number(d.slice(0, 2))
  const year = 2000 + Number(d.slice(2))
  if (month < 1 || month > 12) return false
  const endOfMonth = new Date(year, month, 0, 23, 59, 59)
  return endOfMonth >= now
}

export const isCvc = (v: string, brand: CardBrand) => (brand === "amex" ? /^\d{4}$/ : /^\d{3,4}$/).test(v)
