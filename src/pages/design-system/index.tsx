import { ArrowRight, ShoppingBag } from "lucide-react"

import { Button, Text } from "@/components/common"
import { primitives, roles, type PrimitiveKey } from "@/tokens/colors"
import { typeScale } from "@/tokens/typography"

/** Design-system reference — Figma 01 Color, 02 Type, 03 Buttons. Route: /design-system */
export default function DesignSystemPage() {
  const keys = Object.keys(primitives) as PrimitiveKey[]

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-6">
        <span className="type-heading-card text-text-primary">Fresh &amp; Pretty</span>
        <Text variant="utility-caption" tone="secondary" className="uppercase tracking-widest">
          Skincare / Design standards
        </Text>
        <Text variant="label-small" tone="action">01 Color · 02 Type · 03 Buttons</Text>
      </header>

      {/* ---------------- 02 / TYPE ---------------- */}
      <section className="mt-12 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
        <Text variant="display-hero">Editorial meets essential.</Text>
        <Text variant="body-compact">
          Tinos brings the warmth. Arimo keeps every interaction clear. Use named text recipes
          consistently, from the first impression to the final checkout step.
        </Text>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="bg-surface-subtle p-8">
          <Text variant="label-eyebrow">The editorial voice</Text>
          <p className="mt-4 flex items-baseline gap-4 font-serif font-bold text-text-primary">
            <span className="text-7xl leading-none">Aa</span>
            <span className="type-heading-feature">Tinos Bold</span>
          </p>
          <Text variant="body-compact" className="mt-4">
            For expressive headings and moments of reassurance. Weight 700. Never use for form
            fields or button labels.
          </Text>
        </div>
        <div className="bg-surface-inverse p-8">
          <Text variant="label-eyebrow" tone="inverse">The everyday voice</Text>
          <p className="mt-4 flex items-baseline gap-4 font-sans text-action-on-solid">
            <span className="text-7xl leading-none">Aa</span>
            <span className="text-3xl">Arimo</span>
          </p>
          <Text variant="body-compact" tone="inverse" className="mt-4">
            For body copy, prices, navigation and actions. Weight 400 for reading; 700 for labels
            and emphasis.
          </Text>
        </div>
      </section>

      <section className="mt-14">
        <Text variant="heading-subsection" as="h2">The named type scale</Text>
        <div className="mt-6 divide-y divide-border-subtle border-y border-border-subtle">
          {typeScale.map((t) => (
            <div key={t.token} className="grid gap-4 py-5 md:grid-cols-[200px_1fr_200px] md:items-center">
              <div>
                <Text variant="label-small" as="p">{t.token.replace("-", ".")}</Text>
                <Text variant="utility-caption" tone="secondary">
                  {t.family} · {t.size}/{t.lineHeight} px · {t.weight}
                </Text>
                <Text variant="utility-caption">Tracking {t.tracking} px</Text>
                <code className="type-utility-caption text-action-default">type-{t.token}</code>
              </div>
              <p className={`type-${t.token} text-text-primary`}>{t.specimen}</p>
              <Text variant="body-small">{t.useFor}</Text>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- 01 / COLOR ---------------- */}
      <section className="mt-16 bg-surface-inverse px-8 py-8">
        <Text variant="heading-feature" as="h2" tone="onSolid">Quiet surfaces. Confident actions.</Text>
        <Text variant="body-compact" tone="inverse" className="mt-2 max-w-xl">
          Purple leads. Lavender supports. Rose is reserved for promotional accents.
        </Text>
      </section>

      <section className="mt-12">
        <Text variant="heading-subsection" as="h2">The foundation palette</Text>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {keys.map((k) => {
            const p = primitives[k]
            return (
              <div key={k}>
                <div className="h-20 border border-border-subtle" style={{ background: `var(${p.cssVar})` }} />
                <Text variant="label-small" as="p" className="mt-2">{p.name}</Text>
                <p className="type-utility-caption flex justify-between text-text-secondary">
                  <span>{k}</span>
                  <span>{p.value}</span>
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mt-12">
        <Text variant="heading-subsection" as="h2">Use roles, not raw values</Text>
        <div className="mt-6 overflow-x-auto">
          <table className="type-body-small w-full text-left">
            <thead className="type-label-eyebrow bg-surface-subtle text-text-secondary">
              <tr>
                <th className="px-3 py-3">Role</th>
                <th className="px-3 py-3">Foundation</th>
                <th className="px-3 py-3">Value</th>
                <th className="px-3 py-3">Tailwind</th>
                <th className="px-3 py-3">Application</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <tr key={r.role} className="border-b border-border-subtle">
                  <td className="type-label-small px-3 py-3 text-text-primary">{r.role}</td>
                  <td className="px-3 py-3 text-text-secondary">{r.foundation}</td>
                  <td className="px-3 py-3 text-text-secondary">
                    <span className="inline-flex items-center gap-2">
                      <span className="size-3 border border-border-default" style={{ background: primitives[r.foundation].value }} />
                      {primitives[r.foundation].value}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-mono text-xs text-action-default">{r.utility}</td>
                  <td className="px-3 py-3 text-text-secondary">{r.application}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------------- 03 / BUTTONS ---------------- */}
      <section className="mt-16 grid gap-6 bg-surface-inverse p-8 md:grid-cols-2">
        <div>
          <Text variant="heading-card" as="h2" tone="onSolid">A consistent, generous pill.</Text>
          <Text variant="body-small" tone="inverse" className="mt-2">
            Radius 48px · Arimo Bold · Tracking 0.5px. Secondary uses a 1px outline; primary and
            tertiary have no border.
          </Text>
        </div>
        <div>
          <Text variant="heading-card" as="h2" tone="onSolid">Small 36 · Medium 44 · Large 52</Text>
          <Text variant="body-small" tone="inverse" className="mt-2">
            Padding 16 / 22 / 28px. Minimum widths 120 / 144 / 168px; buttons hug longer labels.
          </Text>
        </div>
      </section>

      <section className="mt-12">
        <Text variant="heading-subsection" as="h2">The button matrix</Text>
        <Text variant="body-compact" className="mt-1">
          Hover, press and tab through these — every state is live.
        </Text>
        {(["primary", "secondary", "tertiary"] as const).map((variant) => (
          <div key={variant} className="mt-8">
            <Text variant="heading-card" as="h3" className="capitalize">{variant}</Text>
            <div className="mt-3 overflow-x-auto">
            <div className="min-w-[640px] divide-y divide-border-subtle border-y border-border-subtle">
              {(["small", "medium", "large"] as const).map((size) => (
                <div key={size} className="grid grid-cols-[120px_1fr_1fr_1fr] items-center gap-4 py-5">
                  <Text variant="label-small" as="p" className="capitalize">{size}</Text>
                  <div><Button variant={variant} size={size}>Shop now</Button></div>
                  <div>
                    <Button variant={variant} size={size}>
                      <ShoppingBag /> Add to bag
                    </Button>
                  </div>
                  <div><Button variant={variant} size={size} disabled>Shop now</Button></div>
                </div>
              ))}
            </div>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-14">
        <Text variant="heading-subsection" as="h2">Foundations in use</Text>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-lg border border-border-subtle bg-surface-raised p-6">
            {/* Rose/white is only 4.10:1 — use deep plum text with rose as the accent */}
            <span className="type-label-eyebrow inline-flex items-center gap-1.5 text-text-primary">
              <span className="size-2 rounded-full bg-accent-promotion" />
              Sale
            </span>
            <Text variant="heading-card">Rosewater Calming Toner</Text>
            <Text variant="body-default">Botanical toner with rose and chamomile for sensitive skin.</Text>
            <Text variant="body-small" tone="muted">50 ml / 1.7 fl oz · Made for your daily ritual</Text>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button>
                Add to bag <ArrowRight />
              </Button>
              <Button variant="secondary">View details</Button>
            </div>
          </div>
          <div className="space-y-3 rounded-lg border border-border-subtle bg-surface-raised p-6">
            <Text variant="heading-subsection" as="h3">Stay in the glow</Text>
            <div className="space-y-1.5">
              <Text variant="label-small" as="label" htmlFor="email">Email address</Text>
              <input
                id="email"
                placeholder="you@example.com"
                className="type-body-compact h-11 w-full rounded-md border border-input bg-surface-raised px-3 placeholder:text-text-muted focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              />
            </div>
            <Button fullWidth size="large">Subscribe</Button>
            <Text variant="utility-caption">Unsubscribe anytime.</Text>
          </div>
        </div>
      </section>
    </main>
  )
}
