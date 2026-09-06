const fs = require('fs');
const path = require('path');

const targetFiles = [
  'src/app/stories/page.js',
  'src/app/portfolio/page.js',
  'src/app/films/page.js',
  'src/app/services/page.js',
  'src/app/albums/page.js',
  'src/app/blog/page.js',
  'src/app/about/page.js',
  'src/app/contact/page.js'
];

targetFiles.forEach(file => {
  const filePath = path.join('d:/Users/mddil/Desktop/Zinmatt/wedding-studio', file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find <main ...> or main content wrapper sections
  // Look for max-w-4xl, max-w-5xl, max-w-6xl, max-w-7xl, max-w-[1200px], max-w-[1440px], max-w-screen-md, max-w-screen-lg
  
  // Some pages have multiple sections. The prompt said:
  // "locate the primary content wrapper <div> that controls the width... Replace those restrictive classes with the full-bleed luxury cinema container: <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">"
  
  // It's safer to just replace max-w-4xl, max-w-5xl, max-w-6xl, max-w-7xl, max-w-[1200px], max-w-[1440px], max-w-screen-md, max-w-screen-lg
  // with max-w-[1536px] directly, and add w-full if not present.
  
  // However, I will print the main containers first to see.
  const lines = content.split('\n');
  console.log('\n--- ' + file + ' ---');
  lines.forEach((line, i) => {
    if (line.includes('max-w-')) {
      console.log(`${i+1}: ${line.trim()}`);
    }
  });
});
