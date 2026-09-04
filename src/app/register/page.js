'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    <div className="min-h-screen bg-[#212639] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#2B324B] border border-white/10 rounded-2xl shadow-2xl p-8">
        
        <div className="flex justify-center mb-6">
          <Link href="/" className="focus:outline-none">
            <svg 
              width="250" 
              height="48" 
              viewBox="0 0 250 48" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-auto"
            >
              <circle cx="20" cy="24" r="14" stroke="#B38F4D" strokeWidth="1.5" fill="none"/>
              <circle cx="20" cy="24" r="7" stroke="#EDEAE4" strokeWidth="1.2" fill="none"/>
              <circle cx="20" cy="24" r="2.5" fill="#B38F4D"/>
              <text 
                x="44" 
                y="27" 
                fontFamily="Playfair Display, Georgia, serif" 
                fontSize="20" 
                fontWeight="700" 
                letterSpacing="0.06em" 
                fill="#EDEAE4"
              >
                WEDDING<tspan fill="#B38F4D">PUR</tspan>
              </text>
              <text 
                x="45" 
                y="38" 
                fontFamily="Montserrat, sans-serif" 
                fontSize="7" 
                fontWeight="500" 
                letterSpacing="0.28em" 
                fill="#A39E93"
              >
                STUDIO &amp; CINEMA
              </text>
            </svg>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif text-[#B38F4D] mb-2 tracking-wide">Create an Account</h1>
          <p className="text-gray-300 text-sm tracking-wider">Join Weddingpur to manage your memories</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-900/50 border border-red-500/50 text-red-200 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
            <input 
              type="text" 
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#212639] border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#B38F4D] transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#212639] border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#B38F4D] transition-colors"
              placeholder="hello@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#212639] border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#B38F4D] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-[#212639] border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#B38F4D] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#B38F4D] text-white font-medium tracking-wide rounded-lg px-4 py-3 mt-4 hover:bg-[#987538] transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-8">
          Already have an account?{' '}
          <Link href="/login" className="text-[#B38F4D] hover:text-white transition-colors">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}
