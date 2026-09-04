'use client';
import React, { useState, useEffect } from 'react';
import { ImageIcon } from 'lucide-react';

export default function DynamicVisualCMS() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState('Home');

  const pageSlots = {
    'Home': [
      { key: 'home_hero', label: 'Hero Background Image' },
      { key: 'home_arch', label: 'Editorial Arch Photo' },
      { key: 'home_story', label: 'Story Philosophy Circle Visual' }
    ],
    'Portfolio': [
      { key: 'port_cover', label: 'Cover Banner Image' },
      { key: 'port_slot1', label: 'Highlight Visual 1' },
      { key: 'port_slot2', label: 'Highlight Visual 2' },
      { key: 'port_slot3', label: 'Highlight Visual 3' },
      { key: 'port_slot4', label: 'Highlight Visual 4' }
    ],
    'Films': [
      { key: 'films_cover', label: 'Cover Banner Image' },
      { key: 'films_slot1', label: 'Highlight Visual 1' },
      { key: 'films_slot2', label: 'Highlight Visual 2' }
    ],
    'Albums': [
      { key: 'albums_cover', label: 'Cover Banner Image' },
      { key: 'albums_slot1', label: 'Highlight Visual 1' },
      { key: 'albums_slot2', label: 'Highlight Visual 2' }
    ],
    'About': [
      { key: 'about_hero', label: 'Hero Background Image' },
      { key: 'about_team', label: 'Team Editorial Photo' }
    ]
  };

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

  if (loading) return <div className="text-[#5B6454] animate-pulse text-[10px] tracking-widest uppercase font-semibold">Loading CMS data...</div>;

  const currentSlots = pageSlots[activePage] || [];

  return (
    <section className="space-y-6 animate-fadeIn">
      <div className="mb-8">
        <h2 className="font-serif text-3xl text-[#1E221D] mb-1">Dynamic Visual CMS</h2>
        <p className="text-sm text-[#7A8275] font-light">Replace live photos across the website instantly.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 border-b border-[#E4DFD5] pb-4">
        {Object.keys(pageSlots).map(page => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-semibold transition ${
              activePage === page 
              ? 'bg-[#EFE8DD] text-[#7A6241] border border-[#DDD0BC]' 
              : 'bg-white border border-[#E4DFD5] text-[#7A8275] hover:bg-[#FAF8F5]'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentSlots.map(slot => {
          const currentUrl = getUrl(slot.key);
          return (
            <div key={slot.key} className="bg-white border border-[#E4DFD5] rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex gap-6 items-center">
              <div className="w-28 h-28 rounded-xl border border-[#DDD7CD] bg-[#FAF8F5] flex flex-col items-center justify-center text-[#889082] shadow-sm flex-shrink-0 relative overflow-hidden">
                {currentUrl ? (
                  <img src={currentUrl} alt={slot.label} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <ImageIcon size={24} strokeWidth={1.5} />
                    <span className="text-[9px] uppercase tracking-[0.2em] font-semibold mt-2">EMPTY</span>
                  </>
                )}
              </div>
              
              <div className="flex-1 space-y-3">
                <span className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#1E221D] block">{slot.label}</span>
                <div>
                  <label className="text-[9px] text-[#626C59] uppercase tracking-[0.2em] font-semibold block mb-1">ImageKit / CDN URL</label>
                  <input 
                    id={`img-input-${slot.key}`}
                    type="text" 
                    defaultValue={currentUrl}
                    placeholder="https://..." 
                    className="w-full bg-[#FAF8F5] border border-[#DDD7CD] rounded-xl px-4 py-2.5 text-xs text-[#1E221D] focus:outline-none focus:border-[#5B6454] transition"
                  />
                </div>
                <div className="flex justify-end pt-1">
                  <button 
                    onClick={() => handleSave(slot.key, slot.label)}
                    className="bg-[#5B6454] hover:bg-[#485042] text-white px-5 py-2.5 rounded-full text-[9px] tracking-widest uppercase font-semibold transition shadow-sm"
                  >
                    Save & Apply Live
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
}
