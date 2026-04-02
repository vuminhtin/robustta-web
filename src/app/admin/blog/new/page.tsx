'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { products } from '@/data/products';
import SEOEvaluator from '@/components/admin/SEOEvaluator';

const CATEGORIES = [
  { id: 'knowledge', label: 'Kiến thức cà phê' },
  { id: 'brewing', label: 'Hướng dẫn pha chế' },
  { id: 'lifestyle', label: 'Lối sống' },
  { id: 'news', label: 'Tin tức' },
];

const SEO_KEYWORDS = ['cà phê hạt rang xay', 'cà phê nguyên chất', 'cà phê Lâm Đồng', 'rang mộc', 'Robusta Việt Nam', 'cold brew'];

function checkSEO(title: string, excerpt: string, content: string) {
  const checks = [
    { label: 'Tiêu đề 40-60 ký tự', pass: title.length >= 40 && title.length <= 60, warn: title.length > 0 && (title.length < 40 || title.length > 60) },
    { label: 'Meta description 120-160 ký tự', pass: excerpt.length >= 120 && excerpt.length <= 160, warn: excerpt.length > 0 && (excerpt.length < 120 || excerpt.length > 160) },
    { label: 'Nội dung ≥ 300 từ', pass: content.trim().split(/\s+/).length >= 300, warn: content.trim().split(/\s+/).length >= 100 },
    { label: 'Có từ khóa cà phê', pass: SEO_KEYWORDS.some(k => content.toLowerCase().includes(k) || title.toLowerCase().includes(k)), warn: false },
    { label: 'Nội dung có heading (##)', pass: content.includes('##'), warn: false },
  ];
  return checks;
}

function autoMeta(content: string): string {
  const words = content.replace(/[#*>\-`]/g, '').trim().split(/\s+/);
  return words.slice(0, 28).join(' ') + (words.length > 28 ? '...' : '');
}

export default function AdminBlogEditor() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('knowledge');
  const [showPreview, setShowPreview] = useState(false);
  const [saved, setSaved] = useState(false);

  const seoChecks = checkSEO(title, excerpt, content);
  const seoScore = seoChecks.filter(c => c.pass).length;

  const insertProductLink = (product: typeof products[number]) => {
    const link = `\n[👉 Mua ${product.name} ngay (từ ${new Intl.NumberFormat('vi-VN').format(product.variants[0].price)}đ)](/products/${product.slug})\n`;
    setContent(prev => prev + link);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => { setSaved(false); router.push('/admin/blog'); }, 1500);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => router.back()} className="admin-btn admin-btn-ghost admin-btn-sm">← Quay lại</button>
          <h1 className="admin-page-title">✍️ Bài Viết Mới</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setShowPreview(!showPreview)} className="admin-btn admin-btn-ghost">
            {showPreview ? '📝 Editor' : '👁 Preview'}
          </button>
          <button onClick={handleSave} className={`admin-btn ${saved ? 'admin-btn-ghost' : 'admin-btn-orange'}`}>
            {saved ? '✅ Đã lưu!' : '💾 Lưu bài'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'start' }}>
        {/* Main editor */}
        <div>
          <div className="admin-card">
            <div className="admin-form-group">
              <label className="admin-label">Tiêu đề bài viết <span style={{ color: title.length > 60 ? '#f87171' : '#6b7280' }}>({title.length}/60)</span></label>
              <input className="admin-input" placeholder="Ví dụ: Robusta vs Arabica — Sự thật về 2 giống cà phê" value={title} onChange={e => setTitle(e.target.value)} style={{ fontSize: 16, padding: '12px 14px', fontWeight: 600 }} />
            </div>

            <div className="admin-form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="admin-label">Meta Description <span style={{ color: excerpt.length > 160 ? '#f87171' : '#6b7280' }}>({excerpt.length}/160)</span></label>
                <button onClick={() => setExcerpt(autoMeta(content))} className="admin-btn admin-btn-ghost admin-btn-sm" type="button">
                  🤖 Tự tạo
                </button>
              </div>
              <textarea className="admin-textarea" rows={3} placeholder="Tóm tắt bài viết cho SEO Google..." value={excerpt} onChange={e => setExcerpt(e.target.value)} style={{ fontFamily: 'inherit', resize: 'vertical' }} />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Danh mục</label>
              <select className="admin-select" value={category} onChange={e => setCategory(e.target.value)}>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>

            {/* Insert product link */}
            <div className="admin-form-group">
              <label className="admin-label">Chèn link sản phẩm</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {products.map(p => (
                  <button key={p.id} onClick={() => insertProductLink(p)} className="admin-btn admin-btn-primary admin-btn-sm">
                    + {p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <p className="admin-card-title" style={{ margin: 0 }}>📄 Nội dung (Markdown)</p>
              <span style={{ fontSize: 12, color: '#6b7280' }}>{content.trim().split(/\s+/).filter(Boolean).length} từ</span>
            </div>
            {!showPreview ? (
              <textarea
                className="admin-textarea"
                rows={20}
                placeholder={'# Tiêu đề chính\n\nViết nội dung bài viết ở đây. Hỗ trợ **markdown**.\n\n## Mục lớn\n\nNội dung...'}
                value={content}
                onChange={e => setContent(e.target.value)}
                style={{ fontFamily: 'Fira Code, monospace', fontSize: 13 }}
              />
            ) : (
              <div style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, minHeight: 300, fontSize: 14, lineHeight: 1.8, color: '#e8e8e6', whiteSpace: 'pre-wrap' }}>
                <strong style={{ fontSize: 20, display: 'block', marginBottom: 12 }}>{title || '(Chưa có tiêu đề)'}</strong>
                {content || <span style={{ color: '#4b5563' }}>Chưa có nội dung...</span>}
              </div>
            )}
          </div>
        </div>

        {/* SEO Sidebar */}
        <div>
          <div className="admin-card">
            <SEOEvaluator
              title={title}
              metaDescription={excerpt}
              content={content}
              focusKeyword={SEO_KEYWORDS[0]}
            />
          </div>

          <div className="admin-card">
            <p className="admin-card-title">
              🔍 SEO Checklist
              <span style={{
                marginLeft: 'auto', fontSize: 13, padding: '2px 10px', borderRadius: 99,
                background: seoScore >= 4 ? 'rgba(16,185,129,0.2)' : seoScore >= 2 ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)',
                color: seoScore >= 4 ? '#10b981' : seoScore >= 2 ? '#f59e0b' : '#ef4444'
              }}>
                {seoScore}/{seoChecks.length}
              </span>
            </p>
            <div className="admin-seo-list">
              {seoChecks.map((check, i) => {
                const color = check.pass ? '#10b981' : check.warn ? '#f59e0b' : '#ef4444';
                return (
                  <div key={i} className="admin-seo-item">
                    <span 
                      style={{ 
                        display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: color,
                        boxShadow: `0 0 5px ${color}`
                      }} 
                    />
                    <span style={{ color: check.pass ? '#9ca3af' : '#e8e8e6' }}>{check.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="admin-card">
            <p className="admin-card-title">🏷️ Từ Khóa Gợi Ý</p>
            <div>
              {SEO_KEYWORDS.map(kw => {
                const inContent = content.toLowerCase().includes(kw) || title.toLowerCase().includes(kw);
                return (
                  <div key={kw} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 13 }}>
                    <span style={{ color: inContent ? '#7fcf9f' : '#4b5563' }}>{inContent ? '✓' : '○'}</span>
                    <span
                      style={{ color: inContent ? '#9ca3af' : '#6b7280', cursor: 'pointer', textDecoration: inContent ? 'line-through' : 'none' }}
                      onClick={() => setContent(prev => prev + ' ' + kw)}
                    >
                      {kw}
                    </span>
                  </div>
                );
              })}
            </div>
            <p style={{ fontSize: 11, color: '#4b5563', marginTop: 8 }}>Click từ khóa để chèn vào cuối nội dung</p>
          </div>

          <div className="admin-card">
            <p className="admin-card-title">📌 Mẹo SEO</p>
            <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.7 }}>
              <p>• Heading ## đầu tiên nên chứa từ khóa chính</p>
              <p>• Meta description kết thúc bằng call-to-action</p>
              <p>• Chèn link sản phẩm ở giữa bài, không phải cuối</p>
              <p>• Ảnh bìa cần alt text chứa từ khóa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
