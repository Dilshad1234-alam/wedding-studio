'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const userStr = sessionStorage.getItem('weddingpur_user');
    
    if (!userStr) {
      router.push('/login');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'admin') {
        router.push('/');
        return;
      }
      setIsAuthorized(true);
    } catch (e) {
      router.push('/login');
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#212639] flex items-center justify-center">
        <div className="text-[#B38F4D] text-lg animate-pulse">Loading Admin OS...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#212639] text-[#EDEAE4] pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif text-[#B38F4D] mb-8">Admin Dashboard</h1>
        <div className="bg-[#2B324B] border border-white/10 rounded-xl p-8 shadow-2xl">
          <p className="text-gray-300">Welcome to the Weddingpur Admin OS. You are securely authenticated via this browser tab.</p>
        </div>
      </div>
    </div>
  );
}
