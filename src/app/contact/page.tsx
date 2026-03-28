import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liên hệ — RobustTA | Cà Phê Hạt Rang Nguyên Chất',
  description: 'Liên hệ RobustTA — Hotline 0889 999 022, Email info@robustta.com. Chúng tôi luôn sẵn sàng hỗ trợ bạn.',
};

export default function ContactPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-brand-green text-sm font-bold uppercase tracking-widest">Liên hệ</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-brown-dark mt-2">
            Chúng tôi luôn lắng nghe
          </h1>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto">
            Bạn có câu hỏi về sản phẩm, đơn hàng, hoặc muốn hợp tác? Hãy liên hệ với chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-border">
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-lg shrink-0">📞</div>
                  <div>
                    <h3 className="font-bold text-brand-brown-dark text-sm">Hotline</h3>
                    <a href="tel:0889999022" className="text-brand-green font-semibold hover:underline">0889 999 022</a>
                    <p className="text-xs text-text-light mt-0.5">Thứ 2 – Thứ 7, 8:00 – 18:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-lg shrink-0">✉️</div>
                  <div>
                    <h3 className="font-bold text-brand-brown-dark text-sm">Email</h3>
                    <a href="mailto:info@robustta.com" className="text-brand-green font-semibold hover:underline">info@robustta.com</a>
                    <p className="text-xs text-text-light mt-0.5">Trả lời trong vòng 24 giờ</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-lg shrink-0">🌐</div>
                  <div>
                    <h3 className="font-bold text-brand-brown-dark text-sm">Website</h3>
                    <span className="text-text-secondary text-sm">www.robustta.coffee</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-cream p-6 rounded-xl">
              <h3 className="font-bold text-brand-brown-dark text-sm mb-2">🤝 Hợp tác kinh doanh</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Bạn muốn trở thành đại lý RobustTA hoặc hợp tác cung cấp cà phê cho văn phòng, quán cà phê? Liên hệ với chúng tôi để nhận bảng giá sỉ.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h2 className="text-lg font-bold text-brand-brown-dark mb-5">Gửi tin nhắn</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1">Họ tên *</label>
                    <input
                      type="text" required
                      className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1">Email *</label>
                    <input
                      type="email" required
                      className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                    placeholder="0912 345 678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1">Chủ đề</label>
                  <select
                    className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors bg-white"
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="order">Đơn hàng</option>
                    <option value="product">Sản phẩm</option>
                    <option value="wholesale">Hợp tác / Đại lý</option>
                    <option value="feedback">Góp ý</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1">Nội dung *</label>
                  <textarea
                    required rows={5}
                    className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors resize-none"
                    placeholder="Nhập nội dung tin nhắn..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full py-4 rounded-full bg-brand-green hover:bg-brand-green-light text-white font-bold text-base transition-all hover:shadow-lg"
              >
                Gửi tin nhắn
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
