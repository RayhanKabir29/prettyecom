/**
 * Fresh & Pretty — color foundation as typed data.
 * Mirrors src/index.css. Use it for docs, charts, or anywhere a raw value
 * is needed in JS. In components, prefer Tailwind role utilities instead.
 */

export const primitives = {
  "burgundy.900": { name: "Deep burgundy", value: "#870D2E", cssVar: "--fp-purple-900" },
  "burgundy.800": { name: "Burgundy shadow", value: "#6E1230", cssVar: "--fp-purple-800" },
  "burgundy.600": { name: "Burgundy action", value: "#A20F3C", cssVar: "--fp-purple-600" },
  "burgundy.400": { name: "Muted burgundy", value: "#A85A70", cssVar: "--fp-purple-400" },
  "burgundy.300": { name: "Dusty rose", value: "#BB8496", cssVar: "--fp-purple-300" },
  "burgundy.200": { name: "Blush border", value: "#EFC4D0", cssVar: "--fp-purple-200" },
  "burgundy.150": { name: "Blush rule", value: "#F3D6DE", cssVar: "--fp-purple-150" },
  "burgundy.100": { name: "Petal blush", value: "#F9E2E9", cssVar: "--fp-purple-100" },
  "burgundy.075": { name: "Blush wash", value: "#FFF1F4", cssVar: "--fp-purple-075" },
  "burgundy.025": { name: "Warm porcelain", value: "#FFFDFD", cssVar: "--fp-purple-025" },
  "neutral.000": { name: "Pure white", value: "#FFFFFF", cssVar: "--fp-neutral-000" },
  "rose.500": { name: "Rose accent", value: "#E72262", cssVar: "--fp-rose-500" },
} as const

export type PrimitiveKey = keyof typeof primitives

export const roles: {
  role: string
  foundation: PrimitiveKey
  application: string
  utility: string
}[] = [
  { role: "surface.canvas", foundation: "burgundy.025", application: "Page background and specimen canvas", utility: "bg-surface-canvas" },
  { role: "surface.raised", foundation: "neutral.000", application: "Inputs and elevated content", utility: "bg-surface-raised" },
  { role: "surface.subtle / disabled", foundation: "burgundy.075", application: "Selected panels and inactive button fill", utility: "bg-surface-subtle" },
  { role: "surface.inverse", foundation: "burgundy.900", application: "Announcement and footer bands", utility: "bg-surface-inverse" },
  { role: "text.primary", foundation: "burgundy.900", application: "Headings, labels and product names", utility: "text-text-primary" },
  { role: "text.secondary", foundation: "burgundy.800", application: "Body copy and supporting descriptions", utility: "text-text-secondary" },
  { role: "text.muted / disabled", foundation: "burgundy.400", application: "Metadata on porcelain; inactive labels", utility: "text-text-muted" },
  { role: "text.inverse", foundation: "burgundy.100", application: "Supporting text on deep burgundy", utility: "text-text-inverse" },
  { role: "action.default / focus.ring", foundation: "burgundy.600", application: "Primary action, links, secondary border and ring", utility: "bg-action-default" },
  { role: "action.hover", foundation: "burgundy.800", application: "Primary hover; secondary and tertiary hover text", utility: "bg-action-hover" },
  { role: "action.pressed", foundation: "burgundy.900", application: "Primary pressed; secondary and tertiary pressed text", utility: "bg-action-pressed" },
  { role: "action.on-solid", foundation: "neutral.000", application: "Labels on primary actions in every enabled state", utility: "text-action-on-solid" },
  { role: "border.default / disabled", foundation: "burgundy.200", application: "Quiet fields and disabled secondary outline", utility: "border-border-default" },
  { role: "border.subtle", foundation: "burgundy.150", application: "Decorative dividers; not a control boundary", utility: "border-border-subtle" },
  { role: "accent.promotion", foundation: "rose.500", application: "Sale accents only; not primary actions or errors", utility: "bg-accent-promotion" },
]
