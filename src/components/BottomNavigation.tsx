import React from "react";
import { useLocation } from "react-router-dom";
import { Home, Search, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";
import NavItem from "./NavItem";

const BottomNavigation = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t flex items-center justify-around px-2 safe-bottom z-10 shadow-sm">
      <NavItem 
        to="/" 
        icon={<Home size={22} />} 
        label="Home" 
        isActive={location.pathname === "/"} 
      />
      <NavItem 
        to="/explore" 
        icon={<Search size={22} />} 
        label="Explore" 
        isActive={location.pathname === "/explore"} 
      />
      <NavItem 
        to="/chats" 
        icon={<MessageSquare size={22} />} 
        label="Chats" 
        isActive={location.pathname === "/chats"} 
      />
      <NavItem 
        to="/profile" 
        icon={<User size={22} />} 
        label="Profile" 
        isActive={location.pathname === "/profile"} 
      />
    </div>
  );
};

export default BottomNavigation;