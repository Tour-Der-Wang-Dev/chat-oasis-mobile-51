
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
    
    main.addEventListener('scroll', preventPropagation, { passive: true });
    
    // Add touch events for iOS
    if (isMobile) {
      main.addEventListener('touchstart', () => {}, { passive: true });
    }
    
    return () => {
      main.removeEventListener('scroll', preventPropagation);
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
