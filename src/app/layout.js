import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Lumen Weddings | Luxury Wedding Photographer in Patna',
  description: 'Luxury candid wedding photography, pre-weddings, and cinematic films.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-champagne-bg text-espresso min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-32">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}