
import { useState, useCallback, useEffect } from "react";
import { Message } from "@/components/MessageBubble";

interface UseChatOptions {
  botId?: string;
  botName?: string;
  botAvatar?: string;
  initialMessages?: Message[];
}

export function useChat({ botId, botName, botAvatar, initialMessages = [] }: UseChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  
  // Load previous messages from storage if available
  useEffect(() => {
    if (!botId) return;
    
    try {
      const savedMessages = localStorage.getItem(`chat_${botId}`);
      if (savedMessages) {
        // Parse and ensure dates are properly converted back to Date objects
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        
        setMessages(parsedMessages);
      }
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  }, [botId]);
  
  // Save messages to storage when they change
  useEffect(() => {
    if (!botId || messages.length === 0) return;
    
    try {
      localStorage.setItem(`chat_${botId}`, JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save chat history:", error);
    }
  }, [messages, botId]);
  
  // Send a message and get a response
  const sendMessage = useCallback((content: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Simulate AI response
    setIsTyping(true);
    
    setTimeout(() => {
      const botMessage: Message = {
        id: `ai-${Date.now()}`,
        content: `This is a simulated response to: "${content}"`,
        sender: "ai",
        timestamp: new Date(),
        botAvatar,
        botName
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
    
    // In a real app, you would call an API here, for example:
    /*
    const handleBotResponse = async () => {
      try {
        setIsTyping(true);
        const response = await fetch(`/api/chat/${botId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: content })
        });
        
        if (!response.ok) throw new Error('Failed to get response');
        
        const data = await response.json();
        
        const botMessage: Message = {
          id: `ai-${Date.now()}`,
          content: data.message,
          sender: "ai",
          timestamp: new Date(),
          botAvatar,
          botName
        };
        
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error getting bot response:", error);
        // Handle error - maybe add an error message to the chat
      } finally {
        setIsTyping(false);
      }
    };
    
    handleBotResponse();
    */
    
  }, [botAvatar, botName]);
  
  // Clear chat history
  const clearChat = useCallback(() => {
    setMessages([]);
    
    if (botId) {
      localStorage.removeItem(`chat_${botId}`);
    }
  }, [botId]);
  
  return {
    messages,
    isTyping,
    sendMessage,
    clearChat
  };
}

export default useChat;
