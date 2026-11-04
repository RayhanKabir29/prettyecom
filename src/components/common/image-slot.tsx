import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Image placeholder that keeps the design's size and shape.
 * Pass `src` to show a photo; without it the block stays empty (petal lavender)
 * so the layout holds until the real artwork is added.
 *
 *   <ImageSlot className="aspect-[16/10]" />                  empty block
 *   <ImageSlot src={heroImage} alt="…" className="aspect-[16/10]" />
 */
function ImageSlot({
  src,
  alt = "",
  className,
  imgClassName,
  ...props
}: Omit<React.ComponentProps<"img">, "src"> & { src?: string; imgClassName?: string }) {
  return (
    <div data-slot="image-slot" data-empty={!src || undefined} className={cn("overflow-hidden bg-surface-hover", className)}>
      {src && <img src={src} alt={alt} className={cn("size-full object-cover", imgClassName)} {...props} />}
    </div>
  )
}

export { ImageSlot }
