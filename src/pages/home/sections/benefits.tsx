import { Fragment } from "react"
import { Headphones, Leaf, ShieldCheck, Truck, type LucideIcon } from "lucide-react"

const benefits: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Leaf, title: "Natural Ingredients", text: "Gentle on your skin" },
  { icon: Truck, title: "Fast & Free Shipping", text: "On orders over $60" },
  { icon: ShieldCheck, title: "100% Authentic", text: "Trusted brands" },
  { icon: Headphones, title: "Easy Returns", text: "Hassle-free" },
]

/** Home assurance strip — four store promises separated by subtle rules. */
function Benefits() {
  return (
    <section aria-label="Why Fresh & Pretty" className="mx-auto max-w-[1200px] px-5 py-4 md:px-8 lg:px-[33px]">
      <ul className="grid grid-cols-1 gap-5 rounded-2xl bg-surface-subtle px-6 py-5 sm:grid-cols-2 md:px-8 lg:flex lg:items-center lg:justify-between lg:gap-5 lg:px-10 lg:py-5">
        {benefits.map(({ icon: Icon, title, text }, i) => (
          <Fragment key={title}>
            {i > 0 && <li aria-hidden className="hidden h-12 w-px bg-border-default lg:block" />}
            <li className="flex items-center gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center text-action-default">
                <Icon aria-hidden className="size-5" />
              </span>
              <span className="flex flex-col gap-0.5 lg:whitespace-nowrap">
                <span className="text-sm font-bold text-text-primary">{title}</span>
                <span className="text-xs text-fp-purple-300">{text}</span>
              </span>
            </li>
          </Fragment>
        ))}
      </ul>
    </section>
  )
}

export { Benefits }
