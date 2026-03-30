'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { giftSets } from '@/data/giftsets';
import { formatPrice } from '@/data/products';

export default function GiftSetsPage() {
  const [selectedSet, setSelectedSet] = useState<string | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-brand-brown-deep overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/RobustTA-T.jpg"
            alt="Set quà"
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-brown-deep/80 to-brand-brown-deep" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <span className="text-brand-orange text-sm font-bold uppercase tracking-[0.2em]">
            Quà tặng ý nghĩa
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 !text-white leading-tight">
            Set Quà RobustTA
          </h1>
          <p className="text-white/60 mt-3 text-lg">
            Hơn cả cà phê — mỗi hộp quà gói ghém cả sự gắn kết.
          </p>
        </div>
      </section>

      {/* Gift sets */}
      <section className="py-16 bg-bg-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {giftSets.map(set => (
              <div
                key={set.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border-2 ${
                  selectedSet === set.id ? 'border-brand-green' : 'border-transparent hover:border-brand-green/20'
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-cream">
                  <Image
                    src={set.image}
                    alt={set.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-brand-orange text-white text-xs font-bold">
                    {set.occasion}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-extrabold text-brand-brown-dark">{set.name}</h3>
                  <p className="text-sm text-text-secondary mt-1">{set.tagline}</p>
                  <p className="text-sm text-text-secondary mt-3 leading-relaxed">{set.description}</p>

                  {/* Items list */}
                  <div className="mt-4 p-4 bg-brand-cream/50 rounded-xl">
                    <h4 className="text-xs font-bold text-brand-brown-dark uppercase tracking-wider mb-2">
                      Bao gồm:
                    </h4>
                    <ul className="space-y-1.5">
                      {set.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="text-brand-green mt-0.5">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price + CTA */}
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-text-light">Giá set quà</span>
                      <p className="text-2xl font-extrabold text-brand-orange">
                        {formatPrice(set.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedSet(set.id)}
                      className="px-6 py-3 rounded-full bg-brand-green text-white font-bold text-sm hover:bg-brand-green-light transition-all hover:shadow-md"
                    >
                      Đặt hàng
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom order banner */}
          <div className="mt-16 bg-gradient-to-r from-brand-green to-brand-green-light rounded-2xl p-8 sm:p-12 text-center text-white">
            <h3 className="text-2xl font-extrabold">Đặt set quà theo yêu cầu?</h3>
            <p className="text-white/80 mt-2 max-w-xl mx-auto">
              In logo doanh nghiệp, chọn sản phẩm riêng, thiết kế hộp quà độc quyền — liên hệ để được tư vấn.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <a
                href="https://zalo.me/0889999022"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-brand-green font-bold px-6 py-3 rounded-full hover:shadow-lg transition-all"
              >
                💬 Chat Zalo
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white/50 hover:border-white text-white font-bold px-6 py-3 rounded-full transition-all"
              >
                📧 Liên hệ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
