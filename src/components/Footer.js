import Link from 'next/link';

const InstagramIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>
);

const PinterestIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 22a9.92 9.92 0 0 0 2.2-.24 2.89 2.89 0 0 1-.36-1.5c.14-1.6.84-3.3 1.5-4.5.6-1.1-1.4-3.2-.2-5.4 1.2-2.2 4-2.8 5.4-1.1 1.4 1.7.3 5.4-1.1 7-1.4 1.6-4.5.7-4.5-1.1" />
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#242A22] text-[#ECEAE4] py-16 px-6 sm:px-12 font-sans">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        
        {/* Left: Informations */}
        <div className="flex flex-col">
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#889082] font-semibold mb-6">
            INFORMATIONS
          </h4>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-16 text-xs text-[#C6C9C4] font-light">
            <div className="flex flex-col gap-4">
              <Link href="/privacy-policy" className="hover:text-[#FAF8F5] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#FAF8F5] transition-colors">Terms & Conditions</Link>
            </div>
            <div className="flex flex-col gap-4">
              <a href="https://weddingpurindia.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FAF8F5] transition-colors">
                weddingpurindia.com
              </a>
              <Link href="/contact" className="hover:text-[#FAF8F5] transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>

        {/* Right: Social & Copyright */}
        <div className="flex flex-col items-start md:items-end gap-6">
          <div className="flex space-x-3">
            {[
              { icon: <InstagramIcon />, label: "Instagram", href: "https://www.instagram.com/weddingpur/" },
              { icon: <YoutubeIcon />, label: "YouTube", href: "https://www.youtube.com/@weddingpur" },
              { icon: <PinterestIcon />, label: "Pinterest", href: "https://in.pinterest.com/weddingpur/" },
              { icon: <FacebookIcon />, label: "Facebook", href: "https://www.facebook.com/weddingpur/" }
            ].map((social, idx) => (
              <a 
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-[#4C5346] text-[#C6C9C4] flex items-center justify-center hover:border-[#626C59] hover:bg-[#626C59] hover:text-[#FAF8F5] transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p className="text-[10px] text-[#889082] tracking-[0.2em] uppercase">Copyright 2026. Weddingpur</p>
        </div>

      </div>
    </footer>
  );
}