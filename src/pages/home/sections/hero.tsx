import { ArrowRight } from "lucide-react"
import { Link } from "react-router"

import { Button, Eyebrow } from "@/components/common"

const heroImage = "https://images.unsplash.com/photo-1741896136331-10375875eff4?auto=format&fit=crop&w=1400&q=85"

/** Home hero: editorial copy paired with the existing product photography. */
function Hero() {
  return (
    <section className="mx-auto grid max-w-[1200px] grid-cols-1 bg-gradient-to-r from-surface-canvas via-surface-canvas to-surface-subtle sm:grid-cols-2 lg:min-h-[420px] lg:grid-cols-[0.92fr_1.08fr]">
      <div className="flex flex-col items-start gap-3 px-4 pt-5 pb-5 sm:gap-5 sm:px-8 sm:pt-10 sm:pb-10 lg:justify-center lg:py-12 lg:pl-[60px]">
        <Eyebrow>Stay fresh, look pretty</Eyebrow>
        <h1 className="type-display-hero max-w-[510px] text-[1.625rem] leading-7 text-text-primary sm:text-[3rem] sm:leading-[3.1875rem]">
          Premium Beauty for Your <span className="font-normal italic text-action-default">Natural Glow</span>
        </h1>
        <p className="type-body-default line-clamp-3 max-w-[390px] text-xs leading-[1.125rem] text-text-secondary sm:line-clamp-none sm:text-[0.9375rem] sm:leading-[1.375rem]">
          Discover thoughtful skincare essentials made to leave your skin feeling fresh, soft, and beautifully cared for.
        </p>
        <Button asChild className="px-7">
          <Link to="/catalog">
            Shop now <ArrowRight aria-hidden className="size-[13px]" />
          </Link>
        </Button>
      </div>
      <div className="relative hidden min-h-[250px] overflow-hidden bg-surface-subtle sm:block sm:aspect-[600/420] sm:min-h-0 lg:aspect-auto">
        <img
          src={heroImage}
          alt="Skincare serum bottles arranged on a soft pink background"
          fetchPriority="high"
          className="size-full object-cover object-center"
        />
      </div>
    </section>
  )
}

export { Hero }
