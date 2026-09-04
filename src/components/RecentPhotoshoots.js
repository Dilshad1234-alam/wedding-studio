import React from 'react';

const shoots = [
  { id: 1, title: 'Royal Bride in Red Lehenga', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Indian-Bridal-Outfit-Ready-for-Wedding-Ceremony-scaled-e1773079449305.jpg' },
  { id: 2, title: 'Intimate Couple Portrait', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Trending-Bridal-Poses-WEDDINGPUR-scaled-e1647539198859.jpg' },
  { id: 3, title: 'Haldi Celebration Joy', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Marraige-purpose-photography-in-Patna-scaled-e1647539357933.jpg' },
  { id: 4, title: 'Traditional Bridal Elegance', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Bride-Shining-in-Her-Wedding-Party-Look-scaled-e1771302690887.jpg' },
  { id: 5, title: 'Groom Royal Entry', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/couple-shoot-for-wedding-weddingpur-scaled-e1773261994127.jpg' },
  { id: 6, title: 'Bridal Jewelry Close-up', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/bride-kissing-groom-after-reception-weddingpur-scaled-e1667218643129.jpg' },
  { id: 7, title: 'Vibrant Sangeet Dance', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/DSC01530-scaled-e1703749041964.jpg' },
  { id: 8, title: 'Classic B&W Couple Portrait', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Engagement-Photoshoot-by-weddingpur-scaled-e1703870896153.jpg' },
  { id: 9, title: 'Mandap Fire Rituals', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Bride-with-her-sister-in-haldi-function-weddingpur-scaled-e1668322603458.jpg' },
  { id: 10, title: 'Yellow Floral Haldi Vibe', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Engagement-Photoshoot-by-weddingpur-scaled-e1703870896153.jpg' },
  { id: 11, title: 'Bridal Veil Gaze', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/happy-groom-at-wedding-weddingpur-patna-scaled-e1666893682689.jpg' },
  { id: 12, title: 'Candid Ceremony Laughter', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg' },
  { id: 13, title: 'Grand Reception Walk', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/bride-beautifull-wedding-pose-scaled-e1771303518696.jpg' },
  { id: 14, title: 'Pre-Wedding Sunset Glow', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Trending-Bridal-Poses-of-2022-scaled-e1647539051165.jpg' },
  { id: 15, title: 'Palace Heritage Backdrop', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/indian-bridal-portraits-weddingpur-scaled-e1666892473798.jpg' },
  { id: 16, title: 'Varmala Garland Exchange', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-reception-pictures-weddingpur-scaled-e1667219109825.jpg' },
  { id: 17, title: 'Bridal Henna Intricacy', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-photography-in-Bihar-weddingpur-scaled-e1773261475301.jpg' },
  { id: 18, title: 'Sparklers Night Send-off', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/bride-and-groom-laughing-moment-scaled-e1771304076216.jpg' },
  { id: 19, title: 'Royal Heritage Bride', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Indian-bride-with-gramophone-weddingpur-scaled-e1771480369598.jpg' },
  { id: 20, title: 'Emotional Bidaai Moment', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/DSC01599-scaled-e1771479911823.jpg' },
  { id: 21, title: 'Golden Hour Couple Vibe', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Traditional-Bride-Wedding-Outfit-scaled-e1773078623932.jpg' },
  { id: 22, title: 'Mehendi Floral Decor', src: ' https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/bride-and-groom-happy-wedding-night-scaled-e1771304185352.jpg'},
  { id: 23, title: 'Traditional Turban Groom', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/Joyful-Haldi-Smile-Moment-During-Pre-Wedding-Celebration-scaled-e1771221388120.jpg' },
  { id: 24, title: 'Celebration Confetti Moment', src: 'https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/indian-wedding-couple-weddingpur-scaled-e1771609571501.jpg' }
];

export default function RecentPhotoshoots() {
  return (
    <section className="bg-[#212639] w-full py-24 md:py-32">
      <div className="max-w-screen-2xl mx-auto px-4">
        
        {/* Main Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight mb-6">
            Recent <span className="text-[#B38F4D] italic">Photoshoots</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#B38F4D] mx-auto opacity-80" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1">
          {shoots.map((shoot) => (
            <div 
              key={shoot.id} 
              className="aspect-[3/4] overflow-hidden relative group cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out group-hover:scale-110"
                style={{ backgroundImage: `url('${shoot.src}')` }}
              />
              
              {/* Subtle dark vignette & overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/60 transition-colors duration-700 pointer-events-none" />
              
              {/* Overlay with title sliding up */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out flex flex-col justify-end text-center">
                <div className="w-6 h-[1px] bg-[#B38F4D] mx-auto mb-3" />
                <span className="text-xs text-white font-serif tracking-widest leading-relaxed">
                  {shoot.title}
                </span>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
