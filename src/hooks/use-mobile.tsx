import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>(
    typeof window !== 'undefined' 
      ? window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      : 'portrait'
  )

  React.useEffect(() => {
    // Check for mobile devices via user agent as a fallback
    // Memoized mobile detection for better performance
  const checkIfMobile = React.useCallback(() => {
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

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(checkIfMobile())
    }
    
    // Debounce orientation changes for better performance
    let orientationTimeout: number | null = null;
    const handleOrientationChange = () => {
      if (orientationTimeout) {
        window.clearTimeout(orientationTimeout);
      }
      
      orientationTimeout = window.setTimeout(() => {
        setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
      }, 100);
    }
    
    mql.addEventListener("change", onChange)
    window.addEventListener("resize", handleOrientationChange, { passive: true })
    window.addEventListener("orientationchange", handleOrientationChange, { passive: true })
    
    // Initial check
    setIsMobile(checkIfMobile())
    handleOrientationChange()
    
    return () => {
      if (orientationTimeout) {
        window.clearTimeout(orientationTimeout);
      }
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", handleOrientationChange)
      window.removeEventListener("orientationchange", handleOrientationChange)
    }
  }, [])

  return {
    isMobile: !!isMobile,
    orientation,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape'
  }
}
