'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getAffiliates() {
  try {
    return await prisma.affiliate.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Error fetching affiliates:', error);
    return [];
  }
}

export async function updateAffiliateRate(id: string, rate: number) {
  try {
    const updated = await prisma.affiliate.update({
      where: { id },
      data: { commissionRate: rate }
    });
    revalidatePath('/admin/affiliate');
    return { success: true, affiliate: updated };
  } catch (error) {
    return { success: false, error: 'Cannot update rate' };
  }
}

export async function toggleAffiliateStatus(id: string, status: 'ACTIVE' | 'SUSPENDED') {
  try {
    const updated = await prisma.affiliate.update({
      where: { id },
      data: { status }
    });
    revalidatePath('/admin/affiliate');
    return { success: true, affiliate: updated };
  } catch (error) {
    return { success: false, error: 'Cannot update status' };
  }
}

export async function getAffiliateStats(userId: string) {
  try {
    const affiliate = await prisma.affiliate.findUnique({
      where: { userId },
      include: {
        commissions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            order: true
          }
        }
      }
    });

    if (!affiliate) return null;

    return {
      stats: {
        totalSales: affiliate.totalSales,
        totalCommission: affiliate.totalCommission,
        balance: affiliate.balance,
        refCode: affiliate.refCode,
        rate: affiliate.commissionRate,
      },
      recentCommissions: affiliate.commissions,
    };
  } catch (error) {
    console.error('Error fetching affiliate stats:', error);
    return null;
  }
}
