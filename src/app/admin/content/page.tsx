'use client';

import { useState, useEffect } from 'react';
import { getPageSections, togglePageSection } from '@/app/actions/sectionActions';
import Link from 'next/link';

export default function AdminContentManager() {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadSections();
  }, []);

  async function loadSections() {
    setLoading(true);
    const data = await getPageSections(true); // includeInactive
    setSections(data);
    setLoading(false);
  }

  const handleToggle = async (id: string, currentStatus: boolean) => {
    setUpdating(id);
    const res = await togglePageSection(id, !currentStatus);
    if (res.success) {
      setSections(prev => prev.map(s => s.id === id ? { ...s, isActive: !currentStatus } : s));
    }
    setUpdating(null);
  };

  if (loading) return <div style={{ padding: 40, color: '#9ca3af' }}>Đang tải cấu trúc trang...</div>;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">🏗️ Cấu Trúc Trang Chủ</h1>
          <p className="admin-page-subtitle">Quản lý hiển thị các thành phần (Đã kết nối DB)</p>
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card-title">📱 Các thành phần Landing Page</p>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
          Bật/tắt để ẩn các section khỏi trang chủ. Các thay đổi sẽ được lưu ngay lập tức.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sections.map((section) => (
            <div 
              key={section.id}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 20px', background: 'rgba(255,255,255,0.03)',
                borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)',
                opacity: section.isActive ? 1 : 0.5,
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ color: '#4b5563', fontSize: 18 }}>⠿</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#e8e8e6' }}>{section.label}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>
                    ID: <code style={{ color: '#E8834A' }}>{section.name}</code>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Link 
                  href={`/admin/content/edit/${section.name}`}
                  className="admin-btn admin-btn-ghost admin-btn-sm"
                >
                  ✏️ Sửa nội dung
                </Link>
                <button 
                  onClick={() => handleToggle(section.id, section.isActive)}
                  className={`admin-btn admin-btn-sm ${section.isActive ? 'admin-btn-primary' : 'admin-btn-ghost'}`}
                  style={{ width: 100 }}
                  disabled={updating === section.id}
                >
                  {updating === section.id ? '...' : (section.isActive ? 'Đang hiện' : 'Đang ẩn')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
