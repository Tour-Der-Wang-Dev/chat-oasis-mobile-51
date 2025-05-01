
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import BottomNavigation from "./BottomNavigation";
import { cn } from "@/lib/utils";

interface MobileLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  hideNavigation?: boolean;
  fullHeight?: boolean;
  className?: string;
}

const MobileLayout = ({
  children,
  header,
  hideNavigation = false,
  fullHeight = true,
  className
}: MobileLayoutProps) => {
  const { isMobile } = useIsMobile();
  const mainRef = React.useRef<HTMLDivElement>(null);
  
  // Add momentum scrolling optimization
  React.useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    
    // Prevent scroll event propagation to parent
    const preventPropagation = (e: Event) => {
      e.stopPropagation();
    };
    
    // Use passive event listeners for better scrolling performance
    main.addEventListener('scroll', preventPropagation, { passive: true });
    
    // Prevent rubber-banding/overscroll on iOS
    const preventOverscroll = (e: TouchEvent) => {
      // Only prevent if we're at the top or bottom of content
      const scrollTop = main.scrollTop;
      const scrollHeight = main.scrollHeight;
      const clientHeight = main.clientHeight;
      
      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;
      
      if ((isAtTop && e.touches[0].screenY > e.touches[0].clientY) || 
          (isAtBottom && e.touches[0].screenY < e.touches[0].clientY)) {
        e.preventDefault();
      }
    };
    
    // Optimize image loading for better scroll performance
    const lazyLoadImages = () => {
      const images = main.querySelectorAll('img[loading="lazy"]');
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              imageObserver.unobserve(img);
            }
          });
        });
        
        images.forEach(img => imageObserver.observe(img));
      }
    };
    
    if (isMobile) {
      // Apply optimizations for mobile
      document.addEventListener('touchmove', preventOverscroll, { passive: false });
      
      // Apply scroll momentum optimizations
      if ('scrollBehavior' in document.documentElement.style) {
        main.style.scrollBehavior = 'smooth';
      }
      
      // Optimize browser rendering with GPU acceleration
      main.style.backfaceVisibility = 'hidden';
      main.style.webkitBackfaceVisibility = 'hidden';
      main.style.perspective = '1000px';
      main.style.transform = 'translate3d(0,0,0)';
      
      // Enable fast click by removing the 300ms delay on touch devices
      main.style.touchAction = 'manipulation';
      
      // Load images more efficiently
      lazyLoadImages();
      main.addEventListener('scroll', lazyLoadImages, { passive: true });
    }
    
    // Optimize repaints during scrolling with a hint
    main.style.willChange = 'scroll-position';
    
    // Apply fastScroll technique for smoother scrolling
    let lastKnownScrollPosition = 0;
    let ticking = false;
    
    const onScroll = () => {
      lastKnownScrollPosition = main.scrollTop;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Perform any scroll-based animations here
          ticking = false;
        });
        ticking = true;
      }
    };
    
    main.addEventListener('scroll', onScroll, { passive: true });
    
    return () => {
      main.removeEventListener('scroll', preventPropagation);
      main.removeEventListener('scroll', onScroll);
      if (isMobile) {
        document.removeEventListener('touchmove', preventOverscroll);
        main.removeEventListener('scroll', lazyLoadImages);
      }
      main.style.willChange = 'auto';
    };
  }, [isMobile]);
  
  return (
    <div className={cn(
      "flex flex-col",
      fullHeight && "min-h-[100dvh] min-h-[calc(var(--vh,1vh)*100)] mobile-full-height", // Use dynamic viewport height
      "w-full max-w-md mx-auto", // Constrain width on larger screens
      "overscroll-none", // Prevent bouncing/pull-to-refresh on iOS
      "will-change-transform", // GPU acceleration hint
      className
    )}>
      {header && (
        <div className="mobile-header safe-top touch-action-manipulation">
          {header}
        </div>
      )}
      
      <main 
        ref={mainRef}
        className={cn(
          "flex-1 overflow-y-auto hide-scrollbar momentum-scroll",
          "touch-action-manipulation tap-highlight-none",
          "will-change-scroll", // Hint for scroll optimization
          !hideNavigation && "pb-20 safe-bottom"
        )}
      >
        {children}
      </main>
      
      {!hideNavigation && <BottomNavigation />}
    </div>
  );
};

export default MobileLayout;
