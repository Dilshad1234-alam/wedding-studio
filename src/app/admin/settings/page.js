"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GlobalSettings() {
  const [settings, setSettings] = useState({
    brandName: "",
    brandTagline: "",
    logoType: "TEXT",
    logoImageUrl: "",
    primaryPhone: "",
    whatsappNumber: "",
    officialEmail: "",
    studioAddress: "",
    operationalCities: "",
    instagramUrl: "",
    youtubeUrl: "",
    copyrightText: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setSettings(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setToastMessage('');

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      
      if (data.success) {
        setToastMessage('Global Settings Updated');
        
        // Notify other tabs to reload settings
        localStorage.setItem('weddingpur_settings_updated', JSON.stringify(data.settings));
        
        setTimeout(() => setToastMessage(''), 3000);
      } else {
        setToastMessage('Failed to update settings');
      }
    } catch (err) {
      setToastMessage('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0D0E] flex items-center justify-center">
        <div className="text-[#D4AF37] animate-pulse text-[10px] font-mono tracking-[0.25em] uppercase font-bold">
          Loading Settings...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-8 selection:bg-[#D4AF37] selection:text-black relative">
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-[#121518] border border-[#D4AF37]/50 text-[#D4AF37] px-6 py-3 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] text-xs font-sans font-semibold uppercase tracking-wider flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            {toastMessage}
          </div>
        </div>
      )}

      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
            GLOBAL CONFIGURATION
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Brand Settings
          </h1>
          <p className="text-xs font-sans text-[#8A7D5C] mt-1 font-normal">
            Manage global studio information, social links, and contact details used across the website.
          </p>
        </div>
        <Link 
          className="px-4 py-2.5 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-[#D4AF37] text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer self-start sm:self-auto shadow-md flex items-center gap-1.5" 
          href="/admin/overview"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <form onSubmit={handleSave} className="space-y-8 max-w-5xl font-sans">
        
        {/* BRAND IDENTITY */}
        <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-7 lg:p-8 shadow-xl">
          <h3 className="text-base font-sans font-semibold tracking-tight text-white mb-6 border-b border-[#2B2519] pb-4 flex items-center justify-between">
            <span>Brand Identity</span>
            <span className="text-[10px] font-mono font-bold text-[#D4AF37] bg-[#1C1812] border border-[#3A311D] px-2.5 py-1 rounded-lg uppercase tracking-wider">
              Core Identity
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Brand Name</label>
              <input 
                type="text" 
                name="brandName" 
                value={settings.brandName} 
                onChange={handleChange} 
                className="w-full bg-[#181B20] border border-[#2B2519] text-white rounded-xl px-4 py-3 text-xs font-normal focus:outline-none focus:border-[#D4AF37] transition-all" 
              />
            </div>
            <div>
              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Brand Tagline</label>
              <input 
                type="text" 
                name="brandTagline" 
                value={settings.brandTagline} 
                onChange={handleChange} 
                className="w-full bg-[#181B20] border border-[#2B2519] text-white rounded-xl px-4 py-3 text-xs font-normal focus:outline-none focus:border-[#D4AF37] transition-all" 
              />
            </div>
            <div>
              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Logo Display Type</label>
              <select 
                name="logoType" 
                value={settings.logoType} 
                onChange={handleChange} 
                className="w-full bg-[#181B20] border border-[#2B2519] text-white rounded-xl px-4 py-3 text-xs font-normal focus:outline-none focus:border-[#D4AF37] transition-all appearance-none"
              >
                <option value="TEXT">Text Only</option>
                <option value="IMAGE">Image Only</option>
              </select>
            </div>
            <div>
              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Logo Image URL</label>
              <input 
                type="text" 
                name="logoImageUrl" 
                value={settings.logoImageUrl} 
                onChange={handleChange} 
                className="w-full bg-[#0B0D0E] border border-[#2B2519] text-[#D1C7A5] font-mono rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37] transition-all" 
                placeholder="https://..." 
              />
            </div>
          </div>
        </div>

        {/* CONTACT & LOCATION */}
        <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-7 lg:p-8 shadow-xl">
          <h3 className="text-base font-sans font-semibold tracking-tight text-white mb-6 border-b border-[#2B2519] pb-4 flex items-center justify-between">
            <span>Contact & Location</span>
            <span className="text-[10px] font-mono font-bold text-[#D4AF37] bg-[#1C1812] border border-[#3A311D] px-2.5 py-1 rounded-lg uppercase tracking-wider">
              Transmission
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Primary Phone</label>
              <input 
                type="text" 
                name="primaryPhone" 
                value={settings.primaryPhone} 
                onChange={handleChange} 
                className="w-full bg-[#181B20] border border-[#2B2519] text-white font-mono rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37] transition-all" 
              />
            </div>
            <div>
              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">WhatsApp Number</label>
              <input 
                type="text" 
                name="whatsappNumber" 
                value={settings.whatsappNumber} 
                onChange={handleChange} 
                className="w-full bg-[#181B20] border border-[#2B2519] text-white font-mono rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37] transition-all" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Official Email</label>
              <input 
                type="email" 
                name="officialEmail" 
                value={settings.officialEmail} 
                onChange={handleChange} 
                className="w-full bg-[#181B20] border border-[#2B2519] text-white font-mono rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37] transition-all" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Studio Address</label>
              <input 
                type="text" 
                name="studioAddress" 
                value={settings.studioAddress} 
                onChange={handleChange} 
                className="w-full bg-[#181B20] border border-[#2B2519] text-white rounded-xl px-4 py-3 text-xs font-normal focus:outline-none focus:border-[#D4AF37] transition-all" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Operational Cities</label>
              <input 
                type="text" 
                name="operationalCities" 
                value={settings.operationalCities} 
                onChange={handleChange} 
                className="w-full bg-[#181B20] border border-[#2B2519] text-[#8A7D5C] font-mono rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37] transition-all" 
              />
            </div>
          </div>
        </div>

        {/* SOCIAL & FOOTER */}
        <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-7 lg:p-8 shadow-xl">
          <h3 className="text-base font-sans font-semibold tracking-tight text-white mb-6 border-b border-[#2B2519] pb-4 flex items-center justify-between">
            <span>Social Links & Footer</span>
            <span className="text-[10px] font-mono font-bold text-[#D4AF37] bg-[#1C1812] border border-[#3A311D] px-2.5 py-1 rounded-lg uppercase tracking-wider">
              Network Channels
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Instagram URL</label>
              <input 
                type="text" 
                name="instagramUrl" 
                value={settings.instagramUrl} 
                onChange={handleChange} 
                className="w-full bg-[#0B0D0E] border border-[#2B2519] text-[#D1C7A5] font-mono rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37] transition-all" 
              />
            </div>
            <div>
              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">YouTube URL</label>
              <input 
                type="text" 
                name="youtubeUrl" 
                value={settings.youtubeUrl} 
                onChange={handleChange} 
                className="w-full bg-[#0B0D0E] border border-[#2B2519] text-[#D1C7A5] font-mono rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37] transition-all" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Copyright Text</label>
              <input 
                type="text" 
                name="copyrightText" 
                value={settings.copyrightText} 
                onChange={handleChange} 
                className="w-full bg-[#181B20] border border-[#2B2519] text-white rounded-xl px-4 py-3 text-xs font-normal focus:outline-none focus:border-[#D4AF37] transition-all" 
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={saving} 
            className="px-8 py-3 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20 transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>

      </form>
    </div>
  );
}