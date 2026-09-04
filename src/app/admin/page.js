'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, Image as ImageIcon, MapPin, ExternalLink, LogOut, Plus, Trash2, CheckCircle, Clock } from 'lucide-react';

// --- Sub Components for Modules ---

function CrewDispatchModule() {
  const [dispatches, setDispatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dispatch')
      .then(res => res.json())
      .then(data => {
        if (data.success) setDispatches(data.dispatches);
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

  if (loading) return <div className="text-[#B38F4D] animate-pulse">Loading dispatch data...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif text-white">Live Crew Dispatch</h2>
        <button className="flex items-center gap-2 bg-[#B38F4D] text-white px-4 py-2 rounded-md hover:bg-[#987538] transition">
          <Plus size={16} /> New Dispatch
        </button>
      </div>

      <div className="bg-[#1A1E2E] border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-[#212639] text-[#B38F4D] uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Crew Member</th>
              <th className="px-6 py-4">Client Event</th>
              <th className="px-6 py-4">Destination</th>
              <th className="px-6 py-4">Dates</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dispatches.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No active dispatches found.</td>
              </tr>
            )}
            {dispatches.map(d => (
              <tr key={d._id} className="border-t border-white/5 hover:bg-white/[0.02]">
                <td className="px-6 py-4 font-medium text-white">{d.memberName}</td>
                <td className="px-6 py-4">{d.clientEvent}</td>
                <td className="px-6 py-4 flex items-center gap-2"><MapPin size={14} className="text-[#B38F4D]" />{d.destination}</td>
                <td className="px-6 py-4">{d.startDate} - {d.endDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border
                    ${d.status === 'On Duty' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                    ${d.status === 'Traveling' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                    ${d.status === 'Dispatched' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : ''}
                    ${d.status === 'Returned' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' : ''}
                  `}>
                    {d.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <select 
                    value={d.status} 
                    onChange={(e) => handleStatusChange(d._id, e.target.value)}
                    className="bg-[#212639] border border-white/10 text-white text-xs rounded px-2 py-1 outline-none focus:border-[#B38F4D]"
                  >
                    <option value="Dispatched">Dispatched</option>
                    <option value="Traveling">Traveling</option>
                    <option value="On Duty">On Duty</option>
                    <option value="Returned">Returned</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TeamDirectoryModule() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/team')
      .then(res => res.json())
      .then(data => {
        if (data.success) setTeam(data.team);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if(confirm("Are you sure you want to remove this team member?")) {
      const res = await fetch(`/api/admin/team?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if(data.success) {
        setTeam(prev => prev.filter(t => t._id !== id));
      }
    }
  }

  if (loading) return <div className="text-[#B38F4D] animate-pulse">Loading team data...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif text-white">Team Directory</h2>
        <button className="flex items-center gap-2 bg-[#B38F4D] text-white px-4 py-2 rounded-md hover:bg-[#987538] transition">
          <Plus size={16} /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {team.map(member => (
          <div key={member._id} className="bg-[#1A1E2E] border border-white/5 rounded-xl p-6 relative group hover:border-white/10 transition">
            <button onClick={() => handleDelete(member._id)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition">
              <Trash2 size={16} />
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#212639] border border-[#B38F4D]/30 flex items-center justify-center text-[#B38F4D] font-serif text-xl">
                {member.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">{member.name}</h3>
                <p className="text-xs text-[#B38F4D] uppercase tracking-wider">{member.role}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📞 {member.phone}</p>
              {member.email && <p>✉️ {member.email}</p>}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-xs text-gray-500 uppercase tracking-widest">Status</span>
              <span className={`flex items-center gap-1 text-xs font-medium ${member.status === 'Available' ? 'text-green-400' : 'text-amber-400'}`}>
                {member.status === 'Available' ? <CheckCircle size={12}/> : <Clock size={12}/>}
                {member.status}
              </span>
            </div>
          </div>
        ))}
        {team.length === 0 && <p className="text-gray-500">No team members added yet.</p>}
      </div>
    </div>
  );
}

function ImageCMSModule() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded slots for demonstration
  const slots = [
    { key: 'hero_banner', label: 'Home: Hero Banner' },
    { key: 'quote_editorial', label: 'Home: Editorial Background' },
    { key: 'portfolio_1', label: 'Portfolio: Grid Image 1' },
    { key: 'portfolio_2', label: 'Portfolio: Grid Image 2' },
  ];

  useEffect(() => {
    fetch('/api/admin/images')
      .then(res => res.json())
      .then(data => {
        if (data.success) setImages(data.images);
        setLoading(false);
      });
  }, []);

  const handleSave = async (sectionKey, label) => {
    const inputEl = document.getElementById(`img-input-${sectionKey}`);
    const imageUrl = inputEl.value;
    if(!imageUrl) return;

    const res = await fetch('/api/admin/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sectionKey, imageUrl, label })
    });
    const data = await res.json();
    if(data.success) {
      alert("Saved successfully!");
      setImages(prev => {
        const filtered = prev.filter(i => i.sectionKey !== sectionKey);
        return [...filtered, data.image];
      });
    }
  }

  const getUrl = (key) => {
    const img = images.find(i => i.sectionKey === key);
    return img ? img.imageUrl : '';
  }

  if (loading) return <div className="text-[#B38F4D] animate-pulse">Loading CMS data...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif text-white">Visual Image CMS</h2>
      </div>
      <p className="text-gray-400 text-sm">Replace live photos on the website instantly.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {slots.map(slot => {
          const currentUrl = getUrl(slot.key);
          return (
            <div key={slot.key} className="bg-[#1A1E2E] border border-white/5 rounded-xl p-6">
              <h3 className="text-md font-medium text-[#B38F4D] mb-4">{slot.label}</h3>
              <div className="flex gap-4">
                <div className="w-32 h-24 bg-[#212639] rounded-md overflow-hidden flex-shrink-0 border border-white/10">
                  {currentUrl ? (
                    <img src={currentUrl} alt={slot.label} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                      <ImageIcon size={20}/>
                      <span className="text-[10px] mt-1">Empty</span>
                    </div>
                  )}
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Image URL</label>
                    <input 
                      id={`img-input-${slot.key}`}
                      type="text" 
                      defaultValue={currentUrl}
                      placeholder="https://..." 
                      className="w-full bg-[#212639] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#B38F4D] outline-none"
                    />
                  </div>
                  <div className="flex justify-end mt-2">
                    <button 
                      onClick={() => handleSave(slot.key, slot.label)}
                      className="bg-white/5 hover:bg-[#B38F4D] hover:text-white text-gray-300 px-4 py-1.5 rounded text-xs transition border border-white/10"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

// --- Main Layout Component ---

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState('dispatch'); // 'dispatch', 'team', 'cms'
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Hide standard layout wrapper if necessary (already handled by LayoutWrapper.js)
    
    const userStr = sessionStorage.getItem('weddingpur_user');
    if (!userStr) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userStr);
      if (parsedUser.role !== 'admin') {
        router.push('/');
        return;
      }
      setUser(parsedUser);
      setIsAuthorized(true);
    } catch (e) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('weddingpur_user');
    sessionStorage.removeItem('weddingpur_token');
    window.location.href = '/';
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#1A1E2E] flex items-center justify-center">
        <div className="text-[#B38F4D] text-lg animate-pulse font-serif tracking-widest">INITIALIZING STUDIO OS...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1E2E] text-[#EDEAE4] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#212639] border-r border-white/5 flex flex-col">
        <div className="p-8 border-b border-white/5">
          <h1 className="text-xl font-serif text-white tracking-widest">
            STUDIO <span className="text-[#B38F4D] italic">OS</span>
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">v2.0 Admin</p>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dispatch')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${activeTab === 'dispatch' ? 'bg-[#B38F4D]/10 text-[#B38F4D]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard size={18} /> Crew Dispatch
          </button>
          
          <button 
            onClick={() => setActiveTab('team')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${activeTab === 'team' ? 'bg-[#B38F4D]/10 text-[#B38F4D]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Users size={18} /> Team Directory
          </button>

          <button 
            onClick={() => setActiveTab('cms')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${activeTab === 'cms' ? 'bg-[#B38F4D]/10 text-[#B38F4D]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <ImageIcon size={18} /> Image CMS
          </button>
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <Link href="/" className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white transition">
            <ExternalLink size={18} /> View Live Site
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition">
            <LogOut size={18} /> Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-10 overflow-y-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <p className="text-[#B38F4D] text-xs uppercase tracking-widest font-semibold">Welcome back, {user?.name}</p>
            <h2 className="text-3xl font-serif text-white mt-1">Operational Dashboard</h2>
          </div>
        </header>

        {activeTab === 'dispatch' && <CrewDispatchModule />}
        {activeTab === 'team' && <TeamDirectoryModule />}
        {activeTab === 'cms' && <ImageCMSModule />}

      </main>
    </div>
  );
}
