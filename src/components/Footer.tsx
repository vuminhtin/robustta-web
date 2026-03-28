import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1E1613] text-[#C4B5A8]">
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
            <p className="text-sm leading-relaxed text-[#D4A574] mt-3 font-medium">
              Đậm Đà · Cân Bằng · Tin Cậy
            </p>
            <p className="text-sm leading-relaxed text-[#9A8B7D] mt-2">
              100% Cà phê hạt rang nguyên chất từ vùng trồng Lâm Đồng.
            </p>
          </div>

          {/* Chính sách */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4A574] mb-5">Chính sách</h4>
            <ul className="space-y-3">
              <li><Link href="/policy/refund-returns" className="text-sm text-[#C4B5A8] hover:text-white transition-colors">Chính sách đổi trả</Link></li>
              <li><Link href="/policy/promotions" className="text-sm text-[#C4B5A8] hover:text-white transition-colors">Chính sách khuyến mãi</Link></li>
              <li><Link href="/policy/privacy" className="text-sm text-[#C4B5A8] hover:text-white transition-colors">Chính sách bảo mật</Link></li>
              <li><Link href="/policy/shipping" className="text-sm text-[#C4B5A8] hover:text-white transition-colors">Chính sách giao hàng</Link></li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4A574] mb-5">Hỗ trợ</h4>
            <ul className="space-y-3">
              <li><Link href="/policy/complaints" className="text-sm text-[#C4B5A8] hover:text-white transition-colors">Chính sách khiếu nại</Link></li>
              <li><Link href="/policy/terms" className="text-sm text-[#C4B5A8] hover:text-white transition-colors">Điều khoản & Điều kiện</Link></li>
              <li><Link href="/policy/inspection" className="text-sm text-[#C4B5A8] hover:text-white transition-colors">Chính sách đồng kiểm</Link></li>
              <li><Link href="/policy/payment" className="text-sm text-[#C4B5A8] hover:text-white transition-colors">Hình thức thanh toán</Link></li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4A574] mb-5">Liên hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="shrink-0 mt-0.5 text-[#D4A574]">📞</span>
                <a href="tel:0889999022" className="text-[#C4B5A8] hover:text-white transition-colors font-medium">0889 999 022</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 mt-0.5 text-[#D4A574]">✉️</span>
                <a href="mailto:info@robustta.com" className="text-[#C4B5A8] hover:text-white transition-colors">info@robustta.com</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 mt-0.5 text-[#D4A574]">🌐</span>
                <span>www.robustta.com</span>
              </li>
              <li className="pt-3">
                <a 
                  href="http://online.gov.vn/Home/WebDetails/140768" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="http://online.gov.vn/PublicImages/2015/08/27/11/20150827110756-dathongbao.png" 
                    alt="Đã thông báo Bộ Công Thương"
                    width={130}
                    height={50}
                    className="h-[50px] w-auto"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#3A2E28]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#7A6C60]">
            © 2025 RobustTA. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#7A6C60]">
            <span>Rich · Balanced · Trust</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
