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

      // Store in sessionStorage
      sessionStorage.setItem('weddingpur_user', JSON.stringify(data.user));
      sessionStorage.setItem('weddingpur_token', data.token);

      // Role-based redirect
      if (data.user?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D0E] flex items-center justify-center p-4 antialiased text-[#F5F5F5] font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Glow Effect */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative w-full max-w-[430px] bg-[#121518] border border-[#2B2519] rounded-3xl p-8 sm:p-10 shadow-2xl">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link className="inline-block group cursor-pointer transition-transform duration-300 hover:scale-[1.03]" href="/" title="Back to Home">
            <span className="text-sm sm:text-base font-black tracking-[0.35em] text-[#D4AF37] block group-hover:text-[#F3E5AB] transition-colors">
              WEDDINGPUR
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8A7D5C] block mt-0.5 group-hover:text-[#C5B388] transition-colors">
              STUDIO & CINEMA
            </span>
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

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Address */}
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
              className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-4 py-3 text-xs font-medium placeholder-[#554C34] focus:outline-none focus:border-[#D4AF37] transition-all"
            />
          </div>

          {/* Password */}
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
                className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-4 py-3 text-xs font-medium placeholder-[#554C34] focus:outline-none focus:border-[#D4AF37] transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A7D5C] hover:text-[#D4AF37] p-1 transition-colors flex items-center justify-center"
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

          {/* Submit CTA */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#D4AF37]/20 hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-xs text-[#8A7D5C]">
          Don't have an account?{' '}
          <Link className="text-[#D4AF37] hover:text-[#F3E5AB] font-bold tracking-wide transition-colors underline underline-offset-4" href="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
