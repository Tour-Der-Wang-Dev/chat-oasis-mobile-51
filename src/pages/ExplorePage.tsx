
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

const ExplorePage = () => {
  return (
    <div className="min-h-screen pb-16">
      <header className="bg-primary p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">Explore</h1>
        <p className="text-sm text-muted-foreground">Discover AI chatbots</p>
      </header>
      
      <div className="p-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search chatbots..."
            className="w-full pl-10 pr-4 py-3 rounded-full bg-muted/50 focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <span 
                key={category}
                className="px-3 py-1.5 bg-muted rounded-full text-sm cursor-pointer hover:bg-accent/50 transition-colors"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Popular Chatbots</h2>
          <div className="grid grid-cols-1 gap-4">
            {SAMPLE_BOTS.slice(0, 4).map((bot) => (
              <BotCard key={bot.id} bot={bot} />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-3">All Chatbots</h2>
          <div className="grid grid-cols-1 gap-4">
            {SAMPLE_BOTS.map((bot) => (
              <BotCard key={bot.id} bot={bot} />
            ))}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ExplorePage;
