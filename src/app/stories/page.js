'use client';

import Link from 'next/link';

const stories = [
  {
    slug: 'rishabh-and-shivani',
    couple: 'Rishabh & Shivani',
    excerpt: "Rishav and Shivani's wedding journey began long before the wedding day. As a love marriage, their story already had a strong foundation of friendship, comfort, and understanding. Having captured their engagement earlier, we also loved covering their wedding story from the first celebrations to the final bride welcome ceremony."
  },
  {
    slug: 'ruchi-and-abhishek',
    couple: 'Ruchi & Abhishek',
    excerpt: "Some weddings are beautiful. Some are unforgettable. Abhishek and Ruchi's wedding was one of a kind. A Marwadi wedding full of life, laughter, and love that every single frame told a story worth saving forever. Click on the button to feel every moment of this beautiful union."
  },
  {
    slug: 'akshat-and-shivangi',
    couple: 'Akshat & Shivangi',
    excerpt: "Few weddings bring together not just two people and their families, but also two cultures and two beautiful traditions. Akshat and Shivangi's wedding at The Maverick Resort was one such celebration, where love and traditions from two states came together to create something truly special."
  },
  {
    slug: 'divya-and-nikhil',
    couple: 'Divya & Nikhil',
    excerpt: "Some love stories seem to be timeless. Divya and Nikhil's story was exactly the same. They finalized Valentine's Day for their engagement and this made the moment even more memorable for them. The wedding was in Vrindavan Garden, Patna. In the presence of their close family members and friends, they tied their knot."
  },
  {
    slug: 'aprajita-and-abhinav',
    couple: 'Aprajita & Abhinav',
    excerpt: "An intimate arranged wedding filled with love, laughter, and happiness. Aprajita and Abhinav started their new journey from THE PARK PRIDE hotel, Patna. Witness their magical journey from Rishta, Zoom call, 2 mins of first meet, proposal, engagement, and wedding."
  },
  {
    slug: 'minakshi-and-rahul',
    couple: 'Minakshi & Rahul',
    excerpt: "In the heart of Bodhgaya, Minakshi and Rahul exchanged vows at Anand International Hotel, Bihar. The intimate ceremony radiated love as the couple embarked on their journey together. With joyous hearts and a serene backdrop, their union blossomed, creating memories to cherish for a lifetime."
  },
  {
    slug: 'vageesha-and-ritesh',
    couple: 'Vageesha & Ritesh',
    excerpt: "We covered a beautiful wedding at Lemontree Premier Hotel, Patna. Ritesh and Vageesha, they both share a beautiful love story. Bride from Uttar Pradesh and groom from Bihar, two families united together for the union of this beautiful couple. Checkout their entire wedding story."
  },
  {
    slug: 'shalini-and-shaumith',
    couple: 'Shalini & Shaumith',
    excerpt: "This is story of a couple, one from north India and other from south India. So we can say that it's a story of two states. Both working in a same company and fell for each other. They talked to their parents and luckily parents agreed. We witnessed a beautiful wedding in Lemontree Hotel, Patna. This is their story."
  }
];

export default function WeddingStoriesBridesPage() {
  return (
    <div className="min-h-screen bg-[#212639] text-[#EDEAE4]">
      {/* Header Section */}
      <div className="pt-32 pb-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[#B38F4D] mb-4">
          Wedding stories of our Brides
        </h1>
      </div>

      {/* Stories Rows */}
      <div className="flex flex-col">
        {stories.map((story, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={story.slug} 
              className={`py-16 md:py-24 px-4 sm:px-6 lg:px-12 ${isEven ? 'bg-[#212639]' : 'bg-[#F2ECE0]'}`}
            >
              <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                
                {/* Left Side: Text Block */}
                <div className="w-full lg:w-[35%] flex flex-col text-center lg:text-left order-2 lg:order-1">
                  <h2 className="text-3xl lg:text-4xl font-serif font-normal text-[#B38F4D] mb-6">
                    {story.couple}
                  </h2>
                  <p className="text-[#A39E93] text-base leading-relaxed mb-8">
                    {story.excerpt}
                  </p>
                  <div>
                    <Link 
                      href={`/stories/${story.slug}`}
                      className="inline-block px-8 py-3 rounded-full border border-[#B38F4D] text-[#B38F4D] font-medium text-sm tracking-wide uppercase hover:bg-[#B38F4D] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      View Story
                    </Link>
                  </div>
                </div>

                {/* Right Side: 8-Photo Collage Grid */}
                <div className="w-full lg:w-[65%] order-1 lg:order-2">
                  <div className="grid grid-cols-4 gap-1.5 w-full max-w-2xl mx-auto lg:max-w-none">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="aspect-square overflow-hidden bg-gray-200 cursor-pointer group">
                        <img 
                          src={`https://picsum.photos/seed/${story.slug}-${i}/800/800`} 
                          alt={`${story.couple} Wedding Moment ${i + 1}`}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Feature Strip (3 large full-width photos) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3">
        <div className="aspect-[4/3] md:aspect-auto md:h-80 lg:h-[450px] overflow-hidden">
          <img src="https://picsum.photos/seed/footer1/1200/1000" alt="Editorial Wedding 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
        </div>
        <div className="aspect-[4/3] md:aspect-auto md:h-80 lg:h-[450px] overflow-hidden">
          <img src="https://picsum.photos/seed/footer2/1200/1000" alt="Editorial Wedding 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
        </div>
        <div className="aspect-[4/3] md:aspect-auto md:h-80 lg:h-[450px] overflow-hidden">
          <img src="https://picsum.photos/seed/footer3/1200/1000" alt="Editorial Wedding 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
        </div>
      </div>
    </div>
  );
}