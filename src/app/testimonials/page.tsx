import Image from "next/image";

const testimonials = [
  {
    id: 1,
    firstName: "Ravi",
    design: "Jaipuri Safari Cotton Print",
    image: "/community/ravi.jpg",
  },
  {
    id: 2,
    firstName: "Amar",
    design: "Indigo Floral Block Print",
    image: "/community/amar.jpg",
  },
  {
    id: 3,
    firstName: "Ishan",
    design: "White Cotton Eyelet",
    image: "/community/ishan.jpg",
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
