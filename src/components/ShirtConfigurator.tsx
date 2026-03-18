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
import SizeGuideModal from "@/components/SizeGuideModal";

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
  configImages?: Record<string, string>;
}

export default function ShirtConfigurator({ fabricName, fabricSlug, configImages }: Props) {
  const [collar, setCollar] = useState<string | null>(null);
  const [sleeve, setSleeve] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showCollarGuide, setShowCollarGuide] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showConfigPreview, setShowConfigPreview] = useState(false);
  const [showConfigHint, setShowConfigHint] = useState(false);
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

  // Config preview lightbox — keyboard + scroll lock
  useEffect(() => {
    if (!showConfigPreview) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setShowConfigPreview(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [showConfigPreview]);

  const configImage = collar && sleeve ? configImages?.[`${collar}|${sleeve}`] : undefined;

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
      {/* ── Starting price (until all options chosen) ── */}
      {!canAdd && (
        <p className="mb-5 text-xs uppercase tracking-widest text-muted">
          Starting at <span className="text-foreground">${STANDARD_PRICE}</span>
        </p>
      )}

      {/* ── See it styled ── */}
      {configImages && (
        <div className="mb-5">
          <button
            type="button"
            onClick={() => {
              if (configImage) {
                setShowConfigHint(false);
                setShowConfigPreview(true);
              } else {
                setShowConfigHint(true);
              }
            }}
            className={`text-[10px] uppercase tracking-widest transition-colors ${
              configImage
                ? "text-muted hover:text-gold"
                : "inline-block border border-muted/30 text-muted/50 px-3 py-1.5 hover:border-muted/50 hover:text-muted/70"
            }`}
          >
            {configImage ? "See it styled →" : "Want to see it styled? Select your collar style & sleeve length"}
          </button>
          {showConfigHint && !configImage && (
            <p className="mt-1 text-[10px] text-muted">
              Select your collar style &amp; sleeve length to preview.
            </p>
          )}
        </div>
      )}

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
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-xs uppercase tracking-widest text-muted">Size</p>
          <button
            type="button"
            onClick={() => setShowSizeGuide(true)}
            className="text-[10px] uppercase tracking-widest text-muted hover:text-gold transition-colors"
          >
            Size guide
          </button>
        </div>
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

      {/* ── Price summary (once all options chosen) ── */}
      {canAdd ? (
        <div className="mb-5 flex items-center justify-between border-t border-brand-border pt-5">
          <p className="text-xs uppercase tracking-widest text-muted">
            {quantity > 1 ? `${quantity} × $${price}` : "Price"}
          </p>
          <p className="font-serif text-2xl font-light text-foreground">
            ${price * quantity}.00
          </p>
        </div>
      ) : null}

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

      {showSizeGuide && <SizeGuideModal onClose={() => setShowSizeGuide(false)} />}

      {/* ── Config preview lightbox ── */}
      {showConfigPreview && configImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setShowConfigPreview(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={configImage}
              alt={`${fabricName} — ${collar} ${sleeve} sleeve`}
              width={900}
              height={1100}
              className="max-h-[88vh] max-w-[88vw] w-auto h-auto object-contain"
            />
          </div>
          <button
            className="absolute top-2 right-2 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white text-xl"
            onClick={() => setShowConfigPreview(false)}
            aria-label="Close"
          >
            ✕
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-xs uppercase tracking-widest text-white/50 text-center">
            {fabricName} — {collar}, {sleeve} sleeve
          </p>
        </div>
      )}
    </div>
  );
}
