import { Quote } from 'lucide-react';

export default function ClientFeedback() {
  const feedbacks = [
    {
      text: "Truly, it was amazing photography and cinematography experience. The team members are very sociable. Album quality & design was perfect. They have an awesome album app with complete protection of photos and videos, so my personal experience was amazing.",
      name: "Vageesha Jha",
      location: "PATNA",
      avatar: "https://i.pravatar.cc/150?u=vageesha" // Placeholder
    },
    {
      text: "Absolutely loved the way they captured our small town wedding. Highly professional and they understood each and every problem areas and adjusted their work accordingly. All photos were superb and the videos we will cherish for lifetime. Any one can blindly go with them.",
      name: "Deepti Yadav",
      location: "PATNA",
      avatar: "https://i.pravatar.cc/150?u=deepti" // Placeholder
    },
    {
      text: "The Lumen Weddings is an awesome platform where one can explore beautiful experience from walking down the isle to the titillating wedlock. I will definitely suggest 'Lumen Weddings' if you are going to be hitched. It makes your Gala Day treasure and keeps it confined.",
      name: "Kritika Yashraj",
      location: "SAMASTIPUR",
      avatar: "https://i.pravatar.cc/150?u=kritika" // Placeholder
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-champagne-bg px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#B35471] tracking-tight mb-4 drop-shadow-sm">
            Our Clients Love Us!
          </h2>
          <div className="w-16 h-1 bg-bronze-400 mx-auto rounded-full opacity-60"></div>
        </div>

        {/* 3-Column Testimonial Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {feedbacks.map((feedback, index) => (
            <div 
              key={index} 
              className="bg-white/80 border border-champagne-border rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Review Text */}
              <div className="relative mb-8 pt-4">
                <Quote 
                  size={32} 
                  className="absolute -top-2 -left-2 text-champagne-border opacity-50 rotate-180" 
                  strokeWidth={1} 
                  fill="currentColor"
                />
                <p className="text-espresso-light font-light italic leading-relaxed text-[15px] z-10 relative">
                  "{feedback.text}"
                </p>
              </div>

              {/* Bottom Avatar & Info */}
              <div className="flex items-center space-x-4 border-t border-champagne-border/50 pt-6 mt-auto">
                <div 
                  className="w-12 h-12 rounded-full bg-cover bg-center shadow-sm border border-champagne-border"
                  style={{ backgroundImage: `url('${feedback.avatar}')` }}
                />
                <div>
                  <h4 className="text-espresso font-serif text-lg font-medium">{feedback.name}</h4>
                  <span className="text-[11px] font-bold text-bronze-500 uppercase tracking-widest">{feedback.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
