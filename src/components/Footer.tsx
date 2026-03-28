import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-brown-deep text-white/80">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/images/logo-white.png"
              alt="RobustTA"
              width={140}
              height={42}
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm leading-relaxed text-white/60 mt-3">
              Đậm Đà · Cân Bằng · Tin Cậy
            </p>
            <p className="text-sm leading-relaxed text-white/50 mt-2">
              100% Cà phê hạt rang nguyên chất từ vùng trồng Lâm Đồng.
            </p>
          </div>

          {/* Chính sách */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Chính sách</h4>
            <ul className="space-y-3">
              <li><Link href="/policy/refund-returns" className="text-sm hover:text-brand-orange transition-colors">Chính sách đổi trả</Link></li>
              <li><Link href="/policy/promotions" className="text-sm hover:text-brand-orange transition-colors">Chính sách khuyến mãi</Link></li>
              <li><Link href="/policy/privacy" className="text-sm hover:text-brand-orange transition-colors">Chính sách bảo mật</Link></li>
              <li><Link href="/policy/shipping" className="text-sm hover:text-brand-orange transition-colors">Chính sách giao hàng</Link></li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Hỗ trợ</h4>
            <ul className="space-y-3">
              <li><Link href="/policy/complaints" className="text-sm hover:text-brand-orange transition-colors">Chính sách khiếu nại</Link></li>
              <li><Link href="/policy/terms" className="text-sm hover:text-brand-orange transition-colors">Điều khoản & Điều kiện</Link></li>
              <li><Link href="/policy/inspection" className="text-sm hover:text-brand-orange transition-colors">Chính sách đồng kiểm</Link></li>
              <li><Link href="/policy/payment" className="text-sm hover:text-brand-orange transition-colors">Hình thức thanh toán</Link></li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="shrink-0 mt-0.5">📞</span>
                <a href="tel:0889999022" className="hover:text-brand-orange transition-colors">0889 999 022</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 mt-0.5">✉️</span>
                <a href="mailto:info@robustta.com" className="hover:text-brand-orange transition-colors">info@robustta.com</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 mt-0.5">🌐</span>
                <span>www.robustta.com</span>
              </li>
              <li className="pt-2">
                <a 
                  href="http://online.gov.vn/Home/WebDetails/140768" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block"
                >
                  <Image 
                    src="https://robustta.com/wp-content/uploads/2026/03/logo-da-thong-bao-bo-cong-thuong.webp" 
                    alt="Đã thông báo Bộ Công Thương"
                    width={150}
                    height={57}
                    className="h-12 w-auto brightness-200"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © 2025 RobustTA. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <span>Rich · Balanced · Trust</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
