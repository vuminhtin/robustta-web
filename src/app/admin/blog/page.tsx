'use client';

import { useState } from 'react';
import Link from 'next/link';
import { blogPosts, type BlogPost } from '@/data/blog';

const CATEGORY_LABEL: Record<string, string> = {
  knowledge: 'Kiến thức', brewing: 'Pha chế', lifestyle: 'Lối sống', news: 'Tin tức',
};
const CATEGORY_COLOR: Record<string, string> = {
  knowledge: 'admin-badge-green', brewing: 'admin-badge-blue',
  lifestyle: 'admin-badge-orange', news: 'admin-badge-gray',
};

export default function AdminBlog() {
  const [posts] = useState<BlogPost[]>(blogPosts);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? posts : posts.filter(p => p.category === filter);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">✍️ Blog & Nội Dung</h1>
          <p className="admin-page-subtitle">{posts.length} bài viết · Quản lý & SEO</p>
        </div>
        <Link href="/admin/blog/new" className="admin-btn admin-btn-orange">
          ✏️ Viết bài mới
        </Link>
      </div>

      {/* Category filter */}
      <div className="admin-filters">
        {['all', 'knowledge', 'brewing', 'lifestyle', 'news'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`admin-btn admin-btn-sm ${filter === cat ? 'admin-btn-primary' : 'admin-btn-ghost'}`}
          >
            {cat === 'all' ? 'Tất cả' : CATEGORY_LABEL[cat]}
          </button>
        ))}
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Danh mục</th>
              <th>Tác giả</th>
              <th>Ngày đăng</th>
              <th>Đọc</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(post => (
              <tr key={post.id}>
                <td>
                  <div style={{ fontWeight: 600, color: '#e8e8e6', maxWidth: 280 }}>{post.title}</div>
                  <div style={{ fontSize: 12, color: '#4b5563', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 280 }}>
                    {post.excerpt.slice(0, 80)}...
                  </div>
                </td>
                <td><span className={`admin-badge ${CATEGORY_COLOR[post.category]}`}>{post.categoryLabel}</span></td>
                <td style={{ color: '#9ca3af', fontSize: 13 }}>{post.author}</td>
                <td style={{ color: '#6b7280', fontSize: 13 }}>{new Date(post.date).toLocaleDateString('vi-VN')}</td>
                <td style={{ color: '#6b7280', fontSize: 13 }}>{post.readTime}</td>
                <td><span className="admin-badge admin-badge-green">Published</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <Link href={`/admin/blog/${post.id}`} className="admin-btn admin-btn-ghost admin-btn-sm">Sửa</Link>
                    <Link href={`/blog/${post.slug}`} target="_blank" className="admin-btn admin-btn-ghost admin-btn-sm">Xem ↗</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
