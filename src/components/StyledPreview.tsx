"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  fabricName: string;
}

export default function StyledPreview({ images, fabricName }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const wasSwiped = useRef(false);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight")
        setSelectedIndex((i) => (i !== null ? Math.min(i + 1, images.length - 1) : null));
      if (e.key === "ArrowLeft")
        setSelectedIndex((i) => (i !== null ? Math.max(i - 1, 0) : null));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, images.length]);

  return (
    <>
      <div className="mb-6">
        <p className="mb-2 text-xs uppercase tracking-widest text-muted">As worn</p>
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className="relative w-20 h-20 overflow-hidden border border-brand-border hover:border-foreground transition-colors"
              aria-label={`View styled look ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${fabricName} styled look ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => { if (wasSwiped.current) { wasSwiped.current = false; return; } setSelectedIndex(null); }}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; wasSwiped.current = false; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(delta) > 50) {
              wasSwiped.current = true;
              if (delta < 0) setSelectedIndex((i) => (i !== null ? Math.min(i + 1, images.length - 1) : null));
              else setSelectedIndex((i) => (i !== null ? Math.max(i - 1, 0) : null));
            }
            touchStartX.current = null;
          }}
        >
          {/* Image — rendered first so buttons layer on top */}
          <div
            className="relative max-h-[90vh] max-w-[90vw] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]}
              alt={`${fabricName} styled look ${selectedIndex + 1}`}
              width={900}
              height={1100}
              className="max-h-[88vh] max-w-[88vw] w-auto h-auto object-contain"
            />
          </div>

          {/* Close — large tap target */}
          <button
            className="absolute top-2 right-2 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white text-xl"
            onClick={() => setSelectedIndex(null)}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Prev — large tap target */}
          {selectedIndex > 0 && (
            <button
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white text-4xl"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex((i) => (i !== null ? i - 1 : null)); }}
              aria-label="Previous"
            >
              ‹
            </button>
          )}

          {/* Next — large tap target */}
          {selectedIndex < images.length - 1 && (
            <button
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white text-4xl"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex((i) => (i !== null ? i + 1 : null)); }}
              aria-label="Next"
            >
              ›
            </button>
          )}

          {/* Counter */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-xs uppercase tracking-widest text-white/50">
            {selectedIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
