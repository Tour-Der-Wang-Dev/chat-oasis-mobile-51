
import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const MessageInput = ({ 
  onSendMessage, 
  placeholder = "Type a message...", 
  disabled = false 
}: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };
  
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };
  
  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "flex items-end gap-2 p-3 safe-bottom bg-background border-t",
        disabled && "opacity-60"
      )}
    >
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none rounded-lg bg-muted p-2 text-sm placeholder:text-muted-foreground focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={!message.trim() || disabled}
        className="rounded-full h-10 w-10 flex-shrink-0"
      >
        <SendHorizontal size={20} />
      </Button>
    </form>
  );
};

export default MessageInput;
