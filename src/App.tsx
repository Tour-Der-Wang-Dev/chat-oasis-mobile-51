import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import ChatPage from "@/pages/ChatPage";
import ChatsPage from "@/pages/ChatsPage";
import ExplorePage from "@/pages/ExplorePage";
import ProfilePage from "@/pages/ProfilePage";
import AccountSettings from "@/components/AccountSettings";
import TourDerWang from "@/pages/TourDerWang";
import NotFound from "@/pages/NotFound";
import { useIsMobile } from "./hooks/use-mobile";

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/chat/:botId" element={<ChatPage />} />
        <Route path="/chats" element={<ChatsPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tour-der-wang" element={<TourDerWang />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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