import * as React from "react"

import { cn } from "@/lib/utils"

/** Page-width wrapper — the Figma storefront frame is 1200px wide. */
function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-5 md:px-8", className)} {...props} />
}

export { Container }
