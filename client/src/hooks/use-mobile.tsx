import { useState, useEffect } from 'react';

export function useIsMobile() {
  // Check if window is available (browser environment)
  const isBrowser = typeof window !== 'undefined';
  
  // Default to false for server-side rendering
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!isBrowser) return;

    // Initialize on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, [isBrowser]);

  return isMobile;
}