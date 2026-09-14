'use client';
import React from 'react';
import Link from 'next/link';

export default function BlogPage() {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    fetch('/api/blogs', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Map to match the component's expected structure
          const mapped = data.map(b => ({
            id: b.id,
            category: "Journal", // Or extract from a field if we add it
            title: b.title,
            image: b.img || "",
            slug: b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
          }));
          setPosts(mapped);
        }
      })
      .catch(err => console.error("Error fetching blogs:", err))
      .finally(() => setIsLoading(false));

    const handleStorageChange = (e) => {
      if (e.key === 'weddingpur_blog_deleted' && e.newValue) {
        try {
          const { id } = JSON.parse(e.newValue);
          setPosts(prev => prev.filter(post => post.id !== id));
        } catch (err) {}
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0D0E] flex items-center justify-center pt-0 pb-12 px-6">
        <div className="w-10 h-10 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] pt-0 pb-28 px-6 sm:px-12 font-sans selection:bg-[#5B6454] selection:text-[#FAF8F5]">
      
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-center font-serif text-5xl sm:text-6xl md:text-7xl italic text-[#F5F5F5] font-normal mb-6">
          The Editorial
        </h1>
        <p className="text-[#C5B388] text-xs sm:text-sm font-light leading-relaxed max-w-xl mx-auto">
          Curated insights, real wedding stories, and expert guidance to inspire your timeless celebration.
        </p>
      </section>

      {/* Editorial Grid */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {posts.map((post) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.id} 
              className="group block bg-[#121518] rounded-t-full rounded-b-2xl overflow-hidden border border-[#E4DFD5] shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-500"
            >
              
              {/* Arched Image */}
              <div className="w-full aspect-[4/5] overflow-hidden relative border-b-4 border-[#FAF8F5] bg-[#121518]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Info Pill / Content */}
              <div className="p-8 text-center flex flex-col items-center">
                <span className="inline-block bg-[#121518] text-[#D4AF37] px-4 py-1.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-semibold mb-4">
                  {post.category}
                </span>
                <h2 className="font-serif text-2xl text-[#F5F5F5] leading-snug mb-5 group-hover:text-[#D4AF37] transition-colors line-clamp-3">
                  {post.title}
                </h2>
                <div className="mt-auto text-[10px] uppercase tracking-widest text-[#F5F5F5] font-semibold group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  Read Story <span>&rarr;</span>
                </div>
              </div>

            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
