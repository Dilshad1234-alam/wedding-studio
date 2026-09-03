import Link from 'next/link';

const InstagramIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>
);

const PinterestIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 22a9.92 9.92 0 0 0 2.2-.24 2.89 2.89 0 0 1-.36-1.5c.14-1.6.84-3.3 1.5-4.5.6-1.1-1.4-3.2-.2-5.4 1.2-2.2 4-2.8 5.4-1.1 1.4 1.7.3 5.4-1.1 7-1.4 1.6-4.5.7-4.5-1.1" />
  </svg>
);

const FacebookIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const WhatsAppIcon = ({ size = 32 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function Footer() {
  return (
    <>
      <footer className="bg-[#0D0D0D] text-white pt-24 pb-12 border-t border-champagne-border/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          
          {/* Top Column / Informations */}
          <div className="mb-16">
            <h4 className="text-xl font-serif text-white mb-8 tracking-wide">Informations</h4>
            <ul className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-x-12 gap-y-6">
              <li>
                <Link href="#privacy" className="text-gray-400 hover:text-bronze-400 font-light tracking-wide transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#terms" className="text-gray-400 hover:text-bronze-400 font-light tracking-wide transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-bronze-400 font-light tracking-wide transition-colors">
                  LumenWeddings.com
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-bronze-400 font-light tracking-wide transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Icons Row */}
          <div className="flex justify-center space-x-5 mb-12">
            {[
              { icon: <InstagramIcon />, label: "Instagram" },
              { icon: <YoutubeIcon />, label: "YouTube" },
              { icon: <PinterestIcon />, label: "Pinterest" },
              { icon: <FacebookIcon />, label: "Facebook" }
            ].map((social, idx) => (
              <a 
                key={idx}
                href="#"
                aria-label={social.label}
                className="w-12 h-12 rounded-full border border-bronze-600 flex items-center justify-center text-bronze-500 hover:bg-bronze-600 hover:text-white transition-all duration-300 shadow-sm"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copyright Line */}
          <div className="text-gray-600 text-sm font-light tracking-wide">
            Copyright {new Date().getFullYear()}. All rights reserved.
          </div>

        </div>
      </footer>

      {/* Sticky Floating WhatsApp Button */}
      <a 
        href="https://wa.me/918235109707" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#1EBE5D] hover:scale-110 transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing ring effect */}
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-0 group-hover:animate-ping"></span>
        <WhatsAppIcon size={34} />
      </a>
    </>
  );
}