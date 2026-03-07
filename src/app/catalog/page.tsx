import Image from "next/image";
import Link from "next/link";
import { getFeaturedFabrics, STANDARD_PRICE } from "@/data/products";

export default function CatalogPage() {
  const featuredFabrics = getFeaturedFabrics().slice(0, 3);

  return (
    <div className="flex-1">
      {/* Page header */}
      <div className="border-b border-brand-border px-4 sm:px-8 py-10 sm:py-14 text-center">
        <p className="mb-3 text-xs uppercase tracking-widest text-muted">Collections</p>
        <h1 className="font-serif text-4xl font-light tracking-wide text-foreground">
          Product Catalog
        </h1>
      </div>

      {/* Men's Section — fabric cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-8 py-12 sm:py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-muted">For Him</p>
            <h2 className="font-serif text-3xl font-light tracking-wide text-foreground">Men</h2>
          </div>
          <Link
            href="/catalog/men"
            className="text-xs font-semibold uppercase tracking-widest text-gold hover:underline underline-offset-4 transition-all"
          >
            View All →
          </Link>
        </div>
        <p className="mb-10 text-sm leading-relaxed text-muted max-w-lg">
          Each shirt is made to order. Choose your fabric, then customise your collar, sleeve length, and size.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featuredFabrics.map((fabric) => (
            <Link key={fabric.id} href={`/catalog/men/${fabric.slug}`} className="group block">
              <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: "#e5dfd4" }}>
                <Image
                  src={fabric.images[0]}
                  alt={fabric.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="mt-3 overflow-hidden">
                <p className="text-xs uppercase tracking-widest text-muted truncate">{fabric.composition}</p>
                <h3 className="mt-1 text-xs font-medium text-foreground truncate">{fabric.name}</h3>
                <p className="mt-1 text-xs text-gold">from ${STANDARD_PRICE}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-brand-border mx-4 sm:mx-8" />

      {/* Women's Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-8 py-12 sm:py-20">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-muted">For Her</p>
            <h2 className="font-serif text-3xl font-light tracking-wide text-foreground">Women</h2>
          </div>
        </div>
        <div className="py-16 text-center border border-brand-border">
          <p className="font-serif text-xl font-light tracking-wide text-foreground">
            Fabrics Coming Soon
          </p>
          <p className="mt-3 text-xs uppercase tracking-widest text-muted">
            Our women&apos;s collection is on its way.
          </p>
        </div>
      </section>
    </div>
  );
}
