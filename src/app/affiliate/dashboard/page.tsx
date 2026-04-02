'use client';

import { useState, useEffect } from 'react';
import { getAffiliateStats } from '@/app/actions/affiliateActions';

export default function AffiliateDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Mock userId for demonstration (in real app, use auth() to get the current user)
  const MOCK_USER_ID = "DEMO_AFFILIATE";

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    setLoading(true);
    // In production, this would use the logged-in user's ID
    const statsData = await getAffiliateStats(MOCK_USER_ID);
    setData(statsData);
    setLoading(false);
  }

  const referralLink = data ? `${window.location.origin}/?ref=${data.stats.refCode}` : '';

  function copyToClipboard() {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) return <div style={{ padding: 40, color: '#9ca3af' }}>Đang tải dữ liệu dashboard...</div>;

  if (!data) return (
    <div style={{ padding: 80, textAlign: 'center', color: '#9ca3af' }}>
      <h2>Bạn chưa tham gia chương trình Affiliate</h2>
      <p>Vui lòng liên hệ quản trị viên để đăng ký.</p>
    </div>
  );

  return (
    <div className="admin-container">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">🤝 Dashboard Đối Tác</h1>
          <p className="admin-page-subtitle">Chào mừng bạn trở lại, mã đối tác: <strong>{data.stats.refCode}</strong></p>
        </div>
      </div>

      <div className="admin-section-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <div className="admin-card">
          <div className="admin-card-title">💵 Doanh số Referral</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#E8834A', marginTop: 8 }}>
            {data.stats.totalSales} <span style={{ fontSize: 14, color: '#9ca3af' }}>Đơn hàng thành công</span>
          </div>
        </div>
        <div className="admin-card">
          <div className="admin-card-title">💰 Tổng hoa hồng tích lũy</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#E8834A', marginTop: 8 }}>
            {data.stats.totalCommission.toLocaleString()} <span style={{ fontSize: 14, color: '#9ca3af' }}>VND</span>
          </div>
        </div>
        <div className="admin-card">
          <div className="admin-card-title">💳 Số dư khả dụng</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#E8834A', marginTop: 8 }}>
            {data.stats.balance.toLocaleString()} <span style={{ fontSize: 14, color: '#9ca3af' }}>VND</span>
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: 24, padding: 32, background: 'rgba(232, 131, 74, 0.05)', border: '1px dashed #E8834A' }}>
        <div className="admin-card-title" style={{ marginBottom: 12 }}>🔗 Link giới thiệu của bạn</div>
        <div style={{ fontSize: 14, color: '#9ca3af', marginBottom: 20 }}>
          Chia sẻ đường dẫn này để nhận được <strong>{data.stats.rate}%</strong> hoa hồng trên mỗi đơn hàng thành công.
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <input 
            className="admin-input"
            readOnly
            value={referralLink}
            style={{ fontSize: 16, border: '1px solid #E8834A', color: '#E8834A' }}
          />
          <button 
            onClick={copyToClipboard}
            className="admin-btn admin-btn-primary"
            style={{ flexShrink: 0 }}
          >
            {copied ? '✅ Đã copy' : '📋 Sao chép'}
          </button>
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: 24 }}>
        <div className="admin-card-title" style={{ marginBottom: 20 }}>Chi tiết hoa hồng gần đây</div>
        
        <table className="admin-table">
          <thead>
            <tr>
              <th>Đơn hàng</th>
              <th>Ngày phát sinh</th>
              <th>Giá trị đơn</th>
              <th>% Hoa hồng</th>
              <th>Thu nhập</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {data.recentCommissions.map((comm: any) => (
              <tr key={comm.id}>
                <td><strong>{comm.order.orderNumber}</strong></td>
                <td style={{ fontSize: 12, color: '#9ca3af' }}>
                  {new Date(comm.createdAt).toLocaleDateString('vi-VN')}
                </td>
                <td>{comm.order.total.toLocaleString()}đ</td>
                <td>{data.stats.rate}%</td>
                <td style={{ color: '#E8834A', fontWeight: 600 }}>+{comm.amount.toLocaleString()}đ</td>
                <td>
                  <span style={{ 
                    fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 12,
                    background: comm.status === 'PAID' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(232, 131, 74, 0.1)',
                    color: comm.status === 'PAID' ? '#22c55e' : '#E8834A',
                    textTransform: 'uppercase'
                  }}>
                    {comm.status === 'PAID' ? 'Đã thanh toán' : 'Chờ xử lý'}
                  </span>
                </td>
              </tr>
            ))}
            {data.recentCommissions.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', paddingTop: 40, paddingBottom: 40, color: '#9ca3af' }}>
                  Bạn chưa có lượt referral nào thành công
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
