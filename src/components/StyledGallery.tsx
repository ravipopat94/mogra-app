"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface StyledGalleryProps {
  images: string[];
  fabricName: string;
}

export default function StyledGallery({ images, fabricName }: StyledGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);
  const prev = useCallback(() => setSelectedIndex(i => i !== null ? (i - 1 + images.length) % images.length : null), [images.length]);
  const next = useCallback(() => setSelectedIndex(i => i !== null ? (i + 1) % images.length : null), [images.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, close, prev, next]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedIndex]);

  return (
    <>
      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((src, i) => (
          <div
            key={i}
            className="break-inside-avoid overflow-hidden cursor-zoom-in"
            onClick={() => setSelectedIndex(i)}
          >
            <Image
              src={src}
              alt={`${fabricName} styled look ${i + 1}`}
              width={800}
              height={1000}
              className="w-full object-cover transition-opacity duration-200 hover:opacity-85"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-5 right-5 text-white/60 hover:text-white text-xs uppercase tracking-widest transition-colors"
          >
            ✕ close
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 sm:left-8 text-white/60 hover:text-white text-2xl transition-colors select-none"
            >
              ←
            </button>
          )}

          {/* Image — click on it does nothing (stopPropagation), click outside closes */}
          <div
            className="relative max-h-[88vh] max-w-[88vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]}
              alt={`${fabricName} styled look ${selectedIndex + 1}`}
              width={1200}
              height={1600}
              className="max-h-[88vh] max-w-[88vw] object-contain"
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 sm:right-8 text-white/60 hover:text-white text-2xl transition-colors select-none"
            >
              →
            </button>
          )}

          {/* Counter */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest">
            {selectedIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
