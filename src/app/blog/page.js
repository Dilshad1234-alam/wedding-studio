'use client';
import Link from 'next/link';

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      category: "Planning",
      title: "The Ultimate Guide to Choosing Your Destination Wedding Venue",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
      slug: "choosing-destination-wedding-venue"
    },
    {
      id: 2,
      category: "Real Weddings",
      title: "A Royal Heritage Celebration in Jaipur's City Palace",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
      slug: "royal-heritage-jaipur"
    },
    {
      id: 3,
      category: "Cinematography",
      title: "Why You Need a Dedicated Cinematographer for the Haldi",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop",
      slug: "dedicated-cinematographer-haldi"
    },
    {
      id: 4,
      category: "Inspiration",
      title: "Minimalist Decor Trends for the Modern Indian Bride",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
      slug: "minimalist-decor-trends"
    },
    {
      id: 5,
      category: "Real Weddings",
      title: "Intimate Beach Vows: A Sunset Celebration in Goa",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
      slug: "intimate-beach-vows-goa"
    },
    {
      id: 6,
      category: "Planning",
      title: "Building Your Perfect Wedding Timeline with Your Photographer",
      image: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?q=80&w=800&auto=format&fit=crop",
      slug: "perfect-wedding-timeline"
    },
    {
      id: 1,
      category: "Planning",
      title: "The Ultimate Guide to Choosing Your Destination Wedding Venue",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
      slug: "choosing-destination-wedding-venue"
    },
    {
      id: 2,
      category: "Real Weddings",
      title: "A Royal Heritage Celebration in Jaipur's City Palace",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
      slug: "royal-heritage-jaipur"
    },
    {
      id: 3,
      category: "Cinematography",
      title: "Why You Need a Dedicated Cinematographer for the Haldi",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop",
      slug: "dedicated-cinematographer-haldi"
    },
    {
      id: 4,
      category: "Inspiration",
      title: "Minimalist Decor Trends for the Modern Indian Bride",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
      slug: "minimalist-decor-trends"
    },
    {
      id: 5,
      category: "Real Weddings",
      title: "Intimate Beach Vows: A Sunset Celebration in Goa",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
      slug: "intimate-beach-vows-goa"
    },
    {
      id: 6,
      category: "Planning",
      title: "Building Your Perfect Wedding Timeline with Your Photographer",
      image: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?q=80&w=800&auto=format&fit=crop",
      slug: "perfect-wedding-timeline"
    }
  ];

  return (
    <main className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] pt-10 -mt-10 pb-28 px-6 sm:px-12 font-sans selection:bg-[#5B6454] selection:text-[#FAF8F5]">
      
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

      {/* Pagination / CTA */}
      <section className="text-center mt-24">
         <button className="bg-transparent border border-[#5B6454]/30 hover:border-[#D4AF37]/40 text-[#F5F5F5] px-10 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-medium transition focus:outline-none">
           Load More Stories
         </button>
      </section>

    </main>
  );
}
