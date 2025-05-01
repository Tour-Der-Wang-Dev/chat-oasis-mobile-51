
import React, { useState, FormEvent, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const MessageInput = ({ 
  onSendMessage, 
  placeholder = "Type a message...", 
  disabled = false,
  className 
}: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  }, [message, disabled, onSendMessage]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }, []);

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex-1 flex gap-2 w-full max-w-screen-lg mx-auto">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-muted/50 rounded-full px-4 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-ring"
          aria-label="Message input"
        />
        <Button
          type="submit"
          size="icon"
          className="rounded-full bg-accent hover:bg-accent/80 active:bg-accent/70 touch-action-manipulation"
          disabled={!message.trim() || disabled}
          aria-label="Send message"
        >
          <ArrowUp size={18} />
        </Button>
      </form>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(MessageInput);
