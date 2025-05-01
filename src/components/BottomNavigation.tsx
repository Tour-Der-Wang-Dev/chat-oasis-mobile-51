
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, Calendar, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Define navigation items as a constant outside the component
const NAV_ITEMS = [
  { path: "/", icon: <Home size={22} />, label: "หน้าแรก" },
  { path: "/explore", icon: <Search size={22} />, label: "ค้นหา" },
  { path: "/booking", icon: <Calendar size={22} />, label: "จองทัวร์" },
  { path: "/chats", icon: <MessageSquare size={22} />, label: "แชท" },
  { path: "/profile", icon: <User size={22} />, label: "โปรไฟล์" },
];

// Constants for animation and styling
const SCROLL_THRESHOLD = 100;
const ANIMATION_DURATION = 0.3;

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > SCROLL_THRESHOLD) {
        setIsVisible(currentScrollY < lastScrollY);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  
  const isPathActive = (path: string): boolean => {
    return location.pathname === path || 
      (path === "/booking" && location.pathname === "/tour-der-wang" && location.hash === "#booking");
  };
  
  const handleNavigation = (path: string): void => {
    navigate(path);
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav 
          className="fixed bottom-0 left-0 right-0 h-16 bg-[#FFDEAD] border-t border-[#FFE4B5] flex items-center justify-around px-2 safe-bottom z-20 shadow-lg"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: ANIMATION_DURATION }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = isPathActive(item.path);
            
            return (
              <NavButton
                key={item.path}
                icon={item.icon}
                label={item.label}
                isActive={isActive}
                onClick={() => handleNavigation(item.path)}
              />
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center h-full w-full relative",
      isActive ? "text-[#B39B7D]" : "text-[#B39B7D]/50"
    )}
    style={{ 
      fontFamily: 'Sukhumvit Set, Roboto, sans-serif',
      touchAction: 'manipulation' 
    }}
  >
    {isActive && (
      <motion.div
        layoutId="bottomNavIndicator"
        className="absolute top-0 left-3 right-3 h-0.5 bg-[#B39B7D] rounded-full"
        transition={{ type: 'spring', duration: 0.5 }}
      />
    )}
    <span className="relative">
      {icon}
      {isActive && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 bg-[#FFD700]/20 rounded-full -z-10"
        />
      )}
    </span>
    <span className={cn(
      "text-xs mt-1",
      isActive ? "font-medium" : "font-normal"
    )}>
      {label}
    </span>
  </button>
);

export default BottomNavigation;
