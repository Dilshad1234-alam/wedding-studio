"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function CompletedClientsPage() {
  const [completedList] = useState([
    {
      name: "Arman & Zoya",
      ritual: "Nikah & Walima",
      destination: "Bihar Sharif",
      dates: "19th - 25th Nov",
      crew: [{ name: "Rohit", role: "Cinematographer" }, { name: "Sanoj", role: "Photographer" }],
      budget: "₹80,000",
      deliveredOn: "Final Album & 4K Teaser Delivered"
    },
    {
      name: "Abhishek & Shreya",
      ritual: "Haldi & Wedding",
      destination: "Samastipur",
      dates: "24th - 25th Nov",
      crew: [{ name: "Gautam", role: "Cinematographer" }, { name: "Ritik Cinema", role: "Editor" }],
      budget: "₹40,000",
      deliveredOn: "Raw Footage + Edits Handed Over"
    },
    {
      name: "Vikas & Pallavi",
      ritual: "Reception & Vivah",
      destination: "Patna",
      dates: "10th - 12th Nov",
      crew: [{ name: "Sikandar", role: "Traditional" }, { name: "Ritik Photo", role: "Candid" }],
      budget: "₹3,20,000",
      deliveredOn: "Complete Media Dispatched"
    }
  ]);

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-8 selection:bg-[#D4AF37] selection:text-black">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-emerald-400 uppercase block mb-1">
            DELIVERED COMMISSIONS ARCHIVE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Delivered / Completed Weddings
          </h1>
          <p className="text-xs text-[#8A7D5C] mt-1">
            List of client contracts where shooting, color grading, and final media deliveries have been successfully executed.
          </p>
        </div>

        <Link className="px-4 py-2 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-[#D4AF37] text-[#D4AF37] text-xs font-black uppercase tracking-wider transition-all cursor-pointer self-start sm:self-auto" href="/admin/wedding-management">
          ← Back to Wedding Management
        </Link>
      </div>

      <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white">Delivered Client Weddings</h2>
            <p className="text-xs text-[#8A7D5C] mt-0.5">Showing {completedList.length} completed wedding projects</p>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            22 TOTAL COMPLETED
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
                <th className="py-3 px-4">Dispatched Crew</th>
                <th className="py-3 px-4">Settled Amount</th>
                <th className="py-3 px-4">Completion Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181B22] text-sm font-medium">
              {completedList.map((c, idx) => (
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
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      DELIVERED & CLOSED
                    </span>
                    <span className="text-[10px] text-[#8A7D5C] block mt-1 font-normal">{c.deliveredOn}</span>
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
