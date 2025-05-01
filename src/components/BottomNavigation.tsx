import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Home, Search, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from "@/hooks/use-navigation";

const BottomNavigation: React.FC = () => {
  const { activeTab } = useNavigation();

  // Memoize navigation items to prevent unnecessary re-renders
  const navItems = React.useMemo(() => [
    {
      icon: Home,
      label: "หน้าแรก",
      path: "/",
    },
    {
      icon: Search,
      label: "ค้นหา",
      path: "/explore",
    },
    {
      icon: MessageSquare,
      label: "แชท",
      path: "/chats",
    },
    {
      icon: User,
      label: "โปรไฟล์",
      path: "/profile",
    },
  ], []);

  // Reduce layout thrashing with passive event handlers
  React.useEffect(() => {
    document.querySelectorAll('.nav-item').forEach(el => {
      el.addEventListener('touchstart', () => {}, { passive: true });
    });
  }, []);

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50 bg-primary shadow-md px-2 py-1 safe-bottom",
      "max-w-md mx-auto",
      "will-change-transform translate-z-0" // Hardware acceleration
    )}>
      <div className="flex items-center justify-around">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = activeTab === path;

          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center py-1 nav-item", 
                "w-1/4 mobile-touch-target", // Equal distribution, better touch targets
                "touch-action-manipulation", // Better touch handling
                "tap-highlight-none" // Remove tap highlight
              )}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative w-12 h-12 flex items-center justify-center">
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-accent/30 rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>

                <Icon
                  size={22}
                  className={cn(
                    "text-foreground",
                    isActive ? "text-accent-foreground font-bold" : "text-muted-foreground",
                    "transition-colors"
                  )}
                />
              </div>

              <span
                className={cn(
                  "text-xs font-medium",
                  isActive ? "text-accent-foreground font-bold" : "text-muted-foreground",
                  "transition-colors"
                )}
                style={{ fontFamily: 'Sukhumvit Set, sans-serif' }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

// Memoize to prevent unnecessary re-renders
export default memo(BottomNavigation);