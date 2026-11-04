/**
 * Fresh & Pretty — 02 / Typography as typed data.
 * Mirrors the `type-*` utilities in src/index.css (Figma node 3344:1602).
 */

export type TypeToken =
  | "display-hero"
  | "heading-page"
  | "heading-section"
  | "heading-feature"
  | "heading-subsection"
  | "heading-card"
  | "body-default"
  | "body-compact"
  | "body-small"
  | "label-small"
  | "label-eyebrow"
  | "button-small"
  | "button-medium"
  | "button-large"
  | "utility-caption"

export const typeScale: {
  token: TypeToken
  family: "Tinos" | "Arimo"
  size: number
  lineHeight: number
  weight: 400 | 700
  tracking: number
  useFor: string
  specimen: string
}[] = [
  { token: "display-hero", family: "Tinos", size: 48, lineHeight: 51, weight: 700, tracking: 0, useFor: "Storefront hero", specimen: "A little closer to your glow." },
  { token: "heading-page", family: "Tinos", size: 44, lineHeight: 49, weight: 700, tracking: 0, useFor: "Checkout and page titles", specimen: "Care, from the very first step." },
  { token: "heading-section", family: "Tinos", size: 36, lineHeight: 40, weight: 700, tracking: 0, useFor: "Major section headings", specimen: "Your daily ritual" },
  { token: "heading-feature", family: "Tinos", size: 30, lineHeight: 33, weight: 700, tracking: 0, useFor: "Editorial features", specimen: "Botanical care for healthy skin" },
  { token: "heading-subsection", family: "Tinos", size: 26, lineHeight: 30, weight: 700, tracking: 0, useFor: "Form groups and subsections", specimen: "Shipping address" },
  { token: "heading-card", family: "Tinos", size: 22, lineHeight: 26, weight: 700, tracking: 0, useFor: "Compact editorial headings", specimen: "Shop with confidence" },
  { token: "body-default", family: "Arimo", size: 15, lineHeight: 22, weight: 400, tracking: 0, useFor: "Product and editorial copy", specimen: "Gentle formulas. A little care, every day." },
  { token: "body-compact", family: "Arimo", size: 14, lineHeight: 20, weight: 400, tracking: 0, useFor: "Forms and supporting copy", specimen: "Free standard shipping on orders over $60." },
  { token: "body-small", family: "Arimo", size: 13, lineHeight: 20, weight: 400, tracking: 0, useFor: "Cart details and metadata", specimen: "50 ml / 1.7 fl oz · Made for your daily ritual" },
  { token: "label-small", family: "Arimo", size: 12, lineHeight: 18, weight: 700, tracking: 0, useFor: "Field labels and utilities", specimen: "Email address" },
  { token: "label-eyebrow", family: "Arimo", size: 13, lineHeight: 18, weight: 700, tracking: 2, useFor: "Short uppercase section labels", specimen: "Healthy skin" },
  { token: "button-small", family: "Arimo", size: 13, lineHeight: 18, weight: 700, tracking: 0.5, useFor: "Small button label", specimen: "Shop now" },
  { token: "button-medium", family: "Arimo", size: 14, lineHeight: 20, weight: 700, tracking: 0.5, useFor: "Medium button label", specimen: "Shop now" },
  { token: "button-large", family: "Arimo", size: 15, lineHeight: 20, weight: 700, tracking: 0.5, useFor: "Large button label", specimen: "Shop now" },
  { token: "utility-caption", family: "Arimo", size: 11, lineHeight: 16, weight: 400, tracking: 0, useFor: "Nonessential legal and detail", specimen: "Includes tax for your shipping address." },
]
