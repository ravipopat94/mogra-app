"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-brand-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

        {/* Flower icon — cropped from full logo via background-image, links to home */}
        <Link href="/" aria-label="Mogra Home" className="flex-shrink-0">
          <div
            style={{
              width: 42,
              height: 46,
              backgroundImage: "url(/logo.png)",
              backgroundSize: "300% auto",
              backgroundPosition: "50% 8%",
              backgroundRepeat: "no-repeat",
              mixBlendMode: "multiply",
            }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-10 md:flex">
          <Link
            href="/"
            className="text-xs tracking-widest uppercase text-foreground hover:text-gold transition-colors"
          >
            Home
          </Link>

          {/* Product Catalog with dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCatalogOpen(true)}
            onMouseLeave={() => setCatalogOpen(false)}
          >
            <Link
              href="/catalog"
              className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-foreground hover:text-gold transition-colors"
            >
              Product Catalog
              <svg
                className={`w-2.5 h-2.5 transition-transform duration-200 ${
                  catalogOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>

            {/* Dropdown */}
            {catalogOpen && (
              <div className="absolute top-full left-0 pt-3 w-36">
                <div className="bg-background border border-brand-border shadow-sm">
                  <Link
                    href="/catalog/women"
                    className="block px-5 py-3 text-xs tracking-widest uppercase text-foreground hover:text-gold transition-colors"
                  >
                    Women
                  </Link>
                  <Link
                    href="/catalog/men"
                    className="block px-5 py-3 text-xs tracking-widest uppercase text-foreground hover:text-gold transition-colors border-t border-brand-border"
                  >
                    Men
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/testimonials"
            className="text-xs tracking-widest uppercase text-foreground hover:text-gold transition-colors"
          >
            Testimonials
          </Link>

          <Link
            href="/contact"
            className="text-xs tracking-widest uppercase text-foreground hover:text-gold transition-colors"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`h-px w-6 bg-foreground transition-all duration-300 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-all duration-300 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-brand-border bg-background px-8 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              className="text-xs tracking-widest uppercase text-foreground hover:text-gold transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <div className="flex flex-col gap-3">
              <span className="text-xs tracking-widest uppercase text-foreground">
                Product Catalog
              </span>
              <Link
                href="/catalog/women"
                className="pl-4 text-xs tracking-widest uppercase text-muted hover:text-gold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Women
              </Link>
              <Link
                href="/catalog/men"
                className="pl-4 text-xs tracking-widest uppercase text-muted hover:text-gold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Men
              </Link>
            </div>
            <Link
              href="/testimonials"
              className="text-xs tracking-widest uppercase text-foreground hover:text-gold transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="/contact"
              className="text-xs tracking-widest uppercase text-foreground hover:text-gold transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
