import { useParams } from "react-router"

import { NewsletterBanner, PageBreadcrumb } from "@/components/common"
import { getProductDetails } from "@/data/product-details"
import { categories, products } from "@/data/products"
import { getReviews, getReviewSummary } from "@/data/reviews"
import NotFoundPage from "@/pages/not-found"

import { Gallery } from "./sections/gallery"
import { PurchasePanel } from "./sections/purchase-panel"
import { Reviews } from "./sections/reviews"
import { Ritual } from "./sections/ritual"
import { RelatedProducts } from "./sections/related-products"

/*
 * Product detail page. Route: /products/:slug
 */
export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = products.find((p) => p.slug === slug)
  if (!product) return <NotFoundPage />

  const details = getProductDetails(product)
  const summary = getReviewSummary(product.slug)
  const reviews = getReviews(product.slug)
  const category = categories.find((c) => c.value === product.category)
  const related = products.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-[66px]">
        <PageBreadcrumb
          className="pt-2"
          items={[
            { label: "Home", to: "/" },
            ...(product.slug === "cerave-moisturizing-cream"
              ? [{ label: "Skin Care", to: "/catalog" }, { label: "Moisturizer", to: "/catalog/face-cream" }]
              : [{ label: "Catalog", to: "/catalog" }, ...(category ? [{ label: category.label, to: `/catalog/${category.value}` }] : [])]),
            { label: product.name },
          ]}
        />
        <section className="mt-3 grid grid-cols-1 gap-6 pb-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
          {/* key resets the selected photo when navigating between products */}
          <Gallery
            key={product.id}
            images={details.gallery}
            caption={details.galleryCaption}
            productName={product.name}
            badge={product.slug === "cerave-moisturizing-cream" ? "-10%" : undefined}
          />
          <PurchasePanel key={`panel-${product.id}`} product={product} details={details} summary={summary} />
        </section>
      </div>

      <Ritual details={details} />

      {reviews.length > 0 && <Reviews key={product.id} product={product} summary={summary} reviews={reviews} />}

      <RelatedProducts products={related} />

      <NewsletterBanner
        decorated={false}
        innerClassName="lg:mx-[66px]"
        title="Stay Beautiful, Stay Confident"
        description="Get the latest beauty tips, exclusive offers and more."
      />
    </>
  )
}
