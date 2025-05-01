
import { Home, MessageSquare, Search, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Explore", path: "/explore" },
    { icon: MessageSquare, label: "Chats", path: "/chats" },
    { icon: User, label: "Profile", path: "/profile" },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary border-t border-border flex justify-around items-center py-2 px-4 z-10 safe-bottom">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            className={cn(
              "flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}
            onClick={() => navigate(item.path)}
          >
            <item.icon size={20} className={cn(isActive ? "text-foreground" : "text-muted-foreground")} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
