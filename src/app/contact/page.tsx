"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Connect to a form handler (e.g. Resend, Formspree, etc.)
    setSubmitted(true);
  }

  return (
    <div className="flex-1 mx-auto max-w-7xl w-full px-8 py-20">
      <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">

        {/* Left: Info */}
        <div>
          <p className="mb-4 text-xs uppercase tracking-widest text-muted">
            We'd love to hear from you
          </p>
          <h1 className="mb-10 font-serif text-5xl font-light tracking-wide text-foreground">
            Contact Us
          </h1>
          <p className="mb-14 text-sm leading-relaxed text-muted max-w-sm">
            Have a question about sizing, an order, or a collaboration? Reach
            out — our team responds within 24 hours.
          </p>

          <div className="flex flex-col gap-8">
            <div>
              <p className="mb-1.5 text-xs uppercase tracking-widest text-gold">Email</p>
              <p className="text-sm text-foreground">hello@mogra.in</p>
            </div>
            <div>
              <p className="mb-1.5 text-xs uppercase tracking-widest text-gold">Phone</p>
              <p className="text-sm text-foreground">+91 98765 43210</p>
            </div>
            <div>
              <p className="mb-1.5 text-xs uppercase tracking-widest text-gold">Hours</p>
              <p className="text-sm text-foreground">Monday – Saturday</p>
              <p className="text-sm text-muted">10:00 am – 6:00 pm IST</p>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div>
          {submitted ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mb-6 text-3xl text-gold">✓</div>
                <h2 className="mb-3 font-serif text-2xl font-light text-foreground">
                  Message Sent
                </h2>
                <p className="text-sm text-muted">
                  Thank you for reaching out. We&apos;ll be in touch shortly.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-muted">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full border border-brand-border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-muted">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full border border-brand-border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-muted">
                  Subject
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full border border-brand-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-gold transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option>Order enquiry</option>
                  <option>Sizing help</option>
                  <option>Returns &amp; exchanges</option>
                  <option>Collaboration</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-muted">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us how we can help..."
                  className="w-full resize-none border border-brand-border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-gold transition-colors"
                />
              </div>

              <button
                type="submit"
                className="border border-foreground bg-foreground py-4 text-xs uppercase tracking-widest text-background transition hover:bg-transparent hover:text-foreground"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
