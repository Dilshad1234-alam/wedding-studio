'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Define routes where Navbar and Footer must be hidden
  const hideHeaderFooter = pathname === '/admin/auth-login' || pathname.startsWith('/admin');
  
  // Define routes where we want the content to flow under the transparent navbar (no top padding)
  const isHomePage = pathname === '/';

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <main className={!hideHeaderFooter ? (isHomePage ? 'flex-grow' : 'flex-grow pt-32') : 'flex-grow'}>
        {children}
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
