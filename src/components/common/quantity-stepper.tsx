import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

const step =
  "inline-flex size-9 items-center justify-center rounded-full text-action-default transition-colors hover:bg-surface-subtle disabled:text-text-disabled disabled:hover:bg-transparent outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus-ring [&_svg]:size-3.5"

/** Pill-shaped − 1 + control (product page, 44px tall to match the medium button). */
function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  label = "Quantity",
  size = "md",
  className,
}: {
  /** md = 44px (product page), sm = 38px (cart rows) */
  size?: "sm" | "md"
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  label?: string
  className?: string
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border-default bg-surface-raised px-1",
        size === "sm" ? "h-[38px] [&_button]:size-8" : "h-11",
        className
      )}
    >
      <button type="button" aria-label="Decrease quantity" className={step} disabled={value <= min} onClick={() => onChange(value - 1)}>
        <Minus aria-hidden />
      </button>
      <output aria-live="polite" className="w-6 text-center text-[0.8125rem] text-text-primary">
        {value}
      </output>
      <button type="button" aria-label="Increase quantity" className={step} disabled={value >= max} onClick={() => onChange(value + 1)}>
        <Plus aria-hidden />
      </button>
    </div>
  )
}

export { QuantityStepper }
