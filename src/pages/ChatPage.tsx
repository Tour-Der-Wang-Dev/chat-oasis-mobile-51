
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatHeader from "@/components/ChatHeader";
import MessageBubble, { Message } from "@/components/MessageBubble";
import MessageInput from "@/components/MessageInput";
import { Bot } from "@/components/BotCard";
import { useToast } from "@/components/ui/use-toast";

// Mocked data (in a real app, this would come from an API)
const SAMPLE_BOTS: Bot[] = [
  {
    id: "assistant",
    name: "Assistant",
    description: "Your helpful AI assistant for everyday tasks and questions.",
    avatar: "https://img5.pic.in.th/file/secure-sv1/307460108_387435583599238_6386334495691428178_n-removebg-preview.png",
    category: "Productivity"
  },
  {
    id: "tutor",
    name: "Math Tutor",
    description: "Expert help with mathematics, from basic arithmetic to advanced calculus.",
    avatar: "https://img5.pic.in.th/file/secure-sv1/image-154ab127eb3dcc1779.jpg",
    category: "Education"
  },
  {
    id: "creative",
    name: "Creative Writer",
    description: "Your companion for creative writing, storytelling and brainstorming ideas.",
    avatar: "https://img2.pic.in.th/pic/image-19f4bb7a9e083dc11a.jpg",
    category: "Creativity"
  },
  {
    id: "coach",
    name: "Fitness Coach",
    description: "Personal trainer to help you achieve your fitness goals with customized advice.",
    avatar: "https://img5.pic.in.th/file/secure-sv1/307460108_387435583599238_6386334495691428178_n-removebg-preview.png",
    category: "Health"
  },
  {
    id: "chef",
    name: "Chef Buddy",
    description: "Culinary assistant to help with recipes, cooking techniques and meal planning.",
    avatar: "https://img5.pic.in.th/file/secure-sv1/image-154ab127eb3dcc1779.jpg",
    category: "Food"
  }
];

const INITIAL_MESSAGES: Record<string, Message[]> = {
  "assistant": [
    {
      id: "1",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
      botAvatar: "https://img5.pic.in.th/file/secure-sv1/307460108_387435583599238_6386334495691428178_n-removebg-preview.png",
      botName: "Assistant",
    }
  ],
  "tutor": [
    {
      id: "1",
      content: "Hi there! I'm your Math Tutor. What math problem are you working on?",
      sender: "ai",
      timestamp: new Date(),
      botAvatar: "https://img5.pic.in.th/file/secure-sv1/image-154ab127eb3dcc1779.jpg",
      botName: "Math Tutor",
    }
  ],
  "creative": [
    {
      id: "1",
      content: "Welcome! I'm your Creative Writer assistant. Let's spark some creativity together!",
      sender: "ai",
      timestamp: new Date(),
      botAvatar: "https://img2.pic.in.th/pic/image-19f4bb7a9e083dc11a.jpg",
      botName: "Creative Writer",
    }
  ],
  "coach": [
    {
      id: "1",
      content: "Hey there! I'm your Fitness Coach. Ready to work on your health goals?",
      sender: "ai",
      timestamp: new Date(),
      botAvatar: "https://img5.pic.in.th/file/secure-sv1/307460108_387435583599238_6386334495691428178_n-removebg-preview.png",
      botName: "Fitness Coach",
    }
  ],
  "chef": [
    {
      id: "1",
      content: "Hi! I'm Chef Buddy. Need help with recipes or cooking advice?",
      sender: "ai",
      timestamp: new Date(),
      botAvatar: "https://img5.pic.in.th/file/secure-sv1/image-154ab127eb3dcc1779.jpg",
      botName: "Chef Buddy",
    }
  ]
};

// Mock responses based on the bot type
const BOT_RESPONSES: Record<string, string[]> = {
  "assistant": [
    "I can help you with that!",
    "Here's what I found for you:",
    "That's an interesting question. Let me think...",
    "I'd be happy to assist with that request.",
    "Is there anything else you'd like to know?"
  ],
  "tutor": [
    "Let me explain this math concept step by step.",
    "Here's how we can solve this problem:",
    "That's a great question about mathematics!",
    "Let's break this down into simpler terms.",
    "Do you understand this approach? We can try another if needed."
  ],
  "creative": [
    "Here's a creative idea for you to consider:",
    "Let's explore this concept from a different angle.",
    "Your story could develop in these interesting directions:",
    "That's a fascinating premise! Here's how we might expand on it:",
    "I love the direction you're going with this creative work."
  ],
  "coach": [
    "Here's a workout routine that might help you reach that goal.",
    "Remember to focus on proper form rather than speed.",
    "Consistency is key when it comes to fitness progress.",
    "Let's adjust your plan based on your current progress.",
    "How are you feeling after your recent workouts?"
  ],
  "chef": [
    "Here's a recipe you might enjoy based on those ingredients.",
    "You could substitute this if you don't have that ingredient.",
    "This cooking technique will help enhance the flavors.",
    "Let me suggest a menu that combines these elements nicely.",
    "The key to this dish is getting the timing right."
  ]
};

const ChatPage = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentBot, setCurrentBot] = useState<Bot | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!botId) {
      navigate('/');
      return;
    }
    
    const bot = SAMPLE_BOTS.find(b => b.id === botId);
    if (!bot) {
      toast({
        title: "Bot not found",
        description: "The chatbot you're looking for doesn't exist.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
    
    setCurrentBot(bot);
    
    // Load initial messages for this bot
    const initialMessages = INITIAL_MESSAGES[botId] || [];
    setMessages(initialMessages);
  }, [botId, navigate, toast]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      if (currentBot) {
        const botResponses = BOT_RESPONSES[currentBot.id] || BOT_RESPONSES.assistant;
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        
        const aiMessage: Message = {
          id: Date.now().toString(),
          content: randomResponse,
          sender: "ai",
          timestamp: new Date(),
          botAvatar: currentBot.avatar,
          botName: currentBot.name,
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }
    }, 1500);
  };
  
  if (!currentBot) {
    return <div className="p-4">Loading...</div>;
  }
  
  return (
    <div className="flex flex-col h-screen">
      <ChatHeader 
        botName={currentBot.name} 
        botAvatar={currentBot.avatar}
        botStatus="online"
      />
      
      <div className="flex-1 overflow-y-auto p-4 bg-background">
        <div className="max-w-3xl mx-auto">
          {messages.map((message, index) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
            />
          ))}
          
          {isTyping && (
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img src={currentBot.avatar} alt={currentBot.name} className="w-full h-full object-cover" />
              </div>
              <div className="chat-bubble chat-bubble-ai flex gap-1 items-center">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      
      <MessageInput 
        onSendMessage={handleSendMessage} 
        placeholder="Message..." 
        disabled={isTyping}
      />
    </div>
  );
};

export default ChatPage;
