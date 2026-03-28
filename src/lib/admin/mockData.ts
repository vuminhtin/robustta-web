// Admin mock data — simulates DB data via localStorage
// All functions gracefully fallback to seed data if localStorage is empty

export interface MockOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  address: string;
  province: string;
  items: Array<{ name: string; weight: string; grind: string; quantity: number; price: number }>;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'vietqr' | 'cod' | 'card';
  status: 'pending' | 'packing' | 'shipping' | 'done' | 'cancelled';
  carrier: string;
  trackingCode: string;
  customerType: 'B2C' | 'B2B';
  paidAt: string | null;
  createdAt: string;
}

export interface MockInventory {
  productId: string;
  productName: string;
  variant: string;
  stock: number;
  roastDate: string;
  threshold: number;
}

const SEED_ORDERS: MockOrder[] = [
  {
    id: 'RBT2026032700AA',
    customerName: 'Nguyễn Văn An',
    customerEmail: 'an.nguyen@gmail.com',
    phone: '0901234567',
    address: '123 Nguyễn Huệ, P.Bến Nghé, Q.1',
    province: 'Quận 1',
    items: [{ name: 'R — Rich', weight: '500g', grind: 'Xay phin', quantity: 2, price: 258000 }],
    subtotal: 516000,
    discount: 0,
    shippingFee: 25000,
    total: 541000,
    paymentMethod: 'vietqr',
    status: 'pending',
    carrier: 'GHN',
    trackingCode: '',
    customerType: 'B2C',
    paidAt: null,
    createdAt: '2026-03-27T07:00:00Z',
  },
  {
    id: 'RBT2026032600BB',
    customerName: 'Trần Thị Bình',
    customerEmail: 'binh.tran@company.vn',
    phone: '0912345678',
    address: '456 Đinh Tiên Hoàng, P.1, Q.Bình Thạnh',
    province: 'Bình Thạnh',
    items: [
      { name: 'B — Balanced', weight: '1kg', grind: 'Hạt nguyên', quantity: 5, price: 426000 },
      { name: 'T — Trust', weight: '500g', grind: 'Xay espresso', quantity: 3, price: 328000 },
    ],
    subtotal: 3114000,
    discount: 100000,
    shippingFee: 0,
    total: 3014000,
    paymentMethod: 'vietqr',
    status: 'packing',
    carrier: 'GHTK',
    trackingCode: 'GHTK123456',
    customerType: 'B2B',
    paidAt: '2026-03-26T09:00:00Z',
    createdAt: '2026-03-26T08:30:00Z',
  },
  {
    id: 'RBT2026032500CC',
    customerName: 'Lê Minh Châu',
    customerEmail: 'chau.le@gmail.com',
    phone: '0923456789',
    address: '789 Lê Văn Việt, P.Hiệp Phú, TP.Thủ Đức',
    province: 'Thủ Đức',
    items: [{ name: 'T — Trust', weight: '1kg', grind: 'Xay pour-over', quantity: 1, price: 488000 }],
    subtotal: 488000,
    discount: 48800,
    shippingFee: 25000,
    total: 464200,
    paymentMethod: 'cod',
    status: 'shipping',
    carrier: 'GHN',
    trackingCode: 'GHN789012',
    customerType: 'B2C',
    paidAt: null,
    createdAt: '2026-03-25T14:00:00Z',
  },
  {
    id: 'RBT2026032400DD',
    customerName: 'Phạm Khánh Duy',
    customerEmail: 'duy.pham@hotmail.com',
    phone: '0934567890',
    address: '12 Trần Phú, P.4, Q.5',
    province: 'Quận 5',
    items: [{ name: 'R — Rich', weight: '200g', grind: 'Xay espresso', quantity: 3, price: 128000 }],
    subtotal: 384000,
    discount: 0,
    shippingFee: 25000,
    total: 409000,
    paymentMethod: 'vietqr',
    status: 'done',
    carrier: 'GHN',
    trackingCode: 'GHN345678',
    customerType: 'B2C',
    paidAt: '2026-03-24T10:00:00Z',
    createdAt: '2026-03-24T09:00:00Z',
  },
  {
    id: 'RBT2026032300EE',
    customerName: 'Hoàng Lan Anh',
    customerEmail: 'lananh@gmail.com',
    phone: '0945678901',
    address: '33 Bùi Thị Xuân, Q.Tân Bình',
    province: 'Tân Bình',
    items: [
      { name: 'B — Balanced', weight: '500g', grind: 'Xay phin', quantity: 2, price: 282000 },
    ],
    subtotal: 564000,
    discount: 50000,
    shippingFee: 0,
    total: 514000,
    paymentMethod: 'vietqr',
    status: 'done',
    carrier: 'GHN',
    trackingCode: 'GHN901234',
    customerType: 'B2C',
    paidAt: '2026-03-23T16:00:00Z',
    createdAt: '2026-03-23T15:30:00Z',
  },
];

const SEED_INVENTORY: MockInventory[] = [
  { productId: 'r-rich', productName: 'R — Rich', variant: '500g Xay phin', stock: 48, roastDate: '2026-03-20', threshold: 10 },
  { productId: 'r-rich', productName: 'R — Rich', variant: '1kg Hạt nguyên', stock: 7, roastDate: '2026-03-20', threshold: 10 },
  { productId: 'r-rich', productName: 'R — Rich', variant: '200g Xay espresso', stock: 23, roastDate: '2026-03-22', threshold: 10 },
  { productId: 'b-balanced', productName: 'B — Balanced', variant: '1kg Hạt nguyên', stock: 15, roastDate: '2026-03-18', threshold: 10 },
  { productId: 'b-balanced', productName: 'B — Balanced', variant: '500g Xay phin', stock: 3, roastDate: '2026-03-18', threshold: 10 },
  { productId: 't-trust', productName: 'T — Trust', variant: '1kg Xay pour-over', stock: 12, roastDate: '2026-03-15', threshold: 10 },
  { productId: 't-trust', productName: 'T — Trust', variant: '500g Xay espresso', stock: 0, roastDate: '2026-03-15', threshold: 10 },
  { productId: 't-trust', productName: 'T — Trust', variant: '200g Hạt nguyên', stock: 31, roastDate: '2026-03-22', threshold: 10 },
];

// ── Orders ───────────────────────────────────────────────────────────────────
const ORDERS_KEY = 'rbt_admin_orders';

export function getOrders(): MockOrder[] {
  if (typeof window === 'undefined') return SEED_ORDERS;
  const raw = localStorage.getItem(ORDERS_KEY);
  if (!raw) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(SEED_ORDERS));
    return SEED_ORDERS;
  }
  return JSON.parse(raw);
}

export function saveOrders(orders: MockOrder[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function getOrderById(id: string): MockOrder | undefined {
  return getOrders().find(o => o.id === id);
}

export function updateOrderStatus(id: string, status: MockOrder['status'], trackingCode?: string): void {
  const orders = getOrders();
  const idx = orders.findIndex(o => o.id === id);
  if (idx === -1) return;
  orders[idx].status = status;
  if (trackingCode !== undefined) orders[idx].trackingCode = trackingCode;
  if (status === 'done') orders[idx].paidAt = new Date().toISOString();
  saveOrders(orders);
}

// ── Inventory ────────────────────────────────────────────────────────────────
const INV_KEY = 'rbt_admin_inventory';

export function getInventory(): MockInventory[] {
  if (typeof window === 'undefined') return SEED_INVENTORY;
  const raw = localStorage.getItem(INV_KEY);
  if (!raw) {
    localStorage.setItem(INV_KEY, JSON.stringify(SEED_INVENTORY));
    return SEED_INVENTORY;
  }
  return JSON.parse(raw);
}

export function saveInventory(inv: MockInventory[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(INV_KEY, JSON.stringify(inv));
}

// ── KPI helpers ──────────────────────────────────────────────────────────────
export function getDashboardKPIs() {
  const orders = getOrders();
  const today = new Date().toDateString();
  const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === today);
  const monthRevenue = orders
    .filter(o => o.status === 'done' && new Date(o.createdAt).getMonth() === new Date().getMonth())
    .reduce((s, o) => s + o.total, 0);
  const inv = getInventory();
  const lowStock = inv.filter(i => i.stock <= i.threshold && i.stock > 0).length;
  const outOfStock = inv.filter(i => i.stock === 0).length;
  const pending = orders.filter(o => o.status === 'pending').length;
  return { todayOrders: todayOrders.length, monthRevenue, lowStock, outOfStock, pending };
}

export function formatVND(n: number) {
  return new Intl.NumberFormat('vi-VN').format(n) + 'đ';
}

export function freshnessLabel(roastDate: string): { label: string; color: string } {
  const days = Math.floor((Date.now() - new Date(roastDate).getTime()) / 86400000);
  if (days <= 7) return { label: `${days} ngày (Rất tươi)`, color: '#7fcf9f' };
  if (days <= 21) return { label: `${days} ngày (Tốt)`, color: '#fbbf24' };
  return { label: `${days} ngày (Cần bán gấp)`, color: '#f87171' };
}
