
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex flex-col items-center justify-center w-1/4 h-full transition-colors",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
      aria-label={label}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
};

export default NavItem;
