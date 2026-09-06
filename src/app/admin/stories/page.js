'use client';
import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

export default function EditorialStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    coupleName: '',
    venue: '',
    coverPhoto: '',
    narrative: '',
    isPublished: true
  });

  useEffect(() => {
    fetch('/api/admin/stories')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStories(data.stories);
        }
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.success) {
      setStories([data.story, ...stories]);
      setShowModal(false);
      setFormData({ title: '', coupleName: '', venue: '', coverPhoto: '', narrative: '', isPublished: true });
    }
  };

  const handleTogglePublish = async (id, isPublished) => {
    const res = await fetch('/api/admin/stories', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isPublished: !isPublished })
    });
    const data = await res.json();
    if (data.success) {
      setStories(prev => prev.map(s => s._id === id ? { ...s, isPublished: !isPublished } : s));
    }
  };

  const handleDelete = async (id) => {
    if(confirm("Delete this story permanently?")) {
      const res = await fetch(`/api/admin/stories?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if(data.success) {
        setStories(prev => prev.filter(s => s._id !== id));
      }
    }
  }

  if (loading) return <div className="text-[#5B6454] animate-pulse text-[10px] tracking-widest uppercase font-semibold">Loading Stories...</div>;

  return (
    <section className="space-y-6 animate-fadeIn relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-3xl text-[#1E221D]">Editorial Publisher</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#D4AF37]/20 hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] active:scale-[0.98] transition-all duration-300 cursor-pointer"
        >
          + Publish New Story
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {stories.map(story => (
          <div key={story._id} className="bg-white border border-[#E4DFD5] rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col group relative">
            <button onClick={() => handleDelete(story._id)} className="absolute top-4 right-4 text-[#889082] hover:text-rose-700 opacity-0 group-hover:opacity-100 transition z-10">
              <Trash2 size={16} strokeWidth={1.5} />
            </button>
            
            <div className="flex gap-6 mb-4">
              <div className="w-24 h-32 rounded-lg bg-[#FAF8F5] border border-[#DDD7CD] overflow-hidden flex-shrink-0 relative">
                {story.coverPhoto ? (
                  <img src={story.coverPhoto} alt="cover" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-[10px]">No Photo</div>
                )}
              </div>
              <div>
                <h3 className="font-serif text-xl text-[#1E221D] pr-6 leading-tight mb-2">{story.title}</h3>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-[#5B6454] mb-1">{story.coupleName}</div>
                <div className="text-xs text-[#7A8275]">{story.venue || 'No venue specified'}</div>
              </div>
            </div>
            
            <div className="mt-auto border-t border-[#F0EBE1] pt-4 flex justify-between items-center">
              <span className="text-[10px] text-[#7A8275] uppercase tracking-[0.2em]">{new Date(story.createdAt).toLocaleDateString()}</span>
              <button 
                onClick={() => handleTogglePublish(story._id, story.isPublished)}
                className={`text-[9px] uppercase tracking-widest font-semibold px-4 py-1.5 rounded-full border transition ${
                  story.isPublished 
                  ? 'bg-[#DDE5DC] text-[#3D563B] border-[#C5D3C4] hover:bg-rose-100 hover:text-rose-700 hover:border-rose-200' 
                  : 'bg-[#F5F3ED] text-[#7A8275] border-[#E4DFD5] hover:bg-[#DDE5DC] hover:text-[#3D563B] hover:border-[#C5D3C4]'
                }`}
              >
                {story.isPublished ? 'Live' : 'Draft'}
              </button>
            </div>
          </div>
        ))}
        {stories.length === 0 && (
          <div className="col-span-full py-16 text-center text-[#7A8275] italic font-serif text-base border border-[#E4DFD5] border-dashed rounded-2xl">
            No editorial stories published yet.
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E221D]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-fadeIn flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-[#E4DFD5] flex justify-between items-center bg-[#FAF8F5]">
              <h3 className="font-serif text-2xl text-[#1E221D]">New Editorial Story</h3>
              <button onClick={() => setShowModal(false)} className="text-[#889082] hover:text-[#1E221D]">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B6454] block mb-1.5">Story Title</label>
                  <input required type="text" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full border border-[#DDD7CD] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#5B6454]" placeholder="E.g., A Royal Affair in Jaipur" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B6454] block mb-1.5">Couple Name</label>
                  <input required type="text" value={formData.coupleName} onChange={e=>setFormData({...formData, coupleName: e.target.value})} className="w-full border border-[#DDD7CD] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#5B6454]" placeholder="Sneha & Rahul" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B6454] block mb-1.5">Venue / Location</label>
                  <input type="text" value={formData.venue} onChange={e=>setFormData({...formData, venue: e.target.value})} className="w-full border border-[#DDD7CD] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#5B6454]" placeholder="Rambagh Palace" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B6454] block mb-1.5">Cover Photo URL</label>
                  <input type="text" value={formData.coverPhoto} onChange={e=>setFormData({...formData, coverPhoto: e.target.value})} className="w-full border border-[#DDD7CD] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#5B6454]" placeholder="https://..." />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B6454] block mb-1.5">Story Narrative</label>
                <textarea rows="6" value={formData.narrative} onChange={e=>setFormData({...formData, narrative: e.target.value})} className="w-full border border-[#DDD7CD] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#5B6454]" placeholder="Write the editorial story here..."></textarea>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="publish" checked={formData.isPublished} onChange={e=>setFormData({...formData, isPublished: e.target.checked})} className="accent-[#5B6454]" />
                <label htmlFor="publish" className="text-sm text-[#485042]">Publish immediately to live website</label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#E4DFD5] mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-semibold border border-[#DDD7CD] text-[#485042] hover:bg-[#FAF8F5]">Cancel</button>
                <button type="submit" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#D4AF37]/20 hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] active:scale-[0.98] transition-all duration-300 cursor-pointer">Save Story</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
