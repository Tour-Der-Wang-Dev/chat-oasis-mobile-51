
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavigation = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  // Memorize path mapping logic
  const getTabFromPath = useCallback((path: string) => {
    if (path === '/') return '/';
    if (path.startsWith('/explore')) return '/explore';
    if (path.startsWith('/chat/') || path.startsWith('/chats')) return '/chats';
    if (path.startsWith('/profile')) return '/profile';
    return path;
  }, []);

  // Update active tab when location changes
  useEffect(() => {
    const mappedPath = getTabFromPath(location.pathname);
    setActiveTab(mappedPath);
  }, [location.pathname, getTabFromPath]);

  // Memoize common tab checks for performance
  const tabStates = useMemo(() => ({
    isHome: activeTab === '/',
    isExplore: activeTab === '/explore',
    isChats: activeTab === '/chats' || location.pathname.startsWith('/chat/'),
    isProfile: activeTab === '/profile',
  }), [activeTab, location.pathname]);

  // Memoize setter to prevent unnecessary rerenders
  const setActive = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return { 
    activeTab, 
    setActive,
    ...tabStates 
  };
};
