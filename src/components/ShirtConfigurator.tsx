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

const COLLAR_INFO: Record<string, { description: string; svg: React.ReactNode }> = {
  "Standard Collar": {
    description: "Classic fold-over collar with pointed tips — the everyday dress shirt look.",
    svg: (
      <svg viewBox="0 0 60 56" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Shirt body */}
        <path d="M 4,54 L 4,26 L 18,14 L 42,14 L 56,26 L 56,54 Z" />
        {/* Center placket from V bottom to hem */}
        <line x1="30" y1="28" x2="30" y2="54" />
        {/* Left collar leaf: neck edge → pointed tip → inner fold → V centre */}
        <path d="M 18,14 L 6,6 L 22,24 L 30,28" />
        {/* Right collar leaf: mirror */}
        <path d="M 42,14 L 54,6 L 38,24 L 30,28" />
        {/* Collar neckband across the back of neck */}
        <path d="M 18,14 Q 30,12 42,14" />
      </svg>
    ),
  },
  "Chinese Collar": {
    description: "A minimal standing band with no fold — clean and modern.",
    svg: (
      <svg viewBox="0 0 60 56" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Shirt body */}
        <path d="M 4,54 L 4,26 L 18,14 L 42,14 L 56,26 L 56,54 Z" />
        {/* Center placket full length */}
        <line x1="30" y1="14" x2="30" y2="54" />
        {/* Left collar band: rises from neckline, curves inward leaving a front gap */}
        <path d="M 22,14 L 22,8 Q 26,6 27,7" />
        {/* Right collar band: mirror */}
        <path d="M 38,14 L 38,8 Q 34,6 33,7" />
        {/* Band base curve across neckline */}
        <path d="M 22,14 Q 30,12 38,14" />
        {/* Button dots down placket */}
        <circle cx="30" cy="22" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="30" cy="32" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="30" cy="42" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  "Cuban Collar": {
    description: "Wide open camp-style collar that lies flat — relaxed and effortless.",
    svg: (
      <svg viewBox="0 0 60 56" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Shirt body */}
        <path d="M 4,54 L 4,26 L 18,14 L 42,14 L 56,26 L 56,54 Z" />
        {/* Center placket — visible only below the deep V opening */}
        <line x1="30" y1="38" x2="30" y2="54" />
        {/* Left wide lapel: shoulder → tip → sweeps to deep V centre */}
        <path d="M 18,14 L 8,8 L 30,38" />
        {/* Right wide lapel: mirror */}
        <path d="M 42,14 L 52,8 L 30,38" />
        {/* Back collar neckline */}
        <path d="M 8,8 Q 30,5 52,8" />
      </svg>
    ),
  },
};

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
  const [showCollarGuide, setShowCollarGuide] = useState(false);

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
        <div className="flex items-center gap-2 mb-2.5">
          <p className="text-xs uppercase tracking-widest text-muted">Collar</p>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCollarGuide((v) => !v)}
              className="flex h-4 w-4 items-center justify-center rounded-full border border-muted text-muted text-[9px] hover:border-foreground hover:text-foreground transition-colors"
              aria-label="Collar style guide"
            >
              ?
            </button>
            {showCollarGuide && (
              <>
                {/* Backdrop — click outside to close */}
                <div className="fixed inset-0 z-10" onClick={() => setShowCollarGuide(false)} />
                {/* Tooltip card */}
                <div className="absolute left-0 top-6 z-20 w-72 bg-background border border-brand-border shadow-md p-4 flex flex-col gap-4">
                  {Object.entries(COLLAR_INFO).map(([name, info]) => (
                    <div key={name} className="flex items-start gap-3">
                      <div className="shrink-0 w-14 h-11 text-foreground">
                        {info.svg}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">{name}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
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
