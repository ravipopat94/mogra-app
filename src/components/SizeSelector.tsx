"use client";

import { useState } from "react";

export default function SizeSelector({ sizes }: { sizes: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="mb-8">
      <p className="mb-3 text-xs uppercase tracking-widest text-muted">
        Select Size
      </p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelected(size)}
            className={`border px-4 py-2 text-sm transition ${
              selected === size
                ? "border-gold bg-gold text-background"
                : "border-brand-border text-foreground hover:border-gold"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
