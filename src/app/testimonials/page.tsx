import Image from "next/image";

const testimonials = [
  {
    id: 1,
    firstName: "Priya",
    design: "Blush Anarkali",
    image: "https://picsum.photos/seed/person-1/600/750",
  },
  {
    id: 2,
    firstName: "Ananya",
    design: "Ivory Linen Co-ord",
    image: "https://picsum.photos/seed/person-2/600/750",
  },
  {
    id: 3,
    firstName: "Rohan",
    design: "Onyx Embroidered Kurta",
    image: "https://picsum.photos/seed/person-3/600/750",
  },
  {
    id: 4,
    firstName: "Kavitha",
    design: "Mogra White Kurta",
    image: "https://picsum.photos/seed/person-4/600/750",
  },
  {
    id: 5,
    firstName: "Arjun",
    design: "Navy Block Print Kurta",
    image: "https://picsum.photos/seed/person-5/600/750",
  },
  {
    id: 6,
    firstName: "Shreya",
    design: "Terracotta Block Print Dress",
    image: "https://picsum.photos/seed/person-6/600/750",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-8 py-12 sm:py-20">
      {/* Header */}
      <div className="mb-12 sm:mb-20 text-center">
        <p className="mb-3 text-xs uppercase tracking-widest text-muted">
          Our community
        </p>
        <h1 className="font-serif text-4xl font-light tracking-wide text-foreground">
          Mogra in everyday life
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.id} className="border border-brand-border overflow-hidden">
            {/* Photo */}
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={t.image}
                alt={t.firstName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            {/* Name + design */}
            <div className="px-6 py-5">
              <p className="text-sm font-medium text-foreground">{t.firstName}</p>
              <p className="mt-1 text-xs text-muted">{t.design}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
