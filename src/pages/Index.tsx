import { useState } from "react";
import BotCard, { Bot } from "@/components/BotCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNavigation from "@/components/BottomNavigation";
import { Link } from "@nextui-org/link";
import { Search, MessageSquare, Users, Map } from "lucide-react";

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

const CATEGORIES = ["All", "Productivity", "Education", "Creativity", "Health", "Food"];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBots = activeCategory === "All"
    ? SAMPLE_BOTS
    : SAMPLE_BOTS.filter(bot => bot.category === activeCategory);

  return (
    <div className="min-h-screen pb-20 safe-bottom">
      <header className="bg-primary p-3 sm:p-4 shadow-sm safe-top">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Chat Oasis</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">Your AI companions</p>
      </header>

      <main className="p-3 sm:p-4">
        <div className="mb-5 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-left">Featured Chatbots</h2>
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="mb-3 sm:mb-4 flex overflow-x-auto pb-1 sm:pb-2 hide-scrollbar">
              {CATEGORIES.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="bg-muted/50 text-xs sm:text-sm flex-shrink-0"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={activeCategory} className="mt-0">
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {filteredBots.map((bot) => (
                  <BotCard key={bot.id} bot={bot} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-6 sm:mt-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-left">Recent Conversations</h2>
          <div className="bg-card rounded-xl p-4 sm:p-6 text-center">
            <p className="text-sm text-muted-foreground">Start chatting with a bot to see your recent conversations here.</p>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Index;