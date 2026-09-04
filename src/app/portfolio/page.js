'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = ['ALL', 'WEDDING', 'MEHANDI', 'RECEPTION', 'ENGAGEMENT', 'HALDI', 'SANGEET', 'CELEBRITY', 'PREWEDDING'];

const mockPhotos = [
  { id: 1, title: 'Groom Sherwani Portrait', category: 'WEDDING', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Marraige-purpose-photography-in-Patna-scaled-e1647539357933.jpg', featured: true },
  { id: 2, title: 'Bride Red Lehenga on Stairs', category: 'WEDDING', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/couple-shoot-for-wedding-weddingpur-scaled-e1773261994127-rkd9amrvoysugb5qrivmgnbcfwikh7q9iafy1g9j74.jpg' },
  { id: 3, title: 'Floral Chandelier Aisle', category: 'RECEPTION', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Lovely-Kiss-Moment-Between-Bride-and-Groom-Filled-with-Love-scaled-e1771221258589-rj856xwxhhg1tsoy3cte6lncrl1lfj66ciafowiv00.jpg', wide: true },
  { id: 4, title: 'Haldi Dancing Marigold', category: 'HALDI', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Indian-Bridal-Outfit-Ready-for-Wedding-Ceremony-scaled-e1773079449305.jpg' },
  { id: 5, title: 'Close-up Diamond Ring', category: 'ENGAGEMENT', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Trending-Bridal-Poses-WEDDINGPUR-scaled-e1647539198859.jpg' },
  { id: 6, title: 'Wedding Mandap Arch', category: 'WEDDING', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Bride-Shining-in-Her-Wedding-Party-Look-scaled-e1771302690887.jpg', wide: true },
  { id: 7, title: 'Mehandi Henna Close-ups', category: 'MEHANDI', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/couple-shoot-for-wedding-weddingpur-scaled-e1773261994127.jpg' },
  { id: 8, title: 'Reception Glam Portraits', category: 'RECEPTION', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/bride-kissing-groom-after-reception-weddingpur-scaled-e1667218643129.jpg', featured: true },
  { id: 9, title: 'Celebrity Guest at Sangeet', category: 'CELEBRITY', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/DSC01530-scaled-e1703749041964.jpg' },
  { id: 10, title: 'Pre-wedding Lake Shoot', category: 'PREWEDDING', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/bridal-portraits-ideas-for-wedding-scaled-e1666892962276.jpg' },
  { id: 11, title: 'Sangeet Performance', category: 'SANGEET', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/indian-bridal-portraits-weddingpur-scaled-e1666892473798.jpg', wide: true },
  { id: 12, title: 'Celebrity Wedding Vows', category: 'CELEBRITY', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-photography-in-Bihar-weddingpur-scaled-e1773261475301.jpg' },
  { id: 13, title: 'Groom Sherwani Portrait', category: 'WEDDING', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Marraige-purpose-photography-in-Patna-scaled-e1647539357933.jpg' },
  { id: 14, title: 'Bride Red Lehenga on Stairs', category: 'WEDDING', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/couple-shoot-for-wedding-weddingpur-scaled-e1773261994127-rkd9amrvoysugb5qrivmgnbcfwikh7q9iafy1g9j74.jpg', featured: true },
  { id: 15, title: 'Floral Chandelier Aisle', category: 'RECEPTION', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Lovely-Kiss-Moment-Between-Bride-and-Groom-Filled-with-Love-scaled-e1771221258589-rj856xwxhhg1tsoy3cte6lncrl1lfj66ciafowiv00.jpg' },
  { id: 16, title: 'Haldi Dancing Marigold', category: 'HALDI', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Indian-Bridal-Outfit-Ready-for-Wedding-Ceremony-scaled-e1773079449305.jpg' },
  { id: 17, title: 'Close-up Diamond Ring', category: 'ENGAGEMENT', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Trending-Bridal-Poses-WEDDINGPUR-scaled-e1647539198859.jpg', wide: true },
  { id: 18, title: 'Wedding Mandap Arch', category: 'WEDDING', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Bride-Shining-in-Her-Wedding-Party-Look-scaled-e1771302690887.jpg' },
  { id: 19, title: 'Mehandi Henna Close-ups', category: 'MEHANDI', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/couple-shoot-for-wedding-weddingpur-scaled-e1773261994127.jpg' },
  { id: 20, title: 'Reception Glam Portraits', category: 'RECEPTION', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/bride-kissing-groom-after-reception-weddingpur-scaled-e1667218643129.jpg' },
  { id: 21, title: 'Celebrity Guest at Sangeet', category: 'CELEBRITY', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/DSC01530-scaled-e1703749041964.jpg', featured: true },
  { id: 22, title: 'Pre-wedding Lake Shoot', category: 'PREWEDDING', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/bridal-portraits-ideas-for-wedding-scaled-e1666892962276.jpg' },
  { id: 23, title: 'Sangeet Performance', category: 'SANGEET', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/indian-bridal-portraits-weddingpur-scaled-e1666892473798.jpg', wide: true },
  { id: 24, title: 'Celebrity Wedding Vows', category: 'CELEBRITY', imageUrl: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-photography-in-Bihar-weddingpur-scaled-e1773261475301.jpg' }
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredPhotos = activeCategory === 'ALL'
    ? mockPhotos
    : mockPhotos.filter(photo => photo.category === activeCategory);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  return (
    <section className="w-full min-h-screen bg-[#212639] pt-24 pb-0 overflow-x-hidden">
      {/* Heading Block */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.2em] text-[#B38F4D] uppercase">
          Showcase
        </h1>
      </div>

      {/* Category Filter Bar */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 px-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-xs font-medium tracking-wider uppercase transition-all duration-300 border ${
              activeCategory === category
                ? 'bg-[#B38F4D] text-white border-[#B38F4D]'
                : 'bg-transparent text-[#4A4A4A] border-transparent hover:border-white/10 hover:bg-[#2B324B]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Seamless Edge-to-Edge Masonry Columns */}
      <div className="w-full columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-[2px] space-y-[2px] bg-[#212639]">
        {filteredPhotos.map((photo, index) => (
          <div 
            key={photo.id} 
            onClick={() => openLightbox(index)}
            className="relative overflow-hidden bg-[#1A1E2E] group cursor-pointer break-inside-avoid"
          >
            <img
              src={photo.imageUrl}
              alt={photo.title || 'Weddingpur Photography'}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 block"
              loading="lazy"
            />
            {/* Subtle luxury bronze tint on hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Full-Screen Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1E1E1E]/95 backdrop-blur-md transition-opacity duration-300"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[101] p-2"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 hover:bg-[#2B324B]/10 rounded-full z-[101]"
            aria-label="Previous"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 hover:bg-[#2B324B]/10 rounded-full z-[101]"
            aria-label="Next"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div 
            className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center justify-center" 
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredPhotos[currentImageIndex].imageUrl}
              alt={filteredPhotos[currentImageIndex].title}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}