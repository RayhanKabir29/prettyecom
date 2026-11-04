import { createBrowserRouter, isRouteErrorResponse, Link, RouterProvider, useRouteError } from "react-router"

import MainLayout from "@/layouts/main-layout"
import HomePage from "@/pages/home"
import NotFoundPage from "@/pages/not-found"

/** Route-level code splitting: each page's code loads when it's first visited. */
const page = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({ Component: (await load()).default })

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "catalog/:category?", lazy: page(() => import("@/pages/catalog")) },
      { path: "products/:slug", lazy: page(() => import("@/pages/product")) },
      { path: "cart", lazy: page(() => import("@/pages/cart")), errorElement: <RouteError />, handle: { footer: "minimal" } },
      {
        path: "checkout",
        lazy: page(() => import("@/pages/checkout")),
        handle: { header: "checkout", footer: "minimal" },
      },
      {
        path: "order-confirmation",
        lazy: page(() => import("@/pages/order-confirmation")),
        handle: { footer: "minimal" },
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  // Foundations reference (no storefront chrome)
  { path: "/design-system", lazy: page(() => import("@/pages/design-system")) },
])

export default function App() {
  return <RouterProvider router={router} />
}

function RouteError() {
  const error = useRouteError()
  const detail = isRouteErrorResponse(error) ? error.statusText : error instanceof Error ? error.message : ""

  return (
    <main className="mx-auto flex min-h-[55vh] max-w-2xl flex-col items-center justify-center gap-4 px-5 py-16 text-center">
      <p className="type-label-eyebrow text-action-default">Something went wrong</p>
      <h1 className="type-heading-section text-text-primary">We couldn't open your shopping bag.</h1>
      <p className="type-body-default max-w-lg text-text-secondary">
        Your items are still saved. Refresh the page to try loading your bag again.
      </p>
      {detail && <p className="type-utility-caption max-w-lg text-text-muted">{detail}</p>}
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="type-button-medium rounded-full bg-action-default px-6 py-3 text-action-on-solid hover:bg-action-hover focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus-ring"
        >
          Refresh page
        </button>
        <Link to="/" className="type-button-medium rounded-full border border-action-default px-6 py-3 text-action-default hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus-ring">
          Back to home
        </Link>
      </div>
    </main>
  )
}
