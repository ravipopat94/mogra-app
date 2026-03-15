"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-brand-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

        {/* Home logo */}
        <Link href="/" aria-label="Mogra Home" className="flex-shrink-0">
          <Image src="/logo-icon.png" alt="Mogra" width={80} height={80} className="w-8 h-8 object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-10 md:flex">
          <Link
            href="/"
            className="text-xs tracking-widest uppercase text-foreground hover:text-gold transition-colors"
          >
            Home
          </Link>

          <Link
            href="/catalog/men"
            className="text-xs tracking-widest uppercase text-foreground hover:text-gold transition-colors"
          >
            Bespoke Shirts
          </Link>

          <Link
            href="/testimonials"
            className="text-xs tracking-widest uppercase text-foreground hover:text-gold transition-colors"
          >
            Mogra Community
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
            <Link
              href="/catalog/men"
              className="text-xs tracking-widest uppercase text-foreground hover:text-gold transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Bespoke Shirts
            </Link>
            <Link
              href="/testimonials"
              className="text-xs tracking-widest uppercase text-foreground hover:text-gold transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Mogra Community
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
