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
    <section className="py-24 md:py-32 bg-[#212639] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background accent */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#B38F4D]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Main Section Heading */}
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight mb-6">
            Client <span className="text-[#B38F4D] italic">Love</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#B38F4D] mx-auto opacity-80" />
        </div>

        {/* 3-Column Testimonial Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {feedbacks.map((feedback, index) => (
            <div 
              key={index} 
              className="group relative bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl p-10 lg:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-white/[0.04] transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              {/* Oversized background quote */}
              <div className="absolute -top-6 -right-2 text-[150px] font-serif text-[#B38F4D] opacity-[0.03] select-none pointer-events-none leading-none">
                "
              </div>

              {/* Review Text */}
              <div className="relative mb-12">
                <Quote 
                  size={24} 
                  className="text-[#B38F4D] mb-6 opacity-70" 
                  strokeWidth={1.5} 
                  fill="none"
                />
                <p className="text-gray-300 font-light italic leading-relaxed text-base">
                  "{feedback.text}"
                </p>
              </div>

              {/* Bottom Avatar & Info */}
              <div className="flex items-center space-x-5 border-t border-white/5 pt-6 mt-auto">
                <div 
                  className="w-14 h-14 rounded-full bg-cover bg-center shadow-lg border border-white/10"
                  style={{ backgroundImage: `url('${feedback.avatar}')` }}
                />
                <div>
                  <h4 className="text-white font-serif text-lg font-medium">{feedback.name}</h4>
                  <span className="text-[10px] font-semibold text-[#B38F4D] uppercase tracking-widest">{feedback.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
