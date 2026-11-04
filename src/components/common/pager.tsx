import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

const circle =
  "inline-flex size-8 items-center justify-center rounded-full text-[0.8125rem] font-bold transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:pointer-events-none"

/** Round page controls — ‹ 1 2 3 › (catalog grid footer). */
function Pager({
  page,
  pageCount,
  onPageChange,
  className,
}: {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  className?: string
}) {
  const pages = Array.from({ length: Math.max(pageCount, 1) }, (_, i) => i + 1)
  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-2", className)}>
      <button
        type="button"
        aria-label="Previous page"
        className={cn(circle, "border border-border-subtle text-action-default hover:bg-surface-subtle disabled:text-text-disabled")}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft aria-hidden className="size-3.5" />
      </button>
      {pages.map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`Page ${n}`}
          aria-current={n === page ? "page" : undefined}
          className={cn(
            circle,
            n === page
              ? "bg-action-default text-action-on-solid"
              : "border border-border-subtle text-action-default hover:bg-surface-subtle"
          )}
          onClick={() => onPageChange(n)}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        aria-label="Next page"
        className={cn(circle, "border border-border-subtle text-action-default hover:bg-surface-subtle disabled:text-text-disabled")}
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight aria-hidden className="size-3.5" />
      </button>
    </nav>
  )
}

export { Pager }
