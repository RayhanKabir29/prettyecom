import * as React from "react"
import { SlidersHorizontal } from "lucide-react"
import { NavLink, useParams } from "react-router"

import {
  AssuranceStrip,
  Button,
  Eyebrow,
  ImageSlot,
  NewsletterBanner,
  PageBreadcrumb,
  Pager,
  ProductCard,
} from "@/components/common"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { categories, products, type Category, type Product } from "@/data/products"
import { cn } from "@/lib/utils"

import { CatalogFilters, emptyFilters, PRICE_MAX, PRICE_MIN, type FilterState } from "./filters"

/*
 * Catalog — built from the "Fresh & Pretty — Skincare catalog" screenshot
 * (Figma MCP limit reached). Route: /catalog and /catalog/:category
 *
 * Hero photo: the block is left empty. Add the image by importing it and
 * passing it to <ImageSlot src={…} /> below.
 */
const heroImage: string | undefined = undefined // e.g. import heroImage from "@/assets/images/catalog/hero.jpg"

const PAGE_SIZE = 8

const sortOptions = {
  featured: { label: "Featured", fn: (a: Product, b: Product) => a.featured - b.featured },
  "price-asc": { label: "Price: low to high", fn: (a: Product, b: Product) => a.price - b.price },
  "price-desc": { label: "Price: high to low", fn: (a: Product, b: Product) => b.price - a.price },
  name: { label: "Name: A–Z", fn: (a: Product, b: Product) => a.name.localeCompare(b.name) },
} as const
type SortKey = keyof typeof sortOptions

const chip =
  "inline-flex h-10 items-center rounded-full border px-6 text-[0.8125rem] whitespace-nowrap transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus-ring"

export default function CatalogPage() {
  const { category } = useParams<{ category?: Category }>()
  const activeCategory = categories.find((c) => c.value === category)

  const [filters, setFiltersState] = React.useState<FilterState>(emptyFilters)
  const [sort, setSortState] = React.useState<SortKey>("featured")
  const [pageState, setPage] = React.useState(1)

  const filtered = React.useMemo(() => {
    return products
      .filter((p) => !activeCategory || p.category === activeCategory.value)
      .filter((p) => !filters.skinTypes.length || filters.skinTypes.some((t) => p.skinTypes.includes(t)))
      .filter((p) => !filters.concerns.length || filters.concerns.some((c) => p.concerns.includes(c)))
      .filter((p) => p.price >= filters.price[0] && p.price <= filters.price[1])
      .sort(sortOptions[sort].fn)
  }, [activeCategory, filters, sort])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  // Never point past the last page when the result set shrinks
  const page = Math.min(pageState, pageCount)
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const from = filtered.length ? (page - 1) * PAGE_SIZE + 1 : 0
  const to = (page - 1) * PAGE_SIZE + visible.length

  const activeFilterCount =
    filters.skinTypes.length +
    filters.concerns.length +
    (filters.price[0] !== PRICE_MIN || filters.price[1] !== PRICE_MAX ? 1 : 0)

  // Changing filters or sort starts again from page 1
  const setFilters = (next: FilterState) => {
    setFiltersState(next)
    setPage(1)
  }
  const setSort = (next: SortKey) => {
    setSortState(next)
    setPage(1)
  }
  const reset = () => setFilters(emptyFilters)

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-[60px]">
        <PageBreadcrumb
          className="pt-5"
          items={[{ label: "Home", to: "/" }, { label: "Catalog", to: "/catalog" }, ...(activeCategory ? [{ label: activeCategory.label }] : [])]}
        />

        {/* Hero banner */}
        <section className="mt-4 grid overflow-hidden rounded-[18px] bg-surface-subtle md:min-h-[210px] md:grid-cols-[1fr_404px]">
          <div className="flex flex-col justify-center gap-3 px-6 py-8 md:px-9">
            <Eyebrow className="text-[0.6875rem] leading-4">Fresh &amp; Pretty skincare</Eyebrow>
            <h1 className="type-heading-subsection text-text-primary sm:type-heading-section">
              {activeCategory ? activeCategory.label : "The skincare collection"}
            </h1>
            <p className="max-w-[560px] text-[0.8125rem] leading-5 text-text-secondary">
              A little care, a little glow. Discover botanical-inspired essentials to make your everyday routine feel beautiful.
            </p>
          </div>
          <ImageSlot src={heroImage} alt="" className="hidden md:block" />
        </section>

        {/* Category chips */}
        <nav aria-label="Categories" className="-mx-5 mt-7 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0">
          <ul className="flex gap-3">
            <li>
              <NavLink
                to="/catalog"
                end
                className={({ isActive }) =>
                  cn(chip, isActive ? "border-action-default bg-action-default font-bold text-action-on-solid" : "border-border-default bg-surface-canvas text-text-primary hover:bg-surface-subtle")
                }
              >
                All skincare
              </NavLink>
            </li>
            {categories.map((c) => (
              <li key={c.value}>
                <NavLink
                  to={`/catalog/${c.value}`}
                  className={({ isActive }) =>
                    cn(chip, isActive ? "border-action-default bg-action-default font-bold text-action-on-solid" : "border-border-default bg-surface-canvas text-text-primary hover:bg-surface-subtle")
                  }
                >
                  {c.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Toolbar + body */}
        <div className="mt-10 grid gap-x-10 lg:grid-cols-[212px_1fr]">
          {/* Sidebar header (desktop) */}
          <div className="hidden items-baseline justify-between lg:flex">
            <h2 className="type-heading-card text-text-primary">Filters</h2>
            <button
              type="button"
              onClick={reset}
              disabled={!activeFilterCount}
              className="rounded-sm text-xs text-action-default underline underline-offset-4 hover:text-action-hover disabled:text-text-muted disabled:no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            >
              Reset all
            </button>
          </div>

          {/* Results toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <MobileFilters value={filters} onChange={setFilters} count={activeFilterCount} onReset={reset} />
              <p className="type-utility-caption text-text-secondary sm:type-body-small" aria-live="polite">
                Showing {from}–{to} of {filtered.length} products
              </p>
            </div>
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger
                aria-label="Sort products"
                className="h-10! min-w-[170px] rounded-full border-border-default bg-surface-raised px-5 text-[0.8125rem] text-text-primary shadow-none focus-visible:border-ring"
              >
                <span className="text-text-secondary">Sort by:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end" className="border-border-subtle bg-surface-raised">
                {Object.entries(sortOptions).map(([key, o]) => (
                  <SelectItem key={key} value={key} className="text-[0.8125rem] text-text-primary focus:bg-surface-subtle">
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sidebar (desktop) */}
          <div className="hidden pt-4 lg:block">
            <CatalogFilters value={filters} onChange={setFilters} />
          </div>

          {/* Product grid */}
          <div className="pt-4">
            {visible.length ? (
              <ul className="grid gap-[26px] sm:grid-cols-2">
                {visible.map((p) => (
                  <li key={p.id}>
                    <ProductCard product={p} variant="catalog" className="h-full" />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center gap-4 rounded-[18px] border border-dashed border-border-default px-6 py-16 text-center">
                <h2 className="type-heading-card text-text-primary">Nothing matches just yet</h2>
                <p className="type-body-compact max-w-sm text-text-secondary">Try another category or loosen a filter to see more of the collection.</p>
                <Button variant="secondary" size="small" onClick={reset} asChild={!activeFilterCount && !!activeCategory}>
                  {!activeFilterCount && activeCategory ? <NavLink to="/catalog">View all skincare</NavLink> : "Reset filters"}
                </Button>
              </div>
            )}

            <div className="mt-[30px] flex items-center justify-between gap-4">
              <p className="type-utility-caption text-text-secondary">
                {to >= filtered.length ? `You've viewed all ${filtered.length} products` : `Showing ${to} of ${filtered.length} products`}
              </p>
              <Pager page={page} pageCount={pageCount} onPageChange={setPage} />
            </div>
          </div>
        </div>
      </div>

      <AssuranceStrip className="mt-10" />
      <NewsletterBanner decorated={false} />
    </>
  )
}

function MobileFilters({
  value,
  onChange,
  count,
  onReset,
}: {
  value: FilterState
  onChange: (v: FilterState) => void
  count: number
  onReset: () => void
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" size="small" className="min-w-0 gap-1.5 px-4 lg:hidden">
          <SlidersHorizontal aria-hidden className="size-3.5" />
          Filters{count ? ` (${count})` : ""}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] overflow-y-auto bg-surface-canvas">
        <SheetHeader className="flex-row items-baseline justify-between">
          <SheetTitle className="type-heading-card text-text-primary">Filters</SheetTitle>
          <button type="button" onClick={onReset} className="mr-8 text-xs text-action-default underline underline-offset-4">
            Reset all
          </button>
        </SheetHeader>
        <div className="px-4 pb-8">
          <CatalogFilters value={value} onChange={onChange} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
