const fs = require('fs');
const path = require('path');

const targetFiles = [
  'src/app/stories/page.js',
  'src/app/stories/[slug]/page.js',
  'src/app/photography/page.js',
  'src/app/portfolio/page.js',
  'src/app/films/page.js',
  'src/app/services/page.js',
  'src/app/albums/page.js',
  'src/app/blog/page.js',
  'src/app/journal/page.js',
  'src/app/about/page.js',
  'src/app/contact/page.js'
];

const rules = [
  // 1. Page Canvas & Wrappers
  { regex: /bg-\[#FAF8F5\]/g, replace: 'bg-[#0B0D0E]' },
  { regex: /bg-\[#FDFBF7\]/g, replace: 'bg-[#0B0D0E]' },
  { regex: /bg-\[#FAF9F6\]/g, replace: 'bg-[#0B0D0E]' },
  { regex: /bg-stone-50/g, replace: 'bg-[#0B0D0E]' },
  { regex: /bg-slate-900/g, replace: 'bg-[#0B0D0E]' },
  { regex: /bg-\[#0B132B\]/g, replace: 'bg-[#0B0D0E]' },
  { regex: /bg-\[#1E221D\]/g, replace: 'bg-[#0B0D0E]' },
  { regex: /text-\[#1E221D\]/g, replace: 'text-[#F5F5F5]' },
  { regex: /text-\[#0B132B\]/g, replace: 'text-[#F5F5F5]' },

  // 2. Cards, Masonry Blocks & Containers
  { regex: /bg-white/g, replace: 'bg-[#121518]' },
  { regex: /bg-\[#ECEFEA\]/g, replace: 'bg-[#121518]' },
  { regex: /bg-gray-100/g, replace: 'bg-[#121518]' },
  { regex: /border-\[#E8E4DB\]/g, replace: 'border-[#2B2519]' },
  { regex: /border-\[#EAE6DE\]/g, replace: 'border-[#2B2519]' },
  { regex: /border-\[#E3DFD5\]/g, replace: 'border-[#2B2519]' },
  { regex: /border-\[#DDD7CD\](\/70)?/g, replace: 'border-[#2B2519]' },
  { regex: /border-white(\/\d+)?/g, replace: 'border-[#2B2519]' },
  { regex: /border-\[#4C5346\]/g, replace: 'border-[#2B2519]' },
  { regex: /hover:border-\[#5B6454\](\/60)?/g, replace: 'hover:border-[#D4AF37]/40' },
  { regex: /shadow-sm/g, replace: 'shadow-xl' }, // as per "shadow-xl" for cards

  // Inner boxes / metadata bars (contact page)
  { regex: /bg-\[#F5F3EC\]/g, replace: 'bg-[#16191D]' },
  
  // 3. Typography & Accents
  { regex: /text-\[#5F6757\]/g, replace: 'text-[#C5B388]' },
  { regex: /text-\[#7A8275\]/g, replace: 'text-[#C5B388]' },
  { regex: /text-\[#525B4C\]/g, replace: 'text-[#C5B388]' },
  { regex: /text-\[#A2ADA0\]/g, replace: 'text-[#C5B388]' },
  { regex: /text-gray-300/g, replace: 'text-[#C5B388]' },
  { regex: /text-\[#ECEFEA\](\/70)?/g, replace: 'text-[#C5B388]' },
  { regex: /text-\[#9EA598\]/g, replace: 'text-[#C5B388]' },
  { regex: /text-gray-500/g, replace: 'text-[#C5B388]' },
  { regex: /text-gray-600/g, replace: 'text-[#C5B388]' },
  
  // Main Accents
  { regex: /text-\[#5B6454\]/g, replace: 'text-[#D4AF37]' },
  { regex: /text-\[#E6B85C\]/g, replace: 'text-[#D4AF37]' },
  { regex: /text-amber-300/g, replace: 'text-[#D4AF37]' },
  
  // Highlight Tags
  {
    regex: /<span className="text-\[10px\](?: sm:text-xs)? uppercase tracking-\[[^\]]+\] text-\[[^\]]+\] font-(?:medium|semibold|bold) block([^"]*)">/g,
    replace: '<span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-black block $1">'
  },

  // 4. Category Filter Tabs & Pills
  // Active Tab
  {
    regex: /bg-\[#5B6454\] text-\[#FAF8F5\] border-\[#5B6454\]/g,
    replace: 'bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black font-black border-transparent shadow-md shadow-[#D4AF37]/20'
  },
  // Inactive Tab
  {
    regex: /text-\[#1E221D\] border-transparent hover:border-\[#5B6454\] hover:text-\[#5B6454\]/g,
    replace: 'text-[#C5B388] border-[#2B2519] hover:border-[#D4AF37]/40 hover:text-white bg-[#121518]'
  },

  // 5. Action Buttons (CTAs)
  // Primary
  {
    regex: /bg-\[#5B6454\] hover:bg-\[#485042\] text-\[#FAF8F5\]/g,
    replace: 'bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-black shadow-lg shadow-[#D4AF37]/20 transition-all'
  },
  // Secondary / Ghost
  {
    regex: /border border-\[#5B6454\](\/60)? text-\[#D4AF37\] hover:bg-\[#121518\] hover:text-\[#FAF8F5\]( hover:border-\[#5B6454\])?/g,
    replace: 'border border-[#2B2519] text-[#C5B388] hover:text-white hover:border-[#D4AF37] hover:bg-[#121518]'
  },
  {
    regex: /border border-\[#5B6454\](\/60)? text-\[#5B6454\] hover:bg-\[#5B6454\] hover:text-\[#FAF8F5\]( hover:border-\[#5B6454\])?/g,
    replace: 'border border-[#2B2519] text-[#C5B388] hover:text-white hover:border-[#D4AF37] hover:bg-[#121518]'
  },
  {
    regex: /border border-\[#FAF8F5\]\/80 hover:bg-\[#0B0D0E\] hover:text-\[#F5F5F5\] text-\[#FAF8F5\]/g,
    replace: 'border border-[#2B2519] text-[#C5B388] hover:text-white hover:border-[#D4AF37] hover:bg-[#121518]'
  },
  
  // 6. Contact Form Inputs (src/app/contact/page.js)
  {
    regex: /bg-\[#FAF8F5\] border border-\[#DDD7CD\] text-\[#1E221D\] placeholder:text-\[#9EA598\] focus:border-\[#5B6454\] focus:ring-\[#5B6454\]/g,
    replace: 'bg-[#181B1F] border border-[#2B2519] text-white placeholder:text-[#554C34] focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-xl'
  }
];

targetFiles.forEach(file => {
  const absolutePath = path.resolve(file);
  if (fs.existsSync(absolutePath)) {
    let content = fs.readFileSync(absolutePath, 'utf8');
    
    rules.forEach(r => {
      content = content.replace(r.regex, r.replace);
    });

    // Special fix for placeholder/focus on forms if regex above didn't match perfectly
    content = content.replace(/placeholder:text-\[#[A-Za-z0-9]+\]/g, 'placeholder:text-[#554C34]');
    content = content.replace(/focus:border-\[#[A-Za-z0-9]+\]/g, 'focus:border-[#D4AF37]');
    content = content.replace(/focus:ring-\[#[A-Za-z0-9]+\]/g, 'focus:ring-[#D4AF37]');
    
    // Convert remaining specific light backgrounds to dark on inputs
    content = content.replace(/className="w-full bg-\[#0B0D0E\]/g, 'className="w-full bg-[#181B1F]');
    
    fs.writeFileSync(absolutePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
