/**
 * Fresh & Pretty common components — built on the 01 Color, 02 Type and
 * 03 Button foundations. Pages import from "@/components/common".
 *
 * shadcn/ui primitives live in "@/components/ui" and stay close to upstream
 * so `npx shadcn add` keeps working; brand components live here.
 */
export { Button, buttonVariants, type ButtonProps } from "./button"
export { Text, textVariants, type TextVariant, type TextTone } from "./text"

// Layout
export { Container } from "./container"
export { AnnouncementBar } from "./announcement-bar"
export { SiteHeader } from "./site-header"
export { SiteFooter } from "./site-footer"
export { Logo } from "./logo"
export { PageBreadcrumb, type Crumb } from "./page-breadcrumb"

// Content
export { SectionHeading, Eyebrow } from "./section-heading"
export { ProductCard, type ProductCardProps } from "./product-card"
export { ProductCarousel } from "./product-carousel"
export { NewsletterBanner } from "./newsletter-banner"
export { AssuranceStrip } from "./assurance-strip"
export { ImageSlot } from "./image-slot"
export { Pager } from "./pager"
export { QuantityStepper } from "./quantity-stepper"
export { ReviewCard } from "./review-card"
export { DiscountCodeForm } from "./discount-code-form"
export { Field, InputWithIcon, inputClass } from "./form-field"
export { TestimonialCard, StarRating, type Testimonial } from "./testimonial-card"
export { brandIcons, InstagramIcon, FacebookIcon, TwitterIcon, YoutubeIcon } from "./brand-icons"
