import { Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavigationItem } from "./BottomNavigation";

interface NavItemProps {
  item: NavigationItem;
  isActive: boolean;
  onClick: (path: string) => void;
}

const NavItem = ({ item, isActive, onClick }: NavItemProps) => {
  return (
    <button
      onClick={() => onClick(item.path)}
      className={cn(
        "flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-colors mobile-touch-target tap-highlight-none",
        isActive 
          ? "text-foreground" 
          : "text-muted-foreground hover:text-foreground active:bg-muted/40"
      )}
      aria-label={item.label}
    >
      <item.icon size={20} className={cn(isActive ? "text-foreground" : "text-muted-foreground")} />
      <span className="text-xs mt-1">{item.label}</span>
    </button>
  );
};

export default NavItem;