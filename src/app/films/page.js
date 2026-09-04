'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, X, Film, Clock } from 'lucide-react';

const categories = ['ALL', 'WEDDING TEASERS', 'HIGHLIGHT FILMS', 'PRE-WEDDING FILMS', 'INSTA REELS'];

const mockFilms = [
  { id: 1, title: 'Abhishek & Ruchi • Royal Patna Palace', category: 'HIGHLIGHT FILMS', location: 'Patna, Bihar', duration: '08:45', youtubeId: '9xwazD5SyVg', thumbnail: 'https://picsum.photos/seed/film1/800/450' },
  { id: 2, title: 'Priya & Rohan • Destination Goa', category: 'WEDDING TEASERS', location: 'Goa, India', duration: '01:30', youtubeId: 'kJQP7kiw5Fk', thumbnail: 'https://picsum.photos/seed/film2/800/450' },
  { id: 3, title: 'Sneha & Arjun • Udaipur Romance', category: 'PRE-WEDDING FILMS', location: 'Udaipur, Rajasthan', duration: '03:15', youtubeId: 'fJ9rUzIMcZQ', thumbnail: 'https://picsum.photos/seed/film3/800/450' },
  { id: 4, title: 'Neha & Vikrant • Mehandi Vibes', category: 'INSTA REELS', location: 'Delhi, India', duration: '00:59', youtubeId: 'RgKAFK5djSk', thumbnail: 'https://picsum.photos/seed/film4/800/450' },
  { id: 5, title: 'Anjali & Raj • The Grand Mandap', category: 'HIGHLIGHT FILMS', location: 'Jaipur, Rajasthan', duration: '06:20', youtubeId: '5qap5aO4i9A', thumbnail: 'https://picsum.photos/seed/film5/800/450' },
  { id: 6, title: 'Simran & Kabir • Sangeet Night', category: 'WEDDING TEASERS', location: 'Mumbai, Maharashtra', duration: '02:10', youtubeId: 'V3m_sXyL4yE', thumbnail: 'https://picsum.photos/seed/film6/800/450' },
];

export default function CinematicFilmsPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeVideoId, setActiveVideoId] = useState(null);

  const filteredFilms = activeCategory === 'ALL'
    ? mockFilms
    : mockFilms.filter(film => film.category === activeCategory);

  const closeVideo = useCallback(() => {
    setActiveVideoId(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeVideoId && e.key === 'Escape') {
        closeVideo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideoId, closeVideo]);

  return (
    <div className="min-h-screen bg-[#212639] pt-32 pb-20">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[#B38F4D] mb-6">
          Cinematic Films
        </h1>
        <p className="text-lg md:text-xl text-[#EDEAE4] max-w-2xl mx-auto font-light leading-relaxed">
          Emotionally handcrafted wedding teasers, 4K royal trailers, and timeless highlight films.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-16 px-4 max-w-5xl mx-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 border ${
              activeCategory === category
                ? 'bg-[#B38F4D] text-white border-[#B38F4D] shadow-md shadow-[#B38F4D]/20'
                : 'bg-transparent text-[#4A4A4A] border-white/10 hover:border-[#B38F4D] hover:bg-[#2B324B]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Video Showcase Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFilms.map((film) => (
          <div 
            key={film.id} 
            className="group relative overflow-hidden rounded-xl cursor-pointer shadow-lg bg-black aspect-video flex flex-col"
            onClick={() => setActiveVideoId(film.youtubeId)}
          >
            {/* Thumbnail Image */}
            <img 
              src={film.thumbnail} 
              alt={film.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 ease-in-out"
              loading="lazy"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-opacity duration-300"></div>

            {/* Top Right Duration Badge */}
            <div className="absolute top-4 right-4 bg-[#2B324B]/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center space-x-1.5 z-10">
              <Clock size={12} />
              <span>{film.duration}</span>
            </div>

            {/* Center Glowing Play Button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-16 h-16 bg-[#2B324B]/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:bg-[#B38F4D]/90 group-hover:border-[#B38F4D] transition-all duration-500 transform group-hover:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_30px_rgba(158,119,56,0.6)]">
                <Play className="w-6 h-6 text-white ml-1 fill-white" />
              </div>
            </div>

            {/* Bottom Text Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 z-10 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex items-center space-x-2 mb-2">
                <Film size={14} className="text-[#B38F4D]" />
                <span className="text-[#B38F4D] text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-[#B38F4D]/10 px-2 py-0.5 rounded border border-[#B38F4D]/20 backdrop-blur-sm">
                  {film.category}
                </span>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-serif font-medium leading-tight mb-1.5 drop-shadow-md line-clamp-2">
                {film.title}
              </h3>
              <p className="text-gray-300 text-sm font-light drop-shadow-md">
                📍 {film.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded Video Modal */}
      {activeVideoId && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1E1E1E]/95 backdrop-blur-xl transition-opacity duration-300 p-4 sm:p-8"
          onClick={closeVideo}
        >
          <button
            onClick={closeVideo}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[101] p-3 hover:bg-[#2B324B]/10 rounded-full"
            aria-label="Close video"
          >
            <X className="w-8 h-8" />
          </button>

          <div 
            className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}