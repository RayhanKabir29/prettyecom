import { announcement } from "@/data/site"
import { Headphones, ShieldCheck, Truck } from "lucide-react"

/** Figma 3316:288 — deep plum strip above the header. */
function AnnouncementBar() {
  return (
    <div className="bg-surface-inverse text-text-inverse">
      <div className="mx-auto grid min-h-[26px] max-w-[1200px] grid-cols-1 items-center gap-1 px-5 py-1 text-[0.6875rem] tracking-[0.2px] sm:grid-cols-3 md:px-[66px]">
        <p className="hidden items-center justify-center gap-2 sm:flex sm:justify-start"><ShieldCheck aria-hidden className="size-4" />{announcement.left}</p>
        <p className="flex items-center justify-center gap-2"><Truck aria-hidden className="size-4" />{announcement.center}</p>
        <p className="hidden items-center justify-center gap-2 sm:flex sm:justify-end"><Headphones aria-hidden className="size-4" />{announcement.right}</p>
      </div>
    </div>
  )
}

export { AnnouncementBar }
