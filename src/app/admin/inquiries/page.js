'use client';
import React, { useState, useEffect } from 'react';

export default function ClientInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/inquiries')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setInquiries(data.inquiries);
        }
        setLoading(false);
      });
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const res = await fetch('/api/inquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus })
    });
    const data = await res.json();
    if (data.success) {
      setInquiries(prev => prev.map(inq => inq._id === id ? { ...inq, status: newStatus } : inq));
    }
  };

  if (loading) {
    return <div className="text-[#5B6454] animate-pulse text-[10px] tracking-widest uppercase font-semibold">Loading Inquiries...</div>;
  }

  return (
    <section className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-3xl text-[#1E221D]">Leads & Inquiries</h2>
      </div>

      <div className="bg-white border border-[#E4DFD5] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#1E221D]">
            <thead className="bg-[#F5F3ED] border-b border-[#E4DFD5] text-[10px] uppercase tracking-[0.2em] text-[#5B6454] font-semibold">
              <tr>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Event Details</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-[#7A8275] italic font-serif text-base border-b border-[#E4DFD5]/30">
                    No client inquiries found.
                  </td>
                </tr>
              )}
              {inquiries.map((inq) => (
                <tr key={inq._id} className="border-b border-[#F0EBE1] hover:bg-[#FAF8F5] transition">
                  <td className="px-6 py-4">
                    <div className="font-serif text-lg text-[#1E221D]">{inq.name}</div>
                    <div className="text-[10px] uppercase tracking-wider text-[#7A8275] mt-1">{new Date(inq.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-[#485042] mb-1">{inq.mobile}</div>
                    <div className="text-xs text-[#7A8275]">{inq.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-[#485042]"><span className="font-semibold">Type:</span> {inq.service || 'N/A'}</div>
                    <div className="text-xs text-[#485042]"><span className="font-semibold">Date:</span> {inq.date || 'N/A'}</div>
                    <div className="text-xs text-[#485042]"><span className="font-semibold">Loc:</span> {inq.location || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={inq.status} 
                      onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                      className={`text-[10px] uppercase tracking-widest font-semibold rounded-full px-3 py-1.5 outline-none cursor-pointer border ${
                        inq.status === 'New Inquiry' ? 'bg-[#EFE8DD] text-[#7A6241] border-[#DDD0BC]' :
                        inq.status === 'Deal Booked' ? 'bg-[#DDE5DC] text-[#3D563B] border-[#C5D3C4]' :
                        inq.status === 'Contacted' ? 'bg-[#E2E6E3] text-[#4F5953] border-[#CCD4CE]' :
                        'bg-[#F5F3ED] text-[#7A8275] border-[#E4DFD5]'
                      }`}
                    >
                      <option value="New Inquiry">New Inquiry</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Deal Booked">Deal Booked</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a 
                      href={`https://wa.me/${inq.mobile.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-[#25D366]/10 text-[#075E54] hover:bg-[#25D366]/20 border border-[#25D366]/30 px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-widest transition"
                    >
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
