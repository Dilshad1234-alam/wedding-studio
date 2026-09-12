const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/landing/page.js');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add state for landingConfig and fetch it
const stateAdd = `  const { handleProtectedAction } = useProtectedAction();
  const [openFaq, setOpenFaq] = useState(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);`;

const newStateAdd = `  const { handleProtectedAction } = useProtectedAction();
  const [openFaq, setOpenFaq] = useState(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [landingConfig, setLandingConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('/api/landing')
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) setLandingConfig(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching landing config:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0D0E] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  const safeConfig = landingConfig || {};
`;

content = content.replace(stateAdd, newStateAdd);


// 2. Hero Section
content = content.replace(
  `          <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#C5B388] font-medium mb-3">
            WEDDINGPUR — BESPOKE WEDDING CINEMA & STILLS
          </span>`,
  `          <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#C5B388] font-medium mb-3">
            {safeConfig.badge || "WEDDINGPUR — BESPOKE WEDDING CINEMA & STILLS"}
          </span>`
);

content = content.replace(
  `          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#F5F5F5] tracking-tight leading-[1.12] drop-shadow-md">
            Best Wedding Photographers <br className="hidden sm:inline" />
            <span className="italic font-light text-[#D4AF37]">In Patna, Bihar</span>
          </h1>`,
  `          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#F5F5F5] tracking-tight leading-[1.12] drop-shadow-md">
            {safeConfig.titleLine1 || "Best Wedding Photographers"} <br className="hidden sm:inline" />
            <span className="italic font-light text-[#D4AF37]">{safeConfig.titleLine2 || "In Patna, Bihar"}</span>
          </h1>`
);

content = content.replace(
  `          <p className="text-[#F5F5F5]/90 text-sm sm:text-lg font-light tracking-wide max-w-2xl mx-auto mt-6 mb-4">
            We capture timeless weddings for modern couples who want their story told beautifully.
          </p>`,
  `          <p className="text-[#F5F5F5]/90 text-sm sm:text-lg font-light tracking-wide max-w-2xl mx-auto mt-6 mb-4">
            {safeConfig.subtitle || "We capture timeless weddings for modern couples who want their story told beautifully."}
          </p>`
);

content = content.replace(
  `style={{
            backgroundImage: \`url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85')\`
          }}`,
  `style={{
            backgroundImage: \`url('\${safeConfig.bgImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85'}')\`
          }}`
);


// 3. Featured Weddings
content = content.replace(
  `{[
              {
                names: "Abhishek & Ruchi",
                sub: "ANANYA & KABIR • JAIPUR",
                img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
                description: "Some weddings are beautiful. Some are unforgettable. Abhishek and Ruchi's wedding was one of a kind. A Marwadi wedding full of life, laughter, and love that every single frame told a story worth saving forever. Click on the button to feel every moment of this beautiful union."
              },
              {
                names: "Akshat & Shivani",
                sub: "SNEHA & RAHUL • VARANASI",
                img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
                description: "Some celebrations feel timeless from the very first moment. Akshat and Shivani's wedding at The Mavrick Resort was one such celebration. A beautiful blend of emotions, traditions and joyful moments where every frame reflected the elegance of their story."
              },
              {
                names: "Minimalist Meadow Vows",
                sub: "POOJA & NEIL • PATNA",
                img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
                description: "Some weddings are beautiful. Some are unforgettable. Abhishek and Ruchi's wedding was one of a kind. A Marwadi wedding full of life, laughter, and love that every single frame told a story worth saving forever. Click on the button to feel every moment of this beautiful union."
              }
            ].map`,
  `(safeConfig.featuredWeddings && safeConfig.featuredWeddings.length > 0 ? safeConfig.featuredWeddings : [
              {
                title: "Abhishek & Ruchi",
                location: "ANANYA & KABIR • JAIPUR",
                img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
                description: "Some weddings are beautiful. Some are unforgettable. Abhishek and Ruchi's wedding was one of a kind. A Marwadi wedding full of life, laughter, and love that every single frame told a story worth saving forever. Click on the button to feel every moment of this beautiful union."
              }
            ]).map`
);

content = content.replace(
  `alt={story.names}`,
  `alt={story.title || story.names}`
);

content = content.replace(
  `<h3 className="font-serif text-2xl text-white mb-1">{story.names}</h3>`,
  `<h3 className="font-serif text-2xl text-white mb-1">{story.title || story.names}</h3>`
);

content = content.replace(
  `<p className="text-[10px] tracking-[0.25em] uppercase text-[#C5B388] mb-2">{story.sub}</p>`,
  `<p className="text-[10px] tracking-[0.25em] uppercase text-[#C5B388] mb-2">{story.location || story.sub}</p>`
);

// 4. Write back
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated landing/page.js');
