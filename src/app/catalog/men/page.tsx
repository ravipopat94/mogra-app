import Image from "next/image";
import Link from "next/link";
import { fabrics, STANDARD_PRICE } from "@/data/products";

export default function MensCatalogPage() {
  return (
    <div className="flex-1 mx-auto max-w-7xl w-full px-8 py-16">
      {/* Header */}
      <div className="mb-14">
        <p className="mb-2 text-xs uppercase tracking-widest text-muted">For Him</p>
        <h1 className="font-serif text-4xl font-light tracking-wide text-foreground">
          Men&apos;s Shirts
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted max-w-lg">
          Each shirt is made to order. Choose your fabric, then customise your
          collar, sleeve length, and size.
        </p>
      </div>

      {/* Fabric card grid — compact */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {fabrics.map((fabric) => (
          <Link
            key={fabric.id}
            href={`/catalog/men/${fabric.slug}`}
            className="group block"
          >
            {/* Fabric swatch image — square */}
            <div
              className="relative aspect-square overflow-hidden"
              style={{ backgroundColor: "#e5dfd4" }}
            >
              <Image
                src={fabric.images[0]}
                alt={fabric.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            </div>

            {/* Card info */}
            <div className="mt-3">
              <p className="text-xs font-medium text-foreground truncate">
                {fabric.name}
              </p>
              <p className="mt-0.5 text-xs text-muted truncate">{fabric.composition}</p>
              <p className="mt-1 text-xs text-gold">from ${STANDARD_PRICE}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
