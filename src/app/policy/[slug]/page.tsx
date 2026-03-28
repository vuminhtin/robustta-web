import { notFound } from 'next/navigation';
import { POLICIES } from '@/data/policies';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({
    slug,
  }));
}

export default async function PolicyPage({ params }: PageProps) {
  const { slug } = await params;
  const policy = POLICIES[slug];

  if (!policy) {
    notFound();
  }

  return (
    <div className="bg-bg-light min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm font-medium text-text-light" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-brand-green transition-colors">Trang chủ</Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-text-primary" aria-current="page">{policy.title}</li>
          </ol>
        </nav>

        <article className="bg-white rounded-2xl shadow-sm border border-border p-8 md:p-12 overflow-hidden">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-brown-dark mb-8">
            {policy.title}
          </h1>

          <div 
            className="prose prose-brand max-w-none 
              prose-headings:text-brand-brown-dark prose-headings:font-bold
              prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2 prose-h2:border-border
              prose-p:text-text-secondary prose-p:leading-relaxed prose-p:mb-4
              prose-li:text-text-secondary prose-li:mb-2
              prose-strong:text-brand-brown-dark"
          >
            {/* simple markdown-like rendering since content is plain text with ## headings */}
            {policy.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) {
                return <h2 key={i}>{line.replace('## ', '')}</h2>;
              }
              if (line.startsWith('### ')) {
                return <h3 key={i} className="text-lg font-bold text-brand-brown-dark mt-6 mb-3">{line.replace('### ', '')}</h3>;
              }
              if (line.startsWith('- ')) {
                return <li key={i} className="ml-4 list-disc">{line.replace('- ', '')}</li>;
              }
              if (line.trim() === '') {
                return <br key={i} />;
              }
              return <p key={i}>{line}</p>;
            })}
          </div>

          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-text-light italic">
              Nếu bạn có bất kỳ thắc mắc nào về chính sách này, vui lòng liên hệ với chúng tôi qua hotline <a href="tel:0889999022" className="font-bold text-brand-green">0889 999 022</a> hoặc email <a href="mailto:info@robustta.com" className="font-bold text-brand-green">info@robustta.com</a>.
            </p>
          </div>
        </article>

        <div className="mt-8 text-center">
          <Link 
            href="/products" 
            className="inline-flex items-center text-brand-green font-bold hover:gap-2 transition-all"
          >
            ← Quay lại mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}
