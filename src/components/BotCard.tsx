
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export interface Bot {
  id: string;
  name: string;
  description: string;
  avatar: string;
  category: string;
}

interface BotCardProps {
  bot: Bot;
}

const BotCard = ({ bot }: BotCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/chat/${bot.id}`);
  };
  
  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all hover:shadow-md bg-card"
      onClick={handleClick}
    >
      <CardContent className="p-4 flex items-center gap-4">
        <Avatar className="h-14 w-14 rounded-2xl">
          <AvatarImage src={bot.avatar} alt={bot.name} />
          <AvatarFallback className="rounded-2xl bg-muted">{bot.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium text-foreground">{bot.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{bot.description}</p>
          <div className="mt-1">
            <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{bot.category}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotCard;
