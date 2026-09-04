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
      image: "https://images.unsplash.com/photo-1544627836-822bfea45826?q=80&w=800&auto=format&fit=crop",
      slug: "royal-heritage-jaipur"
    },
    {
      id: 3,
      category: "Cinematography",
      title: "Why You Need a Dedicated Cinematographer for the Haldi",
      image: "https://images.unsplash.com/photo-1595981267035-7b04d84b52df?q=80&w=800&auto=format&fit=crop",
      slug: "dedicated-cinematographer-haldi"
    },
    {
      id: 4,
      category: "Inspiration",
      title: "Minimalist Decor Trends for the Modern Indian Bride",
      image: "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg",
      slug: "minimalist-decor-trends"
    },
    {
      id: 5,
      category: "Real Weddings",
      title: "Intimate Beach Vows: A Sunset Celebration in Goa",
      image: "https://images.unsplash.com/photo-1583939411023-14783179e581?q=80&w=800&auto=format&fit=crop",
      slug: "intimate-beach-vows-goa"
    },
    {
      id: 6,
      category: "Planning",
      title: "Building Your Perfect Wedding Timeline with Your Photographer",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
      slug: "perfect-wedding-timeline"
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1E221D] pt-32 pb-24 px-6 sm:px-12 font-sans selection:bg-[#5B6454] selection:text-[#FAF8F5]">
      
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-20">
        <span className="block text-center text-[10px] uppercase tracking-[0.35em] text-[#626C59] font-medium mb-3">
          Journal & Features
        </span>
        <h1 className="text-center font-serif text-5xl sm:text-6xl text-[#1E221D] font-normal mb-6">
          The Editorial
        </h1>
        <p className="text-[#4A5243] text-sm font-light leading-relaxed max-w-xl mx-auto">
          Curated insights, real wedding stories, and expert guidance to inspire your timeless celebration.
        </p>
      </section>

      {/* Editorial Grid */}
      <section className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {posts.map((post) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.id} 
              className="group block bg-white rounded-t-full rounded-b-2xl overflow-hidden border border-[#E4DFD5] shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-500"
            >
              
              {/* Arched Image */}
              <div className="w-full aspect-[3/4] overflow-hidden relative border-b-4 border-white">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[6s] group-hover:scale-105"
                  style={{ backgroundImage: `url('${post.image}')` }}
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Info Pill / Content */}
              <div className="p-8 text-center flex flex-col items-center">
                <span className="inline-block bg-[#ECEFEA] text-[#5B6454] px-4 py-1.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-semibold mb-4">
                  {post.category}
                </span>
                <h2 className="font-serif text-2xl text-[#1E221D] leading-snug mb-5 group-hover:text-[#5B6454] transition-colors line-clamp-3">
                  {post.title}
                </h2>
                <div className="mt-auto text-[10px] uppercase tracking-widest text-[#1E221D] font-semibold group-hover:text-[#5B6454] transition-colors flex items-center gap-2">
                  Read Story <span>&rarr;</span>
                </div>
              </div>

            </Link>
          ))}
        </div>
      </section>

      {/* Pagination / CTA */}
      <section className="text-center mt-24">
         <button className="bg-transparent border border-[#5B6454]/30 hover:border-[#5B6454] text-[#1E221D] px-10 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-medium transition focus:outline-none">
           Load More Stories
         </button>
      </section>

    </main>
  );
}
