'use client';
import React, { useState, useEffect } from 'react';
import { Trash2, CheckCircle, Clock } from 'lucide-react';

export default function TeamDirectory() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Lead Photographer',
    phone: '',
    email: '',
    instagram: '',
    gear: '',
    status: 'Available'
  });

  useEffect(() => {
    fetch('/api/admin/team')
      .then(res => res.json())
      .then(data => {
        if (data.success) setTeam(data.team);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if(data.success) {
      setTeam([...team, data.member]);
      setShowModal(false);
      setFormData({ name: '', role: 'Lead Photographer', phone: '', email: '', instagram: '', gear: '', status: 'Available' });
    }
  }

  const handleDelete = async (id) => {
    if(confirm("Are you sure you want to remove this team member?")) {
      const res = await fetch(`/api/admin/team?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if(data.success) {
        setTeam(prev => prev.filter(t => t._id !== id));
      }
    }
  }

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Available' ? 'On Shoot' : 'Available';
    const res = await fetch('/api/admin/team', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus })
    });
    const data = await res.json();
    if(data.success) {
      setTeam(prev => prev.map(t => t._id === id ? { ...t, status: newStatus } : t));
    }
  }

  if (loading) return <div className="text-[#5B6454] animate-pulse text-[10px] tracking-widest uppercase font-semibold">Loading team data...</div>;

  return (
    <section className="space-y-6 animate-fadeIn relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-3xl text-[#1E221D]">Team & Crew Roster</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#5B6454] hover:bg-[#485042] text-white px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-semibold shadow-sm transition"
        >
          + Add Team Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {team.map(member => (
          <div key={member._id} className="bg-white border border-[#E4DFD5] hover:border-[#5B6454] p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative group transition duration-300 flex flex-col">
            <button onClick={() => handleDelete(member._id)} className="absolute top-5 right-5 text-[#889082] hover:text-rose-700 opacity-0 group-hover:opacity-100 transition">
              <Trash2 size={16} strokeWidth={1.5} />
            </button>
            <div className="flex items-center gap-5 mb-5">
              <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#DDD7CD] flex items-center justify-center text-[#5B6454] font-serif text-2xl shadow-sm">
                {member.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-serif text-[#1E221D]">{member.name}</h3>
                <span className="inline-block bg-[#DFE6DE] text-[#3D563B] text-[9px] px-3 py-1 rounded-full uppercase tracking-widest font-semibold mt-1">
                  {member.role}
                </span>
              </div>
            </div>
            
            <div className="space-y-3 text-sm text-[#485042] font-light flex-grow">
              <div className="flex items-center gap-2">
                <span className="text-[#889082] text-[9px] uppercase tracking-widest font-semibold w-16">Contact</span> 
                <a href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`} className="text-[#5B6454] hover:text-[#1E221D] underline decoration-[#E4DFD5]">Call</a>
                <span className="text-[#DDD7CD]">|</span>
                <a href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-[#5B6454] hover:text-[#1E221D] underline decoration-[#E4DFD5]">WhatsApp</a>
              </div>
              {member.instagram && (
                <p className="flex items-center gap-2">
                  <span className="text-[#889082] text-[9px] uppercase tracking-widest font-semibold w-16">Insta</span> 
                  <a href={member.instagram} target="_blank" className="hover:text-[#5B6454] underline decoration-[#E4DFD5]">Link</a>
                </p>
              )}
              {member.gear && (
                <p className="flex items-start gap-2">
                  <span className="text-[#889082] text-[9px] uppercase tracking-widest font-semibold w-16 mt-1">Gear</span> 
                  <span className="text-xs">{member.gear}</span>
                </p>
              )}
            </div>
            
            <div className="mt-6 pt-5 border-t border-[#F0EBE1] flex justify-between items-center">
              <span className="text-[10px] text-[#889082] uppercase tracking-[0.2em] font-semibold">Status</span>
              <button 
                onClick={() => handleStatusToggle(member._id, member.status)}
                className={`flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full transition ${
                  member.status === 'Available' ? 'bg-[#DDE5DC] text-[#3D563B] hover:bg-[#C5D3C4]' : 'bg-[#EFE8DD] text-[#7A6241] hover:bg-[#DDD0BC]'
                }`}
              >
                {member.status === 'Available' ? <CheckCircle size={12} strokeWidth={2}/> : <Clock size={12} strokeWidth={2}/>}
                {member.status}
              </button>
            </div>
          </div>
        ))}
        {team.length === 0 && (
          <div className="col-span-full py-16 text-center text-[#7A8275] italic font-serif text-base border border-[#E4DFD5] border-dashed rounded-2xl">
            No team members added yet. Click "+ Add Team Member" to register crew.
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E221D]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-fadeIn flex flex-col">
            <div className="p-6 border-b border-[#E4DFD5] flex justify-between items-center bg-[#FAF8F5]">
              <h3 className="font-serif text-2xl text-[#1E221D]">Add Team Member</h3>
              <button onClick={() => setShowModal(false)} className="text-[#889082] hover:text-[#1E221D]">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B6454] block mb-1.5">Full Name</label>
                  <input required type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full border border-[#DDD7CD] rounded-xl px-4 py-2 text-sm outline-none focus:border-[#5B6454]" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B6454] block mb-1.5">Role</label>
                  <select required value={formData.role} onChange={e=>setFormData({...formData, role: e.target.value})} className="w-full border border-[#DDD7CD] rounded-xl px-4 py-2 text-sm outline-none focus:border-[#5B6454] bg-white">
                    <option>Lead Photographer</option>
                    <option>Candid Specialist</option>
                    <option>Cinematographer</option>
                    <option>Drone Operator</option>
                    <option>Post-Production Editor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B6454] block mb-1.5">Phone / WhatsApp</label>
                  <input required type="text" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full border border-[#DDD7CD] rounded-xl px-4 py-2 text-sm outline-none focus:border-[#5B6454]" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B6454] block mb-1.5">Instagram / Link</label>
                  <input type="text" value={formData.instagram} onChange={e=>setFormData({...formData, instagram: e.target.value})} className="w-full border border-[#DDD7CD] rounded-xl px-4 py-2 text-sm outline-none focus:border-[#5B6454]" />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B6454] block mb-1.5">Assigned Gear</label>
                <input type="text" value={formData.gear} onChange={e=>setFormData({...formData, gear: e.target.value})} className="w-full border border-[#DDD7CD] rounded-xl px-4 py-2 text-sm outline-none focus:border-[#5B6454]" placeholder="E.g. Sony A7IV, FX3, Mavic 3 Pro" />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#E4DFD5] mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-semibold border border-[#DDD7CD] text-[#485042] hover:bg-[#FAF8F5]">Cancel</button>
                <button type="submit" className="bg-[#5B6454] hover:bg-[#485042] text-white px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-semibold shadow-sm transition">Add Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
