"use client";
import React, { useState } from 'react';

export default function CMSPage() {
  const [activeTab, setActiveTab] = useState('HOME');
  const tabs = ['HOME', 'PORTFOLIO', 'FILMS', 'ALBUMS', 'ABOUT'];

  const [images, setImages] = useState({
    heroBg: '',
    editorialArch: '',
    storyPhilosophy: ''
  });

  const handleChange = (key, val) => {
    setImages(prev => ({ ...prev, [key]: val }));
  };

  const handleSave = (section) => {
    alert(`Saved ${section} visual asset!`);
  };

  return (
    <div className="w-full font-sans antialiased text-[#F5F5F5] px-6 sm:px-10 py-8 bg-[#0B0D0E] min-h-screen">
      {/* 1. Header */}
      <div className="mb-8">
        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#D4AF37] block mb-1">
          CONTENT MANAGEMENT SUITE
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Dynamic Visual CMS
        </h1>
        <p className="text-xs text-[#8A7D5C] mt-1">
          Replace live images, hero assets, and cinema thumbnails across the platform.
        </p>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-2.5 mb-8 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-black transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black shadow-lg shadow-[#D4AF37]/20'
                : 'bg-[#121518] text-[#C5B388] border border-[#2B2519] hover:text-white hover:border-[#D4AF37]/40'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. Image Config Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Hero Background */}
        <div className="bg-[#121518] border border-[#2B2519] rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-xl bg-[#0E1012] border border-[#2B2519] flex flex-col items-center justify-center text-[#8A7D5C] shrink-0">
                <span className="text-2xl">🖼️</span>
                <span className="text-[9px] uppercase font-bold tracking-wider mt-1 text-[#D4AF37]">EMPTY</span>
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#D4AF37] block">
                  HERO BACKGROUND IMAGE
                </span>
                <p className="text-[11px] text-[#8A7D5C] mb-2 font-medium">IMAGEKIT / CDN URL</p>
                <input
                  type="text"
                  value={images.heroBg}
                  onChange={(e) => handleChange('heroBg', e.target.value)}
                  placeholder="https://ik.imagekit.io/..."
                  className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => handleSave('Hero Background')}
              className="bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black px-5 py-2 rounded-xl text-[11px] uppercase tracking-wider font-black shadow-md transition-all cursor-pointer"
            >
              SAVE & APPLY LIVE
            </button>
          </div>
        </div>

        {/* Card 2: Editorial Arch */}
        <div className="bg-[#121518] border border-[#2B2519] rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-xl bg-[#0E1012] border border-[#2B2519] flex flex-col items-center justify-center text-[#8A7D5C] shrink-0">
                <span className="text-2xl">🖼️</span>
                <span className="text-[9px] uppercase font-bold tracking-wider mt-1 text-[#D4AF37]">EMPTY</span>
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#D4AF37] block">
                  EDITORIAL ARCH PHOTO
                </span>
                <p className="text-[11px] text-[#8A7D5C] mb-2 font-medium">IMAGEKIT / CDN URL</p>
                <input
                  type="text"
                  value={images.editorialArch}
                  onChange={(e) => handleChange('editorialArch', e.target.value)}
                  placeholder="https://ik.imagekit.io/..."
                  className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => handleSave('Editorial Arch')}
              className="bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black px-5 py-2 rounded-xl text-[11px] uppercase tracking-wider font-black shadow-md transition-all cursor-pointer"
            >
              SAVE & APPLY LIVE
            </button>
          </div>
        </div>

        {/* Card 3: Story Philosophy */}
        <div className="bg-[#121518] border border-[#2B2519] rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-xl bg-[#0E1012] border border-[#2B2519] flex flex-col items-center justify-center text-[#8A7D5C] shrink-0">
                <span className="text-2xl">🖼️</span>
                <span className="text-[9px] uppercase font-bold tracking-wider mt-1 text-[#D4AF37]">EMPTY</span>
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#D4AF37] block">
                  STORY PHILOSOPHY CIRCLE VISUAL
                </span>
                <p className="text-[11px] text-[#8A7D5C] mb-2 font-medium">IMAGEKIT / CDN URL</p>
                <input
                  type="text"
                  value={images.storyPhilosophy}
                  onChange={(e) => handleChange('storyPhilosophy', e.target.value)}
                  placeholder="https://ik.imagekit.io/..."
                  className="w-full bg-[#181B1F] border border-[#2B2519] text-white rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => handleSave('Story Philosophy')}
              className="bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black px-5 py-2 rounded-xl text-[11px] uppercase tracking-wider font-black shadow-md transition-all cursor-pointer"
            >
              SAVE & APPLY LIVE
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
