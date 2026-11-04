# Fresh & Pretty: React + Tailwind + shadcn/ui

All packages are on their latest stable versions as of Nov 2026:

| Package | Version |
|---|---|
| React / React DOM | 19.3.1 |
| Vite (create-vite 9.3.3) | 8.3.5 |
| @vitejs/plugin-react | 6.2.1 |
| TypeScript | 7.0.2 |
| Tailwind CSS + @tailwindcss/vite | 4.3.4 |
| shadcn (CLI + `shadcn/tailwind.css`) | 4.23.0, new-york style, Radix, Lucide |
| radix-ui | 1.8.1 |
| tailwind-merge / cva / clsx | 3.7.0 / 0.7.1 / 2.1.1 |
| lucide-react | 1.68.0 |
| tw-animate-css | 1.4.0 |
| @fontsource/tinos, @fontsource/arimo | 5.3.0 |

```bash
npm install
npm run dev
```

Add more shadcn components with `npx shadcn@latest add card input dialog`. They'll use the brand colors automatically.

## Design foundations

| Foundation | Status | Where |
|---|---|---|
| 01 / Color | ✅ | `src/index.css`, `src/tokens/colors.ts` |
| 02 / Typography | ✅ | `src/index.css`, `src/tokens/typography.ts`, `src/components/common/text.tsx` |
| 03 / Buttons | ✅ | `src/components/common/button.tsx` |

### Color (Figma node 3344:1376)

Three layers in `src/index.css`:

1. **Primitives:** `--fp-purple-900` … `--fp-rose-500` (exact Figma variables). Utilities: `bg-fp-purple-600`. Avoid using them in components.
2. **Semantic roles:** use these in your own components.
   - `bg-surface-canvas | raised | subtle | disabled | inverse`
   - `text-text-primary | secondary | muted | disabled | inverse`
   - `bg-action-default | hover | pressed`, `text-action-on-solid`, `ring-focus-ring`
   - `border-border-default | disabled | subtle`
   - `bg-accent-promotion` (sale accents only, never actions or errors)
3. **shadcn tokens:** `--primary`, `--background`, `--border` … all point at roles, so every shadcn component picks up the brand automatically.

Contrast rules from the spec:
- Soft lilac (`purple.300`) is decorative only.
- Don't put small white text on rose. Use deep plum text with rose as the accent.

**Open item:** the spec has no error, success or warning colors yet. `--destructive` is a temporary red (`#B42318`), marked with a TODO in `index.css`.

### Typography (Figma node 3344:1602)

- **Tinos Bold** (`font-serif`) is for headings only. Never use it for form fields or button labels.
- **Arimo 400/700** (`font-sans`, the default) is for body text, prices, navigation and actions.
- Fonts come from `@fontsource` packages inside the project, with Georgia and Arial as fallbacks. They don't load from Google.

Each named style is a single class that sets the font, size, line height, weight and letter spacing. Add a color class next to it:

```tsx
<h1 className="type-heading-page text-text-primary">Checkout</h1>
```

| Class | Font · size/line height · weight | Use for |
|---|---|---|
| `type-display-hero` | Tinos · 48/51 · 700 | Storefront hero |
| `type-heading-page` | Tinos · 44/49 · 700 | Checkout and page titles |
| `type-heading-section` | Tinos · 36/40 · 700 | Major section headings |
| `type-heading-feature` | Tinos · 30/33 · 700 | Editorial features |
| `type-heading-subsection` | Tinos · 26/30 · 700 | Form groups and subsections |
| `type-heading-card` | Tinos · 22/26 · 700 | Compact editorial headings |
| `type-body-default` | Arimo · 15/22 · 400 | Product and editorial copy (default for the page) |
| `type-body-compact` | Arimo · 14/20 · 400 | Forms and supporting copy |
| `type-body-small` | Arimo · 13/20 · 400 | Cart details and metadata |
| `type-label-small` | Arimo · 12/18 · 700 | Field labels and utilities |
| `type-label-eyebrow` | Arimo · 13/18 · 700 · 2px tracking · uppercase | Short section labels |
| `type-button-small / medium / large` | Arimo · 13/18, 14/20, 15/20 · 700 · 0.5px tracking · uppercase | Button labels (built into `<Button size>`) |
| `type-utility-caption` | Arimo · 11/16 · 400 | Nonessential legal and detail text |

The `<Text>` component (`@/components/common`) applies a style, a default color and the right HTML tag in one go:

```tsx
<Text variant="heading-page">Checkout</Text>              // <h1>, text.primary
<Text variant="body-small" tone="muted">50 ml</Text>      // <p>, text.muted
<Text variant="heading-card" as="h2">Shop with confidence</Text>
```

`cn()` treats the `type-*` classes as one group, so a style passed in through `className` replaces the component's own style.

Spacing guidance from the spec: use one page-level heading, keep body text to 45–75 characters per line, and use sentence case.

## Folder structure

```
src/
  App.tsx                 routes (React Router 8)
  layouts/main-layout.tsx announcement bar + header + footer around every page
  pages/
    home/                 landing page (Figma 3313:829) and its sections/
    catalog/              /catalog and /catalog/:category, filters, sort, pagination
    product/              /products/:slug: gallery, add to cart, ritual, reviews, related
    cart/                 /cart: line items, discount code, order summary (minimal footer)
    checkout/             /checkout: contact, address, delivery, payment, validation (checkout header)
    order-confirmation/   /order-confirmation: thank-you, next steps, order details
    design-system/        foundations reference at /design-system
    not-found.tsx         placeholder for pages not built yet
  components/
    ui/                   shadcn/ui primitives (button, sheet), kept close to upstream
    common/               brand components. Pages import from "@/components/common"
  data/                   products, product details, reviews, navigation, footer
  lib/cart.tsx            cart context (useCart); the header shows the count
  lib/pricing.ts          shipping threshold, tax estimate, discount codes, totals
  lib/validation.ts       email, ZIP, card number check (Luhn), expiry, security code, formatters
  lib/order.ts            PlacedOrder type, handed from checkout to the confirmation page
  assets/images/          photos (home/, products/, avatars/)
```

### Common components

| Component | Figma | Notes |
|---|---|---|
| `AnnouncementBar` | 3316:288 | |
| `SiteHeader` | 3316:4 | Includes a Sheet menu on mobile |
| `SiteFooter` | 3316:127 | |
| `Logo` | | `variant="header"` or `"footer"` |
| `SectionHeading`, `Eyebrow` | 3313:883, 3316:80 | Heading between two rules, and a purple rule + eyebrow label |
| `ProductCard`, `ProductCarousel` | 3313:888 | Sale badge appears when `compareAtPrice` is set |
| `NewsletterBanner` | 3313:919 | |
| `TestimonialCard`, `StarRating` | 3316:85 | |
| `brandIcons` | | Social icons from lucide-static 0.577.0 |
| `PageBreadcrumb` | catalog | Wraps shadcn Breadcrumb |
| `AssuranceStrip` | catalog | The three store promises |
| `Pager` | catalog | Round page controls |
| `ImageSlot` | | Empty block at the design's size until you pass `src` |
| `ProductCard variant="catalog"` | catalog | Adds a description, a Shop now button and a dark rose badge. Use `showDescription` / `showAction` to hide either |
| `QuantityStepper` | product | − 1 + pill |
| `ReviewCard`, `StarRating filled` | product | |

### Button (Figma node 3344:1759)

```tsx
import { Button } from "@/components/common"

<Button>Shop now</Button>                                  // primary · medium
<Button variant="secondary" size="small">View details</Button>
<Button variant="tertiary" size="large">Edit bag</Button>
<Button fullWidth size="large">Place order</Button>
<Button asChild><a href="/shop">Shop now</a></Button>      // a link styled as a button
```

- **Variants:** use `primary` for the main next step (one per decision area), `secondary` for an alternative next to it, and `tertiary` for optional, low-emphasis tasks.
- **Sizes:** `small` 36 px, `medium` 44 px and `large` 52 px tall. Corners are fully rounded (48 px radius), and the side padding is 16, 22 and 28 px. Minimum widths are 120, 144 and 168 px, and buttons widen to fit longer labels.
- **States:** these come from the browser, so there are no props for them. Hover uses `:hover` (only on devices with a pointer), pressed uses `:active`, and focus uses `:focus-visible`, which draws a 2 px Purple 600 ring 3 px outside the button. For disabled, use the native `disabled` attribute, or `aria-disabled` on a link.
- Small buttons look 36 px tall but respond to taps across 44 px.
- Write labels in sentence case. The button text style displays them in uppercase.
- Size values are `--fp-button-*` variables in `src/index.css`.

## Images

The photos in `src/assets/images/` are **placeholders** with the final file names. To use the real artwork, export each image layer from Figma at 2x and save it over the matching file. You won't need to change any code.

| File | Figma layer | Size (1x) |
|---|---|---|
| `home/hero.jpg` | Hero photo (3316:46) | 600×420 |
| `home/collection-detail.jpg` | Botanical collection detail (3313:837) | 246×171 |
| `home/category-serum.jpg`, `-face-cream.jpg`, `-cleanser.jpg` | Category product photograph (3313:841/846/851) | ~195×96 |
| `home/serum-dropper.jpg` | Serum dropper photograph (3313:856) | 531×288 |
| `home/serum-botanical.jpg` | Botanical serum detail (3313:858) | 171×303 |
| `home/newsletter-left.jpg`, `-right.jpg` | Botanical newsletter detail (3313:920 / 922) | 96×120, 90×141 |
| `products/*.jpg` | Skincare product photograph (3313:889…910) | 243×138 |
| `avatars/avatar-1..3.jpg` | Avatar (3316:95/109/123) | 42×42 |

### Catalog images

The catalog hero photo is an empty `ImageSlot`. To add it, open `src/pages/catalog/index.tsx`, import your image and assign it to `heroImage`:

```ts
import heroImage from "@/assets/images/catalog/hero.jpg"
```

The catalog's product photos are the same `products/*.jpg` files the landing page uses.

### Product page images

The gallery thumbnails come from `gallery` in `src/data/product-details.ts`. By default the first thumbnail shows the product photo and the other two are empty blocks. To fill them, import the images and list them, for example:

```ts
"aloe-vera-freshness-cream": { gallery: [aloeMain, aloeDetail, aloeBotanical], … }
```

## Page options

In `App.tsx`, a route can add `handle: { footer: "minimal" }` for the minimal footer (copyright + three links) and `header: "checkout"` for the checkout header (logo, "Secure checkout", help link). Cart uses the minimal footer; checkout uses both.

## Pricing assumptions (`src/lib/pricing.ts`)

| Rule | Value | Source |
|---|---|---|
| Free shipping from | $60 | Design |
| Tax estimate | 8.875% (New York, NY 10012) | Matches the design's $13.58 on $153.00 |
| Standard shipping under $60 | $5.95 | **Assumption.** The design only shows "Free" |
| Discount code | `GLOW10` = 10% off | **Assumption.** A sample so the field works. A code entered in the bag carries over to checkout |
| Express shipping | $12.00 | Checkout design |

## Checkout payment

**Payment is simulated.** "Place order" checks the form, waits briefly, clears the bag and goes to `/order-confirmation`. It passes a `PlacedOrder` (`src/lib/order.ts`) as router state and also saves it for the browser session, so a refresh keeps the confirmation. Visiting the page with no order shows a friendly fallback. No card data goes anywhere. Before going live, replace the card fields with your payment provider's secure fields (for example Stripe Elements) and send the order to your API in `placeOrder` (`src/pages/checkout/index.tsx`).

## Pages

| Route | Page | Source |
|---|---|---|
| `/` | Landing | Figma 3313:829 |
| `/catalog`, `/catalog/:category` | Catalog | Screenshot |
| `/products/:slug` | Product detail | Screenshot |
| `/cart` | Shopping bag | Screenshot |
| `/checkout` | Checkout | Screenshot |
| `/order-confirmation` | Order confirmation | No design; built in the same style |
| `/design-system` | Color, type and button reference | Figma 01–03 |

Links to pages that aren't built yet (About, Blog, Contact, Sign in…) show a "coming soon" page.
