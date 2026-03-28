import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * ⚙️ CẦN CẤU HÌNH — Email xác nhận đơn hàng
 *
 * Chọn một trong các dịch vụ email:
 *
 * A) Resend (khuyên dùng cho Next.js):
 *    - npm install resend
 *    - Thêm RESEND_API_KEY vào .env
 *    - Xác thực domain robustta.com trên resend.com
 *
 * B) Nodemailer + Gmail:
 *    - npm install nodemailer
 *    - Thêm GMAIL_USER, GMAIL_APP_PASSWORD vào .env
 *
 * C) SendGrid:
 *    - npm install @sendgrid/mail
 *    - Thêm SENDGRID_API_KEY vào .env
 */

interface OrderEmailPayload {
  orderId: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  address: string;
  items: Array<{
    name: string;
    weight: string;
    grind: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  carrier: string;
}

function generateOrderEmailHTML(order: OrderEmailPayload): string {
  const itemRows = order.items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.weight} · ${item.grind}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">
        ${new Intl.NumberFormat('vi-VN').format(item.price * item.quantity)}đ
      </td>
    </tr>
  `).join('');

  const paymentLabel = {
    'vietqr': 'Chuyển khoản QR (NAPAS)',
    'card': 'Thẻ Visa/Mastercard',
    'cod': 'Thanh toán khi nhận hàng',
  }[order.paymentMethod] ?? order.paymentMethod;

  return `
  <!DOCTYPE html>
  <html>
  <body style="margin: 0; padding: 0; background-color: #f8f6f3; font-family: 'Segoe UI', sans-serif;">
    <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
      <!-- Header -->
      <div style="background: #2B4D40; padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">RobustTA</h1>
        <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0;">Xác nhận đơn hàng</p>
      </div>

      <!-- Content -->
      <div style="padding: 30px;">
        <p style="color: #333; font-size: 16px;">
          Chào <strong>${order.customerName}</strong>,
        </p>
        <p style="color: #666; line-height: 1.6;">
          Cảm ơn bạn đã tin tưởng RobustTA! Đơn hàng <strong style="color: #E8834A;">${order.orderId}</strong> đã được ghi nhận thành công.
        </p>

        <!-- Order details -->
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background: #f8f6f3;">
              <th style="padding: 10px; text-align: left; font-size: 13px; color: #666;">Sản phẩm</th>
              <th style="padding: 10px; text-align: left; font-size: 13px; color: #666;">Tùy chọn</th>
              <th style="padding: 10px; text-align: center; font-size: 13px; color: #666;">SL</th>
              <th style="padding: 10px; text-align: right; font-size: 13px; color: #666;">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>

        <!-- Totals -->
        <div style="background: #f8f6f3; border-radius: 12px; padding: 16px; margin: 16px 0;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #666; font-size: 14px;">Tạm tính:</span>
            <span style="font-weight: bold; font-size: 14px;">${new Intl.NumberFormat('vi-VN').format(order.subtotal)}đ</span>
          </div>
          ${order.discount > 0 ? `
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #2B4D40;">
            <span style="font-size: 14px;">Giảm giá:</span>
            <span style="font-weight: bold; font-size: 14px;">-${new Intl.NumberFormat('vi-VN').format(order.discount)}đ</span>
          </div>` : ''}
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #666; font-size: 14px;">Phí giao hàng:</span>
            <span style="font-weight: bold; font-size: 14px;">
              ${order.shippingFee === 0 ? 'Miễn phí' : new Intl.NumberFormat('vi-VN').format(order.shippingFee) + 'đ'}
            </span>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 12px 0;" />
          <div style="display: flex; justify-content: space-between;">
            <span style="font-weight: bold; font-size: 16px; color: #333;">Tổng cộng:</span>
            <span style="font-weight: bold; font-size: 20px; color: #E8834A;">${new Intl.NumberFormat('vi-VN').format(order.total)}đ</span>
          </div>
        </div>

        <!-- Delivery info -->
        <div style="margin: 20px 0; padding: 16px; border: 1px solid #eee; border-radius: 12px;">
          <h3 style="margin: 0 0 12px; font-size: 14px; color: #333;">📦 Thông tin giao hàng</h3>
          <p style="margin: 4px 0; font-size: 14px; color: #666;"><strong>${order.customerName}</strong> · ${order.phone}</p>
          <p style="margin: 4px 0; font-size: 14px; color: #666;">${order.address}</p>
          <p style="margin: 4px 0; font-size: 13px; color: #999;">Thanh toán: ${paymentLabel}</p>
          <p style="margin: 4px 0; font-size: 13px; color: #999;">Vận chuyển: ${order.carrier}</p>
        </div>

        <p style="color: #666; font-size: 14px; line-height: 1.6;">
          Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ:<br/>
          📞 Hotline: <a href="tel:0889999022" style="color: #2B4D40; font-weight: bold;">0889 999 022</a><br/>
          💬 Zalo: <a href="https://zalo.me/0889999022" style="color: #2B4D40;">zalo.me/0889999022</a>
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #333; padding: 20px; text-align: center;">
        <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 13px;">
          RobustTA — Cà Phê Hạt Rang Nguyên Chất<br/>
          Đậm Đà · Cân Bằng · Tin Cậy
        </p>
      </div>
    </div>
  </body>
  </html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderEmailPayload = await request.json();

    if (!body.customerEmail) {
      return NextResponse.json({ error: 'No email provided' }, { status: 400 });
    }

    const html = generateOrderEmailHTML(body);

    // ⚙️ CẦN CẤU HÌNH: Uncomment one of the following blocks after installing the package

    // ────── Option A: Resend ──────
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'RobustTA <orders@robustta.com>',
    //   to: body.customerEmail,
    //   subject: `[RobustTA] Xác nhận đơn hàng ${body.orderId}`,
    //   html,
    // });

    // ────── Option B: Nodemailer ──────
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });
    
    await transporter.sendMail({
      from: `"RobustTA" <${process.env.GMAIL_USER}>`,
      to: body.customerEmail,
      subject: `[RobustTA] Xác nhận đơn hàng ${body.orderId}`,
      html,
    });

    console.log(`[Email] Order confirmation sent via Gmail to ${body.customerEmail} (Order: ${body.orderId})`);

    return NextResponse.json({
      success: true,
      message: 'Email template generated (sending not configured)',
      orderId: body.orderId,
      to: body.customerEmail,
    });
  } catch (error) {
    console.error('[Email] Error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
