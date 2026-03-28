'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts, blogCategories } from '@/data/blog';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-brand-brown-deep overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/IMG_9020.jpg"
            alt="Blog"
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-brown-deep/80 to-brand-brown-deep" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <span className="text-brand-orange text-sm font-bold uppercase tracking-[0.2em]">
            Kiến thức & Chia sẻ
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 !text-white leading-tight">
            Thân Mến
          </h1>
          <p className="text-white/60 mt-3 text-lg">
            Từ vườn cà phê đến tách cà phê — những điều chúng tôi muốn chia sẻ cùng bạn.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="py-8 bg-white border-b border-border sticky top-20 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {blogCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-brand-green text-white shadow-md'
                    : 'bg-brand-cream text-text-secondary hover:bg-brand-green/10 hover:text-brand-green'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-12 bg-bg-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 text-text-light">
              <p>Chưa có bài viết nào trong danh mục này.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    i === 0 && activeCategory === 'all' ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <div className={`relative overflow-hidden bg-brand-cream ${
                    i === 0 && activeCategory === 'all' ? 'aspect-[16/9]' : 'aspect-[4/3]'
                  }`}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-green text-white text-xs font-bold">
                      {post.categoryLabel}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className={`font-extrabold text-brand-brown-dark group-hover:text-brand-green transition-colors ${
                      i === 0 && activeCategory === 'all' ? 'text-xl sm:text-2xl' : 'text-lg'
                    }`}>
                      {post.title}
                    </h2>
                    <p className="text-sm text-text-secondary mt-2 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3 mt-4 text-xs text-text-light">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>📖 {post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-brand-cream">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h2 className="text-2xl font-extrabold text-brand-brown-dark">Đăng ký nhận bài viết mới</h2>
          <p className="text-text-secondary mt-2 text-sm">Kiến thức cà phê, khuyến mãi, và những câu chuyện mới — gửi đến email của bạn.</p>
          <div className="mt-6 flex gap-2">
            <input
              type="email"
              placeholder="Email của bạn..."
              className="flex-1 px-4 py-3 rounded-full border border-border text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none"
            />
            <button className="px-6 py-3 rounded-full bg-brand-green text-white font-bold text-sm hover:bg-brand-green-light transition-colors hover:shadow-md">
              Đăng ký
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
