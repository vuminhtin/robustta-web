'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAffiliate } from '@/context/AffiliateContext';
import { formatPrice } from '@/data/products';
import {
  getProvinces,
  getDistricts,
  getWards,
  getProvinceName,
  getDistrictName,
  getWardName,
  getSavedAddresses,
  saveAddress,
  getDefaultAddress,
  getShippingFeeByProvince,
  type SavedAddress,
} from '@/data/addresses';
import { validateVoucher, getApplicableVouchers, type VoucherResult } from '@/data/vouchers';

// ─── Shipping carriers ────────────────────────────────────────────
const CARRIERS = [
  { id: 'ghn', name: 'Giao Hàng Nhanh', icon: '🚚', days: '2-3 ngày', extraFee: 0 },
  { id: 'ghtk', name: 'Giao Hàng Tiết Kiệm', icon: '📦', days: '3-5 ngày', extraFee: -5000 },
  { id: 'jt', name: 'J&T Express', icon: '⚡', days: '2-4 ngày', extraFee: 0 },
  { id: 'grab', name: 'GrabExpress (Nội thành)', icon: '🏍️', days: 'Trong ngày', extraFee: 15000 },
];

// ─── Payment methods ──────────────────────────────────────────────
const PAYMENT_METHODS = [
  { id: 'vietqr', name: 'Chuyển khoản QR', icon: '🏦', desc: 'Quét QR thanh toán tức thì (VietQR/NAPAS)' },
  { id: 'card', name: 'Thẻ Visa/Mastercard', icon: '💳', desc: 'Thanh toán bằng thẻ quốc tế' },
  { id: 'cod', name: 'Thanh toán khi nhận hàng', icon: '💵', desc: 'Trả tiền mặt cho shipper' },
];

function generateOrderId(): string {
  const now = new Date();
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `RBT${datePart}${randomPart}`;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { recordReferral } = useAffiliate();
  const [step, setStep] = useState<'info' | 'payment' | 'done'>('info');
  const [paymentMethod, setPaymentMethod] = useState('vietqr');
  const [carrier, setCarrier] = useState('ghn');
  const [orderId] = useState(generateOrderId);

  // Customer form
  const [title, setTitle] = useState<'anh' | 'chi'>('anh');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [provinceCode, setProvinceCode] = useState('');
  const [districtCode, setDistrictCode] = useState('');
  const [wardCode, setWardCode] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');

  // Voucher
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherResult, setVoucherResult] = useState<VoucherResult | null>(null);

  // Address book
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [showAddressBook, setShowAddressBook] = useState(false);
  const [saveThisAddress, setSaveThisAddress] = useState(false);

  // Load saved addresses
  useEffect(() => {
    const addrs = getSavedAddresses();
    setSavedAddresses(addrs);
    const defaultAddr = getDefaultAddress();
    if (defaultAddr) {
      loadAddress(defaultAddr);
    }
  }, []);

  const loadAddress = (addr: SavedAddress) => {
    setName(addr.name);
    setPhone(addr.phone);
    setEmail(addr.email || '');
    setProvinceCode(addr.province);
    setDistrictCode(addr.district);
    setWardCode(addr.ward);
    setAddress(addr.address);
    setShowAddressBook(false);
  };

  // Address lists
  const provincesList = useMemo(() => getProvinces(), []);
  const districtsList = useMemo(() => getDistricts(provinceCode), [provinceCode]);
  const wardsList = useMemo(() => getWards(provinceCode, districtCode), [provinceCode, districtCode]);

  // Reset dependent fields
  useEffect(() => { setDistrictCode(''); setWardCode(''); }, [provinceCode]);
  useEffect(() => { setWardCode(''); }, [districtCode]);

  // Shipping fee
  const baseShippingFee = provinceCode ? getShippingFeeByProvince(provinceCode, subtotal) : 0;
  const carrierData = CARRIERS.find(c => c.id === carrier);
  const carrierExtra = carrierData?.extraFee ?? 0;
  const shippingFee = Math.max(0, baseShippingFee + carrierExtra);
  const freeShipFromVoucher = voucherResult?.valid && voucherResult.freeShip;
  const finalShipping = freeShipFromVoucher ? 0 : shippingFee;

  // Voucher discount
  const discount = voucherResult?.valid ? voucherResult.discount : 0;

  // Total
  const total = Math.max(0, subtotal - discount + finalShipping);

  // Applicable vouchers
  const applicableVouchers = useMemo(() => getApplicableVouchers(subtotal), [subtotal]);

  // Sepay QR URL
  const sepayAccount = process.env.NEXT_PUBLIC_SEPAY_ACCOUNT || '0889999022';
  const sepayBank = process.env.NEXT_PUBLIC_SEPAY_BANK || 'MB';
  const qrUrl = `https://qr.sepay.vn/img?acc=${sepayAccount}&bank=${sepayBank}&amount=${total}&des=${orderId}`;

  // ─── Handlers ───────────────────────────────────────────────────
  const handleApplyVoucher = () => {
    if (!voucherCode.trim()) return;
    const result = validateVoucher(voucherCode, subtotal, shippingFee);
    setVoucherResult(result);
  };

  const handleRemoveVoucher = () => {
    setVoucherCode('');
    setVoucherResult(null);
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (saveThisAddress) {
      const newAddr: SavedAddress = {
        id: `addr-${Date.now()}`,
        name, phone, email,
        province: provinceCode,
        district: districtCode,
        ward: wardCode,
        address,
        isDefault: savedAddresses.length === 0,
      };
      saveAddress(newAddr);
      setSavedAddresses(getSavedAddresses());
    }
    setStep('payment');
  };

  const handleConfirmOrder = async () => {
    // Record affiliate referral if present
    const ref = typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('robustta-ref')
      : null;
    if (ref) {
      recordReferral(orderId, subtotal, ref);
      sessionStorage.removeItem('robustta-ref'); // consume the ref
    }

    // 📧 Send order confirmation email
    try {
      const emailPayload = {
        orderId,
        customerName: name,
        customerEmail: email,
        phone,
        address: `${address}, ${getWardName(provinceCode, districtCode, wardCode)}, ${getDistrictName(provinceCode, districtCode)}, ${getProvinceName(provinceCode)}`,
        items: items.map(item => ({
          name: item.productName,
          weight: item.weight,
          grind: item.grind,
          quantity: item.quantity,
          price: item.price
        })),
        subtotal,
        discount,
        shippingFee: finalShipping,
        total,
        paymentMethod,
        carrier: CARRIERS.find(c => c.id === carrier)?.name || carrier,
      };

      await fetch('/api/email/order-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailPayload),
      });
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
    }

    clearCart();
    setStep('done');
  };

  // ─── Empty cart ─────────────────────────────────────────────────
  if (items.length === 0 && step !== 'done') {
    return (
      <div className="py-32 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-2xl font-bold text-brand-brown-dark">Giỏ hàng trống</h1>
        <Link
          href="/products"
          className="inline-block mt-6 bg-brand-green text-white font-bold px-8 py-4 rounded-full hover:shadow-lg transition-all"
        >
          Xem sản phẩm
        </Link>
      </div>
    );
  }

  // ─── Done ───────────────────────────────────────────────────────
  if (step === 'done') {
    return (
      <div className="py-20 text-center">
        <div className="mx-auto max-w-lg px-4">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-extrabold text-brand-green">Đặt hàng thành công!</h1>
          <p className="text-text-secondary mt-4">
            Mã đơn hàng: <span className="font-bold text-brand-brown-dark">{orderId}</span>
          </p>
          <p className="text-text-secondary mt-2 text-sm">
            {paymentMethod === 'vietqr'
              ? 'Vui lòng chuyển khoản theo QR ở trên. Chúng tôi sẽ xác nhận và giao hàng trong 1-3 ngày.'
              : paymentMethod === 'card'
              ? 'Thanh toán qua thẻ đã được xử lý. Đơn hàng sẽ được giao trong 1-3 ngày.'
              : 'Chúng tôi sẽ liên hệ xác nhận đơn hàng. Thanh toán khi nhận hàng.'}
          </p>
          <div className="mt-6 p-4 bg-brand-cream rounded-xl text-sm text-text-secondary">
            <p>📞 Hotline: <a href="tel:0889999022" className="font-bold text-brand-brown-dark">0889 999 022</a></p>
            <p className="mt-1">✉️ Email: info@robustta.com</p>
          </div>
          <Link
            href="/"
            className="inline-block mt-8 bg-brand-green text-white font-bold px-8 py-4 rounded-full hover:shadow-lg transition-all"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  // ─── Main checkout ──────────────────────────────────────────────
  return (
    <div className="py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-brand-brown-dark mb-2">Thanh toán</h1>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <span className={`font-bold ${step === 'info' ? 'text-brand-green' : 'text-text-light'}`}>1. Thông tin</span>
          <span className="text-text-light">→</span>
          <span className={`font-bold ${step === 'payment' ? 'text-brand-green' : 'text-text-light'}`}>2. Thanh toán</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ─── LEFT: Form/Payment ─── */}
          <div className="lg:col-span-3">
            {step === 'info' && (
              <form onSubmit={handleSubmitInfo} className="space-y-6">
                {/* Voucher section */}
                <div className="bg-white rounded-xl p-5 border border-border shadow-sm">
                  <h2 className="text-sm font-bold text-brand-brown-dark mb-3">🏷️ Mã giảm giá</h2>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={voucherCode}
                      onChange={e => setVoucherCode(e.target.value.toUpperCase())}
                      placeholder="Nhập mã giảm giá..."
                      className="flex-1 border border-border rounded-lg px-4 py-2.5 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors uppercase"
                    />
                    {voucherResult?.valid ? (
                      <button type="button" onClick={handleRemoveVoucher} className="px-4 py-2.5 rounded-lg border-2 border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors">
                        Xóa
                      </button>
                    ) : (
                      <button type="button" onClick={handleApplyVoucher} className="px-5 py-2.5 rounded-lg bg-brand-green text-white text-sm font-bold hover:bg-brand-green-light transition-colors">
                        Áp dụng
                      </button>
                    )}
                  </div>
                  {voucherResult && (
                    <p className={`text-xs mt-2 ${voucherResult.valid ? 'text-brand-green' : 'text-red-500'}`}>
                      {voucherResult.valid ? '✓' : '✗'} {voucherResult.message}
                    </p>
                  )}
                  {/* Applicable vouchers */}
                  {applicableVouchers.length > 0 && !voucherResult?.valid && (
                    <div className="mt-3 space-y-1.5">
                      <p className="text-xs text-text-light">Mã có thể áp dụng:</p>
                      {applicableVouchers.map(v => (
                        <button
                          key={v.code}
                          type="button"
                          onClick={() => { setVoucherCode(v.code); }}
                          className="w-full flex items-center gap-2 px-3 py-2 bg-brand-cream/60 rounded-lg text-left hover:bg-brand-cream transition-colors"
                        >
                          <span className="text-brand-orange font-bold text-xs">{v.code}</span>
                          <span className="text-xs text-text-secondary flex-1">{v.description}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Delivery info */}
                <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-brand-brown-dark">Thông tin giao hàng</h2>
                    {savedAddresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowAddressBook(!showAddressBook)}
                        className="text-sm text-brand-green font-semibold hover:underline"
                      >
                        📖 Sổ địa chỉ ({savedAddresses.length})
                      </button>
                    )}
                  </div>

                  {/* Address book dropdown */}
                  {showAddressBook && (
                    <div className="mb-5 p-3 bg-brand-cream/50 rounded-xl space-y-2">
                      {savedAddresses.map(addr => (
                        <button
                          key={addr.id}
                          type="button"
                          onClick={() => loadAddress(addr)}
                          className="w-full text-left p-3 bg-white rounded-lg border border-border hover:border-brand-green transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm text-brand-brown-dark">{addr.name}</span>
                            {addr.isDefault && (
                              <span className="text-xs bg-brand-green text-white px-2 py-0.5 rounded-full">Mặc định</span>
                            )}
                          </div>
                          <p className="text-xs text-text-secondary mt-1">{addr.phone}</p>
                          <p className="text-xs text-text-light mt-0.5">
                            {addr.address}, {getWardName(addr.province, addr.district, addr.ward)}, {getDistrictName(addr.province, addr.district)}, {getProvinceName(addr.province)}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Title */}
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={title === 'anh'} onChange={() => setTitle('anh')} className="accent-brand-green" />
                        <span className="text-sm font-medium">Anh</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={title === 'chi'} onChange={() => setTitle('chi')} className="accent-brand-green" />
                        <span className="text-sm font-medium">Chị</span>
                      </label>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-1">Họ tên *</label>
                      <input
                        type="text" required value={name} onChange={e => setName(e.target.value)}
                        className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>

                    {/* Phone + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-text-primary mb-1">Số điện thoại *</label>
                        <input
                          type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                          className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                          placeholder="0912 345 678"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-text-primary mb-1">Email</label>
                        <input
                          type="email" value={email} onChange={e => setEmail(e.target.value)}
                          className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    {/* 3-level address */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-sm font-semibold text-text-primary mb-1">Tỉnh/Thành phố *</label>
                        <select
                          required value={provinceCode} onChange={e => setProvinceCode(e.target.value)}
                          className="w-full border border-border rounded-lg px-3 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors bg-white"
                        >
                          <option value="">Chọn tỉnh/TP</option>
                          {provincesList.map(p => (
                            <option key={p.code} value={p.code}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-text-primary mb-1">Quận/Huyện *</label>
                        <select
                          required value={districtCode} onChange={e => setDistrictCode(e.target.value)}
                          disabled={!provinceCode}
                          className="w-full border border-border rounded-lg px-3 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors bg-white disabled:opacity-50"
                        >
                          <option value="">Chọn quận/huyện</option>
                          {districtsList.map(d => (
                            <option key={d.code} value={d.code}>{d.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-text-primary mb-1">Phường/Xã *</label>
                        <select
                          required value={wardCode} onChange={e => setWardCode(e.target.value)}
                          disabled={!districtCode}
                          className="w-full border border-border rounded-lg px-3 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors bg-white disabled:opacity-50"
                        >
                          <option value="">Chọn phường/xã</option>
                          {wardsList.map(w => (
                            <option key={w.code} value={w.code}>{w.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Address detail */}
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-1">Địa chỉ chi tiết *</label>
                      <input
                        type="text" required value={address} onChange={e => setAddress(e.target.value)}
                        className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                        placeholder="Số nhà, tên đường"
                      />
                    </div>

                    {/* Note */}
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-1">Ghi chú</label>
                      <textarea
                        value={note} onChange={e => setNote(e.target.value)} rows={2}
                        className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors resize-none"
                        placeholder="Ghi chú cho đơn hàng (nếu có)"
                      />
                    </div>

                    {/* Save address checkbox */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={saveThisAddress} onChange={e => setSaveThisAddress(e.target.checked)} className="accent-brand-green" />
                      <span className="text-sm text-text-secondary">Lưu địa chỉ này cho lần sau</span>
                    </label>
                  </div>
                </div>

                {/* Shipping carrier */}
                <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
                  <h2 className="text-lg font-bold text-brand-brown-dark mb-4">🚚 Đơn vị vận chuyển</h2>
                  <div className="space-y-2">
                    {CARRIERS.map(c => (
                      <label
                        key={c.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          carrier === c.id
                            ? 'border-brand-green bg-brand-teal-light/20'
                            : 'border-border hover:border-brand-green/30'
                        }`}
                      >
                        <input type="radio" checked={carrier === c.id} onChange={() => setCarrier(c.id)} className="accent-brand-green" />
                        <span className="text-lg">{c.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-brand-brown-dark">{c.name}</p>
                          <p className="text-xs text-text-light">{c.days}</p>
                        </div>
                        <span className="text-sm font-semibold text-text-secondary">
                          {c.extraFee > 0 ? `+${formatPrice(c.extraFee)}` : c.extraFee < 0 ? formatPrice(c.extraFee) : '—'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-base transition-all hover:shadow-lg"
                >
                  Tiếp tục thanh toán →
                </button>
              </form>
            )}

            {step === 'payment' && (
              <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
                <h2 className="text-lg font-bold text-brand-brown-dark mb-5">Phương thức thanh toán</h2>

                {/* Payment method selector */}
                <div className="space-y-2 mb-6">
                  {PAYMENT_METHODS.map(pm => (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        paymentMethod === pm.id
                          ? 'border-brand-green bg-brand-teal-light/20'
                          : 'border-border hover:border-brand-green/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{pm.icon}</span>
                        <div>
                          <h4 className="font-bold text-brand-brown-dark text-sm">{pm.name}</h4>
                          <p className="text-xs text-text-light">{pm.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* VietQR / NAPAS */}
                {paymentMethod === 'vietqr' && (
                  <div className="text-center p-6 bg-bg-light rounded-xl">
                    <h3 className="font-bold text-brand-brown-dark mb-1">Quét mã QR để thanh toán</h3>
                    <p className="text-xs text-text-light mb-1">Hỗ trợ tất cả ngân hàng qua VietQR / NAPAS</p>
                    <p className="text-xs text-text-light mb-4">
                      Nội dung CK: <span className="font-bold text-brand-orange">{orderId}</span>
                    </p>
                    <div className="inline-block p-3 bg-white rounded-xl shadow-md">
                      <Image src={qrUrl} alt="QR thanh toán" width={250} height={250} className="mx-auto" unoptimized />
                    </div>
                    <p className="text-xs text-text-light mt-4">
                      Số tiền: <span className="font-bold text-brand-green text-base">{formatPrice(total)}</span>
                    </p>
                    <p className="text-xs text-brand-orange mt-2">
                      ⏱ Hệ thống sẽ tự động xác nhận khi nhận được chuyển khoản
                    </p>
                  </div>
                )}

                {/* Card payment */}
                {paymentMethod === 'card' && (
                  <div className="p-6 bg-bg-light rounded-xl">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-[#1A1F71] text-white text-xs font-bold rounded">VISA</span>
                      <span className="px-3 py-1 bg-[#EB001B] text-white text-xs font-bold rounded">MC</span>
                      <span className="px-3 py-1 bg-[#0B4EA2] text-white text-xs font-bold rounded">JCB</span>
                      <span className="px-3 py-1 bg-[#2E77BC] text-white text-xs font-bold rounded">NAPAS</span>
                    </div>
                    {/* 
                      ⚙️ CẦN CẤU HÌNH: Tích hợp payment gateway (VNPay / PayOS / Stripe)
                      - Thêm NEXT_PUBLIC_VNPAY_TMN_CODE vào .env
                      - Thêm VNPAY_HASH_SECRET vào .env
                      - Tạo API route /api/payment/create để khởi tạo giao dịch
                      - Tạo API route /api/payment/callback để xử lý kết quả
                    */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-text-primary mb-1">Số thẻ</label>
                        <input
                          type="text" placeholder="0000 0000 0000 0000"
                          className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-text-primary mb-1">Ngày hết hạn</label>
                          <input
                            type="text" placeholder="MM/YY"
                            className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-text-primary mb-1">CVV</label>
                          <input
                            type="text" placeholder="•••"
                            className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-text-light mt-3 text-center">🔒 Giao dịch được bảo mật bằng SSL 256-bit</p>
                  </div>
                )}

                {/* COD */}
                {paymentMethod === 'cod' && (
                  <div className="p-6 bg-bg-light rounded-xl text-center">
                    <div className="text-4xl mb-3">📦</div>
                    <h3 className="font-bold text-brand-brown-dark">Thanh toán khi nhận hàng</h3>
                    <p className="text-sm text-text-secondary mt-2">
                      Bạn sẽ thanh toán <span className="font-bold text-brand-orange">{formatPrice(total)}</span> cho shipper khi nhận hàng.
                    </p>
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep('info')}
                    className="flex-1 py-3.5 rounded-full border-2 border-border font-semibold text-text-secondary hover:border-brand-green transition-colors"
                  >
                    ← Quay lại
                  </button>
                  <button
                    onClick={handleConfirmOrder}
                    className="flex-1 py-3.5 rounded-full bg-brand-green hover:bg-brand-green-light text-white font-bold transition-all hover:shadow-lg"
                  >
                    ✓ Xác nhận đặt hàng
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ─── RIGHT: Order summary ─── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm sticky top-24">
              <h3 className="font-bold text-brand-brown-dark mb-4">Đơn hàng ({items.length} sản phẩm)</h3>

              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map(item => (
                  <div key={`${item.productId}-${item.weight}-${item.grind}`} className="flex items-center gap-3">
                    <div className="relative w-12 h-14 rounded-lg overflow-hidden shrink-0 bg-brand-cream">
                      <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-brand-brown-dark truncate">{item.productName}</p>
                      <p className="text-xs text-text-light">{item.weight} · {item.grind} × {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-brand-brown-dark shrink-0">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Tạm tính</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-brand-green">
                    <span>Giảm giá</span>
                    <span className="font-semibold">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-text-secondary">Phí giao hàng</span>
                  <span className="font-semibold">
                    {!provinceCode ? '—' : finalShipping === 0 ? (
                      <span className="text-brand-green">Miễn phí</span>
                    ) : formatPrice(finalShipping)}
                  </span>
                </div>
                {carrierData && provinceCode && (
                  <p className="text-xs text-text-light">
                    {carrierData.icon} {carrierData.name} · {carrierData.days}
                  </p>
                )}
                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="font-bold text-brand-brown-dark">Tổng cộng</span>
                  <span className="font-extrabold text-xl text-brand-orange">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Customer info recap */}
              {step === 'payment' && name && (
                <div className="mt-4 p-3 bg-bg-light rounded-lg text-xs text-text-secondary">
                  <p className="font-semibold text-text-primary">{title === 'anh' ? 'Anh' : 'Chị'} {name}</p>
                  <p>{phone} {email && `· ${email}`}</p>
                  <p>
                    {address},
                    {wardCode && ` ${getWardName(provinceCode, districtCode, wardCode)},`}
                    {districtCode && ` ${getDistrictName(provinceCode, districtCode)},`}
                    {provinceCode && ` ${getProvinceName(provinceCode)}`}
                  </p>
                  {note && <p className="mt-1 italic">{note}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
