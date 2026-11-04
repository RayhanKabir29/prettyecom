import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Fresh & Pretty / Button — Figma node 3344:1759 (component set 3344:2345)
 *
 * Three levels of emphasis × three sizes × five states (45 variants).
 *
 *   <Button>Shop now</Button>                                   primary · medium
 *   <Button variant="secondary" size="small">View details</Button>
 *   <Button variant="tertiary" size="large">Edit bag</Button>
 *   <Button asChild><a href="/shop">Shop now</a></Button>       renders a link
 *
 * Usage
 *  - primary:   the main next step. One per decision area (shop now, add to bag, place order).
 *  - secondary: an alternative action alongside the primary (view details, apply code, edit bag).
 *  - tertiary:  low-emphasis, optional tasks. Use a link instead when the destination is navigation.
 *
 * State contract (03.2)
 *  - Hover only on hover-capable devices (Tailwind v4 `hover:` is wrapped in @media (hover: hover)).
 *  - Pressed = :active, never a persistent selection.
 *  - Focus = :focus-visible → 2px Purple 600 outline, 3px offset, kept over hover/pressed.
 *  - Disabled = native `disabled` (or aria-disabled on links): no hover/press, no tab stop,
 *    opacity stays 100% and explicit inactive tokens are used. Explain why nearby.
 *  - Small is 36px visually but extends its hit area to 44px for touch.
 *  - Labels: verb-led, sentence case in code — the button.* type recipe uppercases them.
 */
const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-2",
    "rounded-(--fp-button-radius) border-(length:--fp-button-border-width) border-transparent",
    "whitespace-nowrap select-none transition-[color,background-color,border-color] duration-150",
    "outline-none focus-visible:outline-(length:--fp-button-focus-width) focus-visible:outline-offset-(--fp-button-focus-offset) focus-visible:outline-focus-ring focus-visible:outline-solid",
    "disabled:pointer-events-none aria-disabled:pointer-events-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-action-default text-action-on-solid",
          "hover:bg-action-hover active:bg-action-pressed",
          "disabled:bg-surface-disabled disabled:text-text-disabled",
          "aria-disabled:bg-surface-disabled aria-disabled:text-text-disabled",
        ],
        secondary: [
          "border-action-default bg-surface-raised text-action-default",
          "hover:border-action-hover hover:bg-surface-subtle hover:text-action-hover",
          "active:border-action-pressed active:bg-fp-purple-100 active:text-action-pressed",
          "disabled:border-border-disabled disabled:bg-surface-disabled disabled:text-text-disabled",
          "aria-disabled:border-border-disabled aria-disabled:bg-surface-disabled aria-disabled:text-text-disabled",
        ],
        tertiary: [
          "bg-transparent text-action-default",
          "hover:bg-surface-subtle hover:text-action-hover",
          "active:bg-fp-purple-100 active:text-action-pressed",
          // Tertiary stays transparent when disabled
          "disabled:bg-transparent disabled:text-text-disabled",
          "aria-disabled:bg-transparent aria-disabled:text-text-disabled",
        ],
      },
      size: {
        small: [
          "type-button-small min-h-(--fp-button-height-small) min-w-(--fp-button-min-width-small) px-(--fp-button-padding-small)",
          // 36px visual height, 44px touch target
          "after:absolute after:inset-x-0 after:-inset-y-1 after:content-['']",
        ],
        medium:
          "type-button-medium min-h-(--fp-button-height-medium) min-w-(--fp-button-min-width-medium) px-(--fp-button-padding-medium)",
        large:
          "type-button-large min-h-(--fp-button-height-large) min-w-(--fp-button-min-width-large) px-(--fp-button-padding-large)",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
      fullWidth: false,
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Render the child element (e.g. a router <Link>) with button styling. */
    asChild?: boolean
  }

function Button({
  className,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  asChild = false,
  type,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="fp-button"
      data-variant={variant}
      data-size={size}
      // Default to type="button" so buttons inside forms don't submit by accident
      type={asChild ? type : (type ?? "button")}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
