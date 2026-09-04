'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      router.push('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6 py-12 font-sans selection:bg-[#5B6454] selection:text-[#FAF8F5]">
      <div className="w-full max-w-md bg-white border border-[#E8E4DC] rounded-3xl shadow-lg p-8 sm:p-12 relative overflow-hidden">
        
        {/* Soft Sage Background Decor */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#ECEFEA] to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex flex-col items-center focus:outline-none">
              <div className="text-center font-serif">
                <span className="text-xl sm:text-2xl font-light tracking-[0.25em] text-[#1E221D] block leading-none mb-1.5">
                  WEDDINGPUR
                </span>
                <span className="text-[9px] tracking-[0.4em] text-[#626C59] uppercase font-sans leading-none block text-center">
                  STUDIO & CINEMA
                </span>
              </div>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-[#1E221D] mb-2 italic">Create an Account</h1>
            <p className="text-[#5F6757] font-light text-sm tracking-wide">Join Weddingpur to manage your memories</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50/50 border border-red-200 text-red-600 text-[11px] uppercase tracking-wider rounded-xl text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#626C59] font-semibold mb-2 block ml-2">Full Name</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#FAF8F5] border border-[#DDD7CD] rounded-xl px-4 py-3.5 text-sm text-[#1E221D] placeholder:text-[#9EA598] focus:border-[#5B6454] focus:outline-none focus:ring-1 focus:ring-[#5B6454] transition"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#626C59] font-semibold mb-2 block ml-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#FAF8F5] border border-[#DDD7CD] rounded-xl px-4 py-3.5 text-sm text-[#1E221D] placeholder:text-[#9EA598] focus:border-[#5B6454] focus:outline-none focus:ring-1 focus:ring-[#5B6454] transition"
                placeholder="hello@example.com"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#626C59] font-semibold mb-2 block ml-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-[#DDD7CD] rounded-xl px-4 py-3.5 text-sm text-[#1E221D] placeholder:text-[#9EA598] focus:border-[#5B6454] focus:outline-none focus:ring-1 focus:ring-[#5B6454] transition pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9EA598] hover:text-[#5B6454] transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#626C59] font-semibold mb-2 block ml-2">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-[#DDD7CD] rounded-xl px-4 py-3.5 text-sm text-[#1E221D] placeholder:text-[#9EA598] focus:border-[#5B6454] focus:outline-none focus:ring-1 focus:ring-[#5B6454] transition pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9EA598] hover:text-[#5B6454] transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#5B6454] text-[#FAF8F5] font-medium tracking-[0.25em] text-[11px] uppercase rounded-full px-4 py-4 mt-8 hover:bg-[#4E5646] transition shadow-md disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <p className="text-center text-[#5F6757] font-light text-sm mt-8">
            Already have an account?{' '}
            <Link href="/login" className="text-[#1E221D] font-medium hover:text-[#5B6454] transition-colors">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
