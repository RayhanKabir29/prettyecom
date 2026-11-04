import { Fragment } from "react"
import { Link } from "react-router"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"

type Crumb = { label: string; to?: string }

/** "Home › Catalog" trail. The last item is the current page. */
function PageBreadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="type-utility-caption gap-2 text-text-secondary sm:gap-2.5">
        {items.map((c, i) => {
          const last = i === items.length - 1
          return (
            <Fragment key={c.label}>
              <BreadcrumbItem>
                {last || !c.to ? (
                  <BreadcrumbPage className={cn("text-text-secondary", last && "text-action-default")}>{c.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild className="hover:text-action-default">
                    <Link to={c.to}>{c.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!last && <BreadcrumbSeparator className="[&>svg]:size-3" />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { PageBreadcrumb }
export type { Crumb }
