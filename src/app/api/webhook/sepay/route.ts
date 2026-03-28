import { NextRequest, NextResponse } from 'next/server';

/**
 * Sepay Webhook — Xác nhận thanh toán chuyển khoản
 *
 * Setup:
 * 1. Đăng nhập app.sepay.vn → Cài đặt → Webhook
 * 2. URL: https://robustta.vercel.app/api/webhook/sepay
 * 3. Secret: giá trị SEPAY_WEBHOOK_SECRET (set trên Vercel)
 * 4. Bật event "Ghi nhận giao dịch mới"
 *
 * ENV vars needed:
 *   SEPAY_WEBHOOK_SECRET        — bí mật xác thực từ Sepay dashboard
 *   NEXT_PUBLIC_SUPABASE_URL    — Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY   — service role key (bypass RLS)
 *   NEXT_PUBLIC_SITE_URL        — https://robustta.vercel.app (for internal email call)
 */

interface SepayPayload {
  id: number;
  gateway: string;
  transactionDate: string;
  accountNumber: string;
  content: string;
  transferType: string;
  transferAmount: number;
  referenceCode: string;
  description: string;
}

export async function POST(request: NextRequest) {
  try {
    // ── Auth ──────────────────────────────────────────────────────────────────
    const webhookSecret = process.env.SEPAY_WEBHOOK_SECRET;
    const authHeader = request.headers.get('Authorization');
    if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload: SepayPayload = await request.json();

    // Chỉ xử lý tiền vào
    if (payload.transferType !== 'in') {
      return NextResponse.json({ success: true, message: 'Skipped outgoing transfer' });
    }

    // Extract order ID — format: RBTyyyyMMddXXXX
    const orderIdMatch = payload.content?.match(/RBT\d{8}[A-Z0-9]{4}/);
    const orderId = orderIdMatch ? orderIdMatch[0] : null;

    if (!orderId) {
      console.warn('[Sepay] No order ID in content:', payload.content);
      return NextResponse.json({ success: true, message: 'No order ID matched' });
    }

    console.log(
      `[Sepay] ✅ Payment — Order: ${orderId} | ` +
      `${payload.transferAmount.toLocaleString('vi-VN')}đ | ` +
      `${payload.gateway} | Ref: ${payload.referenceCode}`
    );

    // ── 1. Update DB (Supabase service role) ─────────────────────────────────
    let orderData: Record<string, unknown> | null = null;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceRoleKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, serviceRoleKey);

        const { data, error } = await supabase
          .from('orders')
          .update({
            status: 'paid',
            payment_ref: payload.referenceCode,
            payment_bank: payload.gateway,
            paid_at: new Date(payload.transactionDate).toISOString(),
            payment_amount: payload.transferAmount,
          })
          .eq('id', orderId)
          .select()
          .single();

        if (error) {
          console.error('[Sepay] Supabase update error:', error.message);
        } else {
          orderData = data;
          console.log(`[Sepay] DB: Order ${orderId} → paid ✅`);
        }
      } catch (err) {
        console.error('[Sepay] Supabase client error:', err);
      }
    } else {
      console.warn('[Sepay] ⚠ SUPABASE_SERVICE_ROLE_KEY not set — skipping DB update');
    }

    // ── 2. Send confirmation email ────────────────────────────────────────────
    if (orderData) {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://robustta.vercel.app';
        const emailRes = await fetch(`${baseUrl}/api/email/order-confirmation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: orderData.id,
            customerName: orderData.customer_name,
            customerEmail: orderData.customer_email,
            phone: orderData.phone,
            address: orderData.address,
            items: orderData.items,
            subtotal: orderData.subtotal,
            discount: orderData.discount ?? 0,
            shippingFee: orderData.shipping_fee,
            total: orderData.total,
            paymentMethod: 'vietqr',
            carrier: orderData.carrier ?? 'GHN',
          }),
        });
        if (!emailRes.ok) {
          console.warn('[Sepay] Email route non-OK:', emailRes.status);
        } else {
          console.log(`[Sepay] 📧 Email dispatched → ${orderData.customer_email}`);
        }
      } catch (err) {
        console.error('[Sepay] Email error:', err);
      }
    } else {
      console.warn('[Sepay] ⚠ No order data — skipping email');
    }

    // ── 3. Admin log summary ─────────────────────────────────────────────────
    console.log(
      `[Sepay] 📋 Summary | Order: ${orderId} | ` +
      `${payload.transferAmount.toLocaleString('vi-VN')}đ | ` +
      `DB: ${orderData ? '✅' : '⚠ skip'} | Email: ${orderData ? '✅' : '⚠ skip'}`
    );

    return NextResponse.json({ success: true, orderId, amount: payload.transferAmount });
  } catch (error) {
    console.error('[Sepay] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'sepay-webhook' });
}
