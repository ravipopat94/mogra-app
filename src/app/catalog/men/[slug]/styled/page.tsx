import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { fabrics, getFabricBySlug } from "@/data/products";

export async function generateStaticParams() {
  return fabrics
    .filter((f) => f.styledImages && f.styledImages.length > 0)
    .map((f) => ({ slug: f.slug }));
}

export default async function StyledPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fabric = getFabricBySlug(slug);

  if (!fabric || !fabric.styledImages || fabric.styledImages.length === 0) {
    notFound();
  }

  return (
    <div className="flex-1 w-full">
      <div className="mx-auto max-w-5xl px-4 sm:px-8 py-10 sm:py-16">

        {/* Back link */}
        <Link
          href={`/catalog/men/${slug}`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted hover:text-gold transition-colors mb-10"
        >
          ← Back to {fabric.name}
        </Link>

        {/* Heading */}
        <div className="mb-10">
          <p className="mb-2 text-xs uppercase tracking-widest text-muted">
            {fabric.composition}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-wide text-foreground">
            {fabric.name}
          </h1>
          <p className="mt-2 text-sm text-muted">
            A few ways it comes to life.
          </p>
        </div>

        {/* Photo grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {fabric.styledImages.map((src, i) => (
            <div key={i} className="break-inside-avoid overflow-hidden">
              <Image
                src={src}
                alt={`${fabric.name} styled look ${i + 1}`}
                width={800}
                height={1000}
                className="w-full object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 border-t border-brand-border pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-muted">
            Like what you see?
          </p>
          <Link
            href={`/catalog/men/${slug}`}
            className="text-xs uppercase tracking-widest text-foreground underline underline-offset-4 hover:text-gold transition-colors"
          >
            Order yours →
          </Link>
        </div>

      </div>
    </div>
  );
}
