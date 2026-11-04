import { ArrowRight, CircleCheck } from "lucide-react"
import { Link } from "react-router"

import dropperImage from "@/assets/images/home/serum-dropper.jpg"
import botanicalImage from "@/assets/images/home/serum-botanical.jpg"
import { Button } from "@/components/common"

const benefitColumns = [
  ["Strong & Smooth", "Sulfate Free"],
  ["Paraben Free", "100% Vegan"],
]

/** Figma 3313:855 — serum photo + feature copy, botanical crop bleeding off the right edge. */
function FeatureSerum() {
  return (
    <section className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 py-10 md:px-8 lg:min-h-[312px] lg:grid-cols-[531px_450px] lg:gap-6 lg:py-0 lg:pl-[45px]">
      <img
        src={dropperImage}
        alt="Serum dropper releasing a drop into a glass bottle"
        className="aspect-[531/288] w-full rounded-[18px] object-cover lg:h-[288px]"
      />

      <div className="flex min-w-0 flex-col items-start gap-4 lg:pt-[18px]">
        <p className="text-base font-bold tracking-[1.8px] text-action-default uppercase">Flawless skin</p>
        <h2 className="type-heading-feature text-text-primary">Deeply Nourishing Hair Serum For Glowing &amp; Healthy Hair</h2>
        <p className="text-[0.9375rem] leading-[1.3125rem] text-text-secondary">
          Present in cursus et urna consequat mattis eget vel diam. Phasellus interdum mattis eget vel diam botanical remedy.
        </p>
        <div className="flex flex-wrap gap-x-[35px] gap-y-2">
          {benefitColumns.map((col, i) => (
            <ul key={i} className="flex flex-col gap-2 sm:w-[177px]">
              {col.map((b) => (
                <li key={b} className="flex items-center gap-2 text-[0.9375rem] text-text-secondary">
                  <CircleCheck aria-hidden className="size-[18px] shrink-0 text-action-default" />
                  {b}
                </li>
              ))}
            </ul>
          ))}
        </div>
        <Button asChild size="small" className="min-w-[147px] gap-[5px] tracking-normal">
          <Link to="/products/hair-serum">
            Shop now <ArrowRight aria-hidden className="size-[13px]" />
          </Link>
        </Button>
      </div>

      <img
        src={botanicalImage}
        alt=""
        aria-hidden
        className="absolute top-[9px] right-0 hidden h-[303px] w-[171px] object-cover xl:block"
      />
    </section>
  )
}

export { FeatureSerum }
