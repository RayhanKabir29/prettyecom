import * as React from "react"
import { ArrowRight, Minus, Plus } from "lucide-react"
import { Link } from "react-router"

import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Slider } from "@/components/ui/slider"
import { skinConcerns, skinTypes, type SkinConcern, type SkinType } from "@/data/products"

export const PRICE_MIN = 0
export const PRICE_MAX = 100

export type FilterState = {
  skinTypes: SkinType[]
  concerns: SkinConcern[]
  price: [number, number]
}

export const emptyFilters: FilterState = { skinTypes: [], concerns: [], price: [PRICE_MIN, PRICE_MAX] }

const toggle = <T,>(list: T[], value: T) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true)
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border-b border-border-subtle py-5">
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-sm text-[0.8125rem] font-bold text-text-primary outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring">
        {title}
        {open ? <Minus aria-hidden className="size-3.5 text-action-default" /> : <Plus aria-hidden className="size-3.5 text-action-default" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3">{children}</CollapsibleContent>
    </Collapsible>
  )
}

function CheckList<T extends string>({
  name,
  options,
  selected,
  onChange,
}: {
  name: string
  options: { value: T; label: string }[]
  selected: T[]
  onChange: (next: T[]) => void
}) {
  return (
    <ul className="flex flex-col gap-2.5">
      {options.map((o) => {
        const id = `${name}-${o.value}`
        return (
          <li key={o.value} className="flex items-center gap-2.5">
            <Checkbox
              id={id}
              checked={selected.includes(o.value)}
              onCheckedChange={() => onChange(toggle(selected, o.value))}
              className="size-[18px] rounded-[4px] border-border-default bg-surface-raised"
            />
            <label htmlFor={id} className="cursor-pointer text-[0.8125rem] text-text-secondary">
              {o.label}
            </label>
          </li>
        )
      })}
    </ul>
  )
}

function PriceInput({ label, value, onCommit }: { label: string; value: number; onCommit: (v: number) => void }) {
  // Remounted (via key) whenever the committed value changes, so the draft resets
  const [draft, setDraft] = React.useState(String(value))
  return (
    <label className="relative flex-1">
      <span className="sr-only">{label}</span>
      <span aria-hidden className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[0.8125rem] text-text-muted">
        $
      </span>
      <input
        inputMode="numeric"
        value={draft}
        onChange={(e) => setDraft(e.target.value.replace(/[^\d]/g, ""))}
        onBlur={() => onCommit(Number(draft || 0))}
        onKeyDown={(e) => e.key === "Enter" && onCommit(Number(draft || 0))}
        className="h-[34px] w-full rounded-md border border-input bg-surface-raised pr-2 pl-6 text-[0.8125rem] text-text-primary outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
      />
    </label>
  )
}

/** Sidebar filter groups + guidance card (also rendered inside the mobile sheet). */
function CatalogFilters({ value, onChange }: { value: FilterState; onChange: (next: FilterState) => void }) {
  const clamp = (n: number) => Math.min(PRICE_MAX, Math.max(PRICE_MIN, n))
  return (
    <div>
      <div className="border-t border-border-subtle" />
      <FilterGroup title="Skin type">
        <CheckList name="skin-type" options={skinTypes} selected={value.skinTypes} onChange={(skinTypes) => onChange({ ...value, skinTypes })} />
      </FilterGroup>
      <FilterGroup title="Skin concern">
        <CheckList name="concern" options={skinConcerns} selected={value.concerns} onChange={(concerns) => onChange({ ...value, concerns })} />
      </FilterGroup>
      <FilterGroup title="Price range">
        <Slider
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={1}
          minStepsBetweenThumbs={1}
          value={value.price}
          onValueChange={(v) => onChange({ ...value, price: [v[0], v[1]] })}
          aria-label="Price range"
          className="my-2 [&_[data-slot=slider-thumb]]:border-action-default [&_[data-slot=slider-thumb]]:bg-surface-raised [&_[data-slot=slider-track]]:bg-border-subtle"
        />
        <div className="mt-4 flex gap-3">
          <PriceInput
            key={`min-${value.price[0]}`}
            label="Minimum price"
            value={value.price[0]}
            onCommit={(n) => onChange({ ...value, price: [Math.min(clamp(n), value.price[1] - 1), value.price[1]] })}
          />
          <PriceInput
            key={`max-${value.price[1]}`}
            label="Maximum price"
            value={value.price[1]}
            onCommit={(n) => onChange({ ...value, price: [value.price[0], Math.max(clamp(n), value.price[0] + 1)] })}
          />
        </div>
      </FilterGroup>

      <aside className="mt-8 rounded-[12px] bg-surface-subtle p-5">
        <h2 className="font-serif text-xl leading-6 font-bold text-text-primary">A little guidance?</h2>
        <p className="mt-2 text-xs leading-5 text-text-secondary">Find the feel-good essentials for your daily ritual.</p>
        <Link
          to="/contact"
          className="type-label-small mt-3 inline-flex items-center gap-1 rounded-sm text-text-primary uppercase underline underline-offset-4 hover:text-action-default outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        >
          Let's talk skincare <ArrowRight aria-hidden className="size-3" />
        </Link>
      </aside>
    </div>
  )
}

export { CatalogFilters }
