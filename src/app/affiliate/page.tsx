'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useAffiliate, type AffiliateStats } from '@/context/AffiliateContext';
import { formatPrice } from '@/data/products';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('vi-VN');
}

export default function AffiliatePage() {
  const { user, isLoading } = useAuth();
  const { getStats } = useAffiliate();
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user?.affiliateCode) {
      setStats(getStats(user.affiliateCode));
    }
  }, [user, getStats]);

  const affiliateLink =
    typeof window !== 'undefined'
      ? `${window.location.origin}/?ref=${user?.affiliateCode ?? ''}`
      : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="py-32 text-center text-text-secondary animate-pulse">
        Đang tải…
      </div>
    );
  }

  // ── Not logged in ──────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="py-32 text-center px-4">
        <div className="text-6xl mb-6">🔗</div>
        <h1 className="text-2xl font-extrabold text-brand-brown-dark mb-3">
          Chương trình Affiliate RobustTA
        </h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Đăng nhập để xem mã giới thiệu và theo dõi hoa hồng của bạn.
        </p>
        <Link
          href="/login?redirect=/affiliate"
          className="inline-block bg-brand-green text-white font-bold px-8 py-4 rounded-full hover:shadow-lg transition-all"
        >
          Đăng nhập / Đăng ký
        </Link>
      </div>
    );
  }

  const code = user.affiliateCode;
  const shareZalo = `https://zalo.me/share?text=${encodeURIComponent(`Mua cà phê RobustTA ngon số 1! Dùng link này để nhận ưu đãi: ${affiliateLink}`)}`;
  const shareFB = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(affiliateLink)}`;

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="text-3xl font-extrabold text-brand-brown-dark mb-2">
          Chương trình Affiliate 🤝
        </h1>
        <p className="text-text-secondary mb-8">
          Giới thiệu bạn bè mua hàng — nhận hoa hồng{' '}
          <span className="font-bold text-brand-green">5%</span> mỗi đơn hàng thành công.
        </p>

        {/* ── Referral link card ────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 mb-6">
          <h2 className="text-sm font-bold text-text-secondary uppercase tracking-wide mb-4">
            Mã & link giới thiệu của bạn
          </h2>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-extrabold tracking-widest text-brand-green">
              {code}
            </span>
          </div>

          {/* Link copy */}
          <div className="flex gap-2 mb-4">
            <input
              readOnly
              value={affiliateLink}
              className="flex-1 border border-border rounded-lg px-4 py-2.5 text-sm text-text-secondary bg-bg-light truncate"
            />
            <button
              onClick={handleCopy}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                copied
                  ? 'bg-brand-green text-white'
                  : 'border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white'
              }`}
            >
              {copied ? '✓ Đã copy' : 'Copy'}
            </button>
          </div>

          {/* Share buttons */}
          <div className="flex gap-3">
            <a
              href={shareZalo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0068FF] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Chia sẻ Zalo
            </a>
            <a
              href={shareFB}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1877F2] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Chia sẻ Facebook
            </a>
          </div>
        </div>

        {/* ── Stats row ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Tổng đơn', value: String(stats?.totalOrders ?? 0), icon: '📦' },
            { label: 'Doanh thu giới thiệu', value: formatPrice(stats?.totalRevenue ?? 0), icon: '🛒' },
            { label: 'Hoa hồng đang chờ', value: formatPrice(stats?.pendingCommission ?? 0), icon: '⏳', accent: true },
            { label: 'Đã thanh toán', value: formatPrice(stats?.paidCommission ?? 0), icon: '✅' },
          ].map(item => (
            <div
              key={item.label}
              className={`bg-white rounded-xl border p-4 text-center shadow-sm ${
                item.accent ? 'border-brand-orange/40' : 'border-border'
              }`}
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className={`text-lg font-extrabold ${item.accent ? 'text-brand-orange' : 'text-brand-brown-dark'}`}>
                {item.value}
              </div>
              <div className="text-xs text-text-light mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        {/* ── Order table ──────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-bold text-brand-brown-dark">Lịch sử hoa hồng</h2>
          </div>
          {!stats?.orders.length ? (
            <div className="py-12 text-center text-text-secondary">
              <div className="text-4xl mb-3">📭</div>
              <p>Chưa có đơn hàng nào từ link của bạn.</p>
              <p className="text-sm mt-1 text-text-light">Chia sẻ link ở trên để bắt đầu kiếm hoa hồng!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-bg-light text-text-secondary text-xs uppercase">
                  <tr>
                    <th className="px-5 py-3 text-left">Mã đơn</th>
                    <th className="px-5 py-3 text-right">Giá trị đơn</th>
                    <th className="px-5 py-3 text-right">Hoa hồng (5%)</th>
                    <th className="px-5 py-3 text-center">Trạng thái</th>
                    <th className="px-5 py-3 text-right">Ngày</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.orders.map((o, i) => (
                    <tr key={o.id} className={i % 2 === 0 ? 'bg-white' : 'bg-bg-light/30'}>
                      <td className="px-5 py-3 font-mono text-brand-brown-dark font-semibold">{o.orderId}</td>
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
                          {o.status === 'paid' ? 'Đã trả' : o.status === 'confirmed' ? 'Xác nhận' : 'Đang chờ'}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right text-text-light">{formatDate(o.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── How it works ────────────────────────────────────────────── */}
        <div className="bg-brand-cream rounded-2xl p-6">
          <h2 className="font-bold text-brand-brown-dark mb-4">📖 Cách hoạt động</h2>
          <ol className="space-y-3 text-sm text-text-secondary">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-green text-white text-xs flex items-center justify-center shrink-0 font-bold">1</span>
              <span>Copy link giới thiệu của bạn (có chứa mã <strong>{code}</strong>) và chia sẻ cho bạn bè.</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-green text-white text-xs flex items-center justify-center shrink-0 font-bold">2</span>
              <span>Khi bạn bè click vào link và đặt hàng, đơn hàng được ghi nhận vào tài khoản của bạn.</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-green text-white text-xs flex items-center justify-center shrink-0 font-bold">3</span>
              <span>Bạn nhận <strong>5% hoa hồng</strong> trên giá trị đơn hàng (không tính phí ship).</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-green text-white text-xs flex items-center justify-center shrink-0 font-bold">4</span>
              <span>RobustTA chuyển khoản hoa hồng cho bạn sau khi đơn hàng được giao thành công. Liên hệ <strong>0889 999 022</strong> để yêu cầu thanh toán.</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
