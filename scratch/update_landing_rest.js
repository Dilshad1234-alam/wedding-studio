const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/landing/page.js');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Philosophy
content = content.replace(
  `src="https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg"`,
  `src={safeConfig.philosophy?.image || "https://ik.imagekit.io/Dilshad/Cafe/Yatrikit/wedding-studio/wedding-editorial-shoot-weddingpur-scaled-e1773261531589.jpg"}`
);

content = content.replace(
  `OUR EDITORIAL PHILOSOPHY`,
  `{safeConfig.philosophy?.badge || "OUR EDITORIAL PHILOSOPHY"}`
);

content = content.replace(
  `              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                Unposed. Pure. <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B89018]">
                  Poetic.
                </span>
              </h2>`,
  `              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                {safeConfig.philosophy?.title || (
                  <>
                    Unposed. Pure. <br />
                    <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B89018]">
                      Poetic.
                    </span>
                  </>
                )}
              </h2>`
);

content = content.replace(
  `                We believe the most breathtaking images are the ones you didn't know were being taken. Our documentary approach focuses on the raw, unscripted emotion of your day—capturing what poses simply cannot. We blend into your celebration to document your legacy as it organically unfolds.`,
  `                {safeConfig.philosophy?.desc || "We believe the most breathtaking images are the ones you didn't know were being taken. Our documentary approach focuses on the raw, unscripted emotion of your day—capturing what poses simply cannot. We blend into your celebration to document your legacy as it organically unfolds."}`
);

const statsOld = `              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#2B2519] max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-[#D4AF37] block">
                    150+
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8A7D5C] block mt-1">
                    WEDDINGS DOCUMENTED
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-[#D4AF37] block">
                    10+
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8A7D5C] block mt-1">
                    AWARDS WON
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-[#D4AF37] block">
                    100%
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8A7D5C] block mt-1">
                    RAW EMOTION
                  </span>
                </div>
              </div>`;

const statsNew = `              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#2B2519] max-w-lg mx-auto lg:mx-0">
                {(safeConfig.philosophy?.stats || [
                  { value: "150+", label: "WEDDINGS DOCUMENTED" },
                  { value: "10+", label: "AWARDS WON" },
                  { value: "100%", label: "RAW EMOTION" }
                ]).map((stat, i) => (
                  <div key={i}>
                    <span className="text-2xl sm:text-3xl font-black text-[#D4AF37] block">
                      {stat.value}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#8A7D5C] block mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>`;

content = content.replace(statsOld, statsNew);


// 2. Services
const servicesOld = `          {/* 4 Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 w-full">
            
            {/* CARD 1: Destination Wedding Photography */}
            <div className="bg-[#121518] rounded-3xl p-6 border border-[#2B2519] shadow-sm flex flex-col justify-between text-center group hover:shadow-md hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <h3 className="font-serif text-xl text-white min-h-[52px] flex items-center justify-center mb-5 font-normal leading-snug">
                  Destination Wedding <br />Photography
                </h3>

                {/* Mini Photo Collage */}
                <div className="grid grid-cols-4 gap-1.5 mb-6 rounded-2xl overflow-hidden p-1.5 bg-[#0B0D0E] border border-[#2B2519]">
                  {[
                    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=200&q=80"
                  ].map((img, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-md bg-[#121518]">
                      <img src={img} alt="Destination shoot" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#C5B388] font-light leading-relaxed mb-6">
                  If you want your wedding to be a thing outside the world, then a destination wedding is the right choice for you.
                </p>
              </div>

              <Link className="inline-block border border-[#2B2519] text-[#C5B388] hover:text-white hover:border-[#D4AF37] hover:bg-[#121518] py-2.5 px-6 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition" href="/services">
                Learn More
              </Link>
            </div>

            {/* CARD 2: Candid Style Wedding Photography */}
            <div className="bg-[#121518] rounded-3xl p-6 border border-[#2B2519] shadow-sm flex flex-col justify-between text-center group hover:shadow-md hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <h3 className="font-serif text-xl text-white min-h-[52px] flex items-center justify-center mb-5 font-normal leading-snug">
                  Candid Style Wedding <br />Photography
                </h3>

                {/* Mini Photo Collage */}
                <div className="grid grid-cols-4 gap-1.5 mb-6 rounded-2xl overflow-hidden p-1.5 bg-[#0B0D0E] border border-[#2B2519]">
                  {[
                    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=200&q=80"
                  ].map((img, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-md bg-[#121518]">
                      <img src={img} alt="Candid shoot" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#C5B388] font-light leading-relaxed mb-6">
                  Candid photography is nothing but capturing real moments, feelings and expressions rather than posed ones.
                </p>
              </div>

              <Link className="inline-block border border-[#2B2519] text-[#C5B388] hover:text-white hover:border-[#D4AF37] hover:bg-[#121518] py-2.5 px-6 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition" href="/services">
                Learn More
              </Link>
            </div>

            {/* CARD 3: Wedding Cinematography & Films */}
            <div className="bg-[#121518] rounded-3xl p-6 border border-[#2B2519] shadow-sm flex flex-col justify-between text-center group hover:shadow-md hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <h3 className="font-serif text-xl text-white min-h-[52px] flex items-center justify-center mb-5 font-normal leading-snug">
                  Wedding Cinematography & <br />Films
                </h3>

                {/* Mini Photo Collage */}
                <div className="grid grid-cols-4 gap-1.5 mb-6 rounded-2xl overflow-hidden p-1.5 bg-[#0B0D0E] border border-[#2B2519]">
                  {[
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=200&q=80"
                  ].map((img, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-md bg-[#121518]">
                      <img src={img} alt="Cinema visual" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#C5B388] font-light leading-relaxed mb-6">
                  A wedding is like a movie of so many beautiful things coming together into one big happy story that is timeless.
                </p>
              </div>

              <Link className="inline-block border border-[#2B2519] text-[#C5B388] hover:text-white hover:border-[#D4AF37] hover:bg-[#121518] py-2.5 px-6 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition" href="/services">
                Learn More
              </Link>
            </div>

            {/* CARD 4: Prewedding Photography & Videos */}
            <div className="bg-[#121518] rounded-3xl p-6 border border-[#2B2519] shadow-sm flex flex-col justify-between text-center group hover:shadow-md hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <h3 className="font-serif text-xl text-white min-h-[52px] flex items-center justify-center mb-5 font-normal leading-snug">
                  Prewedding Photography & <br />Videos
                </h3>

                {/* Mini Photo Collage */}
                <div className="grid grid-cols-4 gap-1.5 mb-6 rounded-2xl overflow-hidden p-1.5 bg-[#0B0D0E] border border-[#2B2519]">
                  {[
                    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=200&q=80"
                  ].map((img, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-md bg-[#121518]">
                      <img src={img} alt="Prewedding visual" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#C5B388] font-light leading-relaxed mb-6">
                  Your unmatched love story with you and your beloved in the frame captured months before your big celebration.
                </p>
              </div>

              <Link className="inline-block border border-[#2B2519] text-[#C5B388] hover:text-white hover:border-[#D4AF37] hover:bg-[#121518] py-2.5 px-6 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition" href="/services">
                Learn More
              </Link>
            </div>

          </div>`;

const defaultServicesPillars = `[
              {
                title: "Destination Wedding Photography",
                desc: "If you want your wedding to be a thing outside the world, then a destination wedding is the right choice for you.",
                images: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80,https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80,https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80,https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=200&q=80,https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=200&q=80,https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=200&q=80,https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=200&q=80,https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=200&q=80"
              }
            ]`;

const servicesNew = `          {/* Services Grid Dynamic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 w-full">
            {(safeConfig.servicesPillars && safeConfig.servicesPillars.length > 0 ? safeConfig.servicesPillars : ${defaultServicesPillars}).map((pillar, i) => (
              <div key={i} className="bg-[#121518] rounded-3xl p-6 border border-[#2B2519] shadow-sm flex flex-col justify-between text-center group hover:shadow-md hover:-translate-y-1.5 transition-all duration-300">
                <div>
                  <h3 className="font-serif text-xl text-white min-h-[52px] flex items-center justify-center mb-5 font-normal leading-snug">
                    {pillar.title}
                  </h3>
                  <div className="grid grid-cols-4 gap-1.5 mb-6 rounded-2xl overflow-hidden p-1.5 bg-[#0B0D0E] border border-[#2B2519]">
                    {(pillar.images ? pillar.images.split(',') : []).map((img, j) => (
                      <div key={j} className="aspect-square overflow-hidden rounded-md bg-[#121518]">
                        <img src={img} alt="Service preview" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[#C5B388] font-light leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>
                <Link className="inline-block border border-[#2B2519] text-[#C5B388] hover:text-white hover:border-[#D4AF37] hover:bg-[#121518] py-2.5 px-6 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition" href="/services">
                  Learn More
                </Link>
              </div>
            ))}
          </div>`;

content = content.replace(servicesOld, servicesNew);


// 3. Cinematic Films
content = content.replace(
  `MOTION & SOUND STORIES`,
  `{safeConfig.cinematicFilms?.badge || "MOTION & SOUND STORIES"}`
);
content = content.replace(
  `Cinematic Wedding Films`,
  `{safeConfig.cinematicFilms?.title || "Cinematic Wedding Films"}`
);
content = content.replace(
  `Teasers & 4K highlight films streaming on YouTube`,
  `{safeConfig.cinematicFilms?.subtitle || "Teasers & 4K highlight films streaming on YouTube"}`
);

content = content.replace(
  `              href="https://www.youtube.com/@WeddingPur"
              target="_blank"`,
  `              href={safeConfig.cinematicFilms?.mainVideoUrl || "https://www.youtube.com/@WeddingPur"}
              target="_blank"`
);

content = content.replace(
  `src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"`,
  `src={safeConfig.cinematicFilms?.mainThumb || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"}`
);


// 4. Cinematic Films Grid
const filmsOld = `          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
            {[
              {
                couple: "Pankaj & Shritika",
                subtitle: "Treasured Symphony • Shangri-La Palace, Patna",
                img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
                link: "https://www.youtube.com/@WeddingPur"
              },
              {
                couple: "Abhishek & Ruchi",
                subtitle: "Joyful Reverie • Royal Destination Wedding",
                img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
                link: "https://www.youtube.com/@WeddingPur"
              },
              {
                couple: "Ritik & Kajal",
                subtitle: "Engagement Highlight • Heritage Grand, Patna",
                img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
                link: "https://www.youtube.com/@WeddingPur"
              },
              {
                couple: "Tanya & Rishabh",
                subtitle: "Latest Engagement Teaser • Hotel Maurya, Patna",
                img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
                link: "https://www.youtube.com/@WeddingPur"
              }
            ].map((film, idx) => (`;

const defaultFilms = `[
              {
                couple: "Pankaj & Shritika",
                subtitle: "Treasured Symphony • Shangri-La Palace, Patna",
                img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
                link: "https://www.youtube.com/@WeddingPur"
              }
            ]`;

const filmsNew = `          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
            {(safeConfig.cinematicFilms?.grid && safeConfig.cinematicFilms.grid.length > 0 ? safeConfig.cinematicFilms.grid : ${defaultFilms}).map((film, idx) => (`;

content = content.replace(filmsOld, filmsNew);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated the rest of landing/page.js');
