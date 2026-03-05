const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    quote:
      "The Blush Anarkali is absolutely stunning. The fabric, the embroidery, the fit — every detail is perfect. I wore it to my cousin's wedding and received so many compliments.",
    product: "Blush Anarkali",
  },
  {
    id: 2,
    name: "Ananya Krishnan",
    location: "Bangalore",
    quote:
      "Mogra has restored my faith in Indian fashion. The Ivory Linen Co-ord is so beautifully made — you can feel the quality the moment you hold it. Will be ordering again.",
    product: "Ivory Linen Co-ord",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    location: "Delhi",
    quote:
      "The Onyx Embroidered Kurta is exactly what I was looking for — understated yet festive. The silver thread work is exquisite. Highly recommend Mogra for any occasion.",
    product: "Onyx Embroidered Kurta",
  },
  {
    id: 4,
    name: "Kavitha Nair",
    location: "Chennai",
    quote:
      "I've been looking for a white kurta that feels premium without being over-the-top. The Mogra White Kurta is exactly that. The embroidery at the neckline is so delicate and thoughtful.",
    product: "Mogra White Kurta",
  },
  {
    id: 5,
    name: "Arjun Kapoor",
    location: "Pune",
    quote:
      "Ordered the Navy Block Print Kurta for a friend's sangeet. The quality is remarkable for the price point. Ships fast, packed beautifully, and the kurta itself is gorgeous.",
    product: "Navy Block Print Kurta",
  },
  {
    id: 6,
    name: "Shreya Gupta",
    location: "Hyderabad",
    quote:
      "The Terracotta Block Print Dress is a work of art. You can tell it's been handcrafted with real care. It's the kind of piece that feels heirloom-worthy.",
    product: "Terracotta Block Print Dress",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-8 py-12 sm:py-20">
      {/* Header */}
      <div className="mb-12 sm:mb-20 text-center">
        <p className="mb-3 text-xs uppercase tracking-widest text-muted">
          What our customers say
        </p>
        <h1 className="font-serif text-4xl font-light tracking-wide text-foreground">
          Testimonials
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="flex flex-col gap-6 border border-brand-border p-6 sm:p-8"
          >
            {/* Quote mark */}
            <span className="font-serif text-4xl leading-none text-gold">&ldquo;</span>

            {/* Quote text */}
            <p className="flex-1 text-sm leading-relaxed text-muted">{t.quote}</p>

            {/* Product tag */}
            <p className="text-xs uppercase tracking-widest text-gold">{t.product}</p>

            {/* Divider */}
            <div className="border-t border-brand-border pt-5">
              <p className="text-sm font-medium text-foreground">{t.name}</p>
              <p className="mt-1 text-xs text-muted">{t.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
