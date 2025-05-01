
import { ArrowLeft, Bell, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatHeaderProps {
  botName: string;
  botAvatar: string;
  botStatus?: "online" | "offline" | "busy";
  onBack?: () => void;
}

const ChatHeader = ({ botName, botAvatar, botStatus = "online", onBack }: ChatHeaderProps) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-primary p-3 sm:p-4 flex items-center justify-between shadow-sm border-b border-border safe-top">
      <div className="flex items-center gap-3">
        <button 
          onClick={handleBack} 
          className="p-1 rounded-full hover:bg-muted active:bg-muted/80 touch-action-manipulation"
        >
          <ArrowLeft size={20} />
        </button>
        <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border border-border">
          <AvatarImage src={botAvatar} alt={botName} />
          <AvatarFallback>{botName.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-foreground text-sm sm:text-base">{botName}</h3>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${
              botStatus === "online" ? "bg-green-500" :
              botStatus === "busy" ? "bg-orange-500" :
              "bg-gray-400"
            }`}></span>
            <span className="text-xs text-muted-foreground capitalize">{botStatus}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <button className="p-1.5 rounded-full hover:bg-muted active:bg-muted/80 touch-action-manipulation">
          <Bell size={18} />
        </button>
        <button className="p-1.5 rounded-full hover:bg-muted active:bg-muted/80 touch-action-manipulation">
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
