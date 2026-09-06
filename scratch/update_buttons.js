const fs = require('fs');
const path = require('path');

// Recursive function to get all files
const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else if (file.endsWith('.js')) {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
};

const targetFiles = getAllFiles(path.resolve('src'));

const richGoldClass = 'bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#D4AF37]/20 hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] active:scale-[0.98] transition-all duration-300 cursor-pointer';

targetFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Pattern for the SUBSCRIBE & WATCH MORE FILMS button which might have missed the last script
  const subRegex = /className="inline-flex items-center gap-[^"]*bg-\[#5B6454\][^"]*"/g;
  if (subRegex.test(content)) {
    content = content.replace(subRegex, `className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full ${richGoldClass}"`);
    changed = true;
  }

  // Find old olive green primary buttons
  const oldPrimary = /className="[^"]*bg-\[#5B6454\] hover:bg-\[#485042\][^"]*"/g;
  if (oldPrimary.test(content)) {
    content = content.replace(oldPrimary, `className="inline-flex items-center justify-center px-8 py-3.5 rounded-full ${richGoldClass}"`);
    changed = true;
  }
  
  // Find "SAVE & APPLY LIVE" in admin panel
  const saveRegex = /className="[^"]*bg-\[#5B6454\][^"]*"(>[\s\S]*?SAVE & APPLY LIVE)/g;
  if (saveRegex.test(content)) {
    content = content.replace(saveRegex, `className="w-full sm:w-auto px-8 py-3.5 rounded-full ${richGoldClass}"$1`);
    changed = true;
  }
  
  // Replace the simple gold gradients from previous script with the rich one
  const simpleGold = /className="([^"]*)bg-gradient-to-r from-\[#D4AF37\] to-\[#B89018\] hover:from-\[#F3E5AB\] hover:to-\[#D4AF37\] text-black font-black shadow-lg shadow-\[#D4AF37\]\/20 transition-all([^"]*)"/g;
  if (simpleGold.test(content)) {
    content = content.replace(simpleGold, (match, p1, p2) => {
      // Remove overlapping classes
      let base = (p1 + p2).replace(/(transition-all|duration-300|shadow-md|font-black|text-xs|uppercase|tracking-\[[^\]]+\]|text-black|cursor-pointer)/g, '').replace(/\s+/g, ' ').trim();
      return `className="${base} ${richGoldClass}"`;
    });
    changed = true;
  }
  
  // Also fix register page CTA and login page CTA
  const authCTA = /className="([^"]*)bg-gradient-to-r from-\[#D4AF37\] to-\[#B89018\] hover:from-\[#F3E5AB\] hover:to-\[#D4AF37\] text-black text-xs uppercase tracking-\[0.2em\] font-black shadow-lg shadow-\[#D4AF37\]\/20 transition-all cursor-pointer disabled:opacity-50([^"]*)"/g;
  if (authCTA.test(content)) {
    content = content.replace(authCTA, `className="w-full py-3.5 rounded-xl ${richGoldClass} disabled:opacity-50 disabled:cursor-not-allowed"`);
    changed = true;
  }

  // Update Navbar and Footer specific buttons if they had the basic gold
  const navCTA = /className="px-4 py-1.5 rounded-full text-\[11px\] uppercase tracking-\[0.2em\] transition-all duration-300 font-medium bg-gradient-to-r from-\[#D4AF37\] to-\[#B89018\] text-black font-black hover:from-\[#F3E5AB\] hover:to-\[#D4AF37\] shadow-lg shadow-\[#D4AF37\]\/20"/g;
  if (navCTA.test(content)) {
    content = content.replace(navCTA, `className="px-6 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-[#D4AF37]/20 hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] active:scale-[0.98] transition-all duration-300"`);
    changed = true;
  }
  const navCTA2 = /className="w-full bg-gradient-to-r from-\[#D4AF37\] to-\[#B89018\] text-black text-center px-6 py-3.5 rounded-full text-xs tracking-\[0.2em\] font-black uppercase shadow-lg shadow-\[#D4AF37\]\/20 hover:from-\[#F3E5AB\] hover:to-\[#D4AF37\]"/g;
  if (navCTA2.test(content)) {
    content = content.replace(navCTA2, `className="w-full text-center px-6 py-3.5 rounded-full ${richGoldClass}"`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated buttons in ${file}`);
  }
});
