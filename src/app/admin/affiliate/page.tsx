'use client';

import { useState, useEffect } from 'react';
import { getAffiliates, updateAffiliateRate, toggleAffiliateStatus } from '@/app/actions/affiliateActions';

export default function AdminAffiliatePage() {
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadAffiliates();
  }, []);

  async function loadAffiliates() {
    setLoading(true);
    const data = await getAffiliates();
    setAffiliates(data);
    setLoading(false);
  }

  async function handleUpdateRate(id: string, rate: number) {
    setUpdating(id);
    const res = await updateAffiliateRate(id, rate);
    if (res.success) {
      setAffiliates(prev => prev.map(a => a.id === id ? { ...a, commissionRate: rate } : a));
    }
    setUpdating(null);
  }

  async function handleToggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    setUpdating(id);
    const res = await toggleAffiliateStatus(id, newStatus);
    if (res.success) {
      setAffiliates(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    }
    setUpdating(null);
  }

  if (loading) return <div style={{ padding: 40, color: '#9ca3af' }}>Đang tải dữ liệu...</div>;

  return (
    <div className="admin-container">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">🤝 Quản Lý Affiliate</h1>
          <p className="admin-page-subtitle">Quản lý đối tác và điều chỉnh mức hoa hồng</p>
        </div>
      </div>

      <div className="admin-section-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <div className="admin-card">
          <div className="admin-card-title">💰 Tổng doanh thu Referral</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#E8834A', marginTop: 8 }}>
            0 <span style={{ fontSize: 14, color: '#9ca3af' }}>VND</span>
          </div>
        </div>
        <div className="admin-card">
          <div className="admin-card-title">📊 Tổng hoa hồng đã phát sinh</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#E8834A', marginTop: 8 }}>
            0 <span style={{ fontSize: 14, color: '#9ca3af' }}>VND</span>
          </div>
        </div>
        <div className="admin-card">
          <div className="admin-card-title">👥 Đối tác đang hoạt động</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#E8834A', marginTop: 8 }}>
            {affiliates.filter(a => a.status === 'ACTIVE').length}
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: 24 }}>
        <div className="admin-card-title" style={{ marginBottom: 20 }}>Danh sách đối tác</div>
        
        <table className="admin-table">
          <thead>
            <tr>
              <th>Đối tác</th>
              <th>Mã Ref</th>
              <th>Mức hoa hồng (%)</th>
              <th>Doanh số</th>
              <th>Hoa hồng</th>
              <th>Số dư</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {affiliates.map((aff) => (
              <tr key={aff.id}>
                <td>
                  <div style={{ fontWeight: 600 }}>{aff.user?.name || 'Chưa đặt tên'}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>{aff.user?.email}</div>
                </td>
                <td>
                  <code style={{ background: 'rgba(232, 131, 74, 0.1)', color: '#E8834A', padding: '2px 6px', borderRadius: 4 }}>
                    {aff.refCode}
                  </code>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input 
                      type="number"
                      className="admin-input"
                      style={{ width: 60, padding: '4px 8px' }}
                      defaultValue={aff.commissionRate}
                      onBlur={(e) => handleUpdateRate(aff.id, parseFloat(e.target.value))}
                      disabled={updating === aff.id}
                    />
                    <span style={{ fontSize: 12, color: '#9ca3af' }}>%</span>
                  </div>
                </td>
                <td>{aff.totalSales} đơn</td>
                <td style={{ color: '#E8834A' }}>{aff.totalCommission.toLocaleString()}đ</td>
                <td>{aff.balance.toLocaleString()}đ</td>
                <td>
                  <span style={{ 
                    fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 12,
                    background: aff.status === 'ACTIVE' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: aff.status === 'ACTIVE' ? '#22c55e' : '#ef4444',
                    textTransform: 'uppercase'
                  }}>
                    {aff.status === 'ACTIVE' ? 'Đang chạy' : 'Tạm dừng'}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => handleToggleStatus(aff.id, aff.status)}
                    className={`admin-btn admin-btn-sm ${aff.status === 'ACTIVE' ? 'admin-btn-ghost' : 'admin-btn-primary'}`}
                    disabled={updating === aff.id}
                  >
                    {aff.status === 'ACTIVE' ? 'Tạm dừng' : 'Kích hoạt'}
                  </button>
                </td>
              </tr>
            ))}
            {affiliates.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', paddingTop: 40, paddingBottom: 40, color: '#9ca3af' }}>
                  Chưa có đối tác affiliate nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
