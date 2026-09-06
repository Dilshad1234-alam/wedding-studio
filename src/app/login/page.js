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
        window.location.href = '/admin';
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
    <div className="min-h-screen bg-[#0B0D0E] flex items-center justify-center p-4 antialiased text-[#F5F5F5] font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Glow Effect */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative w-full max-w-[430px] bg-[#121518] border border-[#2B2519] rounded-3xl p-8 sm:p-10 shadow-2xl">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <span className="text-[10px] uppercase font-black tracking-[0.35em] text-[#D4AF37] block mb-1">
            WEDDINGPUR
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#8A7D5C] block mb-4">
            STUDIO & CINEMA
          </span>
          
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A7D5C] hover:text-[#D4AF37] text-xs cursor-pointer p-1 transition-colors"
              >
                {showPassword ? "🙈" : "👁️"}
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
