'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-32 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-2xl font-bold text-brand-brown-dark">Giỏ hàng trống</h1>
        <p className="text-text-secondary mt-2">Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 mt-8 bg-brand-green hover:bg-brand-green-light text-white font-bold px-8 py-4 rounded-full transition-all hover:shadow-lg"
        >
          Xem sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-brand-brown-dark">Giỏ hàng</h1>
          <button
            onClick={clearCart}
            className="text-sm text-text-light hover:text-red-500 transition-colors"
          >
            Xóa tất cả
          </button>
        </div>

        {/* Items */}
        <div className="space-y-4">
          {items.map(item => {
            const key = `${item.productId}-${item.weight}-${item.grind}`;
            return (
              <div key={key} className="flex items-center gap-4 bg-white rounded-xl p-4 border border-border shadow-sm">
                {/* Image */}
                <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-brand-cream">
                  <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-brand-brown-dark truncate">{item.productName}</h3>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {item.weight} · {item.grind}
                  </p>
                  <p className="text-sm font-bold text-brand-orange mt-1">
                    {formatPrice(item.price)}
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2 border border-border rounded-full shrink-0">
                  <button
                    onClick={() => updateQuantity(item.productId, item.weight, item.grind, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-sm font-bold text-text-secondary hover:text-brand-green transition-colors"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-brand-brown-dark">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.weight, item.grind, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-sm font-bold text-text-secondary hover:text-brand-green transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Line total */}
                <div className="text-right shrink-0 min-w-[90px]">
                  <p className="font-bold text-brand-brown-dark">{formatPrice(item.price * item.quantity)}</p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.productId, item.weight, item.grind)}
                  className="shrink-0 text-text-light hover:text-red-500 transition-colors"
                  aria-label="Xóa"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-secondary">Tạm tính</span>
            <span className="font-bold text-brand-brown-dark text-lg">{formatPrice(subtotal)}</span>
          </div>
          <p className="text-xs text-text-light mb-6">
            {subtotal >= 500000 ? '🎉 Bạn được miễn phí giao hàng!' : `Mua thêm ${formatPrice(500000 - subtotal)} để được free ship`}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/products"
              className="flex-1 py-3.5 text-center rounded-full border-2 border-border font-semibold text-text-secondary hover:border-brand-green hover:text-brand-green transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
            <Link
              href="/checkout"
              className="flex-1 py-3.5 text-center rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold transition-all hover:shadow-lg"
            >
              Thanh toán →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
