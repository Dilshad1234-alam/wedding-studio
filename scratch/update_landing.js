const fs = require('fs');
const path = require('path');

const targetFile = path.resolve('src/app/landing/page.js');
let content = fs.readFileSync(targetFile, 'utf8');

// Replacements
const rules = [
  // Ambient lighting for main wrapper
  {
    regex: /<main className="min-h-screen bg-\[#FAF8F5\] text-\[#1E221D\] font-sans antialiased selection:bg-\[#5B6454\] selection:text-white">/g,
    replace: '<main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-[#0B0D0E] to-[#0B0D0E] text-[#F5F5F5] font-sans antialiased selection:bg-[#D4AF37] selection:text-black">'
  },

  // Primary Action buttons (Contact Us, Subscribe & Watch)
  {
    regex: /className="bg-\[#5B6454\] hover:bg-\[#485042\] text-\[#FAF8F5\] ([^"]*)"/g,
    replace: 'className="bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black hover:from-[#F3E5AB] hover:to-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 $1 font-black"'
  },
  
  // Secondary / Outline Buttons (Explore Portfolio, Our Story, View Story, Learn More, Follow on IG)
  {
    regex: /border border-\[#FAF8F5\]\/80 hover:bg-\[#FAF8F5\] hover:text-\[#1E221D\] text-\[#FAF8F5\]/g,
    replace: 'border border-[#2B2519] text-[#C5B388] hover:text-white hover:border-[#D4AF37] hover:bg-[#121518]'
  },
  {
    regex: /border border-\[#5B6454\](\/60)? text-\[#5B6454\] hover:bg-\[#5B6454\] hover:text-\[#FAF8F5\]( hover:border-\[#5B6454\])?/g,
    replace: 'border border-[#2B2519] text-[#C5B388] hover:text-white hover:border-[#D4AF37] hover:bg-[#121518]'
  },

  // Highlight Badges / Subtitles (Text #D4AF37 with subtle #D4AF37/10 background and #D4AF37/20 border)
  // Let's add background and border to the small uppercase spans
  {
    regex: /<span className="text-\[10px\](?: sm:text-xs)? uppercase tracking-\[[^\]]+\] text-\[[^\]]+\] font-(?:medium|semibold) block([^"]*)">/g,
    replace: '<span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-1 rounded-full font-semibold inline-block mb-3">'
  },

  // Background colors
  { regex: /bg-\[#FAF8F5\]/g, replace: 'bg-[#0B0D0E]' },
  { regex: /bg-white/g, replace: 'bg-[#121518]' },
  { regex: /bg-\[#ECEFEA\]/g, replace: 'bg-[#121518]' },
  { regex: /bg-\[#1E221D\]/g, replace: 'bg-[#0B0D0E]' }, // Used in Google Reviews
  { regex: /bg-gray-100/g, replace: 'bg-[#121518]' },
  
  // Text colors
  { regex: /text-\[#1E221D\]/g, replace: 'text-white' },
  { regex: /text-\[#FAF8F5\]/g, replace: 'text-[#F5F5F5]' },
  { regex: /text-\[#5F6757\]/g, replace: 'text-[#C5B388]' },
  { regex: /text-\[#7A8275\]/g, replace: 'text-[#C5B388]' },
  { regex: /text-\[#525B4C\]/g, replace: 'text-[#C5B388]' },
  { regex: /text-\[#A2ADA0\]/g, replace: 'text-[#C5B388]' },
  { regex: /text-gray-300/g, replace: 'text-[#C5B388]' },
  { regex: /text-\[#ECEFEA\](\/70)?/g, replace: 'text-[#C5B388]' },
  { regex: /text-\[#5B6454\]/g, replace: 'text-[#D4AF37]' },
  { regex: /text-\[#E6B85C\]/g, replace: 'text-[#D4AF37]' },
  { regex: /text-amber-300/g, replace: 'text-[#D4AF37]' },

  // Borders
  { regex: /border-\[#E8E4DB\]/g, replace: 'border-[#2B2519]' },
  { regex: /border-\[#EAE6DE\]/g, replace: 'border-[#2B2519]' },
  { regex: /border-\[#E3DFD5\]/g, replace: 'border-[#2B2519]' },
  { regex: /border-\[#DDD7CD\](\/70)?/g, replace: 'border-[#2B2519]' },
  { regex: /border-white(\/\d+)?/g, replace: 'border-[#2B2519]' },
  
  // Hover states
  { regex: /hover:border-\[#5B6454\](\/60)?/g, replace: 'hover:border-[#D4AF37]' },
  { regex: /hover:bg-white\/40/g, replace: 'hover:bg-[#D4AF37]/40' },
  { regex: /hover:text-\[#E6B85C\]/g, replace: 'hover:text-[#D4AF37]' },
  { regex: /hover:border-\[#E6B85C\]/g, replace: 'hover:border-[#D4AF37]' },

  // Carousel dots
  { regex: /bg-\[#E6B85C\]/g, replace: 'bg-[#D4AF37]' },
  { regex: /bg-white\/20/g, replace: 'bg-[#D4AF37]/20' },

  // Highlight word in titles (italic font-light -> gold text)
  { regex: /<span className="italic font-light">/g, replace: '<span className="italic font-light text-[#D4AF37]">' }
];

rules.forEach(r => {
  content = content.replace(r.regex, r.replace);
});

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Update complete');
