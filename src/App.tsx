import * as React from "react";
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useIsMobile } from "./hooks/use-mobile";

// Lazy load pages for better performance
const Index = lazy(() => import("@/pages/Index"));
const ChatPage = lazy(() => import("@/pages/ChatPage"));
const ChatsPage = lazy(() => import("@/pages/ChatsPage"));
const ExplorePage = lazy(() => import("@/pages/ExplorePage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const TourDerWang = lazy(() => import("@/pages/TourDerWang"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

const AppContent = () => {
  const { isMobile, orientation } = useIsMobile();

  React.useEffect(() => {
    // Add classes to the html element to help with CSS targeting
    if (isMobile !== undefined) {
      document.documentElement.classList.toggle('is-mobile', isMobile);
      document.documentElement.classList.toggle('is-portrait', orientation === 'portrait');
      document.documentElement.classList.toggle('is-landscape', orientation === 'landscape');

      // Add meta viewport settings for better mobile experience
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
      }

      // Add touch class for mobile-specific styles and improve touch performance
      document.documentElement.classList.toggle('touch-device', isMobile);
      
      // Disable double-tap to zoom on mobile
      if (isMobile) {
        // Add event listener for fast clicks (remove 300ms tap delay)
        document.addEventListener('touchstart', function() {}, { passive: true });
        
        // Disable text selection on interface elements
        const style = document.createElement('style');
        style.innerHTML = `
          .no-select {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, [isMobile, orientation]);

  // Loading fallback component
  const LoadingFallback = () => (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="animate-pulse text-center">
        <div className="w-12 h-12 rounded-full bg-primary/20 mx-auto mb-4"></div>
        <p className="text-muted-foreground">กำลังโหลด...</p>
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chat/:botId" element={<ChatPage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tour-der-wang" element={<TourDerWang />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;