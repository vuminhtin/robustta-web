import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { getPageSections } from '@/app/actions/sectionActions';

export default async function HomePage() {
  const sections = await getPageSections();
  const isVisible = (name: string) => sections.some((s: any) => s.name === name);
  return (
    <>
      {/* ===== HERO ===== */}
      {isVisible('hero') && (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-brown-deep">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/Banner 2.jpg"
              alt="RobustTA Coffee"
              fill
              className="object-cover opacity-40"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-brown-deep/90 via-brand-brown-deep/70 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-2xl">
              <span className="inline-block text-brand-orange text-sm font-bold uppercase tracking-[0.2em] mb-4">
                100% Nguyên Chất · Lâm Đồng
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] !text-white">
                Đánh thức bản lĩnh Việt.
                <br />
                <span className="text-brand-orange">Nâng tầm</span> vị thế Robusta.
              </h1>
              <p className="mt-6 text-lg text-white/70 max-w-lg leading-relaxed">
                Cà phê hạt rang mộc — không tẩm ướp, không pha trộn. Từ vườn cà phê gia đình tại cao nguyên Lâm Đồng đến tách cà phê thuần khiết trên tay bạn.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold px-8 py-4 rounded-full text-base transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  Khám phá sản phẩm
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:bg-white/10"
                >
                  Câu chuyện của chúng tôi
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </section>
      )}

      {/* ===== USP ===== */}
      {isVisible('story') && (
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-brown-dark">
                Vì sao chọn RobustTA?
              </h2>
              <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
                Mỗi hạt cà phê đều mang một lời hứa — và chúng tôi giữ lời.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🌱',
                  title: '100% Nguyên Chất',
                  desc: 'Rang mộc, không tẩm ướp, không pha trộn. Khi hạt cà phê đủ tốt, nó không cần giả vờ là thứ gì khác.',
                },
                {
                  icon: '🏔️',
                  title: 'Vùng trồng Lâm Đồng',
                  desc: 'Từ vườn cà phê gia đình — tuyển chọn từng trái chín, canh tác bền vững, biết rõ từng mảnh đất.',
                },
                {
                  icon: '🤝',
                  title: 'Chia sẻ & Liêm chính',
                  desc: 'Lợi nhuận được chia sẻ với nông dân, đối tác — để cà phê ngon không đến từ một mắt xích bị bỏ rơi.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group text-center p-8 rounded-2xl border border-border hover:border-brand-green/30 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-5xl mb-5">{item.icon}</div>
                  <h3 className="text-xl font-bold text-brand-brown-dark mb-3">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== PROMO BANNER ===== */}
      {isVisible('promo') && (
        <section className="bg-gradient-to-r from-brand-green to-brand-green-light py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-brand-teal-light text-sm font-bold uppercase tracking-widest">Khuyến mãi đặc biệt</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold !text-brand-yellow-cream mt-2">
                MUA 500G — <span className="text-brand-orange">TẶNG 200G</span>
              </h3>
              <p className="!text-white/80 mt-2 text-sm">Áp dụng cho tất cả sản phẩm. Số lượng có hạn!</p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-brand-green font-bold px-8 py-4 rounded-full text-base transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Đặt hàng ngay
            </Link>
          </div>
        </section>
      )}

      {/* ===== BEST SELLERS ===== */}
      {isVisible('products') && (
        <section className="py-20 bg-bg-light">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-brand-orange text-sm font-bold uppercase tracking-widest">Bộ sưu tập</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-brown-dark mt-2">
                3 dòng sản phẩm chủ lực
              </h2>
              <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
                R · B · T — mỗi dòng mang một cá tính riêng, nhưng đều chung một lời hứa: nguyên chất, trung thực, từ tâm.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== BRAND STORY TEASER ===== */}
      <section className="py-20 bg-brand-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/Cau chuyen.jpg"
                alt="Vườn cà phê RobustTA"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="text-brand-green text-sm font-bold uppercase tracking-widest">Câu chuyện chúng tôi</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-brown-dark mt-2 leading-tight">
                Từ vườn cà phê của Ba
              </h2>
              <blockquote className="mt-6 border-l-4 border-brand-orange pl-5 text-text-secondary italic leading-relaxed">
                &ldquo;Con ơi, cà phê mình trồng là cà phê thật. Đừng bao giờ làm nó thành thứ gì khác.&rdquo;
              </blockquote>
              <p className="mt-6 text-text-secondary leading-relaxed">
                Câu nói ấy theo chúng tôi đến tận hôm nay — và trở thành lời hứa mà RobustTA gìn giữ trong từng mẻ rang. Chúng tôi tin rằng cà phê Việt Nam xứng đáng được trân trọng.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 text-brand-green font-bold hover:text-brand-green-light transition-colors group"
              >
                Đọc câu chuyện đầy đủ
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BREWING METHODS ===== */}
      {isVisible('brewing') && (
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-brand-teal text-sm font-bold uppercase tracking-widest">Hướng dẫn pha chế</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-brown-dark mt-2">
                4 cách thưởng thức
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '☕', name: 'Pha Phin', desc: '20g cà phê · Tỉ lệ 1:4 · Ủ 30-45s. Đậm đà bản sắc Việt, hậu vị ngọt sâu.', href: '/blog/huong-dan-pha-phin-chuan-vi' },
                { icon: '⚡', name: 'Pha máy (Espresso)', desc: '18g bột · Chiết xuất 30s · 9 bar. Mạnh mẽ, lớp crema dày, chuẩn Ý.', href: '/blog/huong-dan-pha-may-espresso-barista' },
                { icon: '❄️', name: 'Cold Brew', desc: 'Tỉ lệ 1:10 · Ngâm lạnh 12-24h. Thanh mát, mượt mà, ít acid.', href: '/blog/cold-brew-tai-nha-don-gian' },
                { icon: '💧', name: 'Pour-over', desc: 'Tỉ lệ 1:15 · Xay vừa thô. Tinh tế, rõ ràng từng nốt hương trái cây.', href: '/blog/nghe-thuat-pha-pour-over-v60' },
              ].map((method, i) => (
                <Link
                  key={i}
                  href={method.href}
                  className="group p-6 bg-white border border-brand-cream rounded-2xl text-center hover:border-brand-orange hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-brand-cream rounded-full flex items-center justify-center text-2xl mx-auto mb-4 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-bold text-brand-brown-dark mb-2">{method.name}</h3>
                  <p className="text-sm text-brand-brown-dark/70 leading-relaxed">{method.desc}</p>
                  <div className="mt-4 text-xs font-bold text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity">
                    XEM CHI TIẾT →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== SHIPPING INFO ===== */}
      {isVisible('shipping') && (
        <section className="py-14 bg-brand-cream-light border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {[
                { icon: '🚚', title: 'Free Ship đơn ≥ 500K', desc: 'Giao hàng toàn quốc' },
                { icon: '📦', title: 'Đóng gói cẩn thận', desc: 'Bảo quản hương vị nguyên bản' },
                { icon: '💯', title: 'Cam kết chất lượng', desc: 'Đổi trả nếu không hài lòng' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h4 className="font-bold text-brand-brown-dark text-sm">{item.title}</h4>
                  <p className="text-xs text-text-light mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
