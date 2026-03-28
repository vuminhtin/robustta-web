'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getInventory, freshnessLabel, type MockInventory } from '@/lib/admin/mockData';
import { products } from '@/data/products';

export default function AdminProducts() {
  const [inv, setInv] = useState<MockInventory[]>([]);

  useEffect(() => { setInv(getInventory()); }, []);

  const stockStatus = (stock: number, threshold: number) => {
    if (stock === 0) return <span className="admin-badge admin-badge-red">Hết hàng</span>;
    if (stock <= threshold) return <span className="admin-badge admin-badge-orange">Sắp hết ({stock})</span>;
    return <span className="admin-badge admin-badge-green">Còn {stock}</span>;
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">☕ Sản Phẩm</h1>
          <p className="admin-page-subtitle">Quản lý biến thể, giá, tồn kho và tasting notes</p>
        </div>
      </div>

      {products.map(product => {
        const productInv = inv.filter(i => i.productId === product.id);
        const hasAlert = productInv.some(i => i.stock <= i.threshold);

        return (
          <div key={product.id} className="admin-card" style={{ borderLeft: `3px solid ${product.color}` }}>
            {/* Product Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 12,
                  background: `${product.color}22`,
                  border: `2px solid ${product.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, fontWeight: 700, color: product.color
                }}>
                  {product.letter}
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{product.name}</div>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>{product.roastLevel} · {product.tagline}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {hasAlert && <span className="admin-badge admin-badge-orange">⚠ Tồn kho thấp</span>}
                <Link href={`/admin/products/${product.id}`} className="admin-btn admin-btn-primary admin-btn-sm">
                  ✏️ Chỉnh sửa
                </Link>
              </div>
            </div>

            {/* Taste Profile mini */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
              {Object.entries(product.taste).map(([key, val]) => (
                <div key={key} style={{ fontSize: 12 }}>
                  <span style={{ color: '#6b7280', textTransform: 'capitalize' }}>{key}: </span>
                  <span style={{ color: '#7fcf9f', fontWeight: 700 }}>{val}/10</span>
                </div>
              ))}
            </div>

            {/* Inventory table */}
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Biến thể</th>
                    <th>Tồn kho</th>
                    <th>Ngày rang</th>
                    <th>Độ tươi</th>
                  </tr>
                </thead>
                <tbody>
                  {productInv.length === 0 ? (
                    <tr><td colSpan={4} style={{ color: '#4b5563', textAlign: 'center' }}>Chưa có dữ liệu tồn kho</td></tr>
                  ) : productInv.map((item, i) => {
                    const fresh = freshnessLabel(item.roastDate);
                    return (
                      <tr key={i}>
                        <td style={{ fontWeight: 600 }}>{item.variant}</td>
                        <td>{stockStatus(item.stock, item.threshold)}</td>
                        <td style={{ color: '#9ca3af', fontSize: 13 }}>{item.roastDate}</td>
                        <td style={{ color: fresh.color, fontSize: 13 }}>{fresh.label}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
