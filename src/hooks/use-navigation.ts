
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
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Custom hook for navigation functionality
 */
export function useNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = useCallback((path: string) => {
    return location.pathname === path || 
      (path === "/booking" && location.pathname === "/tour-der-wang" && location.hash === "#booking");
  }, [location.pathname, location.hash]);
  
  const navigateTo = useCallback((path: string) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  }, [location.pathname, navigate]);
  
  return {
    currentPath: location.pathname,
    currentHash: location.hash,
    isActive,
    navigateTo
  };
}

export default useNavigation;
