"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: Props) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  // Lightbox keyboard + scroll lock
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, current]);

  return (
    <>
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div
        className="relative aspect-square lg:aspect-[4/5] overflow-hidden cursor-zoom-in"
        style={{ backgroundColor: "#e5dfd4" }}
        onClick={() => setLightboxOpen(true)}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const delta = e.changedTouches[0].clientX - touchStartX.current;
          if (delta > 50) prev();
          else if (delta < -50) next();
          touchStartX.current = null;
        }}
      >
        <Image
          src={images[current]}
          alt={`${alt} – view ${current + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />

        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center border border-brand-border bg-background/80 text-foreground transition hover:bg-background"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center border border-brand-border bg-background/80 text-foreground transition hover:bg-background"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-square w-16 shrink-0 overflow-hidden transition ${
                i === current
                  ? "border-2 border-gold"
                  : "border border-brand-border opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>

      {/* Lightbox */}

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[current]}
              alt={`${alt} – view ${current + 1}`}
              width={1200}
              height={1500}
              className="max-h-[88vh] max-w-[88vw] w-auto h-auto object-contain"
            />
          </div>

          {/* Close */}
          <button
            className="absolute top-2 right-2 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white text-xl"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Prev */}
          {images.length > 1 && current > 0 && (
            <button
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white text-4xl"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              ‹
            </button>
          )}

          {/* Next */}
          {images.length > 1 && current < images.length - 1 && (
            <button
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white text-4xl"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              ›
            </button>
          )}

          {images.length > 1 && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-xs uppercase tracking-widest text-white/50">
              {current + 1} / {images.length}
            </p>
          )}
        </div>
      )}
    </>
  );
}
