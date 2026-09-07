"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function PendingClientsPage() {
  const [pendingList] = useState([
    {
      name: "Ankit & Sneha",
      ritual: "Grand Wedding & Vows",
      destination: "Bhagalpur",
      dates: "6th Dec",
      crew: [{ name: "Sikandar", role: "Traditional" }, { name: "Ritik Photo", role: "Candid" }, { name: "Suraj", role: "Cinematographer" }],
      budget: "₹4,50,000",
      status: "SCHEDULED / UPCOMING"
    },
    {
      name: "Md Ahmed & Farheen",
      ritual: "Royal Reception",
      destination: "Patna",
      dates: "16th Nov",
      crew: [{ name: "Rohit", role: "Cinematographer" }, { name: "Priyanshu", role: "Drone" }, { name: "Sanoj", role: "Editor" }],
      budget: "₹3,80,000",
      status: "CONFIRMED / LIVE"
    },
    {
      name: "Mani Kant & Priya",
      ritual: "Traditional Vivah & Haldi",
      destination: "Madhubani",
      dates: "24th - 25th Nov",
      crew: [{ name: "Ritik Photo", role: "Photographer" }, { name: "Gautam", role: "Cinematographer" }],
      budget: "₹5,00,000",
      status: "SCHEDULED / UPCOMING"
    }
  ]);

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-8 selection:bg-[#D4AF37] selection:text-black">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase block mb-1">
            PENDING & ACTIVE OPERATIONS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Pending / Upcoming Weddings
          </h1>
          <p className="text-xs text-[#8A7D5C] mt-1">
            List of active client contracts requiring shooting, color grading, and final media deliveries.
          </p>
        </div>

        <Link className="px-4 py-2 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-[#D4AF37] text-[#D4AF37] text-xs font-black uppercase tracking-wider transition-all cursor-pointer self-start sm:self-auto" href="/admin/wedding-management">
          ← Back to Wedding Management
        </Link>
      </div>

      <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white">Upcoming Client Weddings</h2>
            <p className="text-xs text-[#8A7D5C] mt-0.5">Showing {pendingList.length} pending wedding projects</p>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            29 TOTAL PENDING
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#20252F] text-xs uppercase font-bold tracking-widest text-[#8A7D5C]">
                <th className="py-3 px-4">Client / Couple</th>
                <th className="py-3 px-4">Ritual / Ceremony</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Dates</th>
                <th className="py-3 px-4">Assigned Crew</th>
                <th className="py-3 px-4">Budget Amount</th>
                <th className="py-3 px-4">Event Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181B22] text-sm font-medium">
              {pendingList.map((c, idx) => (
                <tr key={idx} className="hover:bg-[#161A20] transition-colors">
                  <td className="py-4 px-4 font-extrabold text-white text-base whitespace-nowrap">{c.name}</td>
                  <td className="py-4 px-4 text-[#D1C7A5] font-semibold whitespace-nowrap">{c.ritual}</td>
                  <td className="py-4 px-4 text-white font-medium whitespace-nowrap">{c.destination}</td>
                  <td className="py-4 px-4 text-[#A89D84] font-mono whitespace-nowrap">{c.dates}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {c.crew.map((m, mIdx) => (
                        <span key={mIdx} className="px-2 py-0.5 rounded bg-[#181C22] border border-[#2B2519] text-[#D4AF37] font-mono uppercase text-[10px]">
                          {m.role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-extrabold text-emerald-400 font-mono text-base whitespace-nowrap">{c.budget}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
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
