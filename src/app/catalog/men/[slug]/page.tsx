import { notFound } from "next/navigation";
import Link from "next/link";
import { fabrics, getFabricBySlug } from "@/data/products";
import ImageGallery from "@/components/ImageGallery";
import ShirtConfigurator from "@/components/ShirtConfigurator";

export async function generateStaticParams() {
  return fabrics.map((f) => ({ slug: f.slug }));
}

// ─── Step guide icons ────────────────────────────────────────────────────────

function FabricIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" strokeDasharray="2 3" />
    </svg>
  );
}

function CollarIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 3l4 5 4-5" />
      <path d="M8 3C6 4.5 5 6.5 5 9v12h14V9c0-2.5-1-4.5-3-6" />
      <path d="M12 8v13" />
    </svg>
  );
}

function SleeveIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="8" width="20" height="8" rx="1" />
      <path d="M6 8v3M10 8v2M14 8v2M18 8v3" />
    </svg>
  );
}

function SizeIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="7" r="3" />
      <path d="M6.5 21v-5a2 2 0 012-2h7a2 2 0 012 2v5" />
      <path d="M3 21h18" />
    </svg>
  );
}

const steps = [
  { label: "Pick your fabric", Icon: FabricIcon },
  { label: "Pick your collar", Icon: CollarIcon },
  { label: "Pick your sleeve length", Icon: SleeveIcon },
  { label: "Pick your size", Icon: SizeIcon },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ShirtProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fabric = getFabricBySlug(slug);
  if (!fabric) notFound();

  return (
    <div className="flex-1 w-full">

      {/* ── How it works — step guide ── */}
      <div className="border-b border-brand-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-10 sm:py-12">
          <p className="mb-10 text-center text-xs uppercase tracking-widest text-muted">
            How it works
          </p>

          {/* 2×2 grid on mobile, horizontal row on sm+ */}
          <div className="grid grid-cols-2 gap-8 sm:flex sm:items-start sm:justify-center sm:gap-0">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-start">
                {/* Step */}
                <div className="flex flex-col items-center gap-3 w-full sm:w-32 md:w-36">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold">
                    <step.Icon />
                  </div>
                  <p className="text-xs text-center leading-relaxed text-foreground">
                    {step.label}
                  </p>
                </div>

                {/* Arrow — desktop only */}
                {i < steps.length - 1 && (
                  <div className="hidden sm:flex items-center mt-5 mx-1 text-gold text-lg select-none">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-10 sm:py-16">

        {/* Breadcrumb */}
        <div className="mb-12 flex items-center gap-3 text-xs uppercase tracking-widest text-muted">
          <Link href="/catalog" className="hover:text-gold transition-colors">Catalog</Link>
          <span>/</span>
          <Link href="/catalog/men" className="hover:text-gold transition-colors">Men</Link>
          <span>/</span>
          <span className="text-foreground">{fabric.name}</span>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">

          {/* Left — image gallery */}
          <ImageGallery images={fabric.images} alt={fabric.name} />

          {/* Right — info + configurator */}
          <div>
            {/* Fabric name + composition */}
            <p className="mb-2 text-xs uppercase tracking-widest text-muted">
              {fabric.composition}
            </p>
            <h1 className="mb-1 font-serif text-4xl font-light tracking-wide text-foreground">
              {fabric.name}
            </h1>
            <p className="mb-6 text-sm leading-relaxed text-muted">
              {fabric.description}
            </p>

            <div className="border-t border-brand-border my-6" />

            {/* Configurator */}
            <ShirtConfigurator fabricName={fabric.name} fabricSlug={fabric.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
