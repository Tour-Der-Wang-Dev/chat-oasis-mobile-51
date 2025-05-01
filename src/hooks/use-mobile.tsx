
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);
  const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>(
    typeof window !== 'undefined' 
      ? window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      : 'portrait'
  );

  // Memoized mobile detection for better performance
  const checkIfMobile = React.useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    // Use feature detection first (most reliable)
    const hasTouchScreen = (
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore - MS Surface detection
      (navigator.msMaxTouchPoints > 0)
    );
    
    // Then screen size as fallback
    const isSmallScreen = window.innerWidth < MOBILE_BREAKPOINT;
    
    // Then UA as last resort
    const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    // Combine all signals
    return hasTouchScreen || isSmallScreen || mobileUA;
  }, []);

  // Check orientation
  const checkOrientation = React.useCallback(() => {
    if (typeof window === 'undefined') return 'portrait';
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
  }, []);

  // Setup effect with optimized event listeners
  React.useEffect(() => {
    // Initial check
    setIsMobile(checkIfMobile());
    setOrientation(checkOrientation() as 'portrait' | 'landscape');

    // Optimize resize handler with debounce
    let resizeTimer: number | null = null;
    
    const handleResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      
      resizeTimer = window.setTimeout(() => {
        setIsMobile(checkIfMobile());
        setOrientation(checkOrientation() as 'portrait' | 'landscape');
      }, 100); // 100ms debounce
    };

    // Add optimized event listeners
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (resizeTimer) window.clearTimeout(resizeTimer);
    };
  }, [checkIfMobile, checkOrientation]);

  return { isMobile, orientation };
}
