import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useNavigation() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>('/');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Update active tab based on current path
    const path = location.pathname;
    if (path === '/') setActiveTab('/');
    else if (path.startsWith('/explore')) setActiveTab('/explore');
    else if (path.startsWith('/chat') || path.startsWith('/chats')) setActiveTab('/chats');
    else if (path.startsWith('/profile')) setActiveTab('/profile');

    // Add transition effect
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);

    return () => clearTimeout(timer);
  }, [location]);

  return {
    activeTab,
    isTransitioning
  };
}