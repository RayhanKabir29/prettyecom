import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Text — applies a named type recipe + a sensible default color role,
 * and renders the right HTML element for that recipe.
 *
 *   <Text variant="heading-page">Checkout</Text>          → <h1>
 *   <Text variant="heading-card" as="h3">Shop with…</Text>
 *   <Text variant="body-small" tone="muted">50 ml</Text>
 *   <Text variant="label-eyebrow" asChild><a href="#">…</a></Text>
 */
const textVariants = cva("", {
  variants: {
    variant: {
      "display-hero": "type-display-hero",
      "heading-page": "type-heading-page",
      "heading-section": "type-heading-section",
      "heading-feature": "type-heading-feature",
      "heading-subsection": "type-heading-subsection",
      "heading-card": "type-heading-card",
      "body-default": "type-body-default",
      "body-compact": "type-body-compact",
      "body-small": "type-body-small",
      "label-small": "type-label-small",
      "label-eyebrow": "type-label-eyebrow",
      "utility-caption": "type-utility-caption",
    },
    tone: {
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      muted: "text-text-muted",
      inverse: "text-text-inverse",
      action: "text-action-default",
      onSolid: "text-action-on-solid",
      inherit: "",
    },
  },
  defaultVariants: {
    variant: "body-default",
  },
})

type TextVariant = NonNullable<VariantProps<typeof textVariants>["variant"]>
type TextTone = NonNullable<VariantProps<typeof textVariants>["tone"]>

const defaultElement: Record<TextVariant, React.ElementType> = {
  "display-hero": "h1",
  "heading-page": "h1",
  "heading-section": "h2",
  "heading-feature": "h2",
  "heading-subsection": "h3",
  "heading-card": "h3",
  "body-default": "p",
  "body-compact": "p",
  "body-small": "p",
  "label-small": "span",
  "label-eyebrow": "p",
  "utility-caption": "p",
}

/* Headings & labels read as primary; body copy as secondary; captions as muted. */
const defaultTone: Record<TextVariant, TextTone> = {
  "display-hero": "primary",
  "heading-page": "primary",
  "heading-section": "primary",
  "heading-feature": "primary",
  "heading-subsection": "primary",
  "heading-card": "primary",
  "body-default": "secondary",
  "body-compact": "secondary",
  "body-small": "secondary",
  "label-small": "primary",
  "label-eyebrow": "action",
  "utility-caption": "muted",
}

type TextProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & {
    as?: React.ElementType
    asChild?: boolean
    htmlFor?: string
  }

function Text({
  variant = "body-default",
  tone,
  as,
  asChild = false,
  className,
  ...props
}: TextProps) {
  const v = variant ?? "body-default"
  const Comp = asChild ? Slot.Root : (as ?? defaultElement[v])
  return (
    <Comp
      data-slot="text"
      className={cn(textVariants({ variant: v, tone: tone ?? defaultTone[v] }), className)}
      {...props}
    />
  )
}

export { Text, textVariants }
export type { TextVariant, TextTone }
