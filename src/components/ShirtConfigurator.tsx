"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  COLLAR_STYLES,
  SLEEVE_LENGTHS,
  SHIRT_SIZES,
  STANDARD_PRICE,
  CUSTOM_PRICE,
} from "@/data/products";
import { useCart } from "@/context/CartContext";

const COLLAR_INFO: Record<string, { description: string; image: string }> = {
  "Standard Collar": {
    description: "Classic fold-over collar with pointed tips — the everyday dress shirt look.",
    image: "/collars/standard-collar.png",
  },
  "Chinese Collar": {
    description: "A minimal standing band with no fold — clean and modern.",
    image: "/collars/chinese-collar.png",
  },
  "Cuban Collar": {
    description: "Wide open camp-style collar that lies flat — relaxed and effortless.",
    image: "/collars/cuban-collar.png",
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
  const collarGuideRef = useRef<HTMLDivElement>(null);

  // Close tooltip when tapping outside (mobile)
  useEffect(() => {
    if (!showCollarGuide) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (!collarGuideRef.current?.contains(e.target as Node)) {
        setShowCollarGuide(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [showCollarGuide]);

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
      {/* ── Collar ── */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2.5">
          <p className="text-xs uppercase tracking-widest text-muted">Collar</p>
          <div
            ref={collarGuideRef}
            className="relative"
            onMouseEnter={() => setShowCollarGuide(true)}
            onMouseLeave={() => setShowCollarGuide(false)}
          >
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setShowCollarGuide((v) => !v); }}
              className="flex h-4 w-4 items-center justify-center rounded-full border border-muted text-muted text-[9px] hover:border-foreground hover:text-foreground transition-colors"
              aria-label="Collar style guide"
            >
              ?
            </button>
            {showCollarGuide && (
              <div className="absolute left-0 top-6 z-20 w-80 bg-background border border-brand-border shadow-md p-4 flex flex-col gap-5">
                {Object.entries(COLLAR_INFO).map(([name, info]) => (
                  <div key={name} className="flex items-center gap-4">
                    <div className="shrink-0 w-20 h-20 overflow-hidden">
                      <Image
                        src={info.image}
                        alt={name}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain scale-[1.8]"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">{name}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
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
