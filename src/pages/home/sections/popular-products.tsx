import { ProductCard, SectionHeading } from "@/components/common"
import { products } from "@/data/products"

/** Home best sellers — compact product grid backed by the catalog data. */
function PopularProducts() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 pt-4 pb-3 sm:px-8 sm:pt-8 lg:px-[60px]">
      <SectionHeading variant="serif">Our Best Sellers</SectionHeading>
      <p className="type-body-small mt-1 text-center text-text-secondary sm:type-body-compact">Loved by customers every day</p>
      <ul aria-label="Our best sellers" className="mt-3 grid grid-cols-2 gap-3 sm:mt-5 sm:grid-cols-4 sm:gap-4">
        {products.slice(0, 4).map((product) => (
          <li key={product.id}>
            <ProductCard product={product} className="h-full" />
          </li>
        ))}
      </ul>
    </section>
  )
}

export { PopularProducts }
