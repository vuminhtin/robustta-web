'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getOrders, formatVND, type MockOrder } from '@/lib/admin/mockData';

const STATUS_OPTIONS = ['all', 'pending', 'packing', 'shipping', 'done', 'cancelled'] as const;
const PAYMENT_OPTIONS = ['all', 'vietqr', 'cod', 'card'] as const;

const STATUS_LABEL: Record<string, string> = {
  pending: 'Chờ xác nhận', packing: 'Đang đóng gói',
  shipping: 'Đang giao', done: 'Thành công', cancelled: 'Đã hủy',
};
const PAYMENT_LABEL: Record<string, string> = { vietqr: 'VietQR', cod: 'COD', card: 'Thẻ' };
const STATUS_BADGE: Record<string, string> = {
  pending: 'admin-badge-orange', packing: 'admin-badge-blue',
  shipping: 'admin-badge-orange', done: 'admin-badge-green', cancelled: 'admin-badge-red',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<MockOrder[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [payFilter, setPayFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => { setOrders(getOrders()); }, []);

  const filtered = orders.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (payFilter !== 'all' && o.paymentMethod !== payFilter) return false;
    if (search && !o.id.toLowerCase().includes(search.toLowerCase())
      && !o.customerName.toLowerCase().includes(search.toLowerCase())
      && !o.phone.includes(search)) return false;
    return true;
  });

  const exportCSV = () => {
    const rows = [
      ['Mã đơn', 'Khách', 'SĐT', 'Tổng', 'Trạng thái', 'Thanh toán', 'Ngày đặt'],
      ...filtered.map(o => [o.id, o.customerName, o.phone, o.total, STATUS_LABEL[o.status], PAYMENT_LABEL[o.paymentMethod], new Date(o.createdAt).toLocaleDateString('vi-VN')]),
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `don-hang-${Date.now()}.csv`; a.click();
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">📦 Đơn Hàng</h1>
          <p className="admin-page-subtitle">{filtered.length} đơn</p>
        </div>
        <button onClick={exportCSV} className="admin-btn admin-btn-ghost">⬇️ Xuất CSV</button>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <input
          className="admin-input" style={{ maxWidth: 220 }}
          placeholder="🔍 Tìm mã đơn, tên, SĐT..."
          value={search} onChange={e => setSearch(e.target.value)}
        />
        <select className="admin-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">Tất cả trạng thái</option>
          {STATUS_OPTIONS.filter(s => s !== 'all').map(s => (
            <option key={s} value={s}>{STATUS_LABEL[s]}</option>
          ))}
        </select>
        <select className="admin-select" value={payFilter} onChange={e => setPayFilter(e.target.value)}>
          <option value="all">Tất cả thanh toán</option>
          {PAYMENT_OPTIONS.filter(p => p !== 'all').map(p => (
            <option key={p} value={p}>{PAYMENT_LABEL[p]}</option>
          ))}
        </select>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Thanh toán</th>
                <th>Trạng thái</th>
                <th>Loại KH</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="admin-empty">Không có đơn hàng nào</td></tr>
              )}
              {filtered.map(o => (
                <tr key={o.id}>
                  <td>
                    <span style={{ color: '#E8834A', fontWeight: 700, fontFamily: 'monospace', fontSize: 13 }}>{o.id}</span>
                    <div style={{ fontSize: 11, color: '#4b5563', marginTop: 2 }}>
                      {new Date(o.createdAt).toLocaleDateString('vi-VN')}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#e8e8e6' }}>{o.customerName}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{o.phone}</div>
                  </td>
                  <td style={{ fontSize: 12, color: '#9ca3af' }}>
                    {o.items.map((it, i) => <div key={i}>{it.name} {it.weight} × {it.quantity}</div>)}
                  </td>
                  <td style={{ fontWeight: 700, color: '#7fcf9f' }}>{formatVND(o.total)}</td>
                  <td>
                    <span className="admin-badge admin-badge-gray">{PAYMENT_LABEL[o.paymentMethod]}</span>
                  </td>
                  <td>
                    <span className={`admin-badge ${STATUS_BADGE[o.status]}`}>{STATUS_LABEL[o.status]}</span>
                  </td>
                  <td>
                    <span className={`admin-badge ${o.customerType === 'B2B' ? 'admin-badge-blue' : 'admin-badge-gray'}`}>
                      {o.customerType}
                    </span>
                  </td>
                  <td>
                    <Link href={`/admin/orders/${o.id}`} className="admin-btn admin-btn-ghost admin-btn-sm">
                      Chi tiết →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
