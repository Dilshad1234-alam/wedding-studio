'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      sessionStorage.setItem('weddingpur_user', JSON.stringify(data.user));
      sessionStorage.setItem('weddingpur_token', data.token);

      if (data.user?.role === 'admin') {
        router.push('/admin/overview');
      } else {
        window.location.href = '/';
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 antialiased text-[#F5F5F5] font-sans selection:bg-amber-500/30 selection:text-amber-200 w-full" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(212, 163, 89, 0.08) 0%, rgba(10, 10, 10, 0.95) 70%, #050505 100%)' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#D4AF37] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.03] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#D4AF37] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.04]"></div>
      </div>

      <div className="relative z-10 w-full max-w-[430px] bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_0_50px_-12px_rgba(212,163,89,0.2)]">
        <div className="text-center mb-6">
          <Link className="inline-block group cursor-pointer transition-transform duration-300 hover:scale-[1.03]" href="/" title="Back to Home">
            <img 
              src="/lensloom-logo.png" 
              alt="LensLoom Production" 
              className="h-24 w-auto object-contain mx-auto scale-[2.5]" 
            />
          </Link>
        </div>
          
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-white tracking-tight font-serif italic mb-1">
            Welcome Back
          </h1>
          <p className="text-xs text-[#8A7D5C]">
            Sign in to your Weddingpur account
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-[#D4AF37] mb-1.5">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="hello@example.com"
              className="w-full bg-[#181818] border border-white/10 text-white rounded-xl px-4 py-3 text-xs font-medium placeholder-[#554C34] focus:outline-none focus:border-amber-500/65 focus:ring-1 focus:ring-amber-500/40 transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-[#D4AF37] mb-1.5">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-[#181818] border border-white/10 text-white rounded-xl px-4 py-3 text-xs font-medium placeholder-[#554C34] focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A7D5C] hover:text-[#D4AF37] p-1 transition-colors flex items-center justify-center cursor-pointer"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#c59a45] via-[#e2b755] to-[#c59a45] hover:brightness-110 hover:scale-[1.02] text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-amber-500/20 hover:shadow-[0_0_25px_rgba(212,163,89,0.45)] active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-xs text-[#8A7D5C] space-y-2">
          <div>Secure Admin Gateway</div>
        </div>
      </div>
    </div>
  );
}
