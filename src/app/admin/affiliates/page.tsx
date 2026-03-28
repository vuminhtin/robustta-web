'use client';

import { useState, useEffect } from 'react';
import { useAffiliate, type AffiliateOrder } from '@/context/AffiliateContext';
import { formatPrice } from '@/data/products';

interface GroupedAffiliate {
  code: string;
  orders: AffiliateOrder[];
  totalRevenue: number;
  totalCommission: number;
  pendingCommission: number;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('vi-VN');
}

export default function AdminAffiliatesPage() {
  const { getAllRecords, markPaid } = useAffiliate();
  const [grouped, setGrouped] = useState<GroupedAffiliate[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [, forceRender] = useState(0);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const all = getAllRecords();
    const map: Record<string, AffiliateOrder[]> = {};
    for (const r of all) {
      if (!map[r.refCode]) map[r.refCode] = [];
      map[r.refCode].push(r);
    }
    const result: GroupedAffiliate[] = Object.entries(map).map(([code, orders]) => ({
      code,
      orders,
      totalRevenue: orders.reduce((s, o) => s + o.orderTotal, 0),
      totalCommission: orders.reduce((s, o) => s + o.commission, 0),
      pendingCommission: orders.filter(o => o.status === 'pending').reduce((s, o) => s + o.commission, 0),
    }));
    result.sort((a, b) => b.totalCommission - a.totalCommission);
    setGrouped(result);
  };

  const handleMarkPaid = (recordId: string) => {
    markPaid(recordId);
    forceRender(n => n + 1);
    refreshData();
  };

  const totalPending = grouped.reduce((s, g) => s + g.pendingCommission, 0);

  return (
    <div className="py-10 px-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-brown-dark">Quản lý Affiliate</h1>
          <p className="text-sm text-text-secondary mt-1">
            Tổng hoa hồng chờ thanh toán:{' '}
            <span className="font-bold text-brand-orange">{formatPrice(totalPending)}</span>
          </p>
        </div>
        <button
          onClick={refreshData}
          className="text-sm border border-border rounded-lg px-4 py-2 hover:border-brand-green transition-colors"
        >
          🔄 Làm mới
        </button>
      </div>

      {grouped.length === 0 ? (
        <div className="text-center py-16 text-text-secondary">
          <div className="text-4xl mb-3">📭</div>
          <p>Chưa có dữ liệu affiliate nào.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {grouped.map(g => (
            <div key={g.code} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              {/* Summary row */}
              <button
                className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-bg-light transition-colors"
                onClick={() => setExpanded(expanded === g.code ? null : g.code)}
              >
                <span className="font-mono font-bold text-brand-green text-lg w-32">{g.code}</span>
                <span className="text-sm text-text-secondary">{g.orders.length} đơn</span>
                <span className="flex-1 text-sm text-text-secondary">
                  Doanh thu: <span className="font-semibold text-text-primary">{formatPrice(g.totalRevenue)}</span>
                </span>
                <span className="text-sm">
                  Hoa hồng: <span className="font-bold text-brand-green">{formatPrice(g.totalCommission)}</span>
                </span>
                {g.pendingCommission > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                    Chờ {formatPrice(g.pendingCommission)}
                  </span>
                )}
                <span className="text-text-light text-xs ml-2">{expanded === g.code ? '▲' : '▼'}</span>
              </button>

              {/* Detail rows */}
              {expanded === g.code && (
                <div className="border-t border-border overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-bg-light text-text-secondary text-xs uppercase">
                      <tr>
                        <th className="px-5 py-3 text-left">Mã đơn</th>
                        <th className="px-5 py-3 text-right">Giá trị</th>
                        <th className="px-5 py-3 text-right">Hoa hồng</th>
                        <th className="px-5 py-3 text-center">Trạng thái</th>
                        <th className="px-5 py-3 text-right">Ngày</th>
                        <th className="px-5 py-3 text-center">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {g.orders.map((o, i) => (
                        <tr key={o.id} className={i % 2 === 0 ? 'bg-white' : 'bg-bg-light/30'}>
                          <td className="px-5 py-3 font-mono font-semibold text-brand-brown-dark">{o.orderId}</td>
                          <td className="px-5 py-3 text-right">{formatPrice(o.orderTotal)}</td>
                          <td className="px-5 py-3 text-right font-bold text-brand-green">{formatPrice(o.commission)}</td>
                          <td className="px-5 py-3 text-center">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                              o.status === 'paid'
                                ? 'bg-green-100 text-green-700'
                                : o.status === 'confirmed'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {o.status === 'paid' ? 'Đã trả' : o.status === 'confirmed' ? 'Xác nhận' : 'Chờ'}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right text-text-light">{formatDate(o.createdAt)}</td>
                          <td className="px-5 py-3 text-center">
                            {o.status === 'pending' && (
                              <button
                                onClick={() => handleMarkPaid(o.id)}
                                className="text-xs px-3 py-1 rounded-full border border-green-400 text-green-600 hover:bg-green-50 font-semibold transition-colors"
                              >
                                Đánh dấu đã trả
                              </button>
                            )}
                            {o.status === 'paid' && (
                              <span className="text-xs text-text-light">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
