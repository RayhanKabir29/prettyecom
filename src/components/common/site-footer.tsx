import { Link } from "react-router"

import { footerColumns, legalLinks, socialLinks } from "@/data/site"

import { brandIcons } from "./brand-icons"
import { Button } from "./button"
import { Logo } from "./logo"

const footerLink =
  "rounded-sm text-[0.8125rem] leading-[0.9375rem] text-text-inverse transition-colors hover:text-fp-neutral-000 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fp-purple-100"

const YEAR = new Date().getFullYear()

const columnTitle = "type-label-eyebrow text-fp-neutral-000"

const minimalLinks = [
  { label: "Shipping & Return", to: "/shipping" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
]

/**
 * Figma 3316:127 — deep plum footer with link columns and a mini sign-up.
 * variant="minimal" — copyright + three links only (cart / checkout pages).
 */
function SiteFooter({ variant = "full" }: { variant?: "full" | "minimal" }) {
  if (variant === "minimal") {
    return (
      <footer className="bg-surface-inverse">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-8 lg:px-[60px]">
          <p className="text-xs text-text-inverse">© {YEAR} Fresh &amp; Pretty. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {minimalLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className={footerLink}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-surface-inverse">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 pt-[42px] pb-10 md:px-8 lg:grid-cols-[1fr_auto_auto_auto_230px] lg:gap-x-[90px] lg:px-[44px]">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Logo variant="footer" />
          <p className="text-[0.6875rem] leading-5 text-text-inverse uppercase">Premium · Elegant · Authentic</p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:contents">
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className={columnTitle}>{col.title}</h2>
              <ul className="mt-[14px] flex flex-col gap-[14px]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className={footerLink}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav aria-label="Follow Us">
            <h2 className={columnTitle}>Follow Us</h2>
            <ul className="mt-[14px] flex gap-2">
              {socialLinks.map(({ label, href, icon }) => {
                const Icon = brandIcons[icon]
                return <li key={label}><a href={href} target="_blank" rel="noreferrer" aria-label={label} className="inline-flex size-8 items-center justify-center rounded-full border border-fp-neutral-000/70 text-fp-neutral-000 transition-colors hover:bg-fp-neutral-000 hover:text-text-primary outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fp-purple-100"><Icon size={15} /></a></li>
              })}
            </ul>
          </nav>
        </div>

        {/* Get active */}
        <div>
          <h2 className={columnTitle}>Stay Connected</h2>
          <p className="mt-[14px] text-[0.9375rem] leading-[1.3125rem] text-text-inverse">
            Get beauty tips, exclusive offers and more.
          </p>
          <form className="mt-[14px] flex gap-2.5" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="footer-email" className="sr-only">
              Your email
            </label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder="Your email"
              className="h-[34px] w-[89px] min-w-0 flex-1 rounded-full bg-surface-raised px-[14px] text-xs text-text-primary placeholder:text-action-default outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fp-purple-100 lg:flex-none"
            />
            <Button type="submit" size="small" className="min-h-[34px] min-w-0 px-[14px] tracking-normal focus-visible:outline-fp-purple-100">
              Send
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-fp-purple-800">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8 lg:px-[99px]">
          <p className="text-[0.8125rem] text-text-inverse">© {YEAR} Fresh &amp; Pretty. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className={footerLink}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export { SiteFooter }
