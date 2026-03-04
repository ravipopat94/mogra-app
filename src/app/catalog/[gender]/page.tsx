"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getProductsByGender, womenCategories } from "@/data/products";

export default function GenderCatalogPage({
  params,
}: {
  params: Promise<{ gender: string }>;
}) {
  const { gender } = use(params);

  // Men have their own dedicated page — this route only handles women
  if (gender !== "women") {
    notFound();
  }

  const allProducts = getProductsByGender("women");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="flex-1 mx-auto max-w-7xl w-full px-8 py-16">
      {/* Header */}
      <div className="mb-14">
        <p className="mb-2 text-xs uppercase tracking-widest text-muted">For Her</p>
        <h1 className="font-serif text-4xl font-light tracking-wide text-foreground">
          Women
        </h1>
      </div>

      {/* Category filter */}
      <div className="mb-12 flex flex-wrap gap-3">
        {womenCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 text-xs uppercase tracking-widest transition ${
              activeCategory === cat
                ? "bg-foreground text-background"
                : "border border-brand-border text-foreground hover:border-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="py-24 text-center text-xs uppercase tracking-widest text-muted">
          No products in this category yet.
        </p>
      )}
    </div>
  );
}
