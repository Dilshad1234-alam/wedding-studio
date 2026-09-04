"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Module Components
import DynamicVisualCMS from './modules/DynamicVisualCMS';
import TeamDirectory from './modules/TeamDirectory';
import CrewDispatch from './modules/CrewDispatch';
import ClientInquiries from './modules/ClientInquiries';
import EditorialStories from './modules/EditorialStories';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dispatch'); // 'dispatch' | 'team' | 'cms' | 'inquiries' | 'stories'
  const [user, setUser] = useState(null);
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  // Auth Protection Check
  useEffect(() => {
    const storedUser = sessionStorage.getItem('weddingpur_user') || localStorage.getItem('weddingpur_user');
    
    if (!storedUser) {
      window.location.href = '/login';
      return;
    }

    try {
      const parsed = JSON.parse(storedUser);
      if (parsed.role === 'admin') {
        sessionStorage.setItem('weddingpur_user', JSON.stringify(parsed));
        setUser(parsed);
        setIsAuthorizing(false);
      } else {
        window.location.href = '/';
      }
    } catch (e) {
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem('weddingpur_user');
    window.location.href = '/login';
  };

  if (isAuthorizing) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-[#5B6454]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#5B6454] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs uppercase tracking-widest font-serif">Verifying Studio OS...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E221D] flex selection:bg-[#5B6454] selection:text-[#FAF8F5] font-sans">
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#ECEFEA] border-r border-[#DDD7CD] min-h-screen p-6 flex flex-col justify-between fixed left-0 top-0 bottom-0 z-40 shadow-sm">
        <div>
          <div className="mb-10 mt-2">
            <span className="text-[9px] tracking-[0.35em] text-[#5B6454] font-semibold uppercase block mb-1">Weddingpur Command</span>
            <span className="font-serif text-2xl tracking-[0.2em] text-[#1E221D] uppercase">STUDIO OS</span>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'dispatch', label: 'Crew Dispatch', icon: '📅' },
              { id: 'team', label: 'Team Directory', icon: '👥' },
              { id: 'cms', label: 'Image CMS', icon: '🖼️' },
              { id: 'inquiries', label: 'Client Inquiries', icon: '✉️' },
              { id: 'stories', label: 'Editorial Stories', icon: '📖' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[10px] uppercase tracking-wider font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-[#5B6454] text-[#FAF8F5] shadow-sm'
                    : 'text-[#485042] hover:bg-[#E0E5DE] hover:text-[#1E221D]'
                }`}
              >
                <span className="text-sm">{tab.icon}</span> {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Profile & Actions */}
        <div className="pt-6 border-t border-[#DDD7CD]">
          <div className="text-[10px] tracking-widest font-semibold text-[#1E221D] mb-4 uppercase">
            Admin: {user?.name || 'MD DILSHAD'}
          </div>
          <Link className="flex items-center gap-2 text-[10px] text-[#7A8275] hover:text-[#5B6454] tracking-widest uppercase font-semibold mb-4 transition" href="/" target="_blank">
            ↗ Open Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[10px] text-rose-700 hover:text-rose-900 tracking-widest uppercase font-semibold transition cursor-pointer"
          >
            🔒 Secure Logout
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="ml-64 flex-1 p-8 sm:p-12 h-screen overflow-y-auto">
        <header className="mb-10">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#5B6454] font-semibold block mb-2">
            Welcome Back, {user?.name || 'Md Dilshad'}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1E221D] font-normal">
            {activeTab === 'dispatch' && 'Operational Dashboard'}
            {activeTab === 'team' && 'Team & Crew Directory'}
            {activeTab === 'cms' && 'Dynamic Visual CMS'}
            {activeTab === 'inquiries' && 'Client Leads Inbox'}
            {activeTab === 'stories' && 'Editorial Publisher'}
          </h1>
        </header>

        {activeTab === 'dispatch' && <CrewDispatch />}
        {activeTab === 'team' && <TeamDirectory />}
        {activeTab === 'cms' && <DynamicVisualCMS />}
        {activeTab === 'inquiries' && <ClientInquiries />}
        {activeTab === 'stories' && <EditorialStories />}
      </main>
    </div>
  );
}
