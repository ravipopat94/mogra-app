"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-brand-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

        {/* Home icon */}
        <Link href="/" aria-label="Mogra Home" className="flex-shrink-0 text-foreground hover:text-gold transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m-6 0h8" />
          </svg>
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
                    href="/catalog/men"
                    className="block px-5 py-3 text-xs tracking-widest uppercase text-foreground hover:text-gold transition-colors"
                  >
                    Men
                  </Link>
                  <Link
                    href="/catalog/women"
                    className="block px-5 py-3 text-xs tracking-widest uppercase text-foreground hover:text-gold transition-colors border-t border-brand-border"
                  >
                    Women
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

        {/* Cart icon */}
        <Link href="/cart" aria-label="View cart" className="relative flex-shrink-0 text-foreground hover:text-gold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-white text-[9px] font-medium">
              {totalItems}
            </span>
          )}
        </Link>

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
                href="/catalog/men"
                className="pl-4 text-xs tracking-widest uppercase text-muted hover:text-gold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Men
              </Link>
              <Link
                href="/catalog/women"
                className="pl-4 text-xs tracking-widest uppercase text-muted hover:text-gold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Women
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
