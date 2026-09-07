"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ClientInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/inquiries')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setInquiries(data.inquiries);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const targetId = typeof id === 'object' ? id : id; // just in case
    const res = await fetch('/api/inquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: targetId, status: newStatus })
    });
    const data = await res.json();
    if (data.success) {
      setInquiries(prev => prev.map(inq => (inq.id === targetId || inq._id === targetId) ? { ...inq, status: newStatus } : inq));
    }
  };

  const handleConvertToDispatch = (inq) => {
    // In a real app, this would push data to dispatch.json via an API
    handleStatusChange(inq.id || inq._id, 'CONVERTED');
    setToastMessage('Converting to Dispatch Roster...');
    
    setTimeout(() => {
      setToastMessage('');
      const query = new URLSearchParams({
        clientName: inq.name || '',
        destination: inq.location || '',
        date: inq.eventDate || '',
        budget: inq.budget || ''
      });
      router.push(`/admin/dispatch?${query.toString()}`);
    }, 1500);
  };

  // Filter inquiries
  const filteredInquiries = filter === 'ALL' 
    ? inquiries 
    : inquiries.filter(inq => inq.status === filter);

  // Stats
  const newCount = inquiries.filter(i => i.status === 'NEW').length;
  const followUpCount = inquiries.filter(i => i.status === 'FOLLOW_UP').length;
  const convertedCount = inquiries.filter(i => i.status === 'CONVERTED').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0D0E] flex items-center justify-center">
        <div className="text-[#D4AF37] animate-pulse text-[10px] tracking-[0.25em] uppercase font-black">Loading Queries...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-8 selection:bg-[#D4AF37] selection:text-black relative">
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-[#121518] border border-[#D4AF37]/50 text-[#D4AF37] px-6 py-3 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] text-xs font-black uppercase tracking-widest flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            {toastMessage}
          </div>
        </div>
      )}

      {/* 1. TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
            SALES & PIPELINE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Client Inquiries
          </h1>
          <p className="text-xs text-[#8A7D5C] mt-1">
            Manage incoming leads from the website, follow up via WhatsApp, and convert to dispatch.
          </p>
        </div>

        <Link className="px-4 py-2 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-[#D4AF37] text-[#D4AF37] text-xs font-black uppercase tracking-wider transition-all cursor-pointer self-start sm:self-auto" href="/admin/overview">
          ← Back to Dashboard
        </Link>
      </div>

      {/* 2. STATS & FILTER PILLS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#121518] border border-[#2B2519] rounded-2xl p-4 shadow-xl">
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${filter === 'ALL' ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-[#1C2027] text-[#8A7D5C] border border-[#2B2519] hover:text-[#D4AF37]'}`}
          >
            All Leads ({inquiries.length})
          </button>
          <button 
            onClick={() => setFilter('NEW')}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${filter === 'NEW' ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-[#1C2027] text-amber-500/70 border border-[#2B2519] hover:text-amber-400'}`}
          >
            New ({newCount})
          </button>
          <button 
            onClick={() => setFilter('FOLLOW_UP')}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${filter === 'FOLLOW_UP' ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-[#1C2027] text-blue-500/70 border border-[#2B2519] hover:text-blue-400'}`}
          >
            Follow-Up ({followUpCount})
          </button>
          <button 
            onClick={() => setFilter('CONVERTED')}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${filter === 'CONVERTED' ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-[#1C2027] text-emerald-500/70 border border-[#2B2519] hover:text-emerald-400'}`}
          >
            Converted ({convertedCount})
          </button>
        </div>
      </div>

      {/* 3. TABLE / LIST */}
      <div className="bg-[#121518] border border-[#2B2519] rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-[#20252F] text-[10px] font-mono font-bold tracking-wider uppercase text-[#8A7D5C] bg-[#15191F]">
                <th className="py-4 px-6">Client / Lead</th>
                <th className="py-4 px-6">Contact details</th>
                <th className="py-4 px-6 w-[25%]">Requirements & Message</th>
                <th className="py-4 px-6">Status / Pipeline</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C2027]">
              {filteredInquiries.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-[#8A7D5C] italic font-serif text-base">
                    No leads found for this category.
                  </td>
                </tr>
              )}
              {filteredInquiries.map((inq) => {
                const id = inq.id || inq._id;
                return (
                  <tr key={id} className="hover:bg-[#15191F] transition-all">
                    {/* Name & Event */}
                    <td className="py-4 px-6">
                      <div className="font-extrabold text-white text-base tracking-tight">{inq.name}</div>
                      <div className="text-[10px] uppercase tracking-wider text-[#D4AF37] mt-1 font-mono flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                        {inq.eventDate ? new Date(inq.eventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'TBD'}
                      </div>
                      <div className="text-xs text-[#8A7D5C] mt-1 truncate max-w-[150px]">
                        📍 {inq.location || 'Not Specified'}
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-6">
                      <div className="font-mono text-emerald-400 font-bold mb-1 tracking-tight text-sm">
                        {inq.mobile}
                      </div>
                      <div className="text-[11px] text-[#A89D84] truncate max-w-[180px]">
                        {inq.email}
                      </div>
                    </td>

                    {/* Requirements */}
                    <td className="py-4 px-6">
                      <div className="text-xs text-white font-bold mb-1 line-clamp-2">
                        {inq.selectedPackage || inq.service || 'N/A'}
                      </div>
                      <div className="text-[11px] text-[#8A7D5C] line-clamp-2 leading-relaxed italic">
                        "{inq.message || 'No additional message.'}"
                      </div>
                    </td>

                    {/* Status Select */}
                    <td className="py-4 px-6">
                      <select 
                        value={inq.status || 'NEW'} 
                        onChange={(e) => handleStatusChange(id, e.target.value)}
                        className={`text-[10px] font-black uppercase tracking-wider rounded-xl px-4 py-2 outline-none cursor-pointer border focus:border-white transition-all appearance-none ${
                          inq.status === 'NEW' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                          inq.status === 'FOLLOW_UP' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                          inq.status === 'CONVERTED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                          'bg-[#181B20] text-[#8A7D5C] border-[#2B2519]'
                        }`}
                      >
                        <option value="NEW">New Lead</option>
                        <option value="FOLLOW_UP">Follow-Up</option>
                        <option value="CONVERTED">Converted</option>
                        <option value="LOST">Lost / Declined</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Call */}
                        <a 
                          href={`tel:${inq.mobile}`} 
                          className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all shadow-md"
                          title="Direct Call"
                        >
                          📞
                        </a>
                        {/* WhatsApp */}
                        <a 
                          href={`https://wa.me/${inq.mobile.replace(/\D/g, '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all shadow-md"
                          title="WhatsApp Follow-Up"
                        >
                          💬
                        </a>

                        {/* Convert to Dispatch */}
                        {inq.status !== 'CONVERTED' && (
                          <button 
                            onClick={() => handleConvertToDispatch(inq)}
                            className="ml-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-[10px] font-black uppercase tracking-wider shadow-lg transition-all"
                            title="Push to Dispatch Console"
                          >
                            + Dispatch
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
