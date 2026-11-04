import * as React from "react"
import { CheckCircle2, Droplets, Feather, FileText, Hand, ListChecks, MessageCircle, ShieldCheck, Sparkles, Star, UsersRound } from "lucide-react"

import type { ProductDetails } from "@/data/product-details"
import { cn } from "@/lib/utils"

type TabKey = "details" | "benefits" | "how" | "reviews"

const tabs: { id: TabKey; label: string; icon: typeof FileText }[] = [
  { id: "details", label: "Product Details", icon: FileText },
  { id: "benefits", label: "Benefits", icon: Star },
  { id: "how", label: "How to Use", icon: ListChecks },
  { id: "reviews", label: "Reviews (12,540)", icon: MessageCircle },
]

const detailIcons = [Droplets, ShieldCheck, Feather, UsersRound]

/** Product information tabs and the step-by-step use strip. */
function Ritual({ details }: { details: ProductDetails }) {
  const [tab, setTab] = React.useState<TabKey>("details")

  return (
    <section aria-label="Product information" className="mx-auto max-w-[1200px] px-5 pt-1 md:px-8 lg:px-[66px]">
      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-raised">
        <div role="tablist" aria-label="Product information" className="grid grid-cols-2 bg-surface-subtle md:grid-cols-4">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`product-tab-${id}`}
              aria-selected={tab === id}
              aria-controls="product-tab-panel"
              onClick={() => setTab(id)}
              className={cn(
                "inline-flex min-h-[48px] items-center justify-center gap-2 border-r border-border-default px-3 text-xs font-bold text-text-primary transition-colors last:border-r-0 hover:bg-surface-canvas focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-focus-ring",
                tab === id && "bg-action-default text-action-on-solid hover:bg-action-default"
              )}
            >
              <Icon aria-hidden className="size-4 shrink-0" />
              {label}
            </button>
          ))}
        </div>

        <div role="tabpanel" id="product-tab-panel" aria-labelledby={`product-tab-${tab}`} className="min-h-[195px] p-5 md:p-6">
          {tab === "details" && (
            <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="text-[0.8125rem] leading-5 text-text-secondary">{details.about.body}</p>
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {details.about.tags.map((tag, i) => {
                    const Icon = detailIcons[i % detailIcons.length]
                    return <li key={tag} className="flex flex-col items-center gap-1 text-center text-[0.6875rem] leading-4 text-text-secondary"><Icon aria-hidden className="size-5 text-accent-promotion-strong" />{tag}</li>
                  })}
                </ul>
              </div>
              <Benefits details={details} />
            </div>
          )}
          {tab === "benefits" && <Benefits details={details} />}
          {tab === "how" && <HowToUse details={details} compact />}
          {tab === "reviews" && <p className="text-sm text-text-secondary">Customer reviews are shown below.</p>}
        </div>
      </div>

      <HowToUse details={details} />
    </section>
  )
}

function Benefits({ details }: { details: ProductDetails }) {
  return (
    <div>
      <h2 className="font-serif text-lg font-bold text-text-primary">{details.about.title === "Key Benefits" ? "Key Benefits" : "Benefits"}</h2>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
        {details.ingredients.map((benefit) => (
          <li key={benefit.name} className="flex items-start gap-2 text-xs leading-5 text-text-secondary">
            <CheckCircle2 aria-hidden className="mt-0.5 size-3.5 shrink-0 fill-accent-promotion-strong text-surface-raised" />
            {benefit.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

function HowToUse({ details, compact = false }: { details: ProductDetails; compact?: boolean }) {
  const icons = [Sparkles, Droplets, Hand]
  return (
    <div id="how-to-use" className={cn("grid items-center gap-4 rounded-2xl bg-surface-subtle px-5 py-4 md:grid-cols-[0.95fr_1.8fr] md:px-6", compact ? "mt-0" : "mt-3")}>
      {!compact && (
        <div className="md:border-r md:border-border-default md:pr-5">
          <h2 className="font-serif text-xl font-bold text-text-primary">How to Use</h2>
          <p className="mt-1 text-xs leading-5 text-text-secondary">{details.ritualNote}</p>
        </div>
      )}
      <ol className={cn("grid grid-cols-3 gap-3", compact && "md:col-span-2")}>
        {details.ritual.map((step, i) => {
          const Icon = icons[i % icons.length]
          return (
            <li key={step} className="flex items-center gap-2 text-center">
              <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-promotion-strong text-xs font-bold text-white">{i + 1}</span>
              <span className="flex min-w-0 flex-col items-start gap-1 text-left">
                <Icon aria-hidden className="size-5 text-accent-promotion-strong" />
                <span className="text-[0.6875rem] leading-4 text-text-primary">{step}</span>
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export { Ritual }
