"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  COLLAR_STYLES,
  SLEEVE_LENGTHS,
  SHIRT_SIZES,
  STANDARD_PRICE,
  CUSTOM_PRICE,
} from "@/data/products";
import { useCart } from "@/context/CartContext";

interface Props {
  fabricName: string;
  fabricSlug: string;
}

export default function ShirtConfigurator({ fabricName, fabricSlug }: Props) {
  const [collar, setCollar] = useState<string | null>(null);
  const [sleeve, setSleeve] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();
  const router = useRouter();

  const price = size === "Custom" ? CUSTOM_PRICE : STANDARD_PRICE;
  const canAdd = collar && sleeve && size;

  function handleAddToCart() {
    if (!collar || !sleeve || !size) return;
    addItem({ fabricName, fabricSlug, collar, sleeve, size, quantity, price });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  const optionBase = "px-3 py-1.5 text-xs border transition-colors";
  const optionActive = "bg-foreground text-background border-foreground";
  const optionInactive = "border-brand-border text-foreground hover:border-foreground";

  return (
    <div>
      {/* Dynamic price */}
      <p className="mb-6 text-xl text-gold font-light">
        ${price}.00
        {size === "Custom" && (
          <span className="ml-2 text-xs text-muted">(custom sizing)</span>
        )}
      </p>

      {/* ── Collar ── */}
      <div className="mb-5">
        <p className="mb-2.5 text-xs uppercase tracking-widest text-muted">Collar</p>
        <div className="flex flex-wrap gap-2">
          {COLLAR_STYLES.map((c) => (
            <button
              key={c}
              onClick={() => setCollar(c)}
              className={`${optionBase} ${collar === c ? optionActive : optionInactive}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ── Sleeve length ── */}
      <div className="mb-5">
        <p className="mb-2.5 text-xs uppercase tracking-widest text-muted">Sleeve Length</p>
        <div className="flex gap-2">
          {SLEEVE_LENGTHS.map((s) => (
            <button
              key={s}
              onClick={() => setSleeve(s)}
              className={`${optionBase} ${sleeve === s ? optionActive : optionInactive}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Size ── */}
      <div className="mb-6">
        <p className="mb-2.5 text-xs uppercase tracking-widest text-muted">Size</p>
        <div className="flex flex-wrap gap-2">
          {SHIRT_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`${optionBase} ${size === s ? optionActive : optionInactive}`}
            >
              {s}
            </button>
          ))}
        </div>
        {size === "Custom" && (
          <p className="mt-2.5 text-xs leading-relaxed text-muted">
            Mention your measurements in your message and we&apos;ll guide you through the rest.
          </p>
        )}
      </div>

      {/* ── Quantity ── */}
      <div className="mb-8">
        <p className="mb-2.5 text-xs uppercase tracking-widest text-muted">Quantity</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-8 w-8 items-center justify-center border border-brand-border text-foreground hover:border-foreground transition-colors text-sm"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-4 text-center text-sm text-foreground">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-8 w-8 items-center justify-center border border-brand-border text-foreground hover:border-foreground transition-colors text-sm"
            aria-label="Increase quantity"
          >
            +
          </button>
          <span className="text-xs text-muted">= ${price * quantity}.00</span>
        </div>
      </div>

      {/* ── Add to Cart ── */}
      {!canAdd && (
        <p className="mb-3 text-xs text-muted">
          Please select a collar, sleeve length, and size to continue.
        </p>
      )}

      <button
        onClick={handleAddToCart}
        disabled={!canAdd}
        className={`mb-3 w-full px-4 py-3.5 text-xs uppercase tracking-widest transition-colors ${
          canAdd
            ? "bg-foreground text-background hover:bg-gold hover:border-gold border border-foreground"
            : "border border-brand-border text-muted cursor-not-allowed"
        }`}
      >
        {added ? "Added to Cart ✓" : "Add to Cart"}
      </button>

      {added && (
        <button
          onClick={() => router.push("/cart")}
          className="w-full px-4 py-3.5 text-xs uppercase tracking-widest border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
        >
          View Cart →
        </button>
      )}
    </div>
  );
}
