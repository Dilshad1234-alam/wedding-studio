const fs = require('fs');
const path = require('path');

const adminFile = path.join(__dirname, '../src/app/admin/website-management/page.js');
let adminContent = fs.readFileSync(adminFile, 'utf8');

// 1. Update initial state in admin page
const oldInstagramState = `    instagram: {
      handle: "@weddingpur",
      images: "url1,url2"
    }`;
const newInstagramState = `    instagram: {
      handle: "@lensloom_official",
      profileUrl: "https://www.instagram.com/lensloom_official/",
      badges: "Couples Choice Award 2024 Winner, Wedding Awards 2025 Winner, Wedding Films Expert, Available Worldwide",
      gridImages: [
        "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg",
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80"
      ]
    }`;
if (adminContent.includes(oldInstagramState)) {
  adminContent = adminContent.replace(oldInstagramState, newInstagramState);
} else {
  console.log("Could not find oldInstagramState in admin file");
}

// 2. Add textarea to admin page
const textareaBefore = `              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Cinematic Films Config</label>
              <textarea
                rows={6}
                value={JSON.stringify(landingConfig.cinematicFilms, null, 2)}
                onChange={e => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setLandingConfig({ ...landingConfig, cinematicFilms: parsed });
                  } catch (err) { /* ignore parse error while typing */ }
                }}
                className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl p-4 text-[#D1C7A5] font-mono text-xs focus:outline-none focus:border-[#D4AF37] mb-4"
              />
            </div>`;

const textareaAfter = `              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Cinematic Films Config</label>
              <textarea
                rows={6}
                value={JSON.stringify(landingConfig.cinematicFilms, null, 2)}
                onChange={e => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setLandingConfig({ ...landingConfig, cinematicFilms: parsed });
                  } catch (err) { /* ignore parse error while typing */ }
                }}
                className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl p-4 text-[#D1C7A5] font-mono text-xs focus:outline-none focus:border-[#D4AF37] mb-4"
              />

              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Instagram Section Config</label>
              <textarea
                rows={6}
                value={JSON.stringify(landingConfig.instagram, null, 2)}
                onChange={e => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setLandingConfig({ ...landingConfig, instagram: parsed });
                  } catch (err) { /* ignore parse error while typing */ }
                }}
                className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl p-4 text-[#D1C7A5] font-mono text-xs focus:outline-none focus:border-[#D4AF37] mb-4"
              />
            </div>`;

if (adminContent.includes(textareaBefore)) {
  adminContent = adminContent.replace(textareaBefore, textareaAfter);
} else {
  console.log("Could not find textareaBefore in admin file");
}
fs.writeFileSync(adminFile, adminContent, 'utf8');

// 3. Update landing page
const landingFile = path.join(__dirname, '../src/app/landing/page.js');
let landingContent = fs.readFileSync(landingFile, 'utf8');

const oldInstaHeader = `          {/* Instagram Profile Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <a
              href="https://www.instagram.com/weddingpur/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 mb-3 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-[#121518] p-0.5 overflow-hidden">
                  <div className="w-full h-full rounded-full bg-[#0B0D0E] flex items-center justify-center font-serif font-bold text-xl text-white">
                    W
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-lg text-white tracking-wide flex items-center gap-1.5 group-hover:text-[#D4AF37] transition-colors">
                weddingpur
                <span className="text-blue-500 text-xs">✓</span>
              </h3>
            </a>

            {/* Bio Badges from reference image */}
            <p className="text-xs text-[#C5B388] max-w-2xl mx-auto mt-2 leading-relaxed font-light">
              🏆 Couples Choice Award 2024 Winner • 🏆 Wedding Awards 2025 Winner • 💍 Wedding Films Expert • 🌍 Available Worldwide
            </p>

            <a
              href="https://www.instagram.com/weddingpur/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 border border-[#5B6454]/70 text-[#D4AF37] hover:bg-[#5B6454] hover:text-[#F5F5F5] px-7 py-2 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition duration-300 cursor-pointer"
            >
              <span>Follow on Instagram</span>
              <span>↗</span>
            </a>
          </div>`;

const newInstaHeader = `          {/* Instagram Profile Header Dynamic */}
          <div className="flex flex-col items-center text-center mb-12">
            <a
              href={safeConfig.instagram?.profileUrl || "https://www.instagram.com/lensloom_official/"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 mb-3 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-[#121518] p-0.5 overflow-hidden">
                  <div className="w-full h-full rounded-full bg-[#0B0D0E] flex items-center justify-center font-serif font-bold text-xl text-white">
                    {(safeConfig.instagram?.handle || "@lensloom_official").replace('@', '').charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-lg text-white tracking-wide flex items-center gap-1.5 group-hover:text-[#D4AF37] transition-colors">
                {(safeConfig.instagram?.handle || "@lensloom_official").replace('@', '')}
                <span className="text-blue-500 text-xs">✓</span>
              </h3>
            </a>

            <p className="text-xs text-[#C5B388] max-w-2xl mx-auto mt-2 leading-relaxed font-light">
              {safeConfig.instagram?.badges 
                ? (typeof safeConfig.instagram.badges === 'string' ? safeConfig.instagram.badges.split(',').join(' • ') : safeConfig.instagram.badges.join(' • '))
                : "🏆 Couples Choice Award 2024 Winner • 🏆 Wedding Awards 2025 Winner • 💍 Wedding Films Expert • 🌍 Available Worldwide"}
            </p>

            <a
              href={safeConfig.instagram?.profileUrl || "https://www.instagram.com/lensloom_official/"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 border border-[#5B6454]/70 text-[#D4AF37] hover:bg-[#5B6454] hover:text-[#F5F5F5] px-7 py-2 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition duration-300 cursor-pointer"
            >
              <span>Follow on Instagram</span>
              <span>↗</span>
            </a>
          </div>`;

if (landingContent.includes(oldInstaHeader)) {
  landingContent = landingContent.replace(oldInstaHeader, newInstaHeader);
} else {
  console.log("Could not find oldInstaHeader in landing file");
}

const oldInstaGrid = `          {/* 3x2 Instagram Post Grid (Direct External Links) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full mx-auto">
            {[
              {
                img: "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg",
                title: "Silhouette Bride Portrait"
              },
              {
                img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
                title: "Nocturnal Courtyard Vows"
              },
              {
                img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
                title: "Pink Sherwani Royal Spread"
              },
              {
                img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
                title: "Intimate Haldi & Pheras"
              },
              {
                img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
                title: "Heritage Archways Sequence"
              },
              {
                img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
                title: "Royal Red Saree Heirloom"
              }
            ].map((post, i) => (
              <a
                key={i}
                href="https://www.instagram.com/lensloom_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square bg-[#121518] rounded-2xl overflow-hidden shadow-sm block cursor-pointer"
              >
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />`;

const newInstaGrid = `          {/* 3x2 Instagram Post Grid (Direct External Links) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full mx-auto">
            {(safeConfig.instagram?.gridImages || [
              "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg",
              "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80"
            ]).map((imgSrc, i) => (
              <a
                key={i}
                href={safeConfig.instagram?.profileUrl || "https://www.instagram.com/lensloom_official/"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square bg-[#121518] rounded-2xl overflow-hidden shadow-sm block cursor-pointer"
              >
                <img
                  src={imgSrc}
                  alt="Instagram Post"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />`;

if (landingContent.includes(oldInstaGrid)) {
  landingContent = landingContent.replace(oldInstaGrid, newInstaGrid);
} else {
  console.log("Could not find oldInstaGrid in landing file");
}

fs.writeFileSync(landingFile, landingContent, 'utf8');

console.log("Instagram section update complete.");
