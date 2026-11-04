import { createBrowserRouter, RouterProvider } from "react-router"

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
      { path: "cart", lazy: page(() => import("@/pages/cart")), handle: { footer: "minimal" } },
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
