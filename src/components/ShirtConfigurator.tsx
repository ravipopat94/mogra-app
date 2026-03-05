"use client";

import { useState } from "react";
import {
  COLLAR_STYLES,
  SLEEVE_LENGTHS,
  SHIRT_SIZES,
  STANDARD_PRICE,
  CUSTOM_PRICE,
  WHATSAPP_NUMBER,
  ORDER_EMAIL,
} from "@/data/products";

interface Props {
  fabricName: string;
}

export default function ShirtConfigurator({ fabricName }: Props) {
  const [collar, setCollar] = useState<string | null>(null);
  const [sleeve, setSleeve] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);

  const price = size === "Custom" ? CUSTOM_PRICE : STANDARD_PRICE;

  function buildMessage() {
    return (
      `Hi Mogra! I'd like to order a shirt.\n\n` +
      `Fabric: ${fabricName}\n` +
      `Collar: ${collar ?? "Not selected"}\n` +
      `Sleeve: ${sleeve ?? "Not selected"}\n` +
      `Size: ${size ?? "Not selected"}\n\n` +
      `Please let me know the next steps. Thank you!`
    );
  }

  function whatsappUrl() {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
  }

  function emailUrl() {
    const subject = `Mogra Shirt Order – ${fabricName}`;
    return `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage())}`;
  }

  const optionBase =
    "px-3 py-1.5 text-xs border transition-colors";
  const optionActive = "bg-foreground text-background border-foreground";
  const optionInactive =
    "border-brand-border text-foreground hover:border-foreground";

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
        <p className="mb-2.5 text-xs uppercase tracking-widest text-muted">
          Sleeve Length
        </p>
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
      <div className="mb-8">
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

      {/* ── WhatsApp button ── */}
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-3 flex w-full items-center justify-center gap-2.5 px-4 py-3.5 text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#25D366" }}
      >
        {/* WhatsApp icon */}
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.529 5.845L0 24l6.335-1.5A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.371l-.36-.214-3.724.881.938-3.614-.234-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
        </svg>
        Options selected? Message us on WhatsApp to buy
      </a>

      {/* ── Email button ── */}
      <a
        href={emailUrl()}
        className="flex w-full items-center justify-center gap-2.5 px-4 border border-foreground py-3.5 text-xs uppercase tracking-widest text-foreground transition hover:bg-foreground hover:text-background"
      >
        {/* Email icon */}
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Options selected? Email us to buy
      </a>
    </div>
  );
}
