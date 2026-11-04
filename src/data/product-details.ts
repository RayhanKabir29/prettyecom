import type { Product } from "./products"

/**
 * Long-form content for the product page. Keyed by product slug; products
 * without an entry fall back to `defaultDetails()`.
 *
 * gallery: photo URLs for the thumbnails. `undefined` entries render as empty
 * blocks until the artwork is added (import the image and put it in the array).
 */
export type ProductDetails = {
  eyebrow: string
  summary: string
  sizes: string[]
  gallery: (string | undefined)[]
  galleryCaption: string
  about: { title: string; body: string; tags: string[] }
  ingredients: { name: string; note: string }[]
  ingredientsNote: string
  ritual: string[]
  ritualNote: string
}

const details: Record<string, Partial<ProductDetails>> = {
  "cerave-moisturizing-cream": {
    eyebrow: "★ Best Seller",
    summary: "Hydrating cream for healthy, glowing skin",
    sizes: ["16 oz (453 g)", "12 oz (340 g)", "8 oz (227 g)"],
    gallery: [
      "https://cdn11.bigcommerce.com/s-hr7ra7xc8x/images/stencil/3840w/attribute_rule_images/55226_source_1681498962.jpg",
      "https://www.tjbeautyproducts.co.uk/cdn/shop/files/cerave-cream-12-oz_grande.webp?v=1717148532",
      "https://i.ebayimg.com/00/s/MTYwMFgxNTI4/z/zpsAAOSwKwZfpBGp/$_57.JPG?set_id=8800005007",
      "https://www.arogga.com/_next/image?q=75&url=https%3A%2F%2Fcdn2.arogga.com%2FeyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJQcm9kdWN0LXBfaW1hZ2VzXC81MjA0MlwvNTIwNDItNi1veGdhZzEuanBlZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAwMCwiaGVpZ2h0IjoxMDAwLCJmaXQiOiJvdXRzaWRlIn19fQ%3D%3D&w=1280",
    ],
    galleryCaption: "CeraVe Moisturizing Cream · 16 oz",
    about: {
      title: "Key Benefits",
      body: "CeraVe Moisturizing Cream is a dermatologist-developed moisturizer that provides 24-hour hydration and helps restore the skin’s natural protective barrier. Formulated with 3 essential ceramides, this rich, non-greasy cream is suitable for all skin types, including sensitive skin.",
      tags: ["24h Hydration", "Restores Skin Barrier", "Non-Greasy Formula", "Suitable for All Skin Types"],
    },
    ingredients: [
      { name: "Provides long-lasting hydration (up to 24 hours)", note: "" },
      { name: "Helps restore and maintain the skin barrier", note: "" },
      { name: "Non-comedogenic (won’t clog pores)", note: "" },
      { name: "Fragrance-free & hypoallergenic", note: "" },
    ],
    ingredientsNote: "",
    ritual: ["Cleanse your skin", "Apply a generous amount", "Massage gently until fully absorbed"],
    ritualNote: "Apply generously to face and body. Massage gently until fully absorbed.",
  },
  "aloe-vera-freshness-cream": {
    eyebrow: "Face cream · Daily moisture",
    summary:
      "A fresh start for your skin. This soft, aloe-inspired cream wraps your daily routine in lightweight moisture, leaving skin feeling smooth, comfortable and cared for.",
    about: {
      title: "Simple, everyday comfort",
      body: "Meet your moment of freshness. Aloe Vera Freshness Cream brings a soft, easy-to-layer feel to your morning or evening routine. Smooth it over freshly cleansed skin and take a moment just for you.",
      tags: ["Soft finish", "Daily care"],
    },
    ingredients: [
      { name: "Aloe vera", note: "Botanical-inspired freshness." },
      { name: "Glycerin", note: "A moisture-loving everyday essential." },
      { name: "Shea butter", note: "A soft, comforting feel." },
    ],
  },
}

export function getProductDetails(product: Product): ProductDetails {
  const d = details[product.slug] ?? {}
  return {
    eyebrow: d.eyebrow ?? "Face cream · Daily care",
    summary: d.summary ?? `${product.description}. Made to slip easily into your morning and evening routine.`,
    sizes: d.sizes ?? ["50 ml / 1.7 fl oz"],
    // First photo is the product shot; the other two blocks stay empty until artwork is added
    gallery: d.gallery ?? [product.image, undefined, undefined],
    galleryCaption: d.galleryCaption ?? "The cream. The details. A little botanical inspiration.",
    about: d.about ?? {
      title: "Simple, everyday comfort",
      body: `${product.name} brings an easy, comforting feel to your daily routine. Smooth it over freshly cleansed skin and take a moment just for you.`,
      tags: ["Soft finish", "Daily care"],
    },
    ingredients: d.ingredients ?? [
      { name: "Glycerin", note: "A moisture-loving everyday essential." },
      { name: "Shea butter", note: "A soft, comforting feel." },
    ],
    ingredientsNote: d.ingredientsNote ?? "Please refer to your product packaging for the complete ingredient list.",
    ritual: d.ritual ?? [
      "Begin with clean, dry skin.",
      "Massage a small amount over your face and neck.",
      "Use morning and evening. Finish your morning routine with SPF.",
    ],
    ritualNote: d.ritualNote ?? "For external use only. Patch test before first use and avoid contact with eyes.",
  }
}
