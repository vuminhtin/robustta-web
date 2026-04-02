'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Emergency Restore: Using hardcoded data with EXACT names expected by page.tsx
const INITIAL_SECTIONS = [
  { id: 'sec1', name: 'hero', label: 'Hero Banner', isActive: true, sortOrder: 1 },
  { id: 'sec2', name: 'story', label: 'Vì sao chọn RobustTA', isActive: true, sortOrder: 2 },
  { id: 'sec3', name: 'promo', label: 'Khuyến mãi đặc biệt', isActive: true, sortOrder: 3 },
  { id: 'sec4', name: 'products', label: 'Sản phẩm chủ lực', isActive: true, sortOrder: 4 },
  { id: 'sec5', name: 'brewing', label: 'Hướng dẫn pha chế', isActive: true, sortOrder: 5 },
  { id: 'sec6', name: 'shipping', label: 'Thông tin giao hàng', isActive: true, sortOrder: 6 },
];

export async function getPageSections(includeInactive = false) {
  try {
    // Return early if no DB connection to avoid timeout
    if (!prisma) return INITIAL_SECTIONS;

    const sections = await prisma.pageSection.findMany({
      orderBy: { sortOrder: 'asc' },
    });

    if (!sections || sections.length === 0) {
      return INITIAL_SECTIONS;
    }

    // Return sections directly if available
    return sections.filter((s: any) => includeInactive || s.isActive);
  } catch (error) {
    // Explicitly handle ECONNREFUSED/KnownRequestError to prevent Next.js Error Overlay
    console.warn('DB Connection Refused - Using App Fallbacks:', (error as any).code || 'UNKNOWN');
    return INITIAL_SECTIONS.filter(s => includeInactive || s.isActive);
  }
}

export async function togglePageSection(id: string, isActive: boolean) {
  try {
    const section = await prisma.pageSection.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath('/');
    revalidatePath('/admin/content');
    return { success: true, section };
  } catch (error) {
    console.error('Toggle Section Error:', error);
    return { success: false, error: 'Database update failed' };
  }
}
