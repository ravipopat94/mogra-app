import { notFound } from "next/navigation";
import Link from "next/link";
import { fabrics, getFabricBySlug } from "@/data/products";
import StyledGallery from "@/components/StyledGallery";

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

        {/* Photo grid with lightbox */}
        <StyledGallery images={fabric.styledImages} fabricName={fabric.name} />

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
