'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { user, login, register } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Redirect if already logged in
  if (user) {
    router.push('/account');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const ok = await login(email, password);
        if (!ok) { setError('Email hoặc mật khẩu không đúng'); return; }
      } else {
        if (password.length < 6) { setError('Mật khẩu tối thiểu 6 ký tự'); return; }
        const ok = await register(name, email, phone, password);
        if (!ok) { setError('Email đã được sử dụng'); return; }
      }
      router.push('/account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-brand-brown-dark">
              {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
            </h1>
            <p className="text-sm text-text-light mt-1">
              {mode === 'login'
                ? 'Chào mừng trở lại! Đăng nhập để xem đơn hàng.'
                : 'Tạo tài khoản để mua hàng nhanh hơn và quản lý đơn hàng.'}
            </p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1">Họ tên</label>
                  <input
                    type="text" required value={name} onChange={e => setName(e.target.value)}
                    className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1">Số điện thoại</label>
                  <input
                    type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                    placeholder="0912 345 678"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">Email</label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">Mật khẩu</label>
              <input
                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                placeholder="••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-brand-green text-white font-bold transition-all hover:bg-brand-green-light hover:shadow-md disabled:opacity-50"
            >
              {loading ? '...' : mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
            </button>
          </form>

          <div className="mt-6 text-center">
            {mode === 'login' ? (
              <p className="text-sm text-text-secondary">
                Chưa có tài khoản?{' '}
                <button onClick={() => { setMode('register'); setError(''); }} className="text-brand-green font-semibold hover:underline">
                  Đăng ký ngay
                </button>
              </p>
            ) : (
              <p className="text-sm text-text-secondary">
                Đã có tài khoản?{' '}
                <button onClick={() => { setMode('login'); setError(''); }} className="text-brand-green font-semibold hover:underline">
                  Đăng nhập
                </button>
              </p>
            )}
          </div>

          <div className="mt-5 text-center">
            <Link href="/checkout" className="text-xs text-text-light hover:text-brand-green transition-colors">
              Hoặc tiếp tục mua hàng như khách vãng lai →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
