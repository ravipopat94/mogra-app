import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/catalog/${product.gender}/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden" style={{ backgroundColor: "#e5dfd4" }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="mt-4">
        <p className="text-xs uppercase tracking-widest text-muted">{product.category}</p>
        <h3 className="mt-1 text-sm font-medium text-foreground">{product.name}</h3>
        <p className="mt-1 text-sm text-gold">₹{product.price.toLocaleString("en-IN")}</p>
      </div>
    </Link>
  );
}
