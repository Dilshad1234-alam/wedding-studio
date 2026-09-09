import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useProtectedAction() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check custom session authentication used by the navbar
    const userStr = sessionStorage.getItem('weddingpur_user');
    setIsAuthenticated(!!userStr);
  }, []);

  const handleProtectedAction = (callback) => {
    return (e) => {
      if (!isAuthenticated) {
        if (e && e.preventDefault) e.preventDefault();
        const callbackUrl = encodeURIComponent(pathname || '/');
        router.push(`/register?callbackUrl=${callbackUrl}`);
        return;
      }
      
      if (typeof callback === 'function') {
        if (e && e.preventDefault) e.preventDefault();
        callback(e);
      }
    };
  };

  return { handleProtectedAction, isAuthenticated };
}
