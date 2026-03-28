'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, type Order } from '@/context/AuthContext';
import { formatPrice } from '@/data/products';

const STATUS_LABELS: Record<Order['status'], { label: string; color: string; icon: string }> = {
  pending: { label: 'Chờ xác nhận', color: 'text-yellow-600 bg-yellow-50', icon: '🕐' },
  confirmed: { label: 'Đã xác nhận', color: 'text-blue-600 bg-blue-50', icon: '✅' },
  shipping: { label: 'Đang giao', color: 'text-orange-600 bg-orange-50', icon: '🚚' },
  delivered: { label: 'Đã giao', color: 'text-green-600 bg-green-50', icon: '📦' },
  cancelled: { label: 'Đã hủy', color: 'text-red-600 bg-red-50', icon: '❌' },
};

export default function AccountPage() {
  const { user, logout, orders, cancelOrder, addReview, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');
  const [reviewingOrder, setReviewingOrder] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  if (isLoading) {
    return <div className="py-32 text-center text-text-light">Đang tải...</div>;
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleCancelOrder = (orderId: string) => {
    if (confirm('Bạn có chắc muốn hủy đơn hàng này?')) {
      cancelOrder(orderId);
    }
  };

  const handleSubmitReview = (orderId: string) => {
    addReview(orderId, reviewRating, reviewComment);
    setReviewingOrder(null);
    setReviewComment('');
    setReviewRating(5);
  };

  const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-brown-dark">Xin chào, {user.name}!</h1>
            <p className="text-sm text-text-light mt-1">{user.email}</p>
          </div>
          <button
            onClick={() => { logout(); router.push('/'); }}
            className="text-sm text-red-500 font-semibold hover:underline"
          >
            Đăng xuất
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-brand-cream rounded-xl p-1 mb-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'orders' ? 'bg-white text-brand-green shadow-sm' : 'text-text-secondary hover:text-brand-green'
            }`}
          >
            📦 Đơn hàng ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'profile' ? 'bg-white text-brand-green shadow-sm' : 'text-text-secondary hover:text-brand-green'
            }`}
          >
            👤 Thông tin cá nhân
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {sortedOrders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-border">
                <div className="text-4xl mb-4">📋</div>
                <p className="text-text-secondary">Bạn chưa có đơn hàng nào.</p>
                <Link
                  href="/products"
                  className="inline-block mt-4 bg-brand-green text-white font-bold px-6 py-3 rounded-full hover:shadow-md transition-all"
                >
                  Mua sắm ngay
                </Link>
              </div>
            ) : (
              sortedOrders.map(order => {
                const statusInfo = STATUS_LABELS[order.status];
                return (
                  <div key={order.id} className="bg-white rounded-xl border border-border overflow-hidden">
                    {/* Order header */}
                    <div className="p-4 bg-bg-light border-b border-border flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm text-brand-brown-dark">{order.orderId}</span>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
                          {statusInfo.icon} {statusInfo.label}
                        </span>
                      </div>
                      <span className="text-xs text-text-light">
                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>

                    {/* Order items */}
                    <div className="p-4 space-y-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="relative w-12 h-14 rounded-lg overflow-hidden shrink-0 bg-brand-cream">
                            <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-brand-brown-dark truncate">{item.productName}</p>
                            <p className="text-xs text-text-light">{item.weight} · {item.grind} × {item.quantity}</p>
                          </div>
                          <p className="text-sm font-bold text-brand-brown-dark">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>

                    {/* Order footer */}
                    <div className="p-4 border-t border-border flex items-center justify-between">
                      <span className="text-sm text-text-secondary">
                        Tổng: <span className="font-extrabold text-brand-orange text-lg">{formatPrice(order.total)}</span>
                      </span>
                      <div className="flex items-center gap-2">
                        {/* Cancel button */}
                        {(order.status === 'pending' || order.status === 'confirmed') && (
                          <button
                            onClick={() => handleCancelOrder(order.orderId)}
                            className="px-4 py-2 rounded-lg border border-red-200 text-red-500 text-xs font-semibold hover:bg-red-50 transition-colors"
                          >
                            Hủy đơn
                          </button>
                        )}
                        {/* Review button */}
                        {order.status === 'delivered' && !order.review && (
                          <button
                            onClick={() => setReviewingOrder(order.orderId)}
                            className="px-4 py-2 rounded-lg bg-brand-orange text-white text-xs font-bold hover:bg-brand-orange/90 transition-colors"
                          >
                            ⭐ Đánh giá
                          </button>
                        )}
                        {/* Existing review */}
                        {order.review && (
                          <div className="text-xs text-text-light">
                            {'⭐'.repeat(order.review.rating)} {order.review.comment && `"${order.review.comment}"`}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Review form */}
                    {reviewingOrder === order.orderId && (
                      <div className="p-4 border-t border-border bg-brand-cream/30">
                        <h4 className="text-sm font-bold text-brand-brown-dark mb-3">Đánh giá đơn hàng</h4>
                        <div className="flex gap-1 mb-3">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              onClick={() => setReviewRating(star)}
                              className={`text-2xl ${star <= reviewRating ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                        <textarea
                          value={reviewComment}
                          onChange={e => setReviewComment(e.target.value)}
                          placeholder="Chia sẻ trải nghiệm của bạn..."
                          className="w-full border border-border rounded-lg px-4 py-3 text-sm resize-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                          rows={3}
                        />
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => setReviewingOrder(null)}
                            className="px-4 py-2 rounded-lg border border-border text-text-secondary text-sm font-semibold hover:bg-bg-light transition-colors"
                          >
                            Hủy
                          </button>
                          <button
                            onClick={() => handleSubmitReview(order.orderId)}
                            className="px-5 py-2 rounded-lg bg-brand-green text-white text-sm font-bold hover:bg-brand-green-light transition-colors"
                          >
                            Gửi đánh giá
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-lg font-bold text-brand-brown-dark mb-6">Thông tin cá nhân</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1">Họ tên</label>
                  <input
                    type="text" defaultValue={user.name}
                    className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-bg-light"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1">Email</label>
                  <input
                    type="email" defaultValue={user.email}
                    className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-bg-light"
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1">Số điện thoại</label>
                <input
                  type="tel" defaultValue={user.phone}
                  className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-bg-light"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1">Ngày tạo tài khoản</label>
                <input
                  type="text" defaultValue={new Date(user.createdAt).toLocaleDateString('vi-VN')}
                  className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-bg-light"
                  readOnly
                />
              </div>
              <p className="text-xs text-text-light italic">
                ⚙️ Để thay đổi thông tin, vui lòng liên hệ hotline 0889 999 022.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
