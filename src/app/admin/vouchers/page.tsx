'use client';

import { useState } from 'react';
import { vouchers as seedVouchers, type Voucher } from '@/data/vouchers';
import { formatVND } from '@/lib/admin/mockData';

const EMPTY_VOUCHER: Partial<Voucher> = {
  code: '', type: 'percent', value: 10, minOrder: 200000,
  maxDiscount: 50000, description: '', expiresAt: '2026-12-31', isActive: true,
};

export default function AdminVouchers() {
  const [vouchers, setVouchers] = useState<Voucher[]>(seedVouchers);
  const [form, setForm] = useState<Partial<Voucher>>(EMPTY_VOUCHER);
  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggle = (code: string) => {
    setVouchers(prev => prev.map(v => v.code === code ? { ...v, isActive: !v.isActive } : v));
  };

  const addVoucher = () => {
    if (!form.code || !form.description) return;
    const newV: Voucher = {
      code: form.code.toUpperCase(),
      type: form.type as Voucher['type'],
      value: form.value ?? 0,
      minOrder: form.minOrder ?? 0,
      maxDiscount: form.maxDiscount,
      description: form.description,
      expiresAt: form.expiresAt ?? '',
      isActive: true,
    };
    setVouchers(prev => [newV, ...prev]);
    setForm(EMPTY_VOUCHER);
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const TYPE_LABEL: Record<string, string> = { percent: '% giảm giá', fixed: 'Giảm cố định', freeship: 'Miễn ship' };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">🏷️ Vouchers & Mã Giảm Giá</h1>
          <p className="admin-page-subtitle">{vouchers.filter(v => v.isActive).length} mã đang hoạt động</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="admin-btn admin-btn-orange">
          {showForm ? '✕ Đóng' : '+ Tạo mã mới'}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="admin-card" style={{ borderColor: 'rgba(232,131,74,0.3)' }}>
          <p className="admin-card-title">✨ Tạo mã giảm giá mới</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div className="admin-form-group">
              <label className="admin-label">Mã code</label>
              <input className="admin-input" placeholder="VD: SUMMER20" value={form.code ?? ''} onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))} style={{ fontFamily: 'monospace', fontWeight: 700 }} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Loại</label>
              <select className="admin-select" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value as Voucher['type'] }))}>
                <option value="percent">% giảm giá</option>
                <option value="fixed">Giảm cố định (VND)</option>
                <option value="freeship">Miễn phí ship</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Giá trị {form.type === 'percent' ? '(%)' : '(VND)'}</label>
              <input className="admin-input" type="number" value={form.value ?? ''} onChange={e => setForm(p => ({ ...p, value: +e.target.value }))} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Đơn tối thiểu (VND)</label>
              <input className="admin-input" type="number" value={form.minOrder ?? ''} step={10000} onChange={e => setForm(p => ({ ...p, minOrder: +e.target.value }))} />
            </div>
            {form.type === 'percent' && (
              <div className="admin-form-group">
                <label className="admin-label">Giảm tối đa (VND)</label>
                <input className="admin-input" type="number" value={form.maxDiscount ?? ''} step={10000} onChange={e => setForm(p => ({ ...p, maxDiscount: +e.target.value }))} />
              </div>
            )}
            <div className="admin-form-group">
              <label className="admin-label">Hạn sử dụng</label>
              <input className="admin-input" type="date" value={form.expiresAt ?? ''} onChange={e => setForm(p => ({ ...p, expiresAt: e.target.value }))} />
            </div>
            <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="admin-label">Mô tả hiển thị cho khách</label>
              <input className="admin-input" placeholder="VD: Giảm 20% cho đơn từ 200K" value={form.description ?? ''} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button onClick={addVoucher} className="admin-btn admin-btn-orange">💾 Tạo mã</button>
            <button onClick={() => setShowForm(false)} className="admin-btn admin-btn-ghost">Hủy</button>
          </div>
          {saved && <p style={{ color: '#7fcf9f', fontSize: 13, marginTop: 8 }}>✅ Đã thêm mã mới!</p>}
        </div>
      )}

      {/* Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã code</th>
              <th>Loại</th>
              <th>Giá trị</th>
              <th>Đơn tối thiểu</th>
              <th>Hạn dùng</th>
              <th>Mô tả</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map(v => {
              const expired = new Date(v.expiresAt) < new Date();
              return (
                <tr key={v.code}>
                  <td>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#E8834A', fontSize: 14 }}>{v.code}</span>
                  </td>
                  <td><span className="admin-badge admin-badge-gray">{TYPE_LABEL[v.type]}</span></td>
                  <td style={{ fontWeight: 600 }}>
                    {v.type === 'percent' ? `${v.value}%${v.maxDiscount ? ` (max ${formatVND(v.maxDiscount)})` : ''}` : v.type === 'fixed' ? formatVND(v.value) : '—'}
                  </td>
                  <td style={{ color: '#9ca3af', fontSize: 13 }}>{formatVND(v.minOrder)}</td>
                  <td style={{ color: expired ? '#f87171' : '#9ca3af', fontSize: 13 }}>
                    {new Date(v.expiresAt).toLocaleDateString('vi-VN')}{expired ? ' ⚠' : ''}
                  </td>
                  <td style={{ color: '#9ca3af', fontSize: 13, maxWidth: 200 }}>{v.description}</td>
                  <td>
                    <label className="admin-toggle" style={{ display: 'inline-block' }}>
                      <input type="checkbox" checked={v.isActive && !expired} onChange={() => toggle(v.code)} disabled={expired} />
                      <span className="admin-toggle-slider" />
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
