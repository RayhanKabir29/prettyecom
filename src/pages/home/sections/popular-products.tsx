import { ProductCarousel, SectionHeading } from "@/components/common"
import { products } from "@/data/products"

/** Home best sellers — shared product carousel backed by the catalog data. */
function PopularProducts() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 pt-3 pb-2.5 md:px-8 lg:pr-[84px] lg:pl-[99px]">
      <SectionHeading variant="serif" className="lg:mr-1.5">Our Best Sellers</SectionHeading>
      <p className="mt-1 text-center text-sm text-text-secondary">Loved by customers every day</p>
      <ProductCarousel products={products} label="Our best sellers" className="mt-[18px]" />
    </section>
  )
}

export { PopularProducts }
