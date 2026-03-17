"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  fabricName: string;
  onClose: () => void;
}

export default function StyledModal({ images, fabricName, onClose }: Props) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const wasSwiped = useRef(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")  setCurrent((c) => Math.max(c - 1, 0));
      if (e.key === "ArrowRight") setCurrent((c) => Math.min(c + 1, images.length - 1));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, images.length]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={() => { if (wasSwiped.current) { wasSwiped.current = false; return; } onClose(); }}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; wasSwiped.current = false; }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 50) {
          wasSwiped.current = true;
          if (delta < 0) setCurrent((c) => Math.min(c + 1, images.length - 1));
          else            setCurrent((c) => Math.max(c - 1, 0));
        }
        touchStartX.current = null;
      }}
    >
      {/* Image — rendered first so buttons layer on top */}
      <div
        className="relative max-h-[90vh] max-w-[90vw] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[current]}
          alt={`${fabricName} styled look ${current + 1}`}
          width={900}
          height={1100}
          className="max-h-[88vh] max-w-[88vw] w-auto h-auto object-contain"
        />
      </div>

      {/* Close — large tap target */}
      <button
        className="absolute top-2 right-2 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white text-xl"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>

      {/* Prev — large tap target */}
      {current > 0 && (
        <button
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white text-4xl"
          onClick={(e) => { e.stopPropagation(); setCurrent((c) => c - 1); }}
          aria-label="Previous"
        >
          ‹
        </button>
      )}

      {/* Next — large tap target */}
      {current < images.length - 1 && (
        <button
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white text-4xl"
          onClick={(e) => { e.stopPropagation(); setCurrent((c) => c + 1); }}
          aria-label="Next"
        >
          ›
        </button>
      )}

      {/* Counter */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-xs uppercase tracking-widest text-white/50">
        {current + 1} / {images.length}
      </p>
    </div>
  );
}
