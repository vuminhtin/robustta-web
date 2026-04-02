'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import SearchModal from '@/components/SearchModal';
import { getMenuItems } from '@/app/actions/menuActions';

interface NavLink {
  href: string;
  label: string;
}

const FALLBACK_NAV: NavLink[] = [
  { href: '/', label: 'Trang chủ' },
  { href: '/products', label: 'Sản phẩm' },
  { href: '/gift-sets', label: 'Set quà' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'Câu chuyện' },
  { href: '/contact', label: 'Liên hệ' },
];

export default function Header() {
  const { cartCount } = useCart();
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<NavLink[]>(FALLBACK_NAV);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Fetch dynamic menu
    getMenuItems('header').then((items: any[]) => {
      if (items && items.length > 0) {
        setNavLinks(items.map((i: any) => ({ href: i.url, label: i.label })));
      }
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo-color.png"
              alt="RobustTA"
              width={160}
              height={48}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold tracking-wide text-brand-brown-dark hover:text-brand-green transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-brand-green after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search + Cart + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-brand-cream transition-colors"
              aria-label="Tìm kiếm"
            >
              <svg className="w-5 h-5 text-brand-brown-dark" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
            {/* Account */}
            <Link
              href={user ? '/account' : '/login'}
              className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-brand-cream transition-colors"
              aria-label={user ? 'Tài khoản' : 'Đăng nhập'}
            >
              <svg className="w-5 h-5 text-brand-brown-dark" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </Link>
            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-11 h-11 rounded-full hover:bg-brand-cream transition-colors"
              aria-label="Giỏ hàng"
            >
              <svg className="w-6 h-6 text-brand-brown-dark" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-[11px] font-bold text-white">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-full hover:bg-brand-cream transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6 text-brand-brown-dark" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-brand-brown-dark" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-t border-brand-cream shadow-lg">
          <nav className="flex flex-col py-4 px-6 gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-4 text-base font-semibold text-brand-brown-dark hover:text-brand-green hover:bg-brand-cream/60 rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 px-4 text-base font-semibold text-brand-green hover:bg-brand-cream/60 rounded-xl transition-colors flex items-center gap-2"
            >
              🛒 Giỏ hàng {cartCount > 0 && `(${cartCount})`}
            </Link>
            <Link
              href="/affiliate"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 px-4 text-base font-semibold text-brand-brown-dark hover:text-brand-green hover:bg-brand-cream/60 rounded-xl transition-colors flex items-center gap-2"
            >
              🔗 Affiliate
            </Link>
          </nav>
        </div>
      )}
    </header>

    {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
    </>
  );
}
