import { Heart, RefreshCw, Truck, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const defaultItems: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Truck, title: "A little extra, on us", text: "Free shipping on orders over $60" },
  { icon: RefreshCw, title: "Shop with confidence", text: "30-day happiness guarantee" },
  { icon: Heart, title: "Here for your daily ritual", text: "Thoughtful care, morning to night" },
]

/** Catalog — lavender strip with three store promises (outline icons, no fill). */
function AssuranceStrip({ items = defaultItems, className }: { items?: typeof defaultItems; className?: string }) {
  return (
    <section aria-label="Our promises" className={cn("bg-surface-subtle", className)}>
      <ul className="mx-auto grid max-w-[1200px] gap-5 px-5 py-6 sm:grid-cols-3 md:px-8 lg:px-[60px] lg:py-[26px]">
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-3">
            <Icon aria-hidden className="size-5 shrink-0 text-action-default" />
            <span className="flex flex-col gap-0.5">
              <span className="text-[0.8125rem] leading-[1.125rem] font-bold text-text-primary">{title}</span>
              <span className="type-utility-caption text-text-secondary">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export { AssuranceStrip }
