import * as React from "react"

import { cn } from "@/lib/utils"

/** Shared input look: 44px, white, lilac border, purple focus ring, red when invalid. */
export const inputClass =
  "h-11 w-full min-w-0 rounded-lg border border-border-default bg-surface-raised px-3.5 text-[0.8125rem] text-text-primary placeholder:text-text-muted outline-none transition-[border-color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/25 disabled:bg-surface-disabled disabled:text-text-disabled"

/**
 * Label + control + hint/error, wired for screen readers.
 * The child control receives id, aria-invalid and aria-describedby automatically.
 *
 *   <Field label="Email address" error={errors.email}>
 *     <input type="email" className={inputClass} … />
 *   </Field>
 */
function Field({
  label,
  optional,
  hint,
  error,
  className,
  children,
}: {
  label: string
  optional?: boolean
  hint?: string
  error?: string
  className?: string
  children: React.ReactElement<Record<string, unknown>>
}) {
  const id = React.useId()
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined
  const control = React.cloneElement(children, {
    id: (children.props.id as string | undefined) ?? id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
  })
  const controlId = (children.props.id as string | undefined) ?? id

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={controlId} className="text-xs font-bold text-text-primary">
        {label}
        {optional && <span className="font-normal text-text-secondary"> (optional)</span>}
      </label>
      {control}
      {hint && !error && (
        <p id={`${id}-hint`} className="type-utility-caption text-text-secondary">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="type-utility-caption text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

/** Input with an icon pinned to the right (phone, card, help). */
function InputWithIcon({
  icon,
  className,
  ...props
}: React.ComponentProps<"input"> & { icon: React.ReactNode }) {
  return (
    <div className="relative">
      <input className={cn(inputClass, "pr-10", className)} {...props} />
      <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-action-default [&_svg]:size-4">{icon}</span>
    </div>
  )
}

export { Field, InputWithIcon }
