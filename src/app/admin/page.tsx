'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDashboardKPIs, getOrders, getInventory, formatVND, freshnessLabel, type MockOrder } from '@/lib/admin/mockData';

const STATUS_COLS: { key: MockOrder['status']; label: string; color: string }[] = [
  { key: 'pending', label: 'Chờ xác nhận', color: '#fbbf24' },
  { key: 'packing', label: 'Đang đóng gói', color: '#60a5fa' },
  { key: 'shipping', label: 'Đang giao', color: '#E8834A' },
  { key: 'done', label: 'Thành công', color: '#7fcf9f' },
];

const PAYMENT_LABEL: Record<string, string> = { vietqr: 'QR', cod: 'COD', card: 'Thẻ' };

export default function AdminDashboard() {
  const [kpi, setKpi] = useState({ todayOrders: 0, monthRevenue: 0, lowStock: 0, outOfStock: 0, pending: 0 });
  const [orders, setOrders] = useState<MockOrder[]>([]);
  const [inv, setInv] = useState<ReturnType<typeof getInventory>>([]);

  useEffect(() => {
    setKpi(getDashboardKPIs());
    setOrders(getOrders());
    setInv(getInventory());
  }, []);

  const topProducts = [
    { name: 'R — Rich 500g Phin', sales: 42, pct: 84 },
    { name: 'B — Balanced 1kg Hạt', sales: 29, pct: 58 },
    { name: 'T — Trust 500g Espresso', sales: 21, pct: 42 },
    { name: 'R — Rich 200g Espresso', sales: 17, pct: 34 },
    { name: 'B — Balanced 500g Phin', sales: 11, pct: 22 },
  ];

  return (
    <div>
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">☕ Dashboard</h1>
          <p className="admin-page-subtitle">
            {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <Link href="/admin/orders" className="admin-btn admin-btn-primary">
          📦 Xem đơn hàng
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <span className="admin-kpi-icon">📋</span>
          <span className="admin-kpi-label">Đơn hôm nay</span>
          <span className="admin-kpi-value">{kpi.todayOrders}</span>
          <span className="admin-kpi-sub">đơn mới</span>
        </div>
        <div className="admin-kpi-card accent">
          <span className="admin-kpi-icon">💰</span>
          <span className="admin-kpi-label">Doanh thu tháng</span>
          <span className="admin-kpi-value" style={{ fontSize: 20 }}>{formatVND(kpi.monthRevenue)}</span>
          <span className="admin-kpi-sub">đơn thành công</span>
        </div>
        <div className={`admin-kpi-card${kpi.pending > 0 ? ' warn' : ''}`}>
          <span className="admin-kpi-icon">⏳</span>
          <span className="admin-kpi-label">Chờ xử lý</span>
          <span className="admin-kpi-value">{kpi.pending}</span>
          <span className="admin-kpi-sub">cần xác nhận</span>
        </div>
        <div className={`admin-kpi-card${kpi.outOfStock > 0 ? ' warn' : ''}`}>
          <span className="admin-kpi-icon">⚠️</span>
          <span className="admin-kpi-label">Tồn kho</span>
          <span className="admin-kpi-value">{kpi.outOfStock}</span>
          <span className="admin-kpi-sub">{kpi.lowStock} sắp hết · {kpi.outOfStock} hết hàng</span>
        </div>
      </div>

      {/* Order Pipeline */}
      <div className="admin-card">
        <p className="admin-card-title">📦 Pipeline Đơn Hàng</p>
        <div className="admin-pipeline">
          {STATUS_COLS.map(col => {
            const colOrders = orders.filter(o => o.status === col.key);
            return (
              <div key={col.key} className="admin-pipeline-col">
                <div className="admin-pipeline-col-header">
                  <span style={{ color: col.color }}>{col.label}</span>
                  <span className="admin-pipeline-count">{colOrders.length}</span>
                </div>
                {colOrders.length === 0 && (
                  <div style={{ fontSize: 12, color: '#4b5563', padding: '8px 0', textAlign: 'center' }}>Trống</div>
                )}
                {colOrders.map(o => (
                  <Link key={o.id} href={`/admin/orders/${o.id}`} style={{ textDecoration: 'none' }}>
                    <div className="admin-pipeline-item">
                      <div className="admin-pipeline-order-id">{o.id} · {PAYMENT_LABEL[o.paymentMethod]}</div>
                      <div className="admin-pipeline-name">{o.customerName}</div>
                      <div className="admin-pipeline-amount">{formatVND(o.total)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom 2-col */}
      <div className="admin-section-grid">
        {/* Top Products */}
        <div className="admin-card">
          <p className="admin-card-title">🏆 Top Sản Phẩm Bán Chạy (tháng này)</p>
          <div className="admin-bar-chart">
            {topProducts.map((p, i) => (
              <div key={i} className="admin-bar-row">
                <div className="admin-bar-label" style={{ fontSize: 12 }}>{p.name.split(' ').slice(0, 2).join(' ')}</div>
                <div className="admin-bar-track">
                  <div className={`admin-bar-fill${i > 1 ? ' orange' : ''}`} style={{ width: `${p.pct}%` }} />
                </div>
                <div className="admin-bar-value">{p.sales}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <p className="admin-card-title" style={{ margin: 0 }}>📦 Cảnh Báo Tồn Kho</p>
            <Link href="/admin/reports" className="admin-btn admin-btn-ghost admin-btn-sm">Xem chi tiết</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {inv.filter(i => i.stock <= i.threshold).map((item, idx) => {
              const fresh = freshnessLabel(item.roastDate);
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, fontSize: 13 }}>
                  <div>
                    <div style={{ color: '#e8e8e6', fontWeight: 600 }}>{item.productName}</div>
                    <div style={{ color: '#6b7280', fontSize: 12 }}>{item.variant}</div>
                    <div style={{ fontSize: 11, color: fresh.color, marginTop: 2 }}>Rang: {fresh.label}</div>
                  </div>
                  <span className={`admin-badge ${item.stock === 0 ? 'admin-badge-red' : 'admin-badge-orange'}`}>
                    {item.stock === 0 ? 'Hết hàng' : `Còn ${item.stock}`}
                  </span>
                </div>
              );
            })}
            {inv.filter(i => i.stock <= i.threshold).length === 0 && (
              <div className="admin-empty" style={{ padding: 24 }}>✅ Tồn kho ổn định</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
