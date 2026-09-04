'use client';
import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Trash2 } from 'lucide-react';

export default function CrewDispatch() {
  const [dispatches, setDispatches] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    clientEvent: '',
    destination: '',
    startDate: '',
    endDate: '',
    assignedCrew: [], // array of member IDs or names
    status: 'Draft'
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/dispatch').then(res => res.json()),
      fetch('/api/admin/team').then(res => res.json())
    ]).then(([dispatchData, teamData]) => {
      if (dispatchData.success) setDispatches(dispatchData.dispatches);
      if (teamData.success) setTeamMembers(teamData.team);
      setLoading(false);
    });
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const res = await fetch('/api/admin/dispatch', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus })
    });
    const data = await res.json();
    if (data.success) {
      setDispatches(prev => prev.map(d => d._id === id ? { ...d, status: newStatus } : d));
    }
  };

  const handleDelete = async (id) => {
    if(confirm("Delete this dispatch?")) {
      const res = await fetch(`/api/admin/dispatch?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if(data.success) {
        setDispatches(prev => prev.filter(d => d._id !== id));
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // For schema compatibility, if they previously used `memberName` as a string, let's map it.
    // If the schema supports array of names, we'll join them.
    const memberNameStr = formData.assignedCrew.join(', ');
    
    const payload = {
      ...formData,
      memberName: memberNameStr // Legacy compatibility mapping
    };

    const res = await fetch('/api/admin/dispatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if(data.success) {
      setDispatches([data.dispatch, ...dispatches]);
      setShowModal(false);
      setFormData({
        clientEvent: '',
        destination: '',
        startDate: '',
        endDate: '',
        assignedCrew: [],
        status: 'Draft'
      });
    }
  }

  const toggleCrewSelection = (name) => {
    setFormData(prev => {
      const current = prev.assignedCrew;
      if (current.includes(name)) {
        return { ...prev, assignedCrew: current.filter(n => n !== name) };
      } else {
        return { ...prev, assignedCrew: [...current, name] };
      }
    });
  }

  if (loading) return <div className="text-[#5B6454] animate-pulse text-[10px] tracking-widest uppercase font-semibold">Loading dispatch data...</div>;

  return (
    <section className="space-y-6 animate-fadeIn relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-serif text-[#1E221D]">Live Crew Dispatch</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#5B6454] hover:bg-[#485042] text-[#FAF8F5] px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-semibold transition shadow-sm"
        >
          <Plus size={16} strokeWidth={1.5} /> New Dispatch
        </button>
      </div>

      <div className="bg-white border border-[#E4DFD5] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#1E221D]">
            <thead className="bg-[#F5F3ED] border-b border-[#E4DFD5] text-[10px] uppercase tracking-[0.2em] text-[#5B6454] font-semibold">
              <tr>
                <th className="px-6 py-4">Client / Event</th>
                <th className="px-6 py-4">Assigned Crew</th>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dispatches.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center text-[#7A8275] italic font-serif text-base border-b border-[#E4DFD5]/30">
                    No active dispatches found.
                  </td>
                </tr>
              )}
              {dispatches.map(d => (
                <tr key={d._id} className="border-b border-[#F0EBE1] hover:bg-[#FAF8F5] transition group">
                  <td className="px-6 py-4 text-[#1E221D] font-medium">{d.clientEvent}</td>
                  <td className="px-6 py-4 font-medium text-[#5B6454] text-xs">
                    {d.memberName}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2 text-[#485042]">
                    <MapPin size={14} className="text-[#5B6454]" />{d.destination}
                  </td>
                  <td className="px-6 py-4 text-[#485042] text-xs whitespace-nowrap">{d.startDate} to {d.endDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-full text-[9px] uppercase tracking-wider font-semibold border whitespace-nowrap
                      ${d.status === 'On Shoot' ? 'bg-[#DDE5DC] text-[#3D563B] border-[#C5D3C4]' : ''}
                      ${d.status === 'Traveling' ? 'bg-[#EFE8DD] text-[#7A6241] border-[#DDD0BC]' : ''}
                      ${d.status === 'Draft' ? 'bg-[#F5F3ED] text-[#7A8275] border-[#E4DFD5]' : ''}
                      ${d.status === 'Production Completed' ? 'bg-[#E2E6E3] text-[#4F5953] border-[#CCD4CE]' : ''}
                      ${!['On Shoot', 'Traveling', 'Draft', 'Production Completed'].includes(d.status) ? 'bg-[#EFE8DD] text-[#7A6241] border-[#DDD0BC]' : ''}
                    `}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end items-center gap-3">
                    <select 
                      value={d.status} 
                      onChange={(e) => handleStatusChange(d._id, e.target.value)}
                      className="bg-[#FAF8F5] border border-[#DDD7CD] text-[#1E221D] text-[10px] uppercase tracking-widest font-semibold rounded-full px-3 py-1.5 outline-none focus:border-[#5B6454] cursor-pointer"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Traveling">Traveling</option>
                      <option value="On Shoot">On Shoot</option>
                      <option value="Production Completed">Production Completed</option>
                    </select>
                    <button onClick={() => handleDelete(d._id)} className="text-[#889082] hover:text-rose-700 transition">
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E221D]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden animate-fadeIn flex flex-col">
            <div className="p-6 border-b border-[#E4DFD5] flex justify-between items-center bg-[#FAF8F5]">
              <h3 className="font-serif text-2xl text-[#1E221D]">New Dispatch</h3>
              <button onClick={() => setShowModal(false)} className="text-[#889082] hover:text-[#1E221D]">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B6454] block mb-1.5">Client / Event Name</label>
                  <input required type="text" value={formData.clientEvent} onChange={e=>setFormData({...formData, clientEvent: e.target.value})} className="w-full border border-[#DDD7CD] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#5B6454]" placeholder="Sneha & Rahul Wedding" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B6454] block mb-1.5">Destination City</label>
                  <input required type="text" value={formData.destination} onChange={e=>setFormData({...formData, destination: e.target.value})} className="w-full border border-[#DDD7CD] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#5B6454]" placeholder="Udaipur, Rajasthan" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B6454] block mb-1.5">Start Date</label>
                  <input required type="date" value={formData.startDate} onChange={e=>setFormData({...formData, startDate: e.target.value})} className="w-full border border-[#DDD7CD] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#5B6454]" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B6454] block mb-1.5">End Date</label>
                  <input required type="date" value={formData.endDate} onChange={e=>setFormData({...formData, endDate: e.target.value})} className="w-full border border-[#DDD7CD] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#5B6454]" />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B6454] block mb-1.5">Assign Crew Members</label>
                <div className="border border-[#DDD7CD] rounded-xl p-4 max-h-40 overflow-y-auto bg-[#FAF8F5]">
                  {teamMembers.map(member => (
                    <div key={member._id} className="flex items-center gap-3 mb-2 last:mb-0">
                      <input 
                        type="checkbox" 
                        id={`crew-${member._id}`} 
                        checked={formData.assignedCrew.includes(member.name)}
                        onChange={() => toggleCrewSelection(member.name)}
                        className="accent-[#5B6454] w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor={`crew-${member._id}`} className="text-sm text-[#485042] cursor-pointer flex-1">
                        <span className="font-medium text-[#1E221D]">{member.name}</span> <span className="text-[10px] ml-2 text-[#7A8275]">({member.role})</span>
                      </label>
                    </div>
                  ))}
                  {teamMembers.length === 0 && <span className="text-xs text-[#7A8275]">No team members available.</span>}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#E4DFD5] mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-semibold border border-[#DDD7CD] text-[#485042] hover:bg-[#FAF8F5]">Cancel</button>
                <button type="submit" className="bg-[#5B6454] hover:bg-[#485042] text-white px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-semibold shadow-sm transition">Create Dispatch</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
