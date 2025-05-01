
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
  
  return (
    <div className={cn(
      "flex flex-col",
      fullHeight && "min-h-[100dvh] mobile-full-height", // Use dynamic viewport height for better mobile experience
      "w-full max-w-md mx-auto", // Constrain width on larger screens
      "overscroll-none", // Prevent bouncing/pull-to-refresh on iOS
      className
    )}>
      {header && (
        <div className="mobile-header safe-top touch-action-manipulation">
          {header}
        </div>
      )}
      
      <main className={cn(
        "flex-1 overflow-y-auto hide-scrollbar",
        "touch-action-manipulation tap-highlight-none",
        !hideNavigation && "pb-20 safe-bottom"
      )}>
        {children}
      </main>
      
      {!hideNavigation && <BottomNavigation />}
    </div>
  );
};

export default MobileLayout;
