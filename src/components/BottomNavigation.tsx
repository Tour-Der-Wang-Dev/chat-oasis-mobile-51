
import { Home, MessageSquare, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import NavItem from "./NavItem";
import useNavigation from "@/hooks/use-navigation";

// Define navigation item type for better type safety
export interface NavigationItem {
  icon: React.FC<React.ComponentProps<typeof Home>>;
  label: string;
  path: string;
}

// Extract navigation items to be potentially reusable across the app
export const defaultNavItems: NavigationItem[] = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Explore", path: "/explore" },
  { icon: MessageSquare, label: "Chats", path: "/chats" },
  { icon: User, label: "Profile", path: "/profile" },
];

interface BottomNavigationProps {
  navItems?: NavigationItem[];
  className?: string;
}

const BottomNavigation = ({ 
  navItems = defaultNavItems,
  className 
}: BottomNavigationProps) => {
  const { isActive, navigateTo } = useNavigation();
  
  return (
    <nav 
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-primary border-t border-border flex justify-around items-center py-2 px-4 z-10 safe-bottom touch-action-manipulation tap-highlight-none",
        className
      )}
      aria-label="Bottom navigation"
    >
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          item={item}
          isActive={isActive(item.path)}
          onClick={navigateTo}
        />
      ))}
    </nav>
  );
};

export default BottomNavigation;
