import Image from "next/image";
import Link from "next/link";
import { getFeaturedFabrics, STANDARD_PRICE } from "@/data/products";

export default function CatalogPage() {
  const featuredFabrics = getFeaturedFabrics();

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
        <p className="mb-10 text-sm leading-relaxed text-muted">
          Each shirt is made to order. Choose your fabric, then customise your collar, sleeve length, and size.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {featuredFabrics.map((fabric) => (
            <div key={fabric.id} className="group">
              <Link href={`/catalog/men/${fabric.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: "#e5dfd4" }}>
                  <Image
                    src={fabric.images[0]}
                    alt={fabric.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <div className="mt-3 overflow-hidden">
                  <p className="text-xs uppercase tracking-widest text-muted truncate">{fabric.composition}</p>
                  <h3 className="mt-1 text-xs font-medium text-foreground truncate">{fabric.name}</h3>
                </div>
              </Link>

              {fabric.styledImages && fabric.styledImages.length > 0 && (
                <Link
                  href={`/catalog/men/${fabric.slug}/styled`}
                  className="mt-1.5 inline-block text-[10px] uppercase tracking-widest text-muted/60 hover:text-gold transition-colors"
                >
                  See it styled →
                </Link>
              )}
            </div>
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square border border-brand-border flex flex-col items-center justify-center gap-2" style={{ backgroundColor: "#e5dfd4" }}>
              <p className="font-serif text-sm font-light tracking-wide text-foreground">Coming Soon</p>
              <p className="text-xs uppercase tracking-widest text-muted">New Collection</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
