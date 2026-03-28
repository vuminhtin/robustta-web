import type { Metadata } from 'next';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Sản phẩm — RobustTA | Cà Phê Hạt Rang Nguyên Chất',
  description: '3 dòng cà phê hạt rang nguyên chất: R (Đậm Đà), B (Cân Bằng), T (Tin Cậy). 100% Robusta Lâm Đồng, rang mộc, không tẩm ướp.',
};

export default function ProductsPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-brand-orange text-sm font-bold uppercase tracking-widest">Bộ sưu tập</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-brown-dark mt-2">
            Sản phẩm RobustTA
          </h1>
          <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
            3 dòng sản phẩm — 4 kiểu xay — 4 trọng lượng. Chọn đúng vị, đúng cách pha.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Info */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: '📦', title: '4 trọng lượng', desc: '200g · 500g · 1kg · 2kg' },
            { icon: '⚙️', title: '4 kiểu xay', desc: 'Hạt nguyên · Phin · Espresso · Pour-over' },
            { icon: '🚚', title: 'Free ship ≥ 500K', desc: 'Giao hàng toàn quốc' },
          ].map((item, i) => (
            <div key={i} className="text-center p-6 rounded-xl bg-white border border-border">
              <div className="text-3xl mb-2">{item.icon}</div>
              <h4 className="font-bold text-brand-brown-dark text-sm">{item.title}</h4>
              <p className="text-xs text-text-light mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
