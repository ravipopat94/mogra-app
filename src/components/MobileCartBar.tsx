"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function MobileCartBar() {
  const { totalItems } = useCart();

  return (
    <div className="fixed bottom-6 right-4 z-40 md:hidden">
      <Link
        href="/cart"
        aria-label={`View cart${totalItems > 0 ? `, ${totalItems} items` : ""}`}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background shadow-lg hover:bg-gold transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-white text-[9px] font-medium border-2 border-background">
            {totalItems}
          </span>
        )}
      </Link>
    </div>
  );
}
