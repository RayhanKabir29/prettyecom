/** Site-wide navigation and footer content (shared by every page). */

export type NavItem = { label: string; to: string; hasMenu?: boolean }

export const mainNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Catalog", to: "/catalog", hasMenu: true },
  { label: "Skin Care", to: "/catalog/face-cream", hasMenu: true },
  { label: "Makeup", to: "/catalog", hasMenu: true },
  { label: "About Us", to: "/about", hasMenu: true },
  { label: "Blog", to: "/blog", hasMenu: true },
  { label: "Contact", to: "/contact" },
]

export const announcement = {
  left: "100% Authentic Products",
  center: "Free Shipping on Orders Over $60",
  right: "Dedicated Support",
}

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", to: "/" },
      { label: "Catalog", to: "/catalog" },
      { label: "About Us", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Shipping Policy", to: "/shipping" },
      { label: "Return Policy", to: "/returns" },
      { label: "FAQs", to: "/faq" },
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Privacy Policy", to: "/privacy" },
    ],
  },
]

export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Cookies Settings", to: "/cookies" },
]

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
] as const
