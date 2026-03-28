'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/products', label: 'Sản phẩm', icon: '☕' },
  { href: '/admin/orders', label: 'Đơn hàng', icon: '📦' },
  { href: '/admin/blog', label: 'Blog', icon: '✍️' },
  { href: '/admin/vouchers', label: 'Vouchers', icon: '🏷️' },
  { href: '/admin/reports', label: 'Báo cáo', icon: '📈' },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="admin-hamburger"
        aria-label="Toggle menu"
      >
        <span style={{ fontSize: 22 }}>{open ? '✕' : '☰'}</span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="admin-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar${open ? ' open' : ''}`}>
        {/* Logo */}
        <div className="admin-logo">
          <span className="admin-logo-icon">☕</span>
          <span className="admin-logo-text">RobustTA</span>
          <span className="admin-logo-badge">Admin</span>
        </div>

        {/* Nav */}
        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item${isActive(item.href) ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              <span className="admin-nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-nav-item" style={{ opacity: 0.6 }}>
            <span className="admin-nav-icon">🌐</span>
            <span className="admin-nav-label">Xem trang chính</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
