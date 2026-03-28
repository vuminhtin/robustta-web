'use client';
// v3.12.10 - Force redeploy for BCT logo fix

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-brand-brown-footer text-brand-foamy-cream overflow-hidden border-t border-white/5">
      {/* Subtle Grainy Texture / Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 to-transparent pointer-events-none" />
      
      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          
          {/* Brand Identity */}
          <div className="md:col-span-1 space-y-6">
            <Link href="/" className="inline-block transition-transform hover:scale-105 active:scale-95">
              <Image
                src="/images/logo-white.png"
                alt="RobustTA Logo"
                width={160}
                height={48}
                className="h-11 w-auto"
              />
            </Link>
            <div className="max-w-fit">
              <p className="text-brand-orange text-xs font-bold uppercase tracking-[0.3em] mb-4 whitespace-nowrap">
                Đậm Đà · Cân Bằng · Tin Cậy
              </p>
              <p className="text-sm leading-relaxed opacity-95 max-w-xs text-justify">
                Hành trình tìm kiếm hương vị cà phê nguyên bản từ cao nguyên Lâm Đồng, mang tâm hồn Việt vào từng tách chiết xuất.
              </p>
            </div>
            
            {/* Social Icons - Premium Style */}
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 hover:border-brand-orange hover:bg-brand-orange hover:text-white transition-all duration-300 group text-brand-orange">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 hover:border-brand-orange hover:bg-brand-orange hover:text-white transition-all duration-300 group text-brand-orange">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Chính sách */}
          <div>
            <h4 className="!text-brand-yellow-cream text-xs font-bold uppercase tracking-[0.2em] mb-7">Chính sách</h4>
            <ul className="space-y-4">
              {['Chính sách đổi trả', 'Chính sách khuyến mãi', 'Chính sách bảo mật', 'Chính sách giao hàng'].map((label, idx) => (
                <li key={idx}>
                  <Link href={`/policy/${['refund-returns', 'promotions', 'privacy', 'shipping'][idx]}`} className="text-sm border-b border-transparent hover:border-brand-foamy-cream hover:text-white transition-all duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h4 className="!text-brand-yellow-cream text-xs font-bold uppercase tracking-[0.2em] mb-7">Hỗ trợ</h4>
            <ul className="space-y-4">
              {['Chính sách khiếu nại', 'Điều khoản & Điều kiện', 'Chính sách đồng kiểm', 'Hình thức thanh toán'].map((label, idx) => (
                <li key={idx}>
                  <Link href={`/policy/${['complaints', 'terms', 'inspection', 'payment'][idx]}`} className="text-sm border-b border-transparent hover:border-brand-foamy-cream hover:text-white transition-all duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liên hệ */}
          <div className="space-y-6">
            <h4 className="!text-brand-yellow-cream text-xs font-bold uppercase tracking-[0.2em] mb-7">Liên hệ</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 group">
                <span className="shrink-0 text-brand-orange group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.559-8.907.745-.361.531-.41 1.17-1.411L7.505 0a12.038 12.038 0 0 0-3.321 1.341C3.342 1.954 1.137 4.542 0 7.373c0 0 .151 5.344 5.344 10.536s10.536 5.344 10.536 5.344c2.831-1.137 5.419-3.342 6.032-4.184A12.038 12.038 0 0 0 23.253 15.748L20 22.621z"/></svg>
                </span>
                <a href="tel:0889999022" className="hover:text-white transition-colors font-medium">0889 999 022</a>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="shrink-0 text-brand-orange group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
                </span>
                <a href="mailto:info@robustta.com" className="hover:text-white transition-colors text-[11px] tracking-wide font-medium">info@robustta.com</a>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="shrink-0 text-brand-orange group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-10 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10-10-4.486-10-10zm20 0c0 .342-.018.68-.052 1.013l-4.948-4.913v-3l3 3 2 3.9zm-10-10c.342 0 .68.018 1.013.052l-2.013 2.013-2 2h3l-3 3-2.052-1.065h-3l2.052-1.065-2.052-1.065c-.636-.33-1.23-.746-1.748-1.22l2.8-2.65zm0 20c-.342 0-.68-.018-1.013-.052l2.013-2.013 2-2h-3l3-3 2.052 1.065h3l-2.052 1.065 2.052 1.065c.636.33 1.23.746 1.748 1.22l-2.8 2.65zm-10-10c0-.342.018-.68.052-1.013l4.948 4.913v3l-3-3-2-3.9z"/></svg>
                </span>
                <span className="font-light">www.robustta.com</span>
              </li>
              <li className="pt-4">
                <a 
                  href="http://online.gov.vn/Home/WebDetails/140768" 
                  target="_blank" 
                  rel="noreferrer"
                  className="block hover:opacity-80 transition-opacity"
                >
                  <Image 
                    src="/images/logo-bct.png" 
                    alt="Đã thông báo Bộ Công Thương"
                    width={130}
                    height={50}
                    className="h-[50px] w-auto transition-all duration-300"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Aesthetic Divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40">
            © 2025 RobustTA. Crafted for Coffee Lovers.
          </p>
          <div className="flex items-center gap-8 text-[10px] tracking-[0.2em] text-brand-orange/60 font-black">
            <span>RICH</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span>BALANCED</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span>TRUST</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
