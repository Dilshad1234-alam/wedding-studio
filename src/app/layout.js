import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata = {
  title: 'Lumen Weddings | Luxury Wedding Photographer in Patna',
  description: 'Luxury candid wedding photography, pre-weddings, and cinematic films.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="bg-[#0B0D0E] text-[#F5F5F5] m-0 p-0 antialiased min-h-screen flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}