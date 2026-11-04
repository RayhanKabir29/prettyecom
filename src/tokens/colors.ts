/**
 * Fresh & Pretty — color foundation as typed data.
 * Mirrors src/index.css. Use it for docs, charts, or anywhere a raw value
 * is needed in JS. In components, prefer Tailwind role utilities instead.
 */

export const primitives = {
  "purple.900": { name: "Deep plum", value: "#2D1B4E", cssVar: "--fp-purple-900" },
  "purple.800": { name: "Aubergine", value: "#4A2D6E", cssVar: "--fp-purple-800" },
  "purple.600": { name: "Botanical purple", value: "#6B3FA0", cssVar: "--fp-purple-600" },
  "purple.400": { name: "Muted violet", value: "#81659E", cssVar: "--fp-purple-400" },
  "purple.300": { name: "Soft lilac", value: "#9B7DC0", cssVar: "--fp-purple-300" },
  "purple.200": { name: "Lilac border", value: "#C5B8E8", cssVar: "--fp-purple-200" },
  "purple.150": { name: "Lavender rule", value: "#DDD1EC", cssVar: "--fp-purple-150" },
  "purple.100": { name: "Petal lavender", value: "#E8D8F5", cssVar: "--fp-purple-100" },
  "purple.075": { name: "Lavender wash", value: "#EDE4F7", cssVar: "--fp-purple-075" },
  "purple.025": { name: "Porcelain", value: "#FAF7FF", cssVar: "--fp-purple-025" },
  "neutral.000": { name: "Pure white", value: "#FFFFFF", cssVar: "--fp-neutral-000" },
  "rose.500": { name: "Rose accent", value: "#E8336D", cssVar: "--fp-rose-500" },
} as const

export type PrimitiveKey = keyof typeof primitives

export const roles: {
  role: string
  foundation: PrimitiveKey
  application: string
  utility: string
}[] = [
  { role: "surface.canvas", foundation: "purple.025", application: "Page background and specimen canvas", utility: "bg-surface-canvas" },
  { role: "surface.raised", foundation: "neutral.000", application: "Inputs and elevated content", utility: "bg-surface-raised" },
  { role: "surface.subtle / disabled", foundation: "purple.075", application: "Selected panels and inactive button fill", utility: "bg-surface-subtle" },
  { role: "surface.inverse", foundation: "purple.900", application: "Announcement and footer bands", utility: "bg-surface-inverse" },
  { role: "text.primary", foundation: "purple.900", application: "Headings, labels and product names", utility: "text-text-primary" },
  { role: "text.secondary", foundation: "purple.800", application: "Body copy and supporting descriptions", utility: "text-text-secondary" },
  { role: "text.muted / disabled", foundation: "purple.400", application: "Metadata on porcelain; inactive labels", utility: "text-text-muted" },
  { role: "text.inverse", foundation: "purple.100", application: "Supporting text on deep plum", utility: "text-text-inverse" },
  { role: "action.default / focus.ring", foundation: "purple.600", application: "Primary action, links, secondary border and ring", utility: "bg-action-default" },
  { role: "action.hover", foundation: "purple.800", application: "Primary hover; secondary and tertiary hover text", utility: "bg-action-hover" },
  { role: "action.pressed", foundation: "purple.900", application: "Primary pressed; secondary and tertiary pressed text", utility: "bg-action-pressed" },
  { role: "action.on-solid", foundation: "neutral.000", application: "Labels on primary actions in every enabled state", utility: "text-action-on-solid" },
  { role: "border.default / disabled", foundation: "purple.200", application: "Quiet fields and disabled secondary outline", utility: "border-border-default" },
  { role: "border.subtle", foundation: "purple.150", application: "Decorative dividers; not a control boundary", utility: "border-border-subtle" },
  { role: "accent.promotion", foundation: "rose.500", application: "Sale accents only; not primary actions or errors", utility: "bg-accent-promotion" },
]
