"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { WHATSAPP_NUMBER, CONTACT_EMAIL } from "@/lib/constants";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DISCOUNT_CODES: Record<string, number> = {
  NEWCUSTOMER: 10,
};
const STORAGE_KEY = "mogra_used_discount_emails";

function getUsedEmails(): Record<string, string[]> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function markEmailUsed(code: string, email: string) {
  const used = getUsedEmails();
  used[code] = [...(used[code] ?? []), email.toLowerCase()];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(used));
}

interface Customer {
  name: string; email: string; phone: string;
  addressLine1: string; addressLine2: string;
  city: string; state: string; country: string; postcode: string;
}

function buildOrderMessage(
  items: ReturnType<typeof useCart>["items"],
  subtotal: number,
  customer: Customer,
  discountCode: string,
  discountPct: number,
) {
  const discountAmt = Math.round(subtotal * discountPct / 100);
  const finalTotal  = subtotal - discountAmt;

  const addressLines = [
    customer.addressLine1.trim(),
    customer.addressLine2.trim(),
    [customer.city.trim(), customer.state.trim()].filter(Boolean).join(", "),
    [customer.postcode.trim(), customer.country.trim()].filter(Boolean).join(", "),
  ].filter(Boolean).join("\n           ");

  const lines = items.map((item, i) =>
    `${i + 1}. ${item.fabricName}\n` +
    `   Collar: ${item.collar} | Sleeve: ${item.sleeve} | Size: ${item.size}\n` +
    `   Qty: ${item.quantity} × $${item.price} = $${item.price * item.quantity}`
  );

  return (
    `Hi Mogra! I'd like to place an order.\n\n` +
    `Customer Details:\n` +
    `Name: ${customer.name.trim()}\n` +
    `Email: ${customer.email.trim()}\n` +
    `Phone: ${customer.phone.trim()}\n` +
    `Shipping Address:\n           ${addressLines}\n\n` +
    `Order Summary:\n` +
    `─────────────────────\n` +
    lines.join("\n\n") +
    `\n\n─────────────────────\n` +
    `Subtotal: $${subtotal}\n` +
    (discountPct > 0 ? `Discount (${discountCode}, ${discountPct}% off): -$${discountAmt}\n` : "") +
    `Total: $${finalTotal}\n\n` +
    `Please let me know the next steps. Thank you!`
  );
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  // Customer details
  const [name,         setName]         = useState("");
  const [email,        setEmail]        = useState("");
  const [phone,        setPhone]        = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city,         setCity]         = useState("");
  const [addrState,    setAddrState]    = useState("");
  const [country,      setCountry]      = useState("");
  const [postcode,     setPostcode]     = useState("");

  // Discount
  const [codeInput,      setCodeInput]      = useState("");
  const [discountCode,   setDiscountCode]   = useState("");
  const [discountPct,    setDiscountPct]    = useState(0);
  const [discountError,  setDiscountError]  = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  // Misc
  const [copied, setCopied] = useState(false);

  const discountAmt  = Math.round(totalPrice * discountPct / 100);
  const finalTotal   = totalPrice - discountAmt;
  const customer     = { name, email, phone, addressLine1, addressLine2, city, state: addrState, country, postcode };
  const canSubmit    = name.trim() && EMAIL_RE.test(email) && phone.trim() &&
                       addressLine1.trim() && city.trim() && addrState.trim() && country.trim() && postcode.trim();
  const message      = buildOrderMessage(items, totalPrice, customer, discountCode, discountPct);
  const whatsappUrl  = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const emailUrl     = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Mogra Shirt Order")}&body=${encodeURIComponent(message)}`;

  function applyDiscount() {
    setDiscountError("");
    const code = codeInput.trim().toUpperCase();
    const pct  = DISCOUNT_CODES[code];
    if (!pct) { setDiscountError("Invalid discount code."); return; }
    if (!EMAIL_RE.test(email)) { setDiscountError("Enter a valid email first."); return; }
    const used = getUsedEmails();
    if ((used[code] ?? []).includes(email.toLowerCase())) {
      setDiscountError("This code has already been used with that email."); return;
    }
    setDiscountCode(code);
    setDiscountPct(pct);
    setDiscountApplied(true);
  }

  function removeDiscount() {
    setDiscountCode(""); setDiscountPct(0);
    setDiscountApplied(false); setCodeInput(""); setDiscountError("");
  }

  function handleSubmit() {
    if (discountApplied && discountCode) markEmailUsed(discountCode, email);
  }

  function copyToClipboard() {
    handleSubmit();
    const text = `To: ${CONTACT_EMAIL}\nSubject: Mogra Shirt Order\n\n${message}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const inputCls = "w-full border border-brand-border bg-transparent px-3 py-2.5 text-xs text-foreground placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors";

  if (items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <p className="mb-4 font-serif text-2xl font-light text-foreground">Your cart is empty</p>
          <p className="mb-8 text-xs uppercase tracking-widest text-muted">Add a fabric to get started</p>
          <Link href="/bespoke-shirts" className="text-xs uppercase tracking-widest text-gold hover:underline underline-offset-4 transition-all">
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
            <div className="flex-1">
              <p className="mb-1 text-sm font-medium text-foreground">{item.fabricName}</p>
              <p className="text-xs text-muted">
                {item.collar} collar · {item.sleeve} sleeve · Size {item.size}
              </p>
              {item.size === "Custom" && (
                <p className="mt-1 text-xs text-gold">Custom sizing — share measurements on order</p>
              )}
            </div>
            <div className="flex items-center gap-6 sm:gap-8">
              <div className="flex items-center gap-3">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center border border-brand-border text-foreground hover:border-foreground transition-colors text-sm" aria-label="Decrease">−</button>
                <span className="w-4 text-center text-sm text-foreground">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center border border-brand-border text-foreground hover:border-foreground transition-colors text-sm" aria-label="Increase">+</button>
              </div>
              <p className="w-16 text-right text-sm text-foreground">${item.price * item.quantity}</p>
              <button onClick={() => removeItem(item.id)} className="text-muted hover:text-foreground transition-colors text-xs uppercase tracking-widest" aria-label="Remove item">✕</button>
            </div>
          </div>
        ))}
      </div>

      {/* Discount code */}
      <div className="mb-6">
        <p className="mb-2.5 text-xs uppercase tracking-widest text-muted">Discount Code</p>
        {discountApplied ? (
          <div className="flex items-center justify-between border border-gold/40 px-3 py-2.5">
            <p className="text-xs text-gold uppercase tracking-widest">{discountCode} — {discountPct}% off applied</p>
            <button onClick={removeDiscount} className="text-xs text-muted hover:text-foreground transition-colors uppercase tracking-widest">Remove</button>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <input
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyDiscount()}
                placeholder="Enter code"
                className={inputCls + " flex-1"}
              />
              <button
                onClick={applyDiscount}
                className="px-4 py-2.5 text-xs uppercase tracking-widest border border-brand-border text-foreground hover:border-foreground transition-colors whitespace-nowrap"
              >
                Apply
              </button>
            </div>
            {discountError && <p className="mt-1.5 text-[10px] text-red-500">{discountError}</p>}
          </>
        )}
      </div>

      {/* Totals */}
      <div className="mb-10 border-t border-brand-border pt-5 flex flex-col gap-2">
        {discountApplied && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest text-muted">Subtotal</p>
              <p className="text-sm text-foreground">${totalPrice}.00</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest text-gold">Discount ({discountPct}%)</p>
              <p className="text-sm text-gold">−${discountAmt}.00</p>
            </div>
          </>
        )}
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-muted">Total</p>
          <p className="font-serif text-2xl font-light text-foreground">${finalTotal}.00</p>
        </div>
      </div>

      {/* Customer details */}
      <div className="mb-10">
        <p className="mb-5 text-xs uppercase tracking-widest text-muted">Your Details</p>
        <div className="flex flex-col gap-3">
          <input value={name}    onChange={(e) => setName(e.target.value)}    placeholder="Full name"         maxLength={80}  className={inputCls} />
          <input value={email}   onChange={(e) => { setEmail(e.target.value); if (discountApplied) removeDiscount(); }}
                 placeholder="Email address"     maxLength={120} type="email"  className={inputCls} />
          <input value={phone}        onChange={(e) => setPhone(e.target.value)}        placeholder="Phone number"         maxLength={30}  type="tel"  className={inputCls} />
          <input value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} placeholder="Address line 1"        maxLength={120}             className={inputCls} />
          <input value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} placeholder="Address line 2 (optional)" maxLength={120}          className={inputCls} />
          <div className="grid grid-cols-2 gap-3">
            <input value={city}      onChange={(e) => setCity(e.target.value)}      placeholder="City"             maxLength={80}  className={inputCls} />
            <input value={addrState} onChange={(e) => setAddrState(e.target.value)} placeholder="State / Province" maxLength={80}  className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input value={postcode}  onChange={(e) => setPostcode(e.target.value)}  placeholder="Postcode / ZIP"   maxLength={20}  className={inputCls} />
            <input value={country}   onChange={(e) => setCountry(e.target.value)}   placeholder="Country"          maxLength={60}  className={inputCls} />
          </div>
        </div>
        {!canSubmit && (name || email || phone || addressLine1 || city) && (
          <p className="mt-2 text-[10px] text-muted">Please fill in all fields with a valid email to continue.</p>
        )}
      </div>

      {/* Order note */}
      <p className="mb-8 text-xs leading-relaxed text-muted">
        We&apos;re a made-to-order brand. Once you reach out, we&apos;ll confirm your order details,
        collect measurements if needed, and guide you through the next steps.
      </p>

      {/* Submit buttons */}
      <div className={!canSubmit ? "pointer-events-none opacity-40" : ""}>
        <a
          href={canSubmit ? whatsappUrl : undefined}
          onClick={handleSubmit}
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

        <a
          href={canSubmit ? emailUrl : undefined}
          onClick={handleSubmit}
          className="flex w-full items-center justify-center gap-2.5 px-4 py-4 text-xs uppercase tracking-widest border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Send Order via Email
        </a>
      </div>

      {!canSubmit && (
        <p className="mt-3 text-center text-[10px] uppercase tracking-widest text-muted">
          Fill in your details above to place your order
        </p>
      )}

      {/* Divider */}
      <div className="mt-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-brand-border" />
        <span className="text-xs uppercase tracking-widest text-muted">or</span>
        <div className="h-px flex-1 bg-brand-border" />
      </div>

      {/* Copy to clipboard */}
      <div className="flex flex-col gap-3 mt-4">
        <button
          onClick={copyToClipboard}
          className={`flex w-full items-center justify-center gap-2.5 px-4 py-4 text-xs uppercase tracking-widest border transition-colors ${
            copied ? "border-gold text-gold" : "border-brand-border text-muted hover:border-foreground hover:text-foreground cursor-pointer"
          }`}
        >
          {copied ? <>✓ Copied to clipboard</> : (
            <>
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy order to clipboard
            </>
          )}
        </button>
        <p className="text-center text-xs text-muted">
          Then paste it into a new email and send to{" "}
          <span className="text-foreground select-all font-medium">{CONTACT_EMAIL}</span>
        </p>
      </div>
    </div>
  );
}
