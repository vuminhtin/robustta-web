'use client';

import { createContext, useContext, type ReactNode } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AffiliateOrder {
  id: string;           // unique record id
  orderId: string;      // RBTyyyyMMddXXXX
  refCode: string;      // affiliate code that referred this order
  orderTotal: number;   // subtotal (excl. shipping)
  commission: number;   // 5% of orderTotal
  status: 'pending' | 'confirmed' | 'paid';
  createdAt: string;
}

export interface AffiliateStats {
  code: string;
  orders: AffiliateOrder[];
  totalOrders: number;
  totalRevenue: number;
  totalCommission: number;
  pendingCommission: number;
  paidCommission: number;
}

interface AffiliateContextType {
  /** Generate or retrieve affiliate code for a userId */
  getAffiliateCode: (userId: string) => string;
  /** Record a new referral when an order is placed */
  recordReferral: (orderId: string, orderTotal: number, refCode: string) => void;
  /** Get stats for a specific affiliate code */
  getStats: (code: string) => AffiliateStats;
  /** Get ALL affiliate records (for admin) */
  getAllRecords: () => AffiliateOrder[];
  /** Mark a commission as paid (admin action) */
  markPaid: (recordId: string) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'robustta-affiliate-orders';
const CODE_MAP_KEY = 'robustta-affiliate-codes'; // userId → code
const COMMISSION_RATE = 0.05; // 5%

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateCode(userId: string): string {
  // Deterministic: prefix RBT + last 6 chars of userId uppercased
  const base = userId.replace(/[^a-z0-9]/gi, '').toUpperCase();
  const suffix = base.slice(-6).padStart(6, '0');
  return `RBT${suffix}`;
}

function readRecords(): AffiliateOrder[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as AffiliateOrder[];
  } catch {
    return [];
  }
}

function writeRecords(records: AffiliateOrder[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function readCodeMap(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(CODE_MAP_KEY) || '{}');
  } catch {
    return {};
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AffiliateContext = createContext<AffiliateContextType | null>(null);

export function AffiliateProvider({ children }: { children: ReactNode }) {

  const getAffiliateCode = (userId: string): string => {
    const map = readCodeMap();
    if (map[userId]) return map[userId];
    const code = generateCode(userId);
    map[userId] = code;
    localStorage.setItem(CODE_MAP_KEY, JSON.stringify(map));
    return code;
  };

  const recordReferral = (orderId: string, orderTotal: number, refCode: string) => {
    const records = readRecords();
    // Avoid duplicate
    if (records.some(r => r.orderId === orderId)) return;
    const newRecord: AffiliateOrder = {
      id: `aff-${Date.now()}`,
      orderId,
      refCode: refCode.toUpperCase(),
      orderTotal,
      commission: Math.round(orderTotal * COMMISSION_RATE),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    records.push(newRecord);
    writeRecords(records);
  };

  const getStats = (code: string): AffiliateStats => {
    const all = readRecords();
    const orders = all.filter(r => r.refCode === code.toUpperCase());
    const totalRevenue = orders.reduce((s, r) => s + r.orderTotal, 0);
    const totalCommission = orders.reduce((s, r) => s + r.commission, 0);
    const pendingCommission = orders.filter(r => r.status === 'pending').reduce((s, r) => s + r.commission, 0);
    const paidCommission = orders.filter(r => r.status === 'paid').reduce((s, r) => s + r.commission, 0);
    return {
      code,
      orders,
      totalOrders: orders.length,
      totalRevenue,
      totalCommission,
      pendingCommission,
      paidCommission,
    };
  };

  const getAllRecords = (): AffiliateOrder[] => readRecords();

  const markPaid = (recordId: string) => {
    const records = readRecords();
    const rec = records.find(r => r.id === recordId);
    if (rec && rec.status === 'pending') {
      rec.status = 'paid';
      writeRecords(records);
    }
  };

  return (
    <AffiliateContext.Provider value={{ getAffiliateCode, recordReferral, getStats, getAllRecords, markPaid }}>
      {children}
    </AffiliateContext.Provider>
  );
}

export function useAffiliate() {
  const ctx = useContext(AffiliateContext);
  if (!ctx) throw new Error('useAffiliate must be used within AffiliateProvider');
  return ctx;
}
