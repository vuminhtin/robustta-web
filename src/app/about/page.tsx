import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Câu chuyện — RobustTA | Đánh thức bản lĩnh Việt',
  description: 'Câu chuyện thương hiệu RobustTA — từ vườn cà phê của Ba tại Lâm Đồng đến sứ mệnh nâng tầm vị thế Robusta Việt Nam.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 bg-brand-brown-deep overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/IMG_9020.jpg"
            alt="RobustTA"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-brown-deep/80 to-brand-brown-deep" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <span className="text-brand-orange text-sm font-bold uppercase tracking-[0.2em]">Câu chuyện thương hiệu</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 !text-white leading-tight">
            Từ vườn cà phê của Ba
          </h1>
          <p className="text-white/60 mt-4 text-lg">
            Rich · Balanced · Trust — Đậm Đà · Cân Bằng · Tin Cậy
          </p>
        </div>
      </section>

      {/* Story content */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Opening */}
          <blockquote className="text-xl sm:text-2xl text-text-secondary italic leading-relaxed border-l-4 border-brand-orange pl-6 py-2">
            Có những buổi sáng ở Lâm Đồng, sương còn đọng trên lá, Ba tôi đã lặng lẽ bước giữa những hàng cà phê chín đỏ. Ông không hái tuốt cả cành như người ta. Ông chỉ hái những trái chín mọng nhất — rồi nâng niu chúng như thể đang giữ lại điều gì đó thiêng liêng hơn một hạt cà phê.
          </blockquote>

          <blockquote className="mt-6 text-lg text-brand-brown-dark font-semibold italic text-center">
            &ldquo;Con ơi, cà phê mình trồng là cà phê thật. Đừng bao giờ làm nó thành thứ gì khác.&rdquo;
          </blockquote>

          <p className="mt-6 text-text-secondary leading-relaxed text-center">
            Câu nói ấy theo tôi đến tận hôm nay — và trở thành lời hứa mà RobustTA gìn giữ trong từng mẻ rang.
          </p>
        </div>
      </section>

      {/* Sự thật */}
      <section className="py-16 bg-brand-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-brown-dark mb-6">
            Sự thật đắng hơn cà phê
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Việt Nam là cường quốc Robusta thế giới. Nhưng ở chính quê nhà, hàng triệu người đang uống thứ gọi là &ldquo;cà phê&rdquo; — thực chất là bắp rang cháy, đậu nành, hương liệu tổng hợp và chất tạo đặc. Người nông dân trồng hạt thật thì bán với giá rẻ mạt, còn cái giả thì lên ngôi trên kệ hàng.
          </p>
          <p className="text-text-secondary leading-relaxed mt-4 font-semibold text-brand-brown-dark">
            Chúng tôi không chấp nhận điều đó.
          </p>
        </div>
      </section>

      {/* RobustTA */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-brown-dark mb-6">
            RobustTA ra đời — không chỉ để bán cà phê
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Tên gọi <strong className="text-brand-brown-dark">RobustTA</strong> mang hai ý nghĩa: <strong className="text-brand-brown-dark">&ldquo;Robust&rdquo;</strong> — sự mạnh mẽ, bền bỉ của giống hạt Robusta cao nguyên. <strong className="text-brand-green">&ldquo;TA&rdquo;</strong> — là <em>chúng ta</em>, là niềm kiêu hãnh Việt, là lời khẳng định rằng cà phê Việt Nam xứng đáng được trân trọng.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-bg-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-brown-dark text-center mb-12">
            Những giá trị chúng tôi giữ bằng cả lòng tự trọng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: '🌱',
                title: '100% Nguyên Chất — Không thỏa hiệp',
                desc: 'Mỗi hạt cà phê RobustTA đều được rang mộc, không tẩm ướp, không pha trộn. Chúng tôi tin rằng khi hạt cà phê đủ tốt, nó không cần phải giả vờ là thứ gì khác.',
              },
              {
                icon: '🏔️',
                title: 'Vùng trồng chủ động',
                desc: 'Xuất phát từ vườn cà phê gia đình tại Lâm Đồng, chúng tôi liên kết với các nông hộ trong vùng — cùng canh tác bền vững, cùng thu hái chọn lọc. Biết rõ từng mảnh đất, từng đôi tay đã chăm bón.',
              },
              {
                icon: '🤝',
                title: 'Kinh doanh liêm chính',
                desc: 'Chúng tôi không giành hết lợi nhuận. Lợi ích được chia sẻ với nông dân, với đại lý, với đối tác — để ai cũng có lý do để làm tốt hơn mỗi ngày.',
              },
              {
                icon: '📖',
                title: 'Chia sẻ kiến thức',
                desc: 'Chúng tôi muốn mọi người hiểu cà phê — từ cách chọn hạt, cách pha chuẩn barista, đến văn hóa cà phê Việt Nam. Xây dựng cộng đồng sống sạch, chọn sản phẩm tốt.',
              },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-xl border border-border">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-brand-brown-dark mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-20 bg-brand-green text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white !text-white mb-6">
            Mỗi tách cà phê là một lời cảm ơn
          </h2>
          <div className="text-white/80 space-y-2 text-lg italic">
            <p>Cảm ơn Ba đã dạy con làm cà phê thật.</p>
            <p>Cảm ơn những đôi tay nông dân đã không bỏ cuộc.</p>
            <p>Cảm ơn bạn — vì đã chọn tin vào điều nguyên bản.</p>
          </div>
          <p className="mt-8 text-xl font-extrabold text-brand-orange">
            RobustTA — Rich · Balanced · Trust.
          </p>
        </div>
      </section>
    </div>
  );
}
