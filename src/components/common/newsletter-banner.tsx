import * as React from "react"
import { Mail } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "./button"

/** Shared newsletter sign-up banner. */
function NewsletterBanner({
  className,
  innerClassName,
  title = "Subscribe To Our Newsletter",
  description = "Get the latest skincare tips, exclusive offers, and more.",
}: {
  /** Retained for existing page callers; the banner no longer adds leaf art. */
  decorated?: boolean
  className?: string
  /** Classes for the purple pill, e.g. "lg:mx-[99px]" to match the landing inset */
  innerClassName?: string
  title?: string
  description?: string
}) {
  const id = React.useId()
  const [done, setDone] = React.useState(false)

  return (
    <section aria-labelledby={`${id}-title`} className={cn("relative mx-auto max-w-[1200px] py-6", className)}>
      <div
        className={cn(
          "relative mx-5 flex flex-col gap-5 rounded-[21px] bg-action-default px-6 py-6 md:mx-8 lg:mx-[60px] lg:flex-row lg:items-start lg:gap-[17px] lg:px-[51px] lg:py-5",
          innerClassName
        )}
      >
        <Mail aria-hidden absoluteStrokeWidth strokeWidth={2} className="hidden h-12 w-[57px] shrink-0 text-fp-neutral-000 lg:block" />
        <div className="flex flex-col gap-[9px] lg:w-[363px] lg:shrink-0">
          <h2 id={`${id}-title`} className="type-heading-card leading-[1.5625rem] text-fp-neutral-000">
            {title}
          </h2>
          <p className="text-[0.8125rem] text-text-inverse">{description}</p>
        </div>

        <form
          className="flex flex-1 flex-col gap-3 sm:flex-row lg:gap-[17px]"
          onSubmit={(e) => {
            e.preventDefault()
            setDone(true)
          }}
        >
          <label htmlFor={`${id}-email`} className="sr-only">
            Email address
          </label>
          <input
            id={`${id}-email`}
            type="email"
            required
            placeholder="Your email address"
            className="h-[45px] w-full min-w-0 rounded-full bg-surface-canvas sm:flex-1 px-[22px] text-[0.9375rem] text-text-primary placeholder:text-fp-purple-300 outline-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-fp-neutral-000"
          />
          <Button
            type="submit"
            variant="secondary"
            className="min-h-[45px] min-w-[126px] border-transparent bg-surface-canvas text-[0.9375rem] tracking-normal normal-case focus-visible:outline-fp-neutral-000"
          >
            {done ? "Subscribed" : "Subscribe"}
          </Button>
        </form>
        <p role="status" className="sr-only">
          {done ? "Thanks — you're subscribed." : ""}
        </p>
      </div>
    </section>
  )
}

export { NewsletterBanner }
