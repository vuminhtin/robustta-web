import React from 'react';

interface SEOEvaluatorProps {
  title: string;
  metaDescription: string;
  content: string;
  focusKeyword?: string;
}

const SEOEvaluator: React.FC<SEOEvaluatorProps> = ({ title, metaDescription, content, focusKeyword }) => {
  const evaluate = () => {
    const scores = {
      title: { status: 'red', message: 'Thiếu tiêu đề SEO' },
      description: { status: 'red', message: 'Thiếu mô tả Meta' },
      content: { status: 'yellow', message: 'Nội dung quá ngắn' },
      keyword: { status: 'red', message: 'Chưa có từ khóa chính' },
    };

    // Title Check
    if (title.length >= 50 && title.length <= 60) {
      scores.title = { status: 'green', message: 'Tiêu đề tối ưu (50-60 ký tự)' };
    } else if (title.length > 0) {
      scores.title = { status: 'yellow', message: 'Tiêu đề nên từ 50-60 ký tự' };
    }

    // Description Check
    if (metaDescription.length >= 120 && metaDescription.length <= 160) {
      scores.description = { status: 'green', message: 'Mô tả Meta tối ưu (120-160 ký tự)' };
    } else if (metaDescription.length > 0) {
      scores.description = { status: 'yellow', message: 'Mô tả nên từ 120-160 ký tự' };
    }

    // Content Length Check (roughly 300 words)
    const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount >= 300) {
      scores.content = { status: 'green', message: `Độ dài ổn (${wordCount} từ)` };
    } else {
      scores.content = { status: 'yellow', message: `Nội dung nên có ít nhất 300 từ (hiện tại: ${wordCount})` };
    }

    // Keyword Check
    if (focusKeyword) {
      const regex = new RegExp(focusKeyword, 'gi');
      const count = (content.match(regex) || []).length;
      if (count >= 3) {
        scores.keyword = { status: 'green', message: `Từ khóa xuất hiện ${count} lần (tốt)` };
      } else {
        scores.keyword = { status: 'yellow', message: `Từ khóa xuất hiện ${count} lần (nên có ít nhất 3 lần)` };
      }
    }

    return scores;
  };

  const results = evaluate();

  const getIndicatorColor = (status: string) => {
    switch (status) {
      case 'green': return '#10b981';
      case 'yellow': return '#f59e0b';
      case 'red': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  return (
    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <h4 style={{ color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        🔍 Đánh giá SEO Tự động
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {Object.entries(results).map(([key, data]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: getIndicatorColor(data.status), boxShadow: `0 0 8px ${getIndicatorColor(data.status)}` }} />
            <span style={{ fontSize: '13px', color: '#d1d5db' }}>{data.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SEOEvaluator;
