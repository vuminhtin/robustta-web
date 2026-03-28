'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';
import { formatPrice, getStartingPrice } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [showAdded, setShowAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick add with default options: smallest weight, whole beans
    const defaultPrice = getStartingPrice(product);
    addToCart(product, '200g', 'Hạt nguyên', defaultPrice, 1);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 1500);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-cream">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Letter badge */}
        <div
          className="absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-extrabold text-xl shadow-lg"
          style={{ backgroundColor: product.color }}
        >
          {product.letter}
        </div>

        {/* Quick Add button */}
        <button
          onClick={handleQuickAdd}
          className={`absolute bottom-3 right-3 px-4 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all duration-300 z-10 ${
            showAdded
              ? 'bg-brand-green text-white scale-95'
              : 'bg-white text-brand-brown-dark opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 hover:bg-brand-orange hover:text-white'
          }`}
        >
          {showAdded ? '✓ Đã thêm!' : '+ Mua nhanh'}
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-brand-brown-dark group-hover:text-brand-green transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-text-secondary mt-1">{product.tagline}</p>
        <p className="text-xs text-text-light mt-0.5">{product.roastLevel}</p>

        {/* Price + CTA */}
        <div className="flex items-end justify-between mt-4">
          <div>
            <span className="text-xs text-text-light">Từ</span>
            <span className="block text-lg font-bold" style={{ color: product.color }}>
              {formatPrice(getStartingPrice(product))}
            </span>
          </div>
          <span className="text-sm font-semibold text-brand-green group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            Xem thêm →
          </span>
        </div>
      </div>
    </Link>
  );
}
