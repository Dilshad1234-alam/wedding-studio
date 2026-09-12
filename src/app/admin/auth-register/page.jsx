'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'admin' }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      router.push('/admin/auth-login');
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
              src="/lens.png" 
              alt="LensLoom Production" 
              className="h-10 w-auto object-contain mx-auto" 
            />
          </Link>
        </div>
          
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-white tracking-tight font-serif italic mb-1">
            Admin Register
          </h1>
          <p className="text-xs text-[#8A7D5C]">
            Create new admin account for MongoDB
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
              FULL NAME
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Sanjeet Sharma"
              className="w-full bg-[#181818] border border-white/10 text-white rounded-xl px-4 py-3 text-xs font-medium placeholder-[#554C34] focus:outline-none focus:border-amber-500/65 focus:ring-1 focus:ring-amber-500/40 transition-all"
            />
          </div>

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
              placeholder="admin@lensloom.in"
              className="w-full bg-[#181818] border border-white/10 text-white rounded-xl px-4 py-3 text-xs font-medium placeholder-[#554C34] focus:outline-none focus:border-amber-500/65 focus:ring-1 focus:ring-amber-500/40 transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-[#D4AF37] mb-1.5">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-[#181818] border border-white/10 text-white rounded-xl px-4 py-3 text-xs font-medium placeholder-[#554C34] focus:outline-none focus:border-amber-500/65 focus:ring-1 focus:ring-amber-500/40 transition-all"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#c59a45] via-[#e2b755] to-[#c59a45] hover:brightness-110 hover:scale-[1.02] text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-amber-500/20 hover:shadow-[0_0_25px_rgba(212,163,89,0.45)] active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "CREATING..." : "REGISTER ADMIN"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-xs text-[#8A7D5C] space-y-2">
          <div>
            Already have an account?{' '}
            <Link href="/admin/auth-login" className="text-[#D4AF37] font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}