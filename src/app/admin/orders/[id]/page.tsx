'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getOrders, updateOrderStatus, formatVND, type MockOrder } from '@/lib/admin/mockData';

const STATUSES: MockOrder['status'][] = ['pending', 'packing', 'shipping', 'done', 'cancelled'];
const STATUS_LABEL: Record<string, string> = {
  pending: 'Chờ xác nhận', packing: 'Đang đóng gói',
  shipping: 'Đang giao', done: 'Thành công', cancelled: 'Đã hủy',
};
const PAYMENT_LABEL: Record<string, string> = { vietqr: 'VietQR / Chuyển khoản', cod: 'COD (thanh toán khi nhận)', card: 'Thẻ Visa/Mastercard' };

export default function AdminOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<MockOrder | null>(() => {
    if (typeof window === 'undefined') return null;
    return getOrders().find(o => o.id === id) ?? null;
  });
  const [newStatus, setNewStatus] = useState<MockOrder['status']>(() => {
    if (typeof window === 'undefined') return 'pending';
    const o = getOrders().find(o => o.id === id);
    return o?.status ?? 'pending';
  });
  const [trackingCode, setTrackingCode] = useState(() => {
    if (typeof window === 'undefined') return '';
    const o = getOrders().find(o => o.id === id);
    return o?.trackingCode ?? '';
  });
  const [saved, setSaved] = useState(false);

  if (!order) return <div className="admin-empty">Không tìm thấy đơn hàng này.</div>;

  const handleSave = () => {
    updateOrderStatus(order.id, newStatus, trackingCode);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setOrder(prev => prev ? { ...prev, status: newStatus, trackingCode } : prev);
  };

  const isB2B = order.customerType === 'B2B';

  return (
    <div>
      <div className="admin-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => router.back()} className="admin-btn admin-btn-ghost admin-btn-sm">← Quay lại</button>
          <div>
            <h1 className="admin-page-title" style={{ fontFamily: 'monospace' }}>{order.id}</h1>
            <p className="admin-page-subtitle">
              {new Date(order.createdAt).toLocaleString('vi-VN')}
              {isB2B && <span className="admin-badge admin-badge-blue" style={{ marginLeft: 8 }}>Khách sỉ B2B</span>}
            </p>
          </div>
        </div>
        <button onClick={handleSave} className={`admin-btn ${saved ? 'admin-btn-ghost' : 'admin-btn-orange'}`}>
          {saved ? '✅ Đã lưu' : '💾 Cập nhật'}
        </button>
      </div>

      <div className="admin-two-col">
        {/* Left */}
        <div>
          {/* Order items */}
          <div className="admin-card">
            <p className="admin-card-title">🛍️ Sản Phẩm</p>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Sản phẩm</th><th>Tùy chọn</th><th>SL</th><th>Thành tiền</th></tr>
                </thead>
                <tbody>
                  {order.items.map((item, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{item.name}</td>
                      <td style={{ color: '#9ca3af', fontSize: 13 }}>{item.weight} · {item.grind}</td>
                      <td style={{ textAlign: 'center' }}>×{item.quantity}</td>
                      <td style={{ fontWeight: 700, color: '#7fcf9f' }}>{formatVND(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 12, padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: '#6b7280' }}>Tạm tính</span>
                <span>{formatVND(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#6b7280' }}>Giảm giá</span>
                  <span style={{ color: '#7fcf9f' }}>-{formatVND(order.discount)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: '#6b7280' }}>Phí vận chuyển</span>
                <span>{order.shippingFee === 0 ? 'Miễn phí' : formatVND(order.shippingFee)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 8, marginTop: 4 }}>
                <span style={{ fontWeight: 700 }}>Tổng cộng</span>
                <span style={{ fontWeight: 700, color: '#E8834A', fontSize: 16 }}>{formatVND(order.total)}</span>
              </div>
              {isB2B && (
                <div style={{ marginTop: 8, padding: '6px 10px', background: 'rgba(59,130,246,0.1)', borderRadius: 6, fontSize: 12, color: '#60a5fa' }}>
                  💼 Khách sỉ B2B — Đủ điều kiện xuất hóa đơn VAT và chiết khấu thêm
                </div>
              )}
            </div>
          </div>

          {/* Customer info */}
          <div className="admin-card">
            <p className="admin-card-title">👤 Thông Tin Khách Hàng</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <div><span style={{ color: '#6b7280' }}>Họ tên: </span><span style={{ fontWeight: 600 }}>{order.customerName}</span></div>
              <div><span style={{ color: '#6b7280' }}>Email: </span><a href={`mailto:${order.customerEmail}`} style={{ color: '#60a5fa' }}>{order.customerEmail}</a></div>
              <div><span style={{ color: '#6b7280' }}>SĐT: </span><a href={`tel:${order.phone}`} style={{ color: '#60a5fa' }}>{order.phone}</a></div>
              <div><span style={{ color: '#6b7280' }}>Địa chỉ: </span>{order.address}</div>
              <div><span style={{ color: '#6b7280' }}>Tỉnh/TP: </span>{order.province}</div>
              <div><span style={{ color: '#6b7280' }}>Thanh toán: </span>{PAYMENT_LABEL[order.paymentMethod]}</div>
              {order.paidAt && (
                <div><span style={{ color: '#6b7280' }}>Đã thanh toán: </span>
                  <span style={{ color: '#7fcf9f' }}>{new Date(order.paidAt).toLocaleString('vi-VN')}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right */}
        <div>
          {/* Status update */}
          <div className="admin-card">
            <p className="admin-card-title">🔄 Cập Nhật Trạng Thái</p>
            <div className="admin-form-group">
              <label className="admin-label">Trạng thái đơn hàng</label>
              <select className="admin-select" style={{ width: '100%' }} value={newStatus} onChange={e => setNewStatus(e.target.value as MockOrder['status'])}>
                {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
              </select>
            </div>

            {/* Timeline */}
            <div style={{ display: 'flex', gap: 0, marginBottom: 16, flexWrap: 'wrap' }}>
              {(['pending', 'packing', 'shipping', 'done'] as const).map((s, i) => {
                const stepIdx = STATUSES.indexOf(s);
                const curIdx = STATUSES.indexOf(order.status);
                const done = curIdx >= stepIdx;
                return (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: done ? '#2B4D40' : 'rgba(255,255,255,0.08)',
                      border: `2px solid ${done ? '#7fcf9f' : 'rgba(255,255,255,0.1)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, color: done ? '#7fcf9f' : '#4b5563',
                    }}>
                      {done ? '✓' : (i + 1)}
                    </div>
                    {i < 3 && <div style={{ width: 20, height: 2, background: done && curIdx > stepIdx ? '#2B4D40' : 'rgba(255,255,255,0.08)' }} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shipping */}
          <div className="admin-card">
            <p className="admin-card-title">🚚 Vận Chuyển</p>
            <div className="admin-form-group">
              <label className="admin-label">Đơn vị vận chuyển</label>
              <div className="admin-input" style={{ color: '#9ca3af' }}>{order.carrier || 'GHN'}</div>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Mã vận đơn</label>
              <input
                className="admin-input"
                placeholder="Nhập mã từ GHN/GHTK..."
                value={trackingCode}
                onChange={e => setTrackingCode(e.target.value)}
              />
            </div>
            {trackingCode && (
              <a
                href={`https://ghn.vn/tra-cuu?code=${trackingCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-btn admin-btn-ghost admin-btn-sm"
              >
                🔍 Tra cứu GHN
              </a>
            )}
          </div>

          {/* Quick actions */}
          <div className="admin-card">
            <p className="admin-card-title">⚡ Thao Tác Nhanh</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a href={`tel:${order.phone}`} className="admin-btn admin-btn-ghost">📞 Gọi khách hàng</a>
              <a href={`mailto:${order.customerEmail}`} className="admin-btn admin-btn-ghost">✉️ Gửi email</a>
              {isB2B && (
                <button className="admin-btn admin-btn-primary" onClick={() => alert('Tính năng xuất PDF sẽ được tích hợp với thư viện PDF.')}>
                  🧾 Xuất hóa đơn PDF
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
