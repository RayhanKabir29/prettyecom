import type { CountryCode } from "@/data/regions"
import type { ShippingMethod } from "@/lib/pricing"
import { cardBrand, isCardNumber, isCvc, isEmail, isFutureExpiry, isUsZip } from "@/lib/validation"

export type Address = {
  country: CountryCode
  firstName: string
  lastName: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  phone: string
}

export type CheckoutForm = {
  email: string
  newsletter: boolean
  shipping: Address
  method: ShippingMethod
  cardNumber: string
  expiry: string
  cvc: string
  nameOnCard: string
  billingSame: boolean
  billing: Address
}

export const emptyAddress: Address = {
  country: "US",
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
}

export const initialForm: CheckoutForm = {
  email: "",
  newsletter: false,
  shipping: emptyAddress,
  method: "standard",
  cardNumber: "",
  expiry: "",
  cvc: "",
  nameOnCard: "",
  billingSame: true,
  billing: emptyAddress,
}

/** Field path → message. Paths match the inputs' `name` attributes, e.g. "shipping.zip". */
export type Errors = Partial<Record<string, string>>

function validateAddress(a: Address, prefix: string, errors: Errors) {
  const req = (key: keyof Address, msg: string) => {
    if (!a[key].trim()) errors[`${prefix}.${key}`] = msg
  }
  req("firstName", "Please add your first name.")
  req("lastName", "Please add your last name.")
  req("address1", "Please add your street address.")
  req("city", "Please add your city.")
  req("state", a.country === "US" ? "Please choose your state." : "Please add your region.")
  if (!a.zip.trim()) errors[`${prefix}.zip`] = a.country === "US" ? "Please add your ZIP code." : "Please add your postal code."
  else if (a.country === "US" && !isUsZip(a.zip)) errors[`${prefix}.zip`] = "ZIP codes have 5 digits, like 10012."
}

export function validate(f: CheckoutForm): Errors {
  const errors: Errors = {}
  if (!f.email.trim()) errors.email = "Please add your email so we can send your receipt."
  else if (!isEmail(f.email)) errors.email = "That email doesn't look quite right."

  validateAddress(f.shipping, "shipping", errors)

  if (!f.cardNumber.trim()) errors.cardNumber = "Please add your card number."
  else if (!isCardNumber(f.cardNumber)) errors.cardNumber = "That card number doesn't look right."
  if (!f.expiry.trim()) errors.expiry = "Please add the expiration date."
  else if (!isFutureExpiry(f.expiry)) errors.expiry = "Use a future date in MM / YY format."
  if (!f.cvc.trim()) errors.cvc = "Please add the security code."
  else if (!isCvc(f.cvc, cardBrand(f.cardNumber))) errors.cvc = "Security codes are 3 digits (4 on Amex)."
  if (!f.nameOnCard.trim()) errors.nameOnCard = "Please add the name shown on your card."

  if (!f.billingSame) validateAddress(f.billing, "billing", errors)
  return errors
}
