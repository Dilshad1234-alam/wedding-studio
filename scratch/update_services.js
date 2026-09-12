const fs = require('fs');
const path = require('path');

// 1. Update landing/page.js
const landingFile = path.join(__dirname, '../src/app/landing/page.js');
let landingContent = fs.readFileSync(landingFile, 'utf8');

const servicesOld = `          {/* Services Grid Dynamic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 w-full">
            {(safeConfig.servicesPillars && safeConfig.servicesPillars.length > 0 ? safeConfig.servicesPillars : [
              {
                title: "Destination Wedding Photography",
                desc: "If you want your wedding to be a thing outside the world, then a destination wedding is the right choice for you.",
                images: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80,https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80,https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80,https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=200&q=80,https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=200&q=80,https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=200&q=80,https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=200&q=80,https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=200&q=80"
              }
            ]).map((pillar, i) => (
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

const defaultServices = `[
              {
                title: "Destination Wedding Photography",
                desc: "If you want your wedding to be a thing outside the world, then a destination wedding is the right choice for you.",
                image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
                link: "/services"
              }
            ]`;

const servicesNew = `          {/* Services Grid Dynamic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {(safeConfig.servicesPillars && safeConfig.servicesPillars.length > 0 ? safeConfig.servicesPillars : ${defaultServices}).map((pillar, i) => (
              <div key={i} className="bg-[#121518] rounded-3xl p-6 lg:p-8 border border-[#2B2519] shadow-sm flex flex-col justify-between text-center group hover:shadow-xl hover:border-[#D4AF37]/50 hover:-translate-y-1.5 transition-all duration-500">
                <div>
                  <div className="w-full aspect-[4/3] mb-8 rounded-2xl overflow-hidden bg-[#0B0D0E] border border-[#2B2519]">
                    <img 
                      src={pillar.image} 
                      alt={pillar.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                    />
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-4 font-normal leading-snug group-hover:text-[#D4AF37] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#C5B388] font-light leading-relaxed mb-8 max-w-sm mx-auto">
                    {pillar.desc}
                  </p>
                </div>
                <div>
                  <Link 
                    className="inline-block border border-[#2B2519] text-[#C5B388] hover:text-black hover:border-[#D4AF37] hover:bg-gradient-to-r hover:from-[#F3E5AB] hover:to-[#D4AF37] py-3 px-8 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm" 
                    href={pillar.link || "/services"}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>`;

if (landingContent.includes(servicesOld)) {
  landingContent = landingContent.replace(servicesOld, servicesNew);
} else {
  console.log("Could not find servicesOld in landing page.");
}
fs.writeFileSync(landingFile, landingContent, 'utf8');

// 2. Update admin/website-management/page.js initial state
const adminFile = path.join(__dirname, '../src/app/admin/website-management/page.js');
let adminContent = fs.readFileSync(adminFile, 'utf8');

const adminServicesOld = `    servicesPillars: [
      {
        title: "Destination Wedding Photography",
        desc: "If you want your wedding to be a thing outside the world...",
        images: "url1,url2"
      }
    ],`;

const adminServicesNew = `    servicesPillars: [
      {
        title: "Destination Wedding Photography",
        desc: "If you want your wedding to be a thing outside the world, then a destination wedding is the right choice for you.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        link: "/services"
      },
      {
        title: "Candid Style Wedding Photography",
        desc: "Candid photography is nothing but capturing real moments, feelings and expressions rather than posed ones.",
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
        link: "/services"
      },
      {
        title: "Wedding Cinematography & Films",
        desc: "A wedding is like a movie of so many beautiful things coming together into one big happy story that is timeless.",
        image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
        link: "/services"
      },
      {
        title: "Prewedding Photography & Videos",
        desc: "Your unmatched love story with you and your beloved in the frame captured months before your big celebration.",
        image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
        link: "/services"
      }
    ],`;

if (adminContent.includes(adminServicesOld)) {
  adminContent = adminContent.replace(adminServicesOld, adminServicesNew);
} else {
  console.log("Could not find adminServicesOld in admin page.");
}
fs.writeFileSync(adminFile, adminContent, 'utf8');

console.log("Services Pillar redesign complete.");
