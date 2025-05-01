
import React, { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const MessageInput = ({ 
  onSendMessage, 
  placeholder = "Type a message...", 
  disabled = false 
}: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="message-input">
      <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-muted/50 rounded-full px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <Button
          type="submit"
          size="icon"
          className="rounded-full bg-accent hover:bg-accent/80"
          disabled={!message.trim() || disabled}
        >
          <ArrowUp size={18} />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
