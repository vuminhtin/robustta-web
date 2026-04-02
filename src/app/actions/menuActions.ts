'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Stable Fallback Data
const INITIAL_MENUS = [
  { id: 'm1', label: 'Trang chủ', url: '/', location: 'header', sortOrder: 1, isActive: true },
  { id: 'm2', label: 'Sản phẩm', url: '/products', location: 'header', sortOrder: 2, isActive: true },
  { id: 'm3', label: 'Set quà', url: '/gift-sets', location: 'header', sortOrder: 3, isActive: false },
  { id: 'm4', label: 'Blog', url: '/blog', location: 'header', sortOrder: 4, isActive: true },
  { id: 'm5', label: 'Câu chuyện', url: '/about', location: 'header', sortOrder: 5, isActive: true },
  { id: 'm6', label: 'Liên hệ', url: '/contact', location: 'header', sortOrder: 6, isActive: true },
  
  { id: 'f1', label: 'Chính sách bảo mật', url: '/privacy', location: 'footer', sortOrder: 1, isActive: true },
  { id: 'f2', label: 'Điều khoản dịch vụ', url: '/terms', location: 'footer', sortOrder: 2, isActive: true },
  { id: 'f3', label: 'Chính sách vận chuyển', url: '/shipping', location: 'footer', sortOrder: 3, isActive: true },
  { id: 'f4', label: 'Chính sách đổi trả', url: '/returns', location: 'footer', sortOrder: 4, isActive: true },
];

export async function getMenuItems(location: 'header' | 'footer', includeInactive = false) {
  try {
    // Return early if no DB connection to avoid timeout
    if (!prisma) return INITIAL_MENUS.filter(m => m.location === location);

    const items = await prisma.menuItem.findMany({
      where: {
        location,
        ...(includeInactive ? {} : { isActive: true }),
      },
      orderBy: { sortOrder: 'asc' },
    });

    if (!items || items.length === 0) {
      return INITIAL_MENUS.filter(m => m.location === location);
    }
    // Return Prisma items directly (schema lacks createdAt field)
    return items;
  } catch (error) {
    // Explicitly handle ECONNREFUSED/KnownRequestError
    console.warn('DB Connection Refused - Using Menu Fallbacks:', (error as any).code || 'UNKNOWN');
    return INITIAL_MENUS.filter(m => m.location === location && (includeInactive || m.isActive));
  }
}

export async function toggleMenuItem(id: string, isActive: boolean) {
  try {
    const item = await prisma.menuItem.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath('/');
    revalidatePath('/admin/menus');
    return { success: true, item };
  } catch (error) {
    console.error('Toggle Menu Error:', error);
    return { success: false, error: 'Database update failed' };
  }
}

export async function createMenuItem(data: any) {
  try {
    const item = await prisma.menuItem.create({
      data,
    });
    revalidatePath('/');
    revalidatePath('/admin/menus');
    return { success: true, item };
  } catch (error) {
    console.error('Create Menu Error:', error);
    return { success: false, error: 'Cannot create menu item' };
  }
}

export async function deleteMenuItem(id: string) {
  try {
    await prisma.menuItem.delete({
      where: { id },
    });
    revalidatePath('/');
    revalidatePath('/admin/menus');
    return { success: true };
  } catch (error) {
    console.error('Delete Menu Error:', error);
    return { success: false, error: 'Cannot delete menu item' };
  }
}
