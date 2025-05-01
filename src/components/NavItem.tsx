
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
      className={cn(
        "flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors",
        isActive ? "text-foreground font-medium" : "text-muted-foreground"
      )}
      onClick={() => onClick(item.path)}
      aria-current={isActive ? "page" : undefined}
      aria-label={item.label}
    >
      <item.icon 
        size={20} 
        className={cn(
          "transition-colors",
          isActive ? "text-foreground" : "text-muted-foreground"
        )} 
      />
      <span className="text-xs mt-1">{item.label}</span>
    </button>
  );
};

export default NavItem;
