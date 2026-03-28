'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

/**
 * ⚙️ CẦN CẤU HÌNH — Tài khoản / Đăng nhập
 *
 * Hiện tại dùng localStorage để demo. Để production:
 * 1. Tích hợp Supabase Auth hoặc NextAuth.js
 * 2. Thêm NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY vào .env
 * 3. Hoặc thêm NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET vào .env
 */

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  affiliateCode: string;
  createdAt: string;
}

export interface Order {
  id: string;
  orderId: string;
  userId: string;
  items: Array<{
    productId: string;
    productName: string;
    weight: string;
    grind: string;
    quantity: number;
    price: number;
    productImage: string;
  }>;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  carrier: string;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  address: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
  review?: {
    rating: number;
    comment: string;
    createdAt: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  cancelOrder: (orderId: string) => boolean;
  addReview: (orderId: string, rating: number, comment: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USER_STORAGE_KEY = 'robustta-user';
const USERS_STORAGE_KEY = 'robustta-users';
const ORDERS_STORAGE_KEY = 'robustta-orders';

interface StoredUser extends User {
  password: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) as User : null;
    } catch {
      return null;
    }
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored) as User;
      const all = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]') as Order[];
      return all.filter(o => o.userId === parsed.id);
    } catch {
      return [];
    }
  });
  const [isLoading] = useState(false);

  const loadOrders = (userId: string) => {
    try {
      const all = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]') as Order[];
      setOrders(all.filter(o => o.userId === userId));
    } catch {
      setOrders([]);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]') as StoredUser[];
      const found = users.find(u => u.email === email && u.password === password);
      if (!found) return false;
      const { password: _p, ...userData } = found; // eslint-disable-line @typescript-eslint/no-unused-vars
      setUser(userData);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      loadOrders(userData.id);
      return true;
    } catch {
      return false;
    }
  };

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]') as StoredUser[];
      if (users.some(u => u.email === email)) return false;

      const userId = `user-${Date.now()}`;
      // Generate affiliate code: RBT + 6 random alphanumeric chars
      const affiliateCode = 'RBT' + Math.random().toString(36).substring(2, 8).toUpperCase();

      const newUser: StoredUser = {
        id: userId,
        name, email, phone, password,
        affiliateCode,
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

      const { password: _p2, ...userData } = newUser; // eslint-disable-line @typescript-eslint/no-unused-vars
      setUser(userData);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setOrders([]);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const addOrder = (order: Omit<Order, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;
    const now = new Date().toISOString();
    const newOrder: Order = {
      ...order,
      id: `order-${Date.now()}`,
      userId: user.id,
      createdAt: now,
      updatedAt: now,
    };
    const all = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]') as Order[];
    all.push(newOrder);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(all));
    setOrders(prev => [...prev, newOrder]);
  };

  const cancelOrder = (orderId: string): boolean => {
    const all = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]') as Order[];
    const order = all.find(o => o.orderId === orderId);
    if (!order || (order.status !== 'pending' && order.status !== 'confirmed')) return false;
    order.status = 'cancelled';
    order.updatedAt = new Date().toISOString();
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(all));
    if (user) loadOrders(user.id);
    return true;
  };

  const addReview = (orderId: string, rating: number, comment: string): boolean => {
    const all = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]') as Order[];
    const order = all.find(o => o.orderId === orderId);
    if (!order || order.status !== 'delivered') return false;
    order.review = { rating, comment, createdAt: new Date().toISOString() };
    order.updatedAt = new Date().toISOString();
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(all));
    if (user) loadOrders(user.id);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, orders, addOrder, cancelOrder, addReview }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
