import { ArrowRight } from "lucide-react"
import { Link } from "react-router"

import { Button, Eyebrow } from "@/components/common"

const heroImage = "https://images.unsplash.com/photo-1741896136331-10375875eff4?auto=format&fit=crop&w=1400&q=85"

/** Home hero: editorial copy paired with the existing product photography. */
function Hero() {
  return (
    <section className="mx-auto grid max-w-[1200px] bg-gradient-to-r from-surface-canvas via-surface-canvas to-surface-subtle lg:min-h-[420px] lg:grid-cols-[0.92fr_1.08fr]">
      <div className="flex flex-col items-start gap-5 px-5 pt-10 pb-10 md:px-8 lg:justify-center lg:py-12 lg:pl-[60px]">
        <Eyebrow>Stay fresh, look pretty</Eyebrow>
        <h1 className="type-display-hero max-w-[510px] text-text-primary">
          Premium Beauty for Your <span className="font-normal italic text-action-default">Natural Glow</span>
        </h1>
        <p className="type-body-default max-w-[390px] text-text-secondary">
          Discover thoughtful skincare essentials made to leave your skin feeling fresh, soft, and beautifully cared for.
        </p>
        <Button asChild className="px-7">
          <Link to="/catalog">
            Shop now <ArrowRight aria-hidden className="size-[13px]" />
          </Link>
        </Button>
      </div>
      <div className="relative aspect-[600/420] overflow-hidden bg-[#f8dfe8] lg:aspect-auto">
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
