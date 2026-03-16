import Image from "next/image";
import Link from "next/link";
import { fabrics } from "@/data/products";
import StyledTrigger from "@/components/StyledTrigger";

export default function BespokeShirtsPage() {
  return (
    <div className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="mb-14">
        <p className="mb-2 text-xs uppercase tracking-widest text-muted">For You</p>
        <h1 className="font-serif text-4xl font-light tracking-wide text-foreground">
          Bespoke Shirts
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Each shirt is made to order. Choose your fabric, then customise your
          collar, sleeve length, and size.
        </p>
      </div>

      {/* Fabric card grid — compact */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {fabrics.map((fabric) => (
          <div key={fabric.id} className="group">
            <Link href={`/bespoke-shirts/${fabric.slug}`} className="block">
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
              <div className="mt-3 overflow-hidden">
                <p className="text-xs font-medium text-foreground truncate">
                  {fabric.name}
                </p>
                <p className="mt-0.5 text-xs text-muted truncate">{fabric.composition}</p>
              </div>
            </Link>

            <Link
              href={`/bespoke-shirts/${fabric.slug}`}
              className="mt-1.5 inline-block text-[10px] uppercase tracking-widest text-muted/60 hover:text-gold transition-colors"
            >
              Shop now →
            </Link>

            {fabric.styledImages && fabric.styledImages.length > 0 && (
              <StyledTrigger
                images={fabric.styledImages}
                fabricName={fabric.name}
                className="mt-1.5 inline-block text-[10px] uppercase tracking-widest text-muted/60 hover:text-gold transition-colors"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
