const fs = require('fs');
const file = 'd:/Users/mddil/Desktop/Zinmatt/wedding-studio/src/app/landing/page.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Hero
content = content.replace(
  '<div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">',
  '<div className="w-full min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-8 text-center relative z-10 mx-auto">'
);

// 2. Editorial Philosophy
content = content.replace(
  '<section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">',
  '<section className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">'
);
content = content.replace(
  '<div className="lg:col-span-6 flex justify-center">',
  '<div className="lg:col-span-5 flex justify-center">'
);
content = content.replace(
  '<div className="lg:col-span-6 space-y-6 text-center lg:text-left">',
  '<div className="lg:col-span-7 space-y-6 text-center lg:text-left">'
);

// 3. Featured Weddings
content = content.replace(
  /<section className="py-24 px-6 sm:px-12 bg-\[#0B0D0E\] border-t border-\[#2B2519\]">\s*<div className="max-w-7xl mx-auto">/,
  '<section className="bg-[#0B0D0E] border-t border-[#2B2519]">\n        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-16">'
);
content = content.replace(
  '<div className="grid grid-cols-1 md:grid-cols-3 gap-8">',
  '<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">'
);
content = content.replace(
  /className="aspect-\[4\/5\] rounded-2xl overflow-hidden mb-5 bg-\[#121518\] border border-\[#2B2519\] w-full"/g,
  'className="w-full aspect-[3/4] rounded-2xl overflow-hidden mb-5 bg-[#121518] border border-[#2B2519]"'
);

// 4. Studio Pillars & Services
content = content.replace(
  /<section className="py-24 px-6 sm:px-12 bg-\[#121518\] border-t border-\[#2B2519\]">\s*<div className="max-w-7xl mx-auto">/,
  '<section className="bg-[#121518] border-t border-[#2B2519]">\n        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-16">'
);
content = content.replace(
  '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">',
  '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 w-full">'
);

// 5. Cinematic Wedding Films
content = content.replace(
  /<section className="py-24 px-6 sm:px-12 bg-\[#0B0D0E\] border-t border-\[#2B2519\]">\s*<div className="max-w-7xl mx-auto">/,
  '<section className="bg-[#0B0D0E] border-t border-[#2B2519]">\n        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-16">'
);
content = content.replace(
  '<div className="max-w-5xl mx-auto mb-14">',
  '<div className="w-full mb-8">'
);
content = content.replace(
  'className="group relative block aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#2B2519] bg-black cursor-pointer"',
  'className="group relative block w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#2B2519] bg-black cursor-pointer"'
);
content = content.replace(
  '<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">',
  '<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">'
);

// 6. Verified Google Reviews
content = content.replace(
  /<section className="py-24 px-6 sm:px-12 bg-\[#0B0D0E\] text-\[#F5F5F5\]">\s*<div className="max-w-7xl mx-auto">/,
  '<section className="bg-[#0B0D0E] text-[#F5F5F5]">\n        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 py-16">'
);
content = content.replace(
  '<div \n            className="max-w-4xl mx-auto relative"',
  '<div \n            className="w-full mx-auto relative"'
);

// 7. FAQs
content = content.replace(
  /<section className="bg-\[#0B0D0E\] py-24 px-6 sm:px-12 border-t border-\[#2B2519\]">\s*<div className="max-w-3xl mx-auto">/,
  '<section className="bg-[#0B0D0E] border-t border-[#2B2519]">\n        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 py-16">'
);

// 8. Instagram Feed
content = content.replace(
  /<section className="py-24 px-6 sm:px-12 bg-\[#0B0D0E\] border-t border-\[#2B2519\]">\s*<div className="max-w-7xl mx-auto">/,
  '<section className="bg-[#0B0D0E] border-t border-[#2B2519]">\n        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 py-16">'
);
content = content.replace(
  '<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">',
  '<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full mx-auto">'
);

fs.writeFileSync(file, content);
console.log("Done");
