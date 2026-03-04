import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/data/products";
import SizeSelector from "@/components/SizeSelector";

export async function generateStaticParams() {
  return products.map((p) => ({ gender: p.gender, slug: p.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ gender: string; slug: string }>;
}) {
  const { gender, slug } = await params;

  if (gender !== "women" && gender !== "men") notFound();

  const product = getProductBySlug(slug);
  if (!product || product.gender !== gender) notFound();

  const genderLabel = gender === "women" ? "Women" : "Men";

  return (
    <div className="flex-1 mx-auto max-w-7xl w-full px-8 py-16">
      {/* Breadcrumb */}
      <div className="mb-12 flex items-center gap-3 text-xs uppercase tracking-widest text-muted">
        <Link href="/catalog" className="hover:text-gold transition-colors">
          Catalog
        </Link>
        <span>/</span>
        <Link href={`/catalog/${gender}`} className="hover:text-gold transition-colors">
          {genderLabel}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Product image */}
        <div
          className="relative aspect-[3/4] overflow-hidden"
          style={{ backgroundColor: "#e5dfd4" }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Product info */}
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-xs uppercase tracking-widest text-muted">
            {product.category}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-light tracking-wide text-foreground">
            {product.name}
          </h1>
          <p className="mb-8 text-xl text-gold">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
          <p className="mb-10 text-sm leading-relaxed text-muted">
            {product.description}
          </p>

          {/* Size selector (client component) */}
          <SizeSelector sizes={product.sizes} />

          {/* Add to cart */}
          <button className="w-full border border-foreground bg-foreground py-4 text-xs uppercase tracking-widest text-background transition hover:bg-transparent hover:text-foreground">
            Add to Cart
          </button>

          {/* Product details */}
          <div className="mt-12 border-t border-brand-border pt-10">
            <p className="mb-5 text-xs uppercase tracking-widest text-muted">
              Product Details
            </p>
            <ul className="flex flex-col gap-2.5">
              {product.details.map((detail) => (
                <li
                  key={detail}
                  className="flex items-start gap-3 text-sm text-muted"
                >
                  <span className="mt-2 h-px w-3 shrink-0 bg-gold" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
