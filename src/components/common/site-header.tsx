import { ChevronDown, Heart, LockKeyhole, Menu, Search, ShoppingCart, UserRound } from "lucide-react"
import { Link, NavLink } from "react-router"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { mainNav } from "@/data/site"
import { useCart } from "@/lib/cart"
import { cn } from "@/lib/utils"

import { Logo } from "./logo"

const iconButton =
  "inline-flex size-10 items-center justify-center rounded-full text-accent-promotion transition-colors hover:bg-surface-subtle outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring [&_svg]:size-[18px]"

/**
 * Figma 3316:4 — top navigation (72px, porcelain).
 * variant="checkout" — distraction-free: logo, "Secure checkout", help link.
 */
function SiteHeader({ variant = "default" }: { variant?: "default" | "checkout" }) {
  if (variant === "checkout") return <CheckoutHeader />
  return <StoreHeader />
}

function CheckoutHeader() {
  return (
    <header className="border-b border-border-subtle bg-surface-canvas">
      <div className="mx-auto grid h-[72px] max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 md:px-8 lg:px-[50px]">
        <Logo className="justify-self-start" />
        <p className="flex items-center gap-2 text-xs font-bold text-text-primary">
          <LockKeyhole aria-hidden className="size-4 text-action-default" />
          <span className="hidden sm:inline">Secure checkout</span>
          <span className="sr-only sm:hidden">Secure checkout</span>
        </p>
        <p className="type-utility-caption justify-self-end text-text-secondary">
          <span className="hidden sm:inline">Need a hand? </span>
          <Link to="/contact" className="rounded-sm text-action-default hover:underline outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring">
            Contact us
          </Link>
        </p>
      </div>
    </header>
  )
}

function StoreHeader() {
  const { count: cartCount } = useCart()
  return (
    <header className="bg-surface-canvas">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8 lg:px-[60px]">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Logo />
        </div>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-4 xl:gap-6">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "relative inline-flex items-center gap-0.5 rounded-sm text-xs tracking-[0.2px] text-text-primary transition-colors hover:text-action-default outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring",
                      isActive && "font-bold after:absolute after:right-0 after:-bottom-2 after:left-0 after:h-px after:bg-action-default"
                    )
                  }
                >
                  {item.label}
                  {item.hasMenu && <ChevronDown aria-hidden className="mt-0.5 size-3" />}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-0.5 md:gap-[2px]">
          <Link to="/search" aria-label="Search" className={cn(iconButton, "hidden sm:inline-flex")}>
            <Search />
          </Link>
          <Link to="/account" aria-label="Your account" className={cn(iconButton, "hidden sm:inline-flex")}>
            <UserRound />
          </Link>
          <Link to="/wishlist" aria-label="Wishlist" className={iconButton}>
            <Heart />
          </Link>
          <Link to="/cart" aria-label={`Cart, ${cartCount} items`} className={cn(iconButton, "relative")}>
            <ShoppingCart />
            <span className="absolute top-0 right-0 inline-flex size-4 items-center justify-center rounded-full bg-accent-promotion-strong text-[0.625rem] leading-none text-white">{cartCount}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className={cn(iconButton, "-ml-2 text-text-primary lg:hidden [&_svg]:size-5")}
        >
          <Menu />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] bg-surface-canvas">
        <SheetHeader>
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <Logo />
        </SheetHeader>
        <nav aria-label="Mobile" className="px-4">
          <ul className="divide-y divide-border-subtle">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    cn("block py-4 text-base text-text-primary", isActive && "font-bold text-action-default")
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/search" className="block py-4 text-base text-text-primary">
                Search
              </NavLink>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export { SiteHeader }
