"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { WHATSAPP_NUMBER, ORDER_EMAIL } from "@/data/products";

function buildOrderMessage(items: ReturnType<typeof useCart>["items"], total: number) {
  const lines = items.map((item, i) =>
    `${i + 1}. ${item.fabricName}\n` +
    `   Collar: ${item.collar} | Sleeve: ${item.sleeve} | Size: ${item.size}\n` +
    `   Qty: ${item.quantity} × $${item.price} = $${item.price * item.quantity}`
  );

  return (
    `Hi Mogra! I'd like to place an order.\n\n` +
    `Order Summary:\n` +
    `─────────────────────\n` +
    lines.join("\n\n") +
    `\n\n─────────────────────\n` +
    `Total: $${total}\n\n` +
    `Please let me know the next steps. Thank you!`
  );
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  const [copied, setCopied] = useState(false);

  const message = buildOrderMessage(items, totalPrice);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const emailUrl = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent("Mogra Shirt Order")}&body=${encodeURIComponent(message)}`;

  function copyToClipboard() {
    const text = `To: ${ORDER_EMAIL}\nSubject: Mogra Shirt Order\n\n${message}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  if (items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <p className="mb-4 font-serif text-2xl font-light text-foreground">Your cart is empty</p>
          <p className="mb-8 text-xs uppercase tracking-widest text-muted">Add a fabric to get started</p>
          <Link
            href="/bespoke-shirts"
            className="text-xs uppercase tracking-widest text-gold hover:underline underline-offset-4 transition-all"
          >
            Browse Fabrics →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="mb-2 text-xs uppercase tracking-widest text-muted">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </p>
        <h1 className="font-serif text-4xl font-light tracking-wide text-foreground">Your Cart</h1>
      </div>

      {/* Items */}
      <div className="mb-10 flex flex-col divide-y divide-brand-border border-t border-b border-brand-border">
        {items.map((item) => (
          <div key={item.id} className="py-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

            {/* Item details */}
            <div className="flex-1">
              <p className="mb-1 text-sm font-medium text-foreground">{item.fabricName}</p>
              <p className="text-xs text-muted">
                {item.collar} collar · {item.sleeve} sleeve · Size {item.size}
              </p>
              {item.size === "Custom" && (
                <p className="mt-1 text-xs text-gold">Custom sizing — share measurements on order</p>
              )}
            </div>

            {/* Quantity + price */}
            <div className="flex items-center gap-6 sm:gap-8">
              {/* Quantity control */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="flex h-7 w-7 items-center justify-center border border-brand-border text-foreground hover:border-foreground transition-colors text-sm"
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="w-4 text-center text-sm text-foreground">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="flex h-7 w-7 items-center justify-center border border-brand-border text-foreground hover:border-foreground transition-colors text-sm"
                  aria-label="Increase"
                >
                  +
                </button>
              </div>

              {/* Line total */}
              <p className="w-16 text-right text-sm text-foreground">
                ${item.price * item.quantity}
              </p>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-muted hover:text-foreground transition-colors text-xs uppercase tracking-widest"
                aria-label="Remove item"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order total */}
      <div className="mb-10 flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-muted">Total</p>
        <p className="font-serif text-2xl font-light text-foreground">${totalPrice}.00</p>
      </div>

      {/* Order note */}
      <p className="mb-8 text-xs leading-relaxed text-muted">
        We&apos;re a made-to-order brand. Once you reach out, we&apos;ll confirm your order details,
        collect measurements if needed, and guide you through the next steps.
      </p>

      {/* WhatsApp button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-3 flex w-full items-center justify-center gap-2.5 px-4 py-4 text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#25D366" }}
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.529 5.845L0 24l6.335-1.5A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.371l-.36-.214-3.724.881.938-3.614-.234-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
        </svg>
        Send Order via WhatsApp
      </a>

      {/* Email button */}
      <a
        href={emailUrl}
        className="flex w-full items-center justify-center gap-2.5 px-4 py-4 text-xs uppercase tracking-widest border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
      >
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Send Order via Email
      </a>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-brand-border" />
        <span className="text-xs uppercase tracking-widest text-muted">or</span>
        <div className="h-px flex-1 bg-brand-border" />
      </div>

      {/* Copy to clipboard */}
      <div className="flex flex-col gap-3">
        <button
          onClick={copyToClipboard}
          className={`flex w-full items-center justify-center gap-2.5 px-4 py-4 text-xs uppercase tracking-widest border transition-colors ${
            copied
              ? "border-gold text-gold"
              : "border-brand-border text-muted hover:border-foreground hover:text-foreground cursor-pointer"
          }`}
        >
          {copied ? (
            <>✓ Copied to clipboard</>
          ) : (
            <>
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy order to clipboard
            </>
          )}
        </button>
        <p className="text-center text-xs text-muted">
          Then paste it into a new email and send to{" "}
          <span className="text-foreground select-all font-medium">team@shopmogra.com</span>
        </p>
      </div>
    </div>
  );
}
