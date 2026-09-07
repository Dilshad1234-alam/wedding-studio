"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function CommercialDispatchPage() {
  const [campaigns] = useState([
    {
      brand: "Manyavar Mohey",
      deliverables: "Diwali Fest TVC + Social Shorts",
      destination: "Udaipur",
      dates: "12th - 15th Oct",
      crew: [{ name: "Rohit", role: "Director" }, { name: "Ritik Photo", role: "DP" }, { name: "Priyanshu", role: "Drone" }],
      budget: "₹12,50,000",
      status: "SCHEDULED / UPCOMING"
    },
    {
      brand: "Tanishq",
      deliverables: "Bridal Collection Launch Video",
      destination: "Jaipur",
      dates: "20th Oct",
      crew: [{ name: "Sikandar", role: "Gaffer" }, { name: "Ritik Cinema", role: "Cinematographer" }],
      budget: "₹8,00,000",
      status: "CONFIRMED / LIVE"
    },
    {
      brand: "Kalyan Jewellers",
      deliverables: "Onam Special Ad",
      destination: "Kochi",
      dates: "5th Sep",
      crew: [{ name: "Rohit", role: "Director" }, { name: "Sanoj", role: "Editor" }],
      budget: "₹15,00,000",
      status: "DELIVERED"
    }
  ]);

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-8 selection:bg-[#D4AF37] selection:text-black">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
            BRAND CAMPAIGN CONSOLE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Commercial Dispatch
          </h1>
          <p className="text-xs text-[#8A7D5C] mt-1">
            Centralized tracking for corporate ad shoots, brand deliverables, and agency contracts.
          </p>
        </div>

        <Link className="px-4 py-2 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-[#D4AF37] text-[#D4AF37] text-xs font-black uppercase tracking-wider transition-all cursor-pointer self-start sm:self-auto" href="/admin/commercial-management">
          ← Back to Commercial Hub
        </Link>
      </div>

      <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white">Active Commercial Campaigns</h2>
            <p className="text-xs text-[#8A7D5C] mt-0.5">Showing {campaigns.length} brand projects</p>
          </div>
          <button className="bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black px-5 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-0.5 border border-[#F3E5AB]/50">
            + Add Campaign
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#20252F] text-xs uppercase font-bold tracking-widest text-[#8A7D5C]">
                <th className="py-3 px-4">Brand / Client</th>
                <th className="py-3 px-4">Deliverables</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Dates</th>
                <th className="py-3 px-4">Assigned Crew & Roles</th>
                <th className="py-3 px-4">Direct Budget</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181B22] text-sm font-medium">
              {campaigns.map((c, idx) => (
                <tr key={idx} className="hover:bg-[#161A20] transition-colors">
                  <td className="py-4 px-4 font-extrabold text-white text-base whitespace-nowrap">{c.brand}</td>
                  <td className="py-4 px-4 text-[#D1C7A5] font-semibold whitespace-nowrap">{c.deliverables}</td>
                  <td className="py-4 px-4 text-white font-medium whitespace-nowrap">{c.destination}</td>
                  <td className="py-4 px-4 text-[#A89D84] font-mono whitespace-nowrap">{c.dates}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {c.crew.map((m, mIdx) => (
                        <span key={mIdx} className="px-2 py-1 rounded bg-[#181C22] border border-[#2B2519] text-white text-[10px]">
                          {m.name} <span className="text-[#D4AF37] uppercase font-mono tracking-wide ml-0.5">({m.role})</span>
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-extrabold text-emerald-400 font-mono text-base whitespace-nowrap">{c.budget}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${c.status === 'DELIVERED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : c.status.includes('LIVE') ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
