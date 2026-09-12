const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/admin/website-management/page.js');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Expand landingConfig state
const oldState = `  const [landingConfig, setLandingConfig] = useState({
    badge: "LENSLOOM — BESPOKE WEDDING CINEMA & STILLS",
    titleLine1: "Best Wedding Photographers",
    titleLine2: "In Patna, Bihar",
    subtitle: "We capture timeless weddings for modern couples who want their story told beautifully.",
    bgImage: "https://ik.imagekit.io/weddingpur/hero-cover.jpg",
    ctaPrimaryText: "CONTACT US",
    ctaSecondaryText: "EXPLORE PORTFOLIO",
    serviceCities: "PATNA • VARANASI • JAIPUR • GOA"
  });`;

const newState = `  const [landingConfig, setLandingConfig] = useState({
    badge: "LENSLOOM — BESPOKE WEDDING CINEMA & STILLS",
    titleLine1: "Best Wedding Photographers",
    titleLine2: "In Patna, Bihar",
    subtitle: "We capture timeless weddings for modern couples who want their story told beautifully.",
    bgImage: "https://ik.imagekit.io/weddingpur/hero-cover.jpg",
    ctaPrimaryText: "CONTACT US",
    ctaSecondaryText: "EXPLORE PORTFOLIO",
    serviceCities: "PATNA • VARANASI • JAIPUR • GOA",
    philosophy: {
      badge: "OUR EDITORIAL PHILOSOPHY",
      title: "Unposed. Pure. Poetic.",
      desc: "We believe the most breathtaking images are the ones you didn't know were being taken.",
      image: "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg",
      stats: [
        { value: "150+", label: "WEDDINGS DOCUMENTED" },
        { value: "10+", label: "AWARDS WON" },
        { value: "100%", label: "RAW EMOTION" }
      ]
    },
    featuredWeddings: [
      {
        title: "Abhishek & Ruchi",
        location: "ANANYA & KABIR • JAIPUR",
        img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        description: "Some weddings are beautiful...",
        link: ""
      }
    ],
    servicesPillars: [
      {
        title: "Destination Wedding Photography",
        desc: "If you want your wedding to be a thing outside the world...",
        images: "url1,url2"
      }
    ],
    cinematicFilms: {
      badge: "MOTION & SOUND STORIES",
      title: "Cinematic Wedding Films",
      subtitle: "Teasers & 4K highlight films streaming on YouTube",
      mainVideoUrl: "https://www.youtube.com/@WeddingPur",
      mainThumb: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
      grid: [
        { couple: "Pankaj & Shritika", subtitle: "Treasured Symphony", img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80", link: "https://www.youtube.com/@WeddingPur" }
      ]
    },
    instagram: {
      handle: "@weddingpur",
      images: "url1,url2"
    }
  });`;

content = content.replace(oldState, newState);

// 2. Add UI for the new sections in the landing tab
const oldJSXEnd = `              <div>
                <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Footer Cities Tag</label>
                <input
                  type="text"
                  value={landingConfig.serviceCities}
                  onChange={e => setLandingConfig({ ...landingConfig, serviceCities: e.target.value })}
                  className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-[#8A7D5C] font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>
        )}`;

const newJSXEnd = `              <div>
                <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Footer Cities Tag</label>
                <input
                  type="text"
                  value={landingConfig.serviceCities}
                  onChange={e => setLandingConfig({ ...landingConfig, serviceCities: e.target.value })}
                  className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-[#8A7D5C] font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* NEW DYNAMIC SECTIONS UI */}
            <div className="mt-8 pt-8 border-t border-[#2B2519]">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-sans mb-4">Other Landing Page Sections (JSON View)</h2>
              <p className="text-xs font-sans text-[#8A7D5C] font-normal mb-4">Edit the raw JSON for complex sections like Philosophy, Featured Weddings, Services, Films, and Instagram. Advanced UI editor coming soon.</p>
              
              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Philosophy Section Config</label>
              <textarea
                rows={6}
                value={JSON.stringify(landingConfig.philosophy, null, 2)}
                onChange={e => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setLandingConfig({ ...landingConfig, philosophy: parsed });
                  } catch (err) { /* ignore parse error while typing */ }
                }}
                className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl p-4 text-[#D1C7A5] font-mono text-xs focus:outline-none focus:border-[#D4AF37] mb-4"
              />

              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Featured Weddings Config</label>
              <textarea
                rows={6}
                value={JSON.stringify(landingConfig.featuredWeddings, null, 2)}
                onChange={e => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setLandingConfig({ ...landingConfig, featuredWeddings: parsed });
                  } catch (err) { /* ignore parse error while typing */ }
                }}
                className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl p-4 text-[#D1C7A5] font-mono text-xs focus:outline-none focus:border-[#D4AF37] mb-4"
              />

              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Services Pillars Config</label>
              <textarea
                rows={6}
                value={JSON.stringify(landingConfig.servicesPillars, null, 2)}
                onChange={e => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setLandingConfig({ ...landingConfig, servicesPillars: parsed });
                  } catch (err) { /* ignore parse error while typing */ }
                }}
                className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl p-4 text-[#D1C7A5] font-mono text-xs focus:outline-none focus:border-[#D4AF37] mb-4"
              />

              <label className="block text-[#8A7D5C] uppercase font-semibold tracking-wider text-[10px] mb-1">Cinematic Films Config</label>
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
            </div>

          </div>
        )}`;

content = content.replace(oldJSXEnd, newJSXEnd);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated page.js');
