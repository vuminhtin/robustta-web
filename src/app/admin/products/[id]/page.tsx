'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { products, WEIGHTS, GRINDS } from '@/data/products';
import { getInventory, saveInventory, freshnessLabel, formatVND } from '@/lib/admin/mockData';

const TASTING_TAGS = ['Chocolate', 'Caramel', 'Nutty', 'Fruity', 'Floral', 'Earthy', 'Smoky', 'Citrus', 'Berry', 'Vanilla', 'Honey', 'Spicy'];
const UPSELL_OPTIONS = ['Phin inox 8cm', 'Giấy lọc V60', 'Ca đong Espresso', 'Bình Cold Brew 1L', 'Máy xay tay'];

export default function AdminProductEdit() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const product = products.find(p => p.id === id);

  const [taste, setTaste] = useState(product?.taste ?? { body: 5, bitter: 5, sweet: 5, aroma: 5 });
  const [prices, setPrices] = useState<Record<string, number>>(() => {
    if (!product) return {};
    const priceMap: Record<string, number> = {};
    product.variants.forEach(v => { priceMap[`${v.weight}-${v.grind}`] = v.price; });
    return priceMap;
  });
  const [inv, setInv] = useState<ReturnType<typeof getInventory>>(() => {
    if (typeof window === 'undefined') return [];
    return getInventory();
  });
  const [roastDate, setRoastDate] = useState(() => {
    if (typeof window === 'undefined') return '2026-03-20';
    const loaded = getInventory();
    const firstInv = loaded.find(i => i.productId === id);
    return firstInv?.roastDate ?? '2026-03-20';
  });
  const [activeTags, setActiveTags] = useState<string[]>(['Chocolate', 'Earthy']);
  const [upsell, setUpsell] = useState<string[]>(['Phin inox 8cm']);
  const [saved, setSaved] = useState(false);

  if (!product) return (
    <div className="admin-empty">
      <p>Không tìm thấy sản phẩm.</p>
      <button onClick={() => router.back()} className="admin-btn admin-btn-ghost" style={{ marginTop: 12 }}>← Quay lại</button>
    </div>
  );

  const fresh = freshnessLabel(roastDate);

  const handleSave = () => {
    // Update roast dates in inventory
    const updated = inv.map(i => i.productId === id ? { ...i, roastDate } : i);
    saveInventory(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleTag = (tag: string) =>
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  const toggleUpsell = (item: string) =>
    setUpsell(prev => prev.includes(item) ? prev.filter(u => u !== item) : [...prev, item]);

  return (
    <div>
      {/* Header */}
      <div className="admin-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => router.back()} className="admin-btn admin-btn-ghost admin-btn-sm">← Quay lại</button>
          <div>
            <h1 className="admin-page-title">{product.name}</h1>
            <p className="admin-page-subtitle">{product.roastLevel} · {product.tagline}</p>
          </div>
        </div>
        <button onClick={handleSave} className={`admin-btn ${saved ? 'admin-btn-ghost' : 'admin-btn-orange'}`}>
          {saved ? '✅ Đã lưu!' : '💾 Lưu thay đổi'}
        </button>
      </div>

      <div className="admin-two-col">
        {/* Left column */}
        <div>
          {/* Taste Profile */}
          <div className="admin-card">
            <p className="admin-card-title">🎯 Taste Profile</p>
            <div className="admin-taste-grid">
              {(['body', 'bitter', 'sweet', 'aroma'] as const).map(key => (
                <div key={key} className="admin-taste-item">
                  <label>
                    <span className="admin-taste-name">
                      {{ body: 'Body', bitter: 'Đắng', sweet: 'Ngọt', aroma: 'Hương thơm' }[key]}
                    </span>
                    <span className="admin-taste-val">{taste[key]}/10</span>
                  </label>
                  <input
                    type="range" min={1} max={10} value={taste[key]}
                    onChange={e => setTaste(prev => ({ ...prev, [key]: +e.target.value }))}
                    className="admin-slider"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tasting Notes Tags */}
          <div className="admin-card">
            <p className="admin-card-title">🌿 Tasting Notes</p>
            <div>
              {TASTING_TAGS.map(tag => (
                <span key={tag} className={`admin-tag${activeTags.includes(tag) ? ' selected' : ''}`} onClick={() => toggleTag(tag)}>
                  {tag}
                </span>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#6b7280', marginTop: 10 }}>Đã chọn: {activeTags.join(', ') || '—'}</p>
          </div>

          {/* Freshness */}
          <div className="admin-card">
            <p className="admin-card-title">📅 Freshness — Ngày Rang</p>
            <div className="admin-form-group">
              <label className="admin-label">Ngày rang lô hiện tại</label>
              <input type="date" value={roastDate} onChange={e => setRoastDate(e.target.value)} className="admin-input" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
              <span style={{ fontSize: 20 }}>📦</span>
              <span style={{ fontSize: 14, color: fresh.color, fontWeight: 600 }}>
                {fresh.label}
              </span>
            </div>
            <p style={{ fontSize: 12, color: '#6b7280', marginTop: 10 }}>
              💡 FIFO: Đẩy lô cũ hơn đi trước khi nhập lô mới
            </p>
          </div>

          {/* Upsell */}
          <div className="admin-card">
            <p className="admin-card-title">🛍️ Gợi Ý Mua Kèm</p>
            {UPSELL_OPTIONS.map(item => (
              <label key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, cursor: 'pointer', fontSize: 14 }}>
                <label className="admin-toggle">
                  <input type="checkbox" checked={upsell.includes(item)} onChange={() => toggleUpsell(item)} />
                  <span className="admin-toggle-slider" />
                </label>
                <span style={{ color: upsell.includes(item) ? '#e8e8e6' : '#6b7280' }}>{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Right column — Variant Price Table */}
        <div>
          <div className="admin-card">
            <p className="admin-card-title">💰 Bảng Giá Biến Thể</p>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Trọng lượng</th>
                    {GRINDS.map(g => <th key={g}>{g}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {WEIGHTS.map(w => (
                    <tr key={w}>
                      <td style={{ fontWeight: 700, color: '#e8e8e6' }}>{w}</td>
                      {GRINDS.map(g => {
                        const key = `${w}-${g}`;
                        return (
                          <td key={g}>
                            <input
                              type="number"
                              value={prices[key] ?? ''}
                              onChange={e => setPrices(prev => ({ ...prev, [key]: +e.target.value }))}
                              className="admin-input"
                              style={{ fontSize: 13, padding: '6px 8px', minWidth: 90 }}
                              step={1000}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12, color: '#6b7280', marginTop: 12 }}>
              💡 Giá hiện tại: {formatVND(Math.min(...Object.values(prices).filter(v => v > 0)))} — {formatVND(Math.max(...Object.values(prices).filter(v => v > 0)))}
            </p>
          </div>

          {/* Inventory per variant */}
          <div className="admin-card">
            <p className="admin-card-title">📦 Tồn Kho Theo Biến Thể</p>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Biến thể</th><th>Tồn kho</th><th>Cảnh báo lúc</th></tr>
                </thead>
                <tbody>
                  {inv.filter(i => i.productId === id).map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ fontSize: 13 }}>{item.variant}</td>
                      <td>
                        <input
                          type="number"
                          value={item.stock}
                          onChange={e => {
                            const updated = [...inv];
                            updated[inv.indexOf(item)] = { ...item, stock: +e.target.value };
                            setInv(updated);
                          }}
                          className="admin-input"
                          style={{ fontSize: 13, padding: '5px 8px', width: 70 }}
                        />
                      </td>
                      <td style={{ color: '#6b7280', fontSize: 13 }}>≤ {item.threshold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
