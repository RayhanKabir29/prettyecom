import avatar1 from "@/assets/images/avatars/avatar-1.jpg"
import avatar2 from "@/assets/images/avatars/avatar-2.jpg"
import avatar3 from "@/assets/images/avatars/avatar-3.jpg"
import { SectionHeading, TestimonialCard, type Testimonial } from "@/components/common"

const testimonials: Testimonial[] = [
  { quote: "In cursus est urna consequat mattis eget vel diam, my skin feels renewed and soft every day.", name: "Jessica James", role: "Party Partner", avatar: avatar1 },
  { quote: "Consequat mattis eget vel diam interdum mattis. Quisquily organic and the glow is real.", name: "Lora Aurora", role: "Beauty Lover", avatar: avatar2 },
  { quote: "Praesent cursus est urna consequat mattis. A permanent part of my morning ritual now.", name: "Chloris Lolla", role: "Loveridge, UK", avatar: avatar3 },
  { quote: "In interdum mattis eget vel diam consequat. Gentle, pure and effective — obsessed!", name: "Isabella M.", role: "London, UK", avatar: avatar1 },
]

/** Figma 3316:79 — serif ruled heading + four testimonial cards. */
function Testimonials() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 pt-8 pb-10 md:px-8 lg:px-[44px]">
      <SectionHeading variant="serif">Testimonials</SectionHeading>
      <div className="mt-[25px] grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} testimonial={t} />
        ))}
      </div>
    </section>
  )
}

export { Testimonials }
