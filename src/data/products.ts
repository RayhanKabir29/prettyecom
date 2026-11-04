import aloeVera from "@/assets/images/products/aloe-vera-freshness-cream.jpg"
import apricotMelon from "@/assets/images/products/apricot-melon-softening-cream.jpg"
import birchButter from "@/assets/images/products/birch-butter-skinness-cream.jpg"
import azaleaFields from "@/assets/images/products/azalea-fields-soothing-cream.jpg"

const ceraveCreamImage = "https://cdn11.bigcommerce.com/s-hr7ra7xc8x/images/stencil/3840w/attribute_rule_images/55226_source_1681498962.jpg"
const ceraveLotionImage = "https://i5-mx.walmartimages.com/gr/images/product-images/img_large/00750112300090L.jpg?odnBg=FFFFFF&odnHeight=612&odnWidth=612"
const cetaphilImage = "https://w7.pngwing.com/pngs/901/8/png-transparent-cetaphil-gentle-skin-cleanser-cetaphil-daily-facial-cleanser-cetaphil-gentle-skin-cleansing-cloths-skin-cleansing-cosmetics-body-wash-skin-cleansing.png"
const doveImage = "https://www.staples.ca/cdn/shop/files/602346f61cc85d8402224ced937de43889d37537_square3095287_1_1000x.jpg?v=1763121644"
const vaselineImage = "https://cdn11.bigcommerce.com/s-i5q5a5nhp2/images/stencil/1280x1280/products/10819/76930/305213077000__92905.1698916405.jpg?c=1"

export type Category = "face-cream" | "serum" | "cleanser"
export type SkinType = "normal" | "dry" | "combination" | "oily"
export type SkinConcern = "hydration" | "dryness" | "dullness" | "daily-essential"

export type Product = {
  id: string
  slug: string
  name: string
  /** One-line benefit shown on catalog cards */
  description: string
  price: number
  /** Original price when on sale — renders strikethrough + discount badge */
  compareAtPrice?: number
  rating?: number
  image: string
  category: Category
  skinTypes: SkinType[]
  concerns: SkinConcern[]
  /** Lower = earlier in "Featured" sort */
  featured: number
}

export const categories: { value: Category; label: string }[] = [
  { value: "face-cream", label: "Face Cream" },
  { value: "serum", label: "Serum" },
  { value: "cleanser", label: "Cleanser" },
]

export const skinTypes: { value: SkinType; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "dry", label: "Dry" },
  { value: "combination", label: "Combination" },
  { value: "oily", label: "Oily" },
]

export const skinConcerns: { value: SkinConcern; label: string }[] = [
  { value: "hydration", label: "Hydration" },
  { value: "dryness", label: "Dryness" },
  { value: "dullness", label: "Dullness" },
  { value: "daily-essential", label: "Daily essential" },
]

export const products: Product[] = [
  {
    id: "cerave-cream",
    slug: "cerave-moisturizing-cream",
    name: "CeraVe Moisturizing Cream",
    description: "Hydrating cream for healthy, glowing skin",
    price: 24,
    compareAtPrice: 30,
    rating: 4.8,
    image: ceraveCreamImage,
    category: "face-cream",
    skinTypes: ["normal", "dry", "combination", "oily"],
    concerns: ["hydration", "dryness"],
    featured: 0,
  },
  {
    id: "cetaphil-cleanser",
    slug: "cetaphil-gentle-skin-cleanser",
    name: "Cetaphil Gentle Skin Cleanser",
    description: "Gentle daily cleanser for soft, comfortable skin",
    price: 16,
    compareAtPrice: 20,
    rating: 4.8,
    image: cetaphilImage,
    category: "cleanser",
    skinTypes: ["normal", "dry", "combination", "oily"],
    concerns: ["daily-essential"],
    featured: 5,
  },
  {
    id: "dove-body-wash",
    slug: "dove-body-wash",
    name: "Dove Body Wash",
    description: "Nourishing body wash for soft skin",
    price: 14,
    compareAtPrice: 18,
    rating: 4.7,
    image: doveImage,
    category: "cleanser",
    skinTypes: ["normal", "dry"],
    concerns: ["hydration", "daily-essential"],
    featured: 6,
  },
  {
    id: "vaseline-lotion",
    slug: "vaseline-intensive-repair-lotion",
    name: "Vaseline Intensive Repair Lotion",
    description: "Deep moisture for dry, sensitive skin",
    price: 12,
    compareAtPrice: 16,
    rating: 4.8,
    image: vaselineImage,
    category: "face-cream",
    skinTypes: ["normal", "dry"],
    concerns: ["dryness", "hydration"],
    featured: 7,
  },
  {
    id: "cerave-lotion",
    slug: "cerave-facial-moisturizing-lotion",
    name: "CeraVe Facial Moisturizing Lotion",
    description: "Lightweight daily facial moisture",
    price: 20,
    compareAtPrice: 25,
    rating: 4.8,
    image: ceraveLotionImage,
    category: "face-cream",
    skinTypes: ["normal", "dry", "combination"],
    concerns: ["hydration", "daily-essential"],
    featured: 8,
  },
  {
    id: "p1",
    slug: "aloe-vera-freshness-cream",
    name: "Aloe Vera Freshness Cream",
    description: "A fresh touch of everyday moisture",
    price: 46,
    image: aloeVera,
    category: "face-cream",
    skinTypes: ["normal", "combination", "oily"],
    concerns: ["hydration", "daily-essential"],
    featured: 1,
  },
  {
    id: "p2",
    slug: "apricot-melon-softening-cream",
    name: "Apricot Melon Softening Cream",
    description: "Comforting care for soft-feeling skin",
    price: 61,
    compareAtPrice: 68,
    image: apricotMelon,
    category: "face-cream",
    skinTypes: ["normal", "dry"],
    concerns: ["dryness", "hydration"],
    featured: 2,
  },
  {
    id: "p3",
    slug: "birch-butter-skinness-cream",
    name: "Birch Butter Skinness Cream",
    description: "Rich moisture with a silky finish",
    price: 62,
    image: birchButter,
    category: "face-cream",
    skinTypes: ["dry", "combination"],
    concerns: ["dryness", "dullness"],
    featured: 3,
  },
  {
    id: "p4",
    slug: "azalea-fields-soothing-cream",
    name: "Azalea Fields Soothing Cream",
    description: "A gentle moment in your daily ritual",
    price: 24,
    image: azaleaFields,
    category: "face-cream",
    skinTypes: ["normal", "dry", "combination", "oily"],
    concerns: ["daily-essential", "dullness"],
    featured: 4,
  },
]

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)

/** Discount shown on the badge, e.g. 61 vs 68 → "10%" (rounded down like the design) */
export const discountPercent = (p: Product) =>
  p.compareAtPrice ? Math.floor(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100) : 0
