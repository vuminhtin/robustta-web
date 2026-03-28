'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPostBySlug, blogPosts } from '@/data/blog';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-2xl font-bold text-brand-brown-dark">Bài viết không tồn tại</h1>
        <Link href="/blog" className="mt-4 inline-block text-brand-green font-semibold hover:underline">
          ← Quay lại Blog
        </Link>
      </div>
    );
  }

  const otherPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 bg-brand-brown-deep overflow-hidden">
        <div className="absolute inset-0">
          <Image src={post.image} alt={post.title} fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-brown-deep/80 to-brand-brown-deep" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-green text-white text-xs font-bold mb-4">
            {post.categoryLabel}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white !text-white leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 mt-5 text-white/50 text-sm">
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>📖 {post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-text-light">
            <Link href="/" className="hover:text-brand-green transition-colors">Trang chủ</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-brand-green transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary font-medium">{post.title}</span>
          </nav>

          <p className="text-lg text-text-secondary italic leading-relaxed mb-8 border-l-4 border-brand-orange pl-5">
            {post.excerpt}
          </p>

          {/* Render content with basic markdown-like formatting */}
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={i} className="text-xl font-bold text-brand-brown-dark mt-8 mb-4">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('**')) {
                const parts = paragraph.split('**');
                return (
                  <h3 key={i} className="text-xl font-bold text-brand-brown-dark mt-8 mb-4">
                    {parts[1]}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ') || paragraph.includes('\n- ')) {
                const items = paragraph.split('\n').filter(l => l.startsWith('- '));
                return (
                  <ul key={i} className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
                    {items.map((item, j) => (
                      <li key={j}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              if (/^\d+\./.test(paragraph)) {
                const items = paragraph.split('\n').filter(l => /^\d+\./.test(l));
                return (
                  <ol key={i} className="list-decimal pl-6 space-y-2 text-text-secondary mb-6">
                    {items.map((item, j) => (
                      <li key={j}>{item.replace(/^\d+\.\s*/, '')}</li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={i} className="text-text-secondary leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
            <Link href="/blog" className="text-brand-green font-semibold hover:underline flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Quay lại Blog
            </Link>
            <div className="flex items-center gap-2 text-text-light text-sm">
              <span>Chia sẻ:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://robustta.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center hover:bg-brand-green hover:text-white transition-colors text-text-secondary"
              >
                f
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {otherPosts.length > 0 && (
        <section className="py-16 bg-bg-light">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-brand-brown-dark mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherPosts.map(related => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={related.image} alt={related.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-brand-brown-dark text-sm group-hover:text-brand-green transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-xs text-text-light mt-2">{related.date} · 📖 {related.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
