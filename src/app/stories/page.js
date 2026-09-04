'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function StoriesPage() {
  const stories = [
    {
      couple: "Arjun & Maya",
      title: "A Royal Affair in Udaipur",
      location: "City Palace, Udaipur",
      excerpt: "Against the backdrop of the serene Lake Pichola, Maya and Arjun celebrated their union in a majestic three-day extravaganza full of vibrant colors and royal traditions.",
      image: "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg"
    },
    {
      couple: "Rohan & Priya",
      title: "Intimate Beach Vows",
      location: "Taj Exotica, Goa",
      excerpt: "Sun, sand, and vows whispered under a floral canopy. Rohan and Priya's intimate destination wedding was a masterclass in modern, relaxed elegance.",
      image: "https://images.unsplash.com/photo-1544627836-822bfea45826?q=80&w=1000&auto=format&fit=crop"
    },
    {
      couple: "Vikram & Ananya",
      title: "Heritage Glamour in Jaipur",
      location: "Rambagh Palace, Jaipur",
      excerpt: "A grand celebration deeply rooted in tradition. From the vibrant Haldi to the emotional Pheras under the stars, every moment was beautifully curated.",
      image: "https://images.unsplash.com/photo-1595981267035-7b04d84b52df?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1F231D] font-sans selection:bg-[#5B6454] selection:text-[#FAF8F5] pt-32 pb-24">
      
      {/* Header */}
      <section className="container mx-auto px-4 text-center mb-24 max-w-4xl">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#555D4E] font-semibold block mb-4">
          JOURNAL
        </span>
        <h1 className="font-serif text-5xl md:text-7xl text-[#1F231D] mb-8 leading-tight">
          Wedding <span className="italic">Stories</span>
        </h1>
        <div className="w-12 h-[1px] bg-[#555D4E] mx-auto mb-8 opacity-50" />
        <p className="text-[#4C5346] text-sm font-light leading-relaxed max-w-2xl mx-auto">
          Step into the pages of our editorial journal, where real celebrations are transformed into timeless, cinematic narratives.
        </p>
      </section>

      {/* Stories Spread */}
      <section className="container mx-auto px-4 max-w-6xl space-y-32">
        {stories.map((story, index) => {
          const isReversed = index % 2 !== 0;
          return (
            <article key={index} className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-24`}>
              
              {/* Image Frame */}
              <div className="w-full md:w-1/2">
                <div className={`w-full ${index % 2 === 0 ? 'rounded-t-full rounded-b-xl' : 'rounded-b-full rounded-t-xl'} overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] relative group cursor-pointer`}>
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[5s] group-hover:scale-105"
                    style={{ backgroundImage: `url('${story.image}')` }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
                </div>
              </div>

              {/* Text Content */}
              <div className={`w-full md:w-1/2 ${isReversed ? 'text-left md:text-right md:pl-0 pr-0 md:pr-12' : 'text-left md:pr-0 pl-0 md:pl-12'}`}>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#555D4E] font-semibold block mb-6">
                  {story.location}
                </span>
                
                <h2 className="font-serif text-3xl md:text-5xl text-[#1F231D] mb-4 leading-tight">
                  {story.title}
                </h2>
                
                <h3 className="font-serif italic text-2xl text-[#8C7A6B] mb-8">
                  {story.couple}
                </h3>
                
                <p className="text-[#4C5346] text-sm font-light leading-relaxed mb-10 max-w-md">
                  {story.excerpt}
                </p>
                
                <Link 
                  href={`/stories/${story.couple.toLowerCase().replace(' & ', '-')}`} 
                  className={`inline-flex items-center gap-3 text-[10px] uppercase tracking-widest text-[#1F231D] font-semibold hover:text-[#555D4E] transition-colors group/link ${isReversed ? 'md:justify-end' : ''}`}
                >
                  Read Full Story
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>

            </article>
          );
        })}
      </section>

    </main>
  );
}