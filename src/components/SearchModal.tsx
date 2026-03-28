'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products, formatPrice, getStartingPrice } from '@/data/products';

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Filter products
  const results = query.trim().length > 0
    ? products.filter(p => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.roastLevel.toLowerCase().includes(q)
        );
      })
    : [];

  const handleResultClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-0 left-0 right-0 z-[201] max-h-[80vh] overflow-hidden">
        <div className="mx-auto max-w-2xl mt-20 mx-4 sm:mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <svg className="w-5 h-5 text-text-light shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="flex-1 text-base text-brand-brown-dark placeholder:text-text-light outline-none bg-transparent"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-text-light hover:text-text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-xs text-text-light bg-bg-light px-2 py-1 rounded font-mono"
            >
              ESC
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[50vh] overflow-y-auto">
            {query.trim().length === 0 ? (
              <div className="px-5 py-8 text-center text-text-light text-sm">
                <p>Nhập tên sản phẩm, dòng cà phê, hoặc từ khóa...</p>
                <div className="flex justify-center gap-2 mt-3">
                  {['Rich', 'Balanced', 'Trust'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1 bg-brand-cream rounded-full text-xs font-semibold text-brand-brown-dark hover:bg-brand-green hover:text-white transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="px-5 py-8 text-center text-text-light text-sm">
                <p>Không tìm thấy sản phẩm nào cho &ldquo;{query}&rdquo;</p>
              </div>
            ) : (
              <div className="p-3">
                {results.map(product => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={handleResultClick}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-brand-cream transition-colors"
                  >
                    <div className="relative w-14 h-18 rounded-lg overflow-hidden shrink-0 bg-brand-cream">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={56}
                        height={72}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-brand-brown-dark text-sm">{product.name}</h4>
                      <p className="text-xs text-text-secondary truncate">{product.tagline} · {product.roastLevel}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs text-text-light">Từ</span>
                      <p className="font-bold text-sm" style={{ color: product.color }}>
                        {formatPrice(getStartingPrice(product))}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
