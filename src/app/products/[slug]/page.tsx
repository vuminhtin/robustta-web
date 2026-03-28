'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products, getProductBySlug, getVariantPrice, formatPrice, WEIGHTS, GRINDS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductGallery from '@/components/ProductGallery';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addToCart } = useCart();

  const [selectedWeight, setSelectedWeight] = useState<string>(WEIGHTS[0]);
  const [selectedGrind, setSelectedGrind] = useState<string>(GRINDS[0]);
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);

  if (!product) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-2xl font-bold text-brand-brown-dark">Không tìm thấy sản phẩm</h1>
        <Link href="/products" className="mt-4 inline-block text-brand-green font-semibold hover:underline">
          ← Quay lại sản phẩm
        </Link>
      </div>
    );
  }

  const currentPrice = getVariantPrice(product, selectedWeight, selectedGrind);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, selectedGrind, currentPrice, quantity);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  const tasteLabels = [
    { key: 'body' as const, label: 'Body (Đậm)' },
    { key: 'bitter' as const, label: 'Đắng' },
    { key: 'sweet' as const, label: 'Ngọt' },
    { key: 'aroma' as const, label: 'Hương thơm' },
  ];

  // Get other products for cross-sell
  const otherProducts = products.filter(p => p.id !== product.id);

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-text-light">
          <Link href="/" className="hover:text-brand-green transition-colors">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-brand-green transition-colors">Sản phẩm</Link>
          <span className="mx-2">/</span>
          <span className="text-text-primary font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <ProductGallery
            images={product.images}
            productName={product.name}
            accentColor={product.color}
            letter={product.letter}
          />

          {/* Product Info */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: product.color }}>
              {product.roastLevel}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-brown-dark mt-2">
              {product.name}
            </h1>
            <p className="text-lg text-text-secondary mt-1">{product.tagline}</p>
            <p className="text-text-secondary mt-4 leading-relaxed">{product.description}</p>

            {/* Taste Profile */}
            <div className="mt-8 p-5 bg-brand-cream/50 rounded-xl">
              <h3 className="text-sm font-bold text-brand-brown-dark uppercase tracking-wider mb-4">
                Hồ Sơ Hương Vị
              </h3>
              <div className="space-y-3">
                {tasteLabels.map(({ key, label }) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-xs text-text-secondary w-24 shrink-0">{label}</span>
                    <div className="flex-1 h-2.5 bg-white rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${product.taste[key] * 10}%`,
                          backgroundColor: product.color,
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold w-6 text-right" style={{ color: product.color }}>
                      {product.taste[key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weight Selector */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-brand-brown-dark mb-3">Trọng lượng</h3>
              <div className="flex flex-wrap gap-2">
                {WEIGHTS.map(weight => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all ${
                      selectedWeight === weight
                        ? 'border-brand-green bg-brand-green text-white'
                        : 'border-border text-text-secondary hover:border-brand-green/40'
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Grind Selector */}
            <div className="mt-5">
              <h3 className="text-sm font-bold text-brand-brown-dark mb-3">Kiểu xay</h3>
              <div className="flex flex-wrap gap-2">
                {GRINDS.map(grind => (
                  <button
                    key={grind}
                    onClick={() => setSelectedGrind(grind)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all ${
                      selectedGrind === grind
                        ? 'border-brand-green bg-brand-green text-white'
                        : 'border-border text-text-secondary hover:border-brand-green/40'
                    }`}
                  >
                    {grind}
                  </button>
                ))}
              </div>
            </div>

            {/* Price + Quantity + Add to Cart */}
            <div className="mt-8 p-6 bg-white rounded-xl border border-border shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-xs text-text-light">Giá</span>
                  <div className="text-3xl font-extrabold" style={{ color: product.color }}>
                    {formatPrice(currentPrice)}
                  </div>
                </div>
                <div className="flex items-center gap-3 border border-border rounded-full">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg font-bold text-text-secondary hover:text-brand-green transition-colors"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-bold text-brand-brown-dark">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-lg font-bold text-text-secondary hover:text-brand-green transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-full font-bold text-white text-base transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                style={{ backgroundColor: showAdded ? '#2B4D40' : product.color }}
              >
                {showAdded ? '✓ Đã thêm vào giỏ!' : 'Thêm vào giỏ hàng'}
              </button>
            </div>

            {/* Brewing Tip */}
            <div className="mt-6 p-4 bg-brand-teal-light/30 rounded-xl border border-brand-teal-light">
              <h4 className="text-sm font-bold text-brand-green mb-2">💡 Gợi ý pha chế</h4>
              <p className="text-sm text-text-secondary leading-relaxed">{product.brewingTip}</p>
            </div>
          </div>
        </div>

        {/* Other Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-extrabold text-brand-brown-dark mb-8">Sản phẩm khác</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {otherProducts.map(p => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="group flex items-center gap-6 bg-white rounded-xl p-4 border border-border hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className="relative w-24 h-32 rounded-lg overflow-hidden shrink-0">
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-brown-dark group-hover:text-brand-green transition-colors">{p.name}</h3>
                  <p className="text-sm text-text-secondary mt-1">{p.tagline}</p>
                  <p className="text-sm font-bold mt-2" style={{ color: p.color }}>
                    Từ {formatPrice(Math.min(...p.variants.map(v => v.price)))}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
