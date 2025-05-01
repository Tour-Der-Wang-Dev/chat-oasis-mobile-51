
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNavigation from "@/components/BottomNavigation";

interface ChatPreview {
  id: string;
  botId: string;
  botName: string;
  botAvatar: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
}

const SAMPLE_CHATS: ChatPreview[] = [
  {
    id: "1",
    botId: "assistant",
    botName: "Assistant",
    botAvatar: "https://img5.pic.in.th/file/secure-sv1/307460108_387435583599238_6386334495691428178_n-removebg-preview.png",
    lastMessage: "I can help you with that!",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    unread: 0,
  },
  {
    id: "2",
    botId: "tutor",
    botName: "Math Tutor",
    botAvatar: "https://img5.pic.in.th/file/secure-sv1/image-154ab127eb3dcc1779.jpg",
    lastMessage: "Let me explain this math concept step by step.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    unread: 2,
  },
  {
    id: "3",
    botId: "creative",
    botName: "Creative Writer",
    botAvatar: "https://img2.pic.in.th/pic/image-19f4bb7a9e083dc11a.jpg",
    lastMessage: "Here's a creative idea for you to consider:",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unread: 0,
  },
];

const formatTimestamp = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  return date.toLocaleDateString();
};

const ChatsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-16">
      <header className="bg-primary p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">Conversations</h1>
        <p className="text-sm text-muted-foreground">Your recent chats</p>
      </header>
      
      <main className="p-4">
        <div className="space-y-2">
          {SAMPLE_CHATS.map((chat) => (
            <div 
              key={chat.id}
              className="p-3 rounded-xl bg-card flex items-center gap-3 cursor-pointer hover:bg-accent/30 transition-colors"
              onClick={() => navigate(`/chat/${chat.botId}`)}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={chat.botAvatar} alt={chat.botName} />
                <AvatarFallback>{chat.botName.slice(0, 2)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-foreground">{chat.botName}</h3>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(chat.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
              </div>
              
              {chat.unread > 0 && (
                <div className="bg-accent w-5 h-5 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium">{chat.unread}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default ChatsPage;
