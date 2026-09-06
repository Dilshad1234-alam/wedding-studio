"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to register');

      router.push('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
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
            Create an Account
          </h1>
          <p className="text-xs text-[#8A7D5C]">
            Join Weddingpur to manage your memories
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-[#D4AF37] mb-1.5">
              FULL NAME
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-4 py-3 text-xs font-medium placeholder-[#554C34] focus:outline-none focus:border-[#D4AF37] transition-all"
            />
          </div>

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

          {/* Confirm Password */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-[#D4AF37] mb-1.5">
              CONFIRM PASSWORD
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-4 py-3 text-xs font-medium placeholder-[#554C34] focus:outline-none focus:border-[#D4AF37] transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A7D5C] hover:text-[#D4AF37] text-xs cursor-pointer p-1 transition-colors"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#D4AF37]/20 hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "CREATING ACCOUNT..." : "REGISTER"}
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-xs text-[#8A7D5C]">
          Already have an account?{' '}
          <Link className="text-[#D4AF37] hover:text-[#F3E5AB] font-bold tracking-wide transition-colors underline underline-offset-4" href="/login">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
