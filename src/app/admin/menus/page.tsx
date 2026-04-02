'use client';

import { useState, useEffect } from 'react';
import { getMenuItems, toggleMenuItem, createMenuItem, deleteMenuItem } from '@/app/actions/menuActions';

interface MenuItem {
  id: string;
  label: string;
  url: string;
  location: 'header' | 'footer';
  isActive: boolean;
  sortOrder: number;
}

export default function AdminMenuManager() {
  const [headerMenus, setHeaderMenus] = useState<MenuItem[]>([]);
  const [footerMenus, setFooterMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ label: '', url: '', location: 'header' as const });

  useEffect(() => {
    loadMenus();
  }, []);

  async function loadMenus() {
    setLoading(true);
    const [header, footer] = await Promise.all([
      getMenuItems('header', true),
      getMenuItems('footer', true)
    ]);
    setHeaderMenus(header as any);
    setFooterMenus(footer as any);
    setLoading(false);
  }

  const toggleStatus = async (item: MenuItem) => {
    setUpdating(item.id);
    const res = await toggleMenuItem(item.id, !item.isActive);
    if (res.success) {
      if (item.location === 'header') {
        setHeaderMenus(prev => prev.map(m => m.id === item.id ? { ...m, isActive: !m.isActive } : m));
      } else {
        setFooterMenus(prev => prev.map(m => m.id === item.id ? { ...m, isActive: !m.isActive } : m));
      }
    }
    setUpdating(null);
  };

  const handleDelete = async (item: MenuItem) => {
    if (!confirm('Xóa menu này?')) return;
    setUpdating(item.id);
    const res = await deleteMenuItem(item.id);
    if (res.success) {
      if (item.location === 'header') {
        setHeaderMenus(prev => prev.filter(m => m.id !== item.id));
      } else {
        setFooterMenus(prev => prev.filter(m => m.id !== item.id));
      }
    }
    setUpdating(null);
  };

  const addItem = async () => {
    if (!newItem.label || !newItem.url) return;
    setUpdating('adding');
    const res = await createMenuItem(newItem);
    if (res.success) {
      await loadMenus();
      setNewItem({ label: '', url: '', location: 'header' });
      setIsAdding(false);
    }
    setUpdating(null);
  };

  if (loading) return <div style={{ padding: 40, color: '#9ca3af' }}>Đang tải menu...</div>;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">🗺️ Quản Lý Menu</h1>
          <p className="admin-page-subtitle">Cấu trúc điều hướng Header & Footer (Đã kết nối DB)</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="admin-btn admin-btn-orange">
          + Thêm item
        </button>
      </div>

      <div className="admin-section-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* Header Menu */}
        <div className="admin-card">
          <p className="admin-card-title">🔝 Header Navigation</p>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nhãn</th>
                  <th>Đường dẫn</th>
                  <th style={{ textAlign: 'center' }}>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {headerMenus.map(item => (
                  <tr key={item.id} style={{ opacity: item.isActive ? 1 : 0.4 }}>
                    <td><strong style={{ color: '#e8e8e6' }}>{item.label}</strong></td>
                    <td><code style={{ fontSize: 11, color: '#9ca3af' }}>{item.url}</code></td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        onClick={() => toggleStatus(item)}
                        className={`admin-btn admin-btn-sm ${item.isActive ? 'admin-btn-primary' : 'admin-btn-ghost'}`}
                        disabled={updating === item.id}
                      >
                        {updating === item.id ? '...' : (item.isActive ? 'Đang hiện' : 'Đang ẩn')}
                      </button>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDelete(item)} 
                        className="admin-btn admin-btn-ghost admin-btn-sm text-red-400"
                        disabled={updating === item.id}
                      >🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Menu */}
        <div className="admin-card">
          <p className="admin-card-title">👣 Footer & Chính sách</p>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nhãn</th>
                  <th>Đường dẫn</th>
                  <th style={{ textAlign: 'center' }}>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {footerMenus.map(item => (
                  <tr key={item.id} style={{ opacity: item.isActive ? 1 : 0.4 }}>
                    <td><strong style={{ color: '#e8e8e6' }}>{item.label}</strong></td>
                    <td><code style={{ fontSize: 11, color: '#9ca3af' }}>{item.url}</code></td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        onClick={() => toggleStatus(item)}
                        className={`admin-btn admin-btn-sm ${item.isActive ? 'admin-btn-primary' : 'admin-btn-ghost'}`}
                        disabled={updating === item.id}
                      >
                        {updating === item.id ? '...' : (item.isActive ? 'Đang hiện' : 'Đang ẩn')}
                      </button>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDelete(item)} 
                        className="admin-btn admin-btn-sm admin-btn-ghost text-red-500"
                        disabled={updating === item.id}
                      >🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isAdding && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="admin-card" style={{ width: 400, margin: 0 }}>
            <p className="admin-card-title">➕ Thêm Menu Item mới</p>
            <div className="admin-form-group">
              <label className="admin-label">Nhãn (Tiếng Việt)</label>
              <input 
                className="admin-input" 
                value={newItem.label} 
                onChange={e => setNewItem({...newItem, label: e.target.value})} 
                placeholder="Ví dụ: Sản phẩm"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Đường dẫn (URL)</label>
              <input 
                className="admin-input" 
                value={newItem.url} 
                onChange={e => setNewItem({...newItem, url: e.target.value})} 
                placeholder="/products"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Vị trí</label>
              <select className="admin-select" value={newItem.location} onChange={e => setNewItem({...newItem, location: e.target.value as any})}>
                <option value="header">Header Nav</option>
                <option value="footer">Footer Menu</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <button 
                onClick={() => setIsAdding(false)} 
                className="admin-btn admin-btn-ghost" 
                style={{ flex: 1 }}
                disabled={updating === 'adding'}
              >Hủy</button>
              <button 
                onClick={addItem} 
                className="admin-btn admin-btn-orange" 
                style={{ flex: 1 }}
                disabled={updating === 'adding'}
              >
                {updating === 'adding' ? 'Đang thêm...' : 'Thêm ngay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
