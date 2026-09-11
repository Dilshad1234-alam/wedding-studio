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
    const targetId = typeof id === 'object' ? id : id;
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
    handleStatusChange(inq.id || inq._id, 'CONVERTED');
    setToastMessage('Pushing Lead to Dispatch Roster...');
    
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

  const filteredInquiries = filter === 'ALL' 
    ? inquiries 
    : inquiries.filter(inq => inq.status === filter);

  const newCount = inquiries.filter(i => i.status === 'NEW').length;
  const followUpCount = inquiries.filter(i => i.status === 'FOLLOW_UP').length;
  const convertedCount = inquiries.filter(i => i.status === 'CONVERTED').length;
  const lostCount = inquiries.filter(i => i.status === 'LOST').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0D0E] flex items-center justify-center">
        <div className="text-[#D4AF37] animate-pulse text-xs tracking-[0.25em] uppercase font-mono font-bold">
          Scanning Incoming Leads Pipeline...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-8 selection:bg-[#D4AF37] selection:text-black relative">
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-[#121518] border border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.25)] text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping"></span>
            {toastMessage}
          </div>
        </div>
      )}

      {/* 1. TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
            CRM & WEBSITE LEADS CONTROL
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Client Inquiries Hub
          </h1>
          <p className="text-xs text-[#8A7D5C] mt-1 font-normal">
            Real-time inquiries submitted via the live website. Engage prospects, follow up, and convert into active dispatch contracts.
          </p>
        </div>

        <Link className="px-4 py-2.5 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-[#D4AF37] text-[#D4AF37] text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer self-start sm:self-auto shadow-md" href="/admin/overview">
          ← Back to Dashboard
        </Link>
      </div>

      {/* 2. STATS & FILTER PILLS */}
      <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-5 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filter === 'ALL' ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20 font-black' : 'bg-[#181B20] text-[#8A7D5C] border border-[#2B2519] hover:text-white'
            }`}
          >
            All Inquiries ({inquiries.length})
          </button>
          <button 
            onClick={() => setFilter('NEW')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filter === 'NEW' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black' : 'bg-[#181B20] text-amber-400 border border-[#2B2519] hover:bg-amber-500/10'
            }`}
          >
            New Leads ({newCount})
          </button>
          <button 
            onClick={() => setFilter('FOLLOW_UP')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filter === 'FOLLOW_UP' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20 font-black' : 'bg-[#181B20] text-blue-400 border border-[#2B2519] hover:bg-blue-500/10'
            }`}
          >
            Follow-Up ({followUpCount})
          </button>
          <button 
            onClick={() => setFilter('CONVERTED')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filter === 'CONVERTED' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-black' : 'bg-[#181B20] text-emerald-400 border border-[#2B2519] hover:bg-emerald-500/10'
            }`}
          >
            Converted ({convertedCount})
          </button>
          <button 
            onClick={() => setFilter('LOST')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filter === 'LOST' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20 font-black' : 'bg-[#181B20] text-rose-400 border border-[#2B2519] hover:bg-rose-500/10'
            }`}
          >
            Lost ({lostCount})
          </button>
        </div>

        <div className="text-xs font-mono text-[#8A7D5C]">
          Total Leads Logged: <strong className="text-white">{inquiries.length}</strong>
        </div>
      </div>

      {/* 3. TABLE CONTAINER */}
      <div className="bg-[#121518] border border-[#2B2519] rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[1100px]">
            <thead>
              <tr className="border-b border-[#20252F] text-[10px] font-mono font-bold tracking-wider uppercase text-[#8A7D5C] bg-[#15191F]">
                <th className="py-4 px-6">PROSPECT / EVENT</th>
                <th className="py-4 px-6">CONTACT DETAILS</th>
                <th className="py-4 px-6 w-[30%]">WEBSITE PACKAGE & MESSAGE</th>
                <th className="py-4 px-6">PIPELINE STATUS</th>
                <th className="py-4 px-6 text-center">CONTACT & ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C2027] font-sans">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-[#8A7D5C] italic font-serif text-base">
                    ✨ No client inquiries found under this category.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => {
                  const id = inq.id || inq._id;
                  return (
                    <tr key={id} className="hover:bg-[#161A20] transition-all">
                      
                      {/* Name & Event */}
                      <td className="py-4 px-6 space-y-1">
                        <div className="font-extrabold text-white text-base tracking-tight">{inq.name}</div>
                        <div className="text-[11px] font-mono text-[#D4AF37] font-semibold flex items-center gap-1.5">
                          <span>📅 {inq.eventDate ? new Date(inq.eventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Date TBD'}</span>
                        </div>
                        <div className="text-xs text-[#A89D84]">
                          📍 {inq.location || 'Location Not Specified'}
                        </div>
                      </td>

                      {/* Contact Details (Separate Rows for Mobile & Email) */}
                      <td className="py-4 px-6 space-y-1.5">
                        <div className="font-mono text-emerald-400 font-bold text-sm tracking-tight flex items-center gap-1.5">
                          <span>📞</span> {inq.mobile}
                        </div>
                        <div className="text-xs text-[#A89D84] font-mono flex items-center gap-1.5 truncate max-w-[200px]">
                          <span>✉️</span> {inq.email || 'No email provided'}
                        </div>
                      </td>

                      {/* Requirements & Message (Separate Sections) */}
                      <td className="py-4 px-6 space-y-2">
                        {/* Selected Package from Website */}
                        <div className="inline-block px-3 py-1 rounded-lg text-[11px] font-mono font-bold bg-[#1A1E24] text-[#D4AF37] border border-[#2B2519]">
                          {inq.selectedPackage || inq.service || 'Custom Wedding Package'}
                        </div>
                        {/* Client Message */}
                        <div className="text-xs text-[#C5B388] italic leading-relaxed">
                          "{inq.message || 'No additional message left by client.'}"
                        </div>
                      </td>

                      {/* Status Select */}
                      <td className="py-4 px-6">
                        <select 
                          value={inq.status || 'NEW'} 
                          onChange={(e) => handleStatusChange(id, e.target.value)}
                          className={`text-[10px] font-mono font-bold uppercase tracking-wider rounded-xl px-3 py-2 outline-none cursor-pointer border transition-all ${
                            inq.status === 'NEW' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                            inq.status === 'FOLLOW_UP' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                            inq.status === 'CONVERTED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                            'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          }`}
                        >
                          <option value="NEW" className="bg-[#121518] text-amber-400">New Lead</option>
                          <option value="FOLLOW_UP" className="bg-[#121518] text-blue-400">Follow-Up</option>
                          <option value="CONVERTED" className="bg-[#121518] text-emerald-400">Converted</option>
                          <option value="LOST" className="bg-[#121518] text-rose-400">Lost / Declined</option>
                        </select>
                      </td>

                      {/* Actions (Mobile Number Displayed + Action Buttons) */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className="font-mono font-bold text-white text-xs bg-[#181B20] px-3 py-1 rounded-lg border border-[#2B2519]">
                            {inq.mobile}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <a 
                              href={`tel:${inq.mobile}`} 
                              className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white text-[11px] font-mono font-bold transition-all shadow-md flex items-center gap-1"
                              title="Direct Call"
                            >
                              <span>📞</span> Call
                            </a>
                            
                            <a 
                              href={`https://wa.me/91${(inq.mobile || '').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.name)},%20thank%20you%20for%20inquiring%20with%20Weddingpur%20Studio.%20Let's%20discuss%20your%20wedding%20coverage.`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white text-[11px] font-mono font-bold transition-all shadow-md flex items-center gap-1"
                              title="WhatsApp Chat"
                            >
                              <span>💬</span> WhatsApp
                            </a>

                            {inq.status !== 'CONVERTED' && (
                              <button 
                                type="button"
                                onClick={() => handleConvertToDispatch(inq)}
                                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-[11px] font-sans font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                                title="Push lead directly into wedding dispatch roster"
                              >
                                + Dispatch
                              </button>
                            )}
                          </div>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}