import { notFound } from "next/navigation";

export default async function GenderCatalogPage({
  params,
}: {
  params: Promise<{ gender: string }>;
}) {
  const { gender } = await params;

  // Men have their own dedicated page — this route only handles women
  if (gender !== "women") {
    notFound();
  }

  return (
    <div className="flex-1 mx-auto max-w-7xl w-full px-8 py-16">
      {/* Header */}
      <div className="mb-14">
        <p className="mb-2 text-xs uppercase tracking-widest text-muted">For Her</p>
        <h1 className="font-serif text-4xl font-light tracking-wide text-foreground">
          Women
        </h1>
      </div>

      {/* Coming soon */}
      <div className="py-32 text-center">
        <p className="font-serif text-2xl font-light tracking-wide text-foreground">
          Fabrics Coming Soon
        </p>
        <p className="mt-4 text-xs uppercase tracking-widest text-muted">
          Our women&apos;s collection is on its way.
        </p>
      </div>
    </div>
  );
}
