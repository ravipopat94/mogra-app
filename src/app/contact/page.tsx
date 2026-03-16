"use client";

import { useState } from "react";
import { WHATSAPP_NUMBER, CONTACT_EMAIL } from "@/lib/constants";

function buildMessage(form: { name: string; email: string; subject: string; message: string }) {
  return (
    `Hi Mogra! I'd like to get in touch.\n\n` +
    `Name: ${form.name.trim()}\n` +
    `Email: ${form.email.trim()}\n` +
    `Subject: ${form.subject}\n\n` +
    `Message:\n${form.message.trim()}`
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [copied, setCopied] = useState(false);

  function copyToClipboard() {
    const text = `To: ${CONTACT_EMAIL}\nSubject: Mogra Enquiry: ${form.subject}\n\n${buildMessage(form)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const canSend =
    form.name.trim() &&
    EMAIL_RE.test(form.email.trim()) &&
    form.subject &&
    form.message.trim();
  const message = buildMessage(form);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const emailUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Mogra Enquiry: ${form.subject}`)}&body=${encodeURIComponent(message)}`;

  return (
    <div className="flex-1 mx-auto max-w-2xl w-full px-4 sm:px-8 py-12 sm:py-20">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-4 text-xs uppercase tracking-widest text-muted">
          We'd love to hear from you
        </p>
        <h1 className="font-serif text-5xl font-light tracking-wide text-foreground">
          Contact Us
        </h1>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-muted">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              maxLength={60}
              className="w-full border border-brand-border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-muted">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              maxLength={120}
              className="w-full border border-brand-border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-gold transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-muted">Subject</label>
          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border border-brand-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-gold transition-colors"
          >
            <option value="">Select a subject</option>
            <option>Order enquiry</option>
            <option>Sizing help</option>
            <option>Collaboration</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-muted">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            placeholder="Tell us how we can help..."
            maxLength={2000}
            className="w-full resize-none border border-brand-border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-gold transition-colors"
          />
        </div>

        {!canSend && (
          <p className="text-xs text-muted">Please fill in all fields to continue.</p>
        )}

        {/* WhatsApp button */}
        <a
          href={canSend ? whatsappUrl : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!canSend}
          className={`flex w-full items-center justify-center gap-2.5 px-4 py-4 text-xs uppercase tracking-widest text-white transition-opacity ${
            canSend ? "hover:opacity-90 cursor-pointer" : "opacity-40 pointer-events-none"
          }`}
          style={{ backgroundColor: "#25D366" }}
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.529 5.845L0 24l6.335-1.5A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.371l-.36-.214-3.724.881.938-3.614-.234-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
          </svg>
          Send your message via WhatsApp
        </a>

        {/* Email button */}
        <a
          href={canSend ? emailUrl : undefined}
          aria-disabled={!canSend}
          className={`flex w-full items-center justify-center gap-2.5 px-4 py-4 text-xs uppercase tracking-widest border border-foreground text-foreground transition-colors ${
            canSend ? "hover:bg-foreground hover:text-background cursor-pointer" : "opacity-40 pointer-events-none"
          }`}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Send your message via Email
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
            disabled={!canSend}
            className={`flex w-full items-center justify-center gap-2.5 px-4 py-4 text-xs uppercase tracking-widest border transition-colors ${
              copied
                ? "border-gold text-gold"
                : canSend
                ? "border-brand-border text-muted hover:border-foreground hover:text-foreground cursor-pointer"
                : "border-brand-border text-muted opacity-40 cursor-not-allowed"
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
                Copy message to clipboard
              </>
            )}
          </button>
          {canSend && (
            <p className="text-center text-xs text-muted">
              Then paste it into a new email and send to{" "}
              <span className="text-foreground select-all font-medium">team@shopmogra.com</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
