'use client';

import { useState } from 'react';
import { getInventory, getOrders, formatVND, freshnessLabel, type MockInventory } from '@/lib/admin/mockData';

const MONTHLY_REVENUE = [
  { month: 'T10/25', value: 8200000 },
  { month: 'T11/25', value: 11500000 },
  { month: 'T12/25', value: 19800000 },
  { month: 'T1/26', value: 15300000 },
  { month: 'T2/26', value: 12700000 },
  { month: 'T3/26', value: 22100000 },
];
const MAX_REVENUE = Math.max(...MONTHLY_REVENUE.map(m => m.value));

const TOP_PRODUCTS = [
  { name: 'R — Rich 500g Xay phin', sales: 42, revenue: 10836000, pct: 100 },
  { name: 'B — Balanced 1kg Hạt nguyên', sales: 29, revenue: 12354000, pct: 69 },
  { name: 'T — Trust 500g Xay espresso', sales: 21, revenue: 6888000, pct: 50 },
  { name: 'R — Rich 200g Xay espresso', sales: 17, revenue: 2176000, pct: 40 },
  { name: 'B — Balanced 500g Xay phin', sales: 11, revenue: 3102000, pct: 26 },
];

export default function AdminReports() {
  const [inv] = useState<MockInventory[]>(() => {
    if (typeof window === 'undefined') return [];
    return getInventory();
  });
  const [totalRevenue] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const orders = getOrders();
    return orders.filter(o => o.status === 'done').reduce((s, o) => s + o.total, 0);
  });
  const [totalOrders] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return getOrders().length;
  });

  const lowStockItems = inv.filter(i => i.stock <= i.threshold);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">📈 Báo Cáo & Phân Tích</h1>
          <p className="admin-page-subtitle">Tổng quan kinh doanh</p>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="admin-kpi-grid" style={{ marginBottom: 28 }}>
        <div className="admin-kpi-card accent">
          <span className="admin-kpi-icon">💰</span>
          <span className="admin-kpi-label">Tổng doanh thu (mock)</span>
          <span className="admin-kpi-value" style={{ fontSize: 18 }}>{formatVND(totalRevenue)}</span>
        </div>
        <div className="admin-kpi-card">
          <span className="admin-kpi-icon">📦</span>
          <span className="admin-kpi-label">Tổng đơn hàng</span>
          <span className="admin-kpi-value">{totalOrders}</span>
        </div>
        <div className={`admin-kpi-card${lowStockItems.length > 0 ? ' warn' : ''}`}>
          <span className="admin-kpi-icon">⚠️</span>
          <span className="admin-kpi-label">Biến thể tồn kho thấp</span>
          <span className="admin-kpi-value">{lowStockItems.length}</span>
        </div>
        <div className="admin-kpi-card">
          <span className="admin-kpi-icon">⭐</span>
          <span className="admin-kpi-label">Sản phẩm bán chạy #1</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#7fcf9f', lineHeight: 1.3, marginTop: 4 }}>R — Rich 500g Phin</span>
        </div>
      </div>

      <div className="admin-section-grid">
        {/* Revenue chart */}
        <div className="admin-card">
          <p className="admin-card-title">📊 Doanh Thu 6 Tháng Gần Nhất</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MONTHLY_REVENUE.map(m => (
              <div key={m.month} className="admin-bar-row">
                <div className="admin-bar-label">{m.month}</div>
                <div className="admin-bar-track">
                  <div className="admin-bar-fill" style={{ width: `${(m.value / MAX_REVENUE) * 100}%` }} />
                </div>
                <div className="admin-bar-value" style={{ fontSize: 12 }}>{(m.value / 1000000).toFixed(1)}M</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="admin-card">
          <p className="admin-card-title">🏆 Top Sản Phẩm Tháng Này</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {TOP_PRODUCTS.map((p, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 13 }}>
                  <span style={{ color: '#e8e8e6' }}>{p.name}</span>
                  <span style={{ color: '#7fcf9f', fontWeight: 700 }}>{p.sales} đơn</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${p.pct}%`, background: i < 2 ? 'linear-gradient(90deg,#2B4D40,#7fcf9f)' : 'linear-gradient(90deg,#c45a1a,#E8834A)', borderRadius: 99 }} />
                  </div>
                  <span style={{ fontSize: 12, color: '#6b7280', width: 60 }}>{formatVND(p.revenue)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory report */}
      <div className="admin-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <p className="admin-card-title" style={{ margin: 0 }}>📦 Tồn Kho Thành Phẩm (Toàn Bộ Biến Thể)</p>
          {lowStockItems.length > 0 && (
            <span className="admin-badge admin-badge-orange">⚠ {lowStockItems.length} cần nhập thêm</span>
          )}
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Biến thể</th>
                <th>Tồn kho</th>
                <th>Ngày rang</th>
                <th>Độ tươi</th>
                <th>Tình trạng</th>
              </tr>
            </thead>
            <tbody>
              {inv.map((item, i) => {
                const fresh = freshnessLabel(item.roastDate);
                const isLow = item.stock <= item.threshold && item.stock > 0;
                const isOut = item.stock === 0;
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{item.productName}</td>
                    <td style={{ color: '#9ca3af', fontSize: 13 }}>{item.variant}</td>
                    <td>
                      <span style={{ fontWeight: 700, color: isOut ? '#f87171' : isLow ? '#E8834A' : '#7fcf9f' }}>
                        {item.stock}
                      </span>
                      <span style={{ color: '#4b5563', fontSize: 12 }}> / ngưỡng {item.threshold}</span>
                    </td>
                    <td style={{ color: '#6b7280', fontSize: 13 }}>{item.roastDate}</td>
                    <td style={{ color: fresh.color, fontSize: 12 }}>{fresh.label}</td>
                    <td>
                      {isOut
                        ? <span className="admin-badge admin-badge-red">Hết hàng 🔴</span>
                        : isLow
                        ? <span className="admin-badge admin-badge-orange">Sắp hết ⚠️</span>
                        : <span className="admin-badge admin-badge-green">Đủ hàng ✅</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
