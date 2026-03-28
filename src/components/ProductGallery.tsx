'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  accentColor: string;
  letter: string;
}

export default function ProductGallery({ images, productName, accentColor, letter }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  }, [isZoomed]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsZoomed(false);
  };

  const goPrev = () => {
    setActiveIndex(i => (i === 0 ? images.length - 1 : i - 1));
    setIsZoomed(false);
  };

  const goNext = () => {
    setActiveIndex(i => (i === images.length - 1 ? 0 : i + 1));
    setIsZoomed(false);
  };

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-brand-cream shadow-md group cursor-zoom-in"
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <Image
          src={images[activeIndex]}
          alt={`${productName} — Ảnh ${activeIndex + 1}`}
          fill
          className={`transition-transform duration-300 ${
            isZoomed ? 'scale-[2.5]' : 'scale-100 object-cover'
          }`}
          style={isZoomed ? {
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            objectFit: 'cover',
          } : undefined}
          priority={activeIndex === 0}
        />

        {/* Letter badge */}
        <div
          className="absolute top-6 left-6 w-16 h-16 rounded-full flex items-center justify-center text-white font-extrabold text-2xl shadow-lg z-10"
          style={{ backgroundColor: accentColor }}
        >
          {letter}
        </div>

        {/* Zoom hint */}
        {!isZoomed && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 z-10">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
            </svg>
            Phóng to
          </div>
        )}

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={e => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white z-10"
              aria-label="Ảnh trước"
            >
              <svg className="w-5 h-5 text-brand-brown-dark" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={e => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white z-10"
              aria-label="Ảnh sau"
            >
              <svg className="w-5 h-5 text-brand-brown-dark" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}

        {/* Dots indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); goToSlide(i); }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === activeIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Ảnh ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                i === activeIndex
                  ? 'border-current opacity-100 shadow-md'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              style={i === activeIndex ? { borderColor: accentColor } : undefined}
            >
              <Image
                src={src}
                alt={`${productName} — Thumbnail ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
