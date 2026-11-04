import { NewsletterBanner } from "@/components/common"

import { Benefits } from "./sections/benefits"
import { Collection } from "./sections/collection"
import { Hero } from "./sections/hero"
import { PopularProducts } from "./sections/popular-products"

/** Landing page — Figma 3313:829 "Fresh & Pretty skincare". */
export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularProducts />
      <Benefits />
      <Collection />
      <NewsletterBanner
        innerClassName="lg:mx-[99px]"
        title="Get 10% Off Your First Order"
        description="Be the first to hear about fresh finds and exclusive offers."
      />
    </>
  )
}
