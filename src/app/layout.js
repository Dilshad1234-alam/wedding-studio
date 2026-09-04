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
      <body className="bg-[#FAF8F5] text-[#1E221D] m-0 p-0 antialiased min-h-screen flex flex-col font-sans selection:bg-[#626C59] selection:text-[#FAF8F5]">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}