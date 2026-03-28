'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getBlogPostBySlug, blogPosts } from '@/data/blog';

const CATEGORIES = [
  { id: 'knowledge', label: 'Kiến thức cà phê' },
  { id: 'brewing', label: 'Hướng dẫn pha chế' },
  { id: 'lifestyle', label: 'Lối sống' },
  { id: 'news', label: 'Tin tức' },
];

export default function AdminBlogEdit() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const post = blogPosts.find(p => p.id === id);

  const [title, setTitle] = useState(post?.title ?? '');
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '');
  const [content, setContent] = useState(post?.content ?? '');
  const [category, setCategory] = useState<'knowledge' | 'brewing' | 'lifestyle' | 'news'>(post?.category ?? 'knowledge');

  const [saved, setSaved] = useState(false);

  if (!post) return (
    <div className="admin-empty">
      <p>Không tìm thấy bài viết.</p>
      <button onClick={() => router.back()} className="admin-btn admin-btn-ghost" style={{ marginTop: 12 }}>← Quay lại</button>
    </div>
  );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => router.back()} className="admin-btn admin-btn-ghost admin-btn-sm">← Quay lại</button>
          <h1 className="admin-page-title" style={{ fontSize: 18 }}>Chỉnh sửa: {post.title.slice(0, 40)}...</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href={`/blog/${post.slug}`} target="_blank" className="admin-btn admin-btn-ghost">Xem bài ↗</a>
          <button onClick={handleSave} className={`admin-btn ${saved ? 'admin-btn-ghost' : 'admin-btn-orange'}`}>
            {saved ? '✅ Đã lưu' : '💾 Lưu'}
          </button>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-form-group">
          <label className="admin-label">Tiêu đề</label>
          <input className="admin-input" value={title} onChange={e => setTitle(e.target.value)} style={{ fontSize: 16, fontWeight: 600 }} />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Danh mục</label>
          <select className="admin-select" value={category} onChange={e => setCategory(e.target.value as 'knowledge' | 'brewing' | 'lifestyle' | 'news')}>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Meta Description ({excerpt.length}/160)</label>
          <textarea className="admin-textarea" rows={3} value={excerpt} onChange={e => setExcerpt(e.target.value)} style={{ fontFamily: 'inherit' }} />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Nội dung (Markdown) — {content.trim().split(/\s+/).length} từ</label>
          <textarea className="admin-textarea" rows={20} value={content} onChange={e => setContent(e.target.value)} />
        </div>
      </div>
    </div>
  );
}
