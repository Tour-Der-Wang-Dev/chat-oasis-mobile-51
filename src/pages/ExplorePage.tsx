
import { Search } from "lucide-react";
import BotCard, { Bot } from "@/components/BotCard";
import BottomNavigation from "@/components/BottomNavigation";

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
  },
  {
    id: "travel",
    name: "Travel Guide",
    description: "Your virtual travel companion with tips, recommendations and local insights.",
    avatar: "https://img2.pic.in.th/pic/image-19f4bb7a9e083dc11a.jpg",
    category: "Travel"
  },
  {
    id: "mentor",
    name: "Career Mentor",
    description: "Professional guidance for career development and job hunting.",
    avatar: "https://img5.pic.in.th/file/secure-sv1/307460108_387435583599238_6386334495691428178_n-removebg-preview.png",
    category: "Career"
  },
  {
    id: "therapist",
    name: "Wellness Helper",
    description: "Support for mindfulness, stress management and emotional well-being.",
    avatar: "https://img5.pic.in.th/file/secure-sv1/image-154ab127eb3dcc1779.jpg",
    category: "Wellness"
  }
];

const CATEGORIES = ["Productivity", "Education", "Creativity", "Health", "Food", "Travel", "Career", "Wellness"];

import MobileLayout from "@/components/MobileLayout";

const ExplorePage = () => {
  const pageHeader = (
    <header className="bg-primary p-3 sm:p-4">
      <h1 className="text-xl sm:text-2xl font-bold text-foreground">Explore</h1>
      <p className="text-xs sm:text-sm text-muted-foreground">Discover AI chatbots</p>
    </header>
  );
  
  return (
    <MobileLayout header={pageHeader}>
      
      <div className="p-3 sm:p-4">
        <div className="relative mb-5 sm:mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search chatbots..."
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-full bg-muted/50 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        
        <div className="mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-left">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <span 
                key={category}
                className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-muted rounded-full text-xs sm:text-sm cursor-pointer hover:bg-accent/50 active:bg-accent/80 transition-colors"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-5 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-left">Popular Chatbots</h2>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {SAMPLE_BOTS.slice(0, 4).map((bot) => (
              <BotCard key={bot.id} bot={bot} />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-left">All Chatbots</h2>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {SAMPLE_BOTS.map((bot) => (
              <BotCard key={bot.id} bot={bot} />
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ExplorePage;
