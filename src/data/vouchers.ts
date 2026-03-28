// Voucher / Coupon system

export interface Voucher {
  code: string;
  type: 'percent' | 'fixed' | 'freeship';
  value: number; // percent (0-100) or fixed amount (VND)
  minOrder: number;
  maxDiscount?: number; // cap for percent discounts
  description: string;
  expiresAt: string; // ISO date
  isActive: boolean;
}

// Sample vouchers — in production, fetch from API/database
export const vouchers: Voucher[] = [
  {
    code: 'WELCOME10',
    type: 'percent',
    value: 10,
    minOrder: 200000,
    maxDiscount: 50000,
    description: 'Giảm 10% cho đơn đầu tiên (tối đa 50K)',
    expiresAt: '2026-12-31',
    isActive: true,
  },
  {
    code: 'ROBUSTTA50',
    type: 'fixed',
    value: 50000,
    minOrder: 500000,
    description: 'Giảm 50.000đ cho đơn từ 500K',
    expiresAt: '2026-06-30',
    isActive: true,
  },
  {
    code: 'FREESHIP',
    type: 'freeship',
    value: 0,
    minOrder: 300000,
    description: 'Miễn phí giao hàng cho đơn từ 300K',
    expiresAt: '2026-12-31',
    isActive: true,
  },
  {
    code: 'TET2026',
    type: 'percent',
    value: 15,
    minOrder: 400000,
    maxDiscount: 100000,
    description: 'Ưu đãi Tết — Giảm 15% (tối đa 100K)',
    expiresAt: '2026-02-28',
    isActive: false,
  },
];

export interface VoucherResult {
  valid: boolean;
  message: string;
  discount: number;
  freeShip: boolean;
  voucher?: Voucher;
}

export function validateVoucher(code: string, subtotal: number, shippingFee: number): VoucherResult {
  const voucher = vouchers.find(v => v.code.toUpperCase() === code.toUpperCase());

  if (!voucher) {
    return { valid: false, message: 'Mã giảm giá không tồn tại', discount: 0, freeShip: false };
  }

  if (!voucher.isActive) {
    return { valid: false, message: 'Mã giảm giá đã hết hiệu lực', discount: 0, freeShip: false };
  }

  const now = new Date();
  if (new Date(voucher.expiresAt) < now) {
    return { valid: false, message: 'Mã giảm giá đã hết hạn', discount: 0, freeShip: false };
  }

  if (subtotal < voucher.minOrder) {
    return {
      valid: false,
      message: `Đơn hàng tối thiểu ${new Intl.NumberFormat('vi-VN').format(voucher.minOrder)}đ`,
      discount: 0,
      freeShip: false,
    };
  }

  switch (voucher.type) {
    case 'percent': {
      let discount = Math.round(subtotal * voucher.value / 100);
      if (voucher.maxDiscount) discount = Math.min(discount, voucher.maxDiscount);
      return { valid: true, message: voucher.description, discount, freeShip: false, voucher };
    }
    case 'fixed':
      return { valid: true, message: voucher.description, discount: voucher.value, freeShip: false, voucher };
    case 'freeship':
      return { valid: true, message: voucher.description, discount: 0, freeShip: true, voucher };
    default:
      return { valid: false, message: 'Lỗi không xác định', discount: 0, freeShip: false };
  }
}

// Get applicable vouchers for a subtotal
export function getApplicableVouchers(subtotal: number): Voucher[] {
  const now = new Date();
  return vouchers.filter(v =>
    v.isActive &&
    new Date(v.expiresAt) >= now &&
    subtotal >= v.minOrder
  );
}
