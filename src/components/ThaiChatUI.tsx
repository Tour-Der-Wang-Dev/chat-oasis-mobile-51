
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Mic, Send, X, Camera, Map, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ThaiChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface QuickReply {
  id: string;
  text: string;
  action: () => void;
}

interface ThaiChatUIProps {
  botName?: string;
  botAvatar?: string;
  initialMessages?: ThaiChatMessage[];
  onSendMessage?: (message: string) => void;
  isTyping?: boolean;
  quickReplies?: QuickReply[];
}

const ThaiChatUI = ({
  botName = "Tour Der Wang",
  botAvatar = "/placeholder.svg",
  initialMessages = [],
  onSendMessage,
  isTyping = false,
  quickReplies = [
    { id: "1", text: "ทัวร์ยอดนิยม", action: () => console.log("ทัวร์ยอดนิยม") },
    { id: "2", text: "จองทัวร์", action: () => console.log("จองทัวร์") },
    { id: "3", text: "แผนที่", action: () => console.log("แผนที่") },
    { id: "4", text: "ช่วยเหลือ", action: () => console.log("ช่วยเหลือ") },
  ],
}: ThaiChatUIProps) => {
  const [messages, setMessages] = useState<ThaiChatMessage[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage: ThaiChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    
    if (onSendMessage) {
      onSendMessage(inputMessage);
    }
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleRecording = () => {
    setIsRecording((prev) => !prev);
    // Implement actual recording functionality here
    setTimeout(() => setIsRecording(false), 2000);
  };

  return (
    <>
      {/* Floating chat bubble when collapsed */}
      {!isExpanded && (
        <button
          onClick={toggleExpanded}
          className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-[#FFDEAD] shadow-lg flex items-center justify-center z-50 touch-action-manipulation tap-highlight-none transform transition-transform active:scale-95"
          aria-label="เปิดแชท"
        >
          <MessageCircle className="w-6 h-6 text-[#B39B7D]" />
        </button>
      )}

      {/* Expanded chat interface */}
      <div
        className={cn(
          "fixed inset-x-0 bg-[#FFF8E7] rounded-t-3xl shadow-lg transition-all duration-300 ease-in-out z-50 safe-bottom",
          isExpanded
            ? "bottom-0 max-h-[80vh]"
            : "bottom-[-100vh] max-h-0 pointer-events-none"
        )}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between p-4 border-b border-[#FFE4B5] bg-[#FFDEAD] rounded-t-3xl">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-[#FFE4B5]">
              <img src={botAvatar} alt={botName} className="h-full w-full object-cover" />
            </Avatar>
            <div>
              <h3 className="font-medium text-[#B39B7D]" style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}>
                {botName}
              </h3>
              <p className="text-xs text-[#B39B7D]/70">ออนไลน์</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleExpanded}
            className="h-10 w-10 rounded-full hover:bg-[#FFE4B5]/50"
          >
            <X className="h-5 w-5 text-[#B39B7D]" />
          </Button>
        </div>

        {/* Chat messages */}
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-8rem)] momentum-scroll hide-scrollbar">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "mb-4 animate-bubble-in",
                message.sender === "user" ? "flex justify-end" : "flex justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-xl px-4 py-2 text-sm",
                  message.sender === "user"
                    ? "bg-[#FFE4B5] text-[#B39B7D] rounded-tr-sm"
                    : "bg-[#FFDEAD] text-[#B39B7D] rounded-tl-sm"
                )}
                style={{ fontFamily: message.content.match(/[ก-๙]/) ? 'Sukhumvit Set, sans-serif' : 'Roboto, sans-serif' }}
              >
                {message.content}
                <div className="text-[10px] text-[#B39B7D]/60 mt-1 text-right">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="chat-bubble rounded-xl px-4 py-3 bg-[#FFDEAD] text-[#B39B7D] rounded-tl-sm">
                <div className="flex gap-1.5 items-center h-6">
                  <div className="w-2 h-2 bg-[#B39B7D]/60 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-[#B39B7D]/60 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-[#B39B7D]/60 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messageEndRef}></div>
        </div>

        {/* Quick replies */}
        {quickReplies.length > 0 && (
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto hide-scrollbar">
            {quickReplies.map((reply) => (
              <button
                key={reply.id}
                onClick={reply.action}
                className="whitespace-nowrap px-4 py-2.5 bg-[#FFD700] rounded-full text-xs text-[#B39B7D] font-medium mobile-touch-target transform transition-transform active:scale-95"
                style={{ fontFamily: 'Sukhumvit Set, sans-serif' }}
              >
                {reply.text}
              </button>
            ))}
          </div>
        )}

        {/* Message input */}
        <div className="p-4 border-t border-[#FFE4B5] bg-[#FFF8E7]">
          <div className="flex items-center gap-2">
            <button 
              className={cn(
                "flex-shrink-0 h-11 w-11 rounded-full flex items-center justify-center mobile-touch-target",
                isRecording ? "bg-red-500" : "bg-[#FFDEAD]"
              )}
              onClick={toggleRecording}
            >
              <Mic className={cn("h-5 w-5", isRecording ? "text-white animate-pulse" : "text-[#B39B7D]")} />
            </button>
            
            <Input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="พิมพ์ข้อความของคุณ..."
              className="flex-1 bg-[#FFDEAD]/30 border-[#FFE4B5] text-[#B39B7D] mobile-input"
              style={{ fontFamily: 'Sukhumvit Set, sans-serif' }}
            />
            
            <button
              className="flex-shrink-0 h-11 w-11 rounded-full bg-[#FFDEAD] flex items-center justify-center mobile-touch-target transform transition-transform active:scale-95"
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === ""}
            >
              <Send className="h-5 w-5 text-[#B39B7D]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThaiChatUI;
