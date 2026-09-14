'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LeadsManagementPage() {
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('weddingpur_token');
    if (!token) {
      router.push('/admin');
    } else {
      setIsAuthorized(true);
      fetchLeads();
    }
  }, [router]);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthorized) return null;

  if (isLoading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-serif text-[#D4AF37] mb-6 tracking-wide">LEADS MANAGEMENT</h1>
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-[#181B20] rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-[#181B20] rounded col-span-2"></div>
                <div className="h-2 bg-[#181B20] rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-[#181B20] rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#D4AF37] tracking-wider uppercase mb-2">Leads Management</h1>
          <p className="text-sm text-[#8A7D5C] font-mono">View and manage popup capture leads.</p>
        </div>
      </div>

      <div className="bg-[#0B0D0E] border border-[#2B2519] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2B2519] bg-[#121518]">
                <th className="py-4 px-6 text-[10px] font-mono tracking-widest text-[#8A7D5C] uppercase font-semibold">Date</th>
                <th className="py-4 px-6 text-[10px] font-mono tracking-widest text-[#8A7D5C] uppercase font-semibold">Name</th>
                <th className="py-4 px-6 text-[10px] font-mono tracking-widest text-[#8A7D5C] uppercase font-semibold">Email</th>
                <th className="py-4 px-6 text-[10px] font-mono tracking-widest text-[#8A7D5C] uppercase font-semibold">Phone</th>
                <th className="py-4 px-6 text-[10px] font-mono tracking-widest text-[#8A7D5C] uppercase font-semibold">Address</th>
                <th className="py-4 px-6 text-[10px] font-mono tracking-widest text-[#8A7D5C] uppercase font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F242D]">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-[#8A7D5C] text-sm">
                    No leads captured yet.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-[#15191F] transition-colors group">
                    <td className="py-4 px-6 text-xs text-[#8A7D5C] whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-6 text-sm text-white font-medium whitespace-nowrap">
                      {lead.name}
                    </td>
                    <td className="py-4 px-6 text-xs text-[#D1C7A5]">
                      <a href={`mailto:${lead.email}`} className="hover:text-[#D4AF37] transition-colors">{lead.email}</a>
                    </td>
                    <td className="py-4 px-6 text-xs text-[#D1C7A5]">
                      <a href={`tel:${lead.phone}`} className="hover:text-[#D4AF37] transition-colors">{lead.phone}</a>
                    </td>
                    <td className="py-4 px-6 text-xs text-[#8A7D5C]">
                      {lead.address || '-'}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border
                        ${lead.status === 'NEW' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                          lead.status === 'CONTACTED' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          lead.status === 'CONVERTED' ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20' :
                          'bg-red-500/10 text-red-400 border-red-500/20'}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
