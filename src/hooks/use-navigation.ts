
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationItem } from "@/components/BottomNavigation";

export function useNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = useCallback((path: string) => {
    return location.pathname === path;
  }, [location.pathname]);
  
  const navigateTo = useCallback((path: string) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  }, [location.pathname, navigate]);
  
  return {
    currentPath: location.pathname,
    isActive,
    navigateTo
  };
}

export default useNavigation;
