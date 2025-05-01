
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ChatHeader from "@/components/ChatHeader";
import MessageBubble, { Message } from "@/components/MessageBubble";
import MessageInput from "@/components/MessageInput";
import useChat from "@/hooks/use-chat";

// Sample data for bot info - in a real app, you would fetch this from an API
const BOT_INFO: Record<string, { name: string; avatar: string }> = {
  "assistant": {
    name: "Assistant",
    avatar: "https://img5.pic.in.th/file/secure-sv1/307460108_387435583599238_6386334495691428178_n-removebg-preview.png"
  },
  "tutor": {
    name: "Math Tutor",
    avatar: "https://img5.pic.in.th/file/secure-sv1/image-154ab127eb3dcc1779.jpg"
  },
  "creative": {
    name: "Creative Writer",
    avatar: "https://img2.pic.in.th/pic/image-19f4bb7a9e083dc11a.jpg"
  }
};

const ChatPage = () => {
  const { botId } = useParams<{ botId: string }>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const botInfo = BOT_INFO[botId || ""] || {
    name: "AI Assistant",
    avatar: "https://img5.pic.in.th/file/secure-sv1/307460108_387435583599238_6386334495691428178_n-removebg-preview.png"
  };
  
  const { messages, isTyping, sendMessage } = useChat({
    botId,
    botName: botInfo.name,
    botAvatar: botInfo.avatar
  });
  
  // Scroll to bottom of messages when messages change or when typing status changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <ChatHeader 
        botName={botInfo.name}
        botAvatar={botInfo.avatar}
        botStatus="online"
      />
      
      <main className="flex-1 p-3 sm:p-4 overflow-y-auto pb-20">
        <div className="max-w-screen-md mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Start a conversation with {botInfo.name}</p>
            </div>
          ) : (
            messages.map((message: Message, index: number) => (
              <MessageBubble 
                key={message.id} 
                message={message}
                // Only show avatar for the first message in a sequence from the same sender
                showAvatar={index === 0 || messages[index - 1].sender !== message.sender}
              />
            ))
          )}
          
          {isTyping && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span>{botInfo.name} is typing...</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 bg-background/80 backdrop-blur-md border-t border-border safe-bottom">
        <MessageInput 
          onSendMessage={sendMessage} 
          placeholder={`Message ${botInfo.name}...`}
          disabled={isTyping}
        />
      </footer>
    </div>
  );
};

export default ChatPage;
