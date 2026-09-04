'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Define routes where Navbar and Footer must be hidden
  const hideHeaderFooter = pathname === '/login' || pathname === '/register' || pathname.startsWith('/admin');

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <main className={!hideHeaderFooter ? 'flex-grow pt-32' : 'flex-grow'}>
        {children}
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
