import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavigation = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  // Handle special cases for routing
  useEffect(() => {
    // Set the current path as active
    setActiveTab(location.pathname);

    // Special case: For path patterns like /chat/:id, also highlight chats tab
    if (location.pathname.startsWith('/chat/')) {
      setActiveTab('/chats');
    }
  }, [location.pathname]);

  const setActive = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  // Add memoized helpers for common tab checks
  const isHome = activeTab === '/';
  const isExplore = activeTab === '/explore';
  const isChats = activeTab === '/chats' || location.pathname.startsWith('/chat/');
  const isProfile = activeTab === '/profile';

  return { 
    activeTab, 
    setActive, 
    isHome,
    isExplore,
    isChats,
    isProfile
  };
};