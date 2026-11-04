import * as React from "react"

import { discountCodes } from "@/lib/pricing"

import { Button } from "./button"

/** "Have a little treat?" — discount code entry used by the bag and checkout summaries. */
function DiscountCodeForm({ code, onChange }: { code?: string; onChange: (code: string | undefined) => void }) {
  const id = React.useId()
  const [draft, setDraft] = React.useState("")
  const [error, setError] = React.useState("")

  if (code) {
    return (
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-text-primary">
          <span className="font-bold">{code}</span> · {discountCodes[code]?.label}
        </p>
        <button
          type="button"
          onClick={() => {
            onChange(undefined)
            setDraft("")
          }}
          className="type-utility-caption rounded-sm text-action-default underline underline-offset-2 hover:text-action-hover outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        >
          Remove code
        </button>
      </div>
    )
  }

  // Not a <form>: on checkout this sits beside the main form and must not submit it
  const apply = () => {
    const normalized = draft.trim().toUpperCase()
    if (!normalized) return
    if (discountCodes[normalized]) {
      onChange(normalized)
      setError("")
    } else {
      setError("That code doesn't look right. Check it and try again.")
    }
  }

  return (
    <div>
      <label htmlFor={id} className="text-xs font-bold text-text-primary">
        Have a little treat?
      </label>
      <div className="mt-2 flex gap-3">
        <input
          id={id}
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value)
            setError("")
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              apply()
            }
          }}
          placeholder="Discount code"
          aria-invalid={!!error || undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-10 min-w-0 flex-1 rounded-lg border border-border-subtle bg-surface-raised px-3.5 text-xs text-text-primary placeholder:text-text-muted outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive"
        />
        <Button type="button" onClick={apply} variant="secondary" size="small" className="min-h-10 min-w-0 bg-transparent px-5 tracking-normal normal-case">
          Apply
        </Button>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="type-utility-caption mt-2 text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export { DiscountCodeForm }
