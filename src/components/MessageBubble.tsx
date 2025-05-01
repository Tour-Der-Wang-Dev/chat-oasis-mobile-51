
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  botAvatar?: string;
  botName?: string;
}

interface MessageBubbleProps {
  message: Message;
  showAvatar?: boolean;
}

const MessageBubble = ({ message, showAvatar = true }: MessageBubbleProps) => {
  const isAi = message.sender === "ai";
  
  return (
    <div className={cn(
      "flex gap-3 mb-4 w-full animate-bubble-in",
      isAi ? "justify-start" : "justify-end"
    )}>
      {isAi && showAvatar && (
        <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
          <AvatarImage src={message.botAvatar} alt={message.botName} />
          <AvatarFallback>{message.botName?.slice(0, 2) || "AI"}</AvatarFallback>
        </Avatar>
      )}
      <div className={cn(
        "chat-bubble",
        isAi ? "chat-bubble-ai" : "chat-bubble-user"
      )}>
        <p className="text-sm">{message.content}</p>
        <div className="text-[10px] text-muted-foreground mt-1 text-right">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      {!isAi && showAvatar && (
        <div className="w-8" />
      )}
    </div>
  );
};

export default MessageBubble;
