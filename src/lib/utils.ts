import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge needs to know our custom `type-*` text recipes form one
 * group, so `cn("type-body-default", "type-body-small")` keeps only the last.
 */
const twMerge = extendTailwindMerge<"fp-type">({
  extend: {
    classGroups: {
      "fp-type": [
        {
          type: [
            "display-hero",
            "heading-page",
            "heading-section",
            "heading-feature",
            "heading-subsection",
            "heading-card",
            "body-default",
            "body-compact",
            "body-small",
            "label-small",
            "label-eyebrow",
            "button-small",
            "button-medium",
            "button-large",
            "utility-caption",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
