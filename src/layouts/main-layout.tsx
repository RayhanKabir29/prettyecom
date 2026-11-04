import { Outlet, ScrollRestoration, useMatches } from "react-router"

import { AnnouncementBar, SiteFooter, SiteHeader } from "@/components/common"
import { CartProvider } from "@/lib/cart"

/** Routes can opt into the minimal footer / checkout header via `handle`, e.g. `{ footer: "minimal", header: "checkout" }`. */
export type RouteHandle = { footer?: "full" | "minimal"; header?: "default" | "checkout" }

/** Shared shell for every storefront page: announcement, header, footer. */
export default function MainLayout() {
  const matches = useMatches()
  const header = matches.map((m) => (m.handle as RouteHandle | undefined)?.header).findLast(Boolean) ?? "default"
  const footer = matches.map((m) => (m.handle as RouteHandle | undefined)?.footer).findLast(Boolean) ?? "full"
  const productPage = matches.some((match) => match.pathname.startsWith("/products/"))
  return (
    <CartProvider>
    <div className={`flex min-h-svh flex-col${productPage ? " product-page-theme" : ""}`}>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-action-default px-4 py-2 text-action-on-solid focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <SiteHeader variant={header} />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter variant={footer} />
      <ScrollRestoration />
    </div>
    </CartProvider>
  )
}
