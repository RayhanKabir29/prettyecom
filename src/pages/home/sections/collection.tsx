import { ArrowRight } from "lucide-react"
import { Link } from "react-router"

import { Button, SectionHeading } from "@/components/common"

const collectionImage = "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85"

const brands = [
  {
    name: "CeraVe",
    slug: "cerave-moisturizing-cream",
    image: "https://cdn11.bigcommerce.com/s-hr7ra7xc8x/images/stencil/3840w/attribute_rule_images/55226_source_1681498962.jpg",
  },
  {
    name: "Cetaphil",
    slug: "cetaphil-gentle-skin-cleanser",
    image: "https://w7.pngwing.com/pngs/225/370/png-transparent-lotion-cetaphil-gentle-skin-cleanser-moisturizer-thin-lizzy-cream-cetaphil-thin-lizzy.png",
  },
  {
    name: "Dove",
    slug: "dove-body-wash",
    image: "https://www.staples.ca/cdn/shop/files/602346f61cc85d8402224ced937de43889d37537_square3095287_1_1000x.jpg?v=1763121644",
  },
  {
    name: "Vaseline",
    slug: "vaseline-intensive-repair-lotion",
    image: "https://cdn11.bigcommerce.com/s-hr7ra7xc8x/images/stencil/1280x1280/products/10819/76930/305213077000__92905.1698916405.jpg?c=1",
  },
]

/** Collection feature paired with links into the existing product catalog. */
function Collection() {
  return (
    <section className="mx-auto grid max-w-[1200px] gap-7 px-5 py-6 md:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6 lg:px-[33px] lg:py-3">
      <div className="relative isolate flex min-h-[300px] items-end overflow-hidden rounded-[22px] bg-surface-subtle p-7 md:min-h-[340px] md:p-9 lg:min-h-[340px] lg:items-center lg:px-9">
        <img src={collectionImage} alt="Woman enjoying a skincare facial" className="absolute inset-0 -z-10 size-full object-cover object-center" />
        <div className="max-w-[300px] rounded-xl bg-surface-canvas/85 p-5 backdrop-blur-sm md:p-6">
          <p className="text-xs font-bold tracking-[1.8px] text-action-default uppercase">Beauty care collection</p>
          <h2 className="mt-3 font-serif text-[2rem] leading-[2.1rem] font-bold text-text-primary">
            Look Beautiful, Feel Confident
          </h2>
          <p className="mt-3 text-sm leading-5 text-text-secondary">Pamper yourself with skin-loving everyday essentials.</p>
          <Button asChild className="mt-5 gap-2">
            <Link to="/catalog">Explore collection <ArrowRight aria-hidden className="size-[14px]" /></Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-4">
        <SectionHeading variant="serif">Shop by Brand</SectionHeading>
        <ul className="grid grid-cols-2 gap-3">
          {brands.map((brand) => (
            <li key={brand.name}>
              <Link to={`/products/${brand.slug}`} aria-label={`Shop ${brand.name}`} className="group flex h-[98px] items-center justify-between overflow-hidden rounded-2xl bg-surface-subtle pl-4 transition-colors hover:bg-fp-purple-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring sm:h-[108px]">
                <span className="min-w-0">
                  <span className="block font-serif text-base font-bold text-text-primary sm:text-lg">{brand.name}</span>
                  <span className="mt-2 flex items-center gap-1 text-xs font-bold text-action-default">Shop now <ArrowRight aria-hidden className="size-3 transition-transform group-hover:translate-x-0.5" /></span>
                </span>
                <span aria-hidden className="flex h-full w-[40%] shrink-0 items-center justify-center overflow-hidden px-1 py-2">
                  <img
                    src={brand.image}
                    alt=""
                    className="max-h-full max-w-full object-contain object-center mix-blend-multiply"
                    loading="lazy"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export { Collection }
