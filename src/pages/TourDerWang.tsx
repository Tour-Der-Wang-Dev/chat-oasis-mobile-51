
import React, { useState } from "react";
import ThaiChatUI from "@/components/ThaiChatUI";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { ChevronLeft, Home, Compass, Grid, User, Calendar as CalendarIcon, Map, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for tourism spots
const TOURISM_SPOTS = [
  { 
    id: "1", 
    name: "วัดพระธาตุพนม", 
    description: "พระธาตุประจำวันอาทิตย์ เป็นพระธาตุของผู้ที่เกิดวันอาทิตย์", 
    image: "https://placehold.co/300x200/FFDEAD/B39B7D?text=วัดพระธาตุพนม",
    category: "วัด" 
  },
  { 
    id: "2", 
    name: "ทุ่งกุลาร้องไห้", 
    description: "แหล่งปลูกข้าวหอมมะลิที่ขึ้นชื่อของภาคอีสาน", 
    image: "https://placehold.co/300x200/FFDEAD/B39B7D?text=ทุ่งกุลาร้องไห้",
    category: "ธรรมชาติ" 
  },
  { 
    id: "3", 
    name: "ภูกระดึง", 
    description: "อุทยานแห่งชาติภูกระดึง จังหวัดเลย เป็นภูเขาที่มีลักษณะเป็นโต๊ะ", 
    image: "https://placehold.co/300x200/FFDEAD/B39B7D?text=ภูกระดึง", 
    category: "ธรรมชาติ" 
  },
  { 
    id: "4", 
    name: "บ้านด่านซ้าย", 
    description: "ชมผีตาโขน และสัมผัสวิถีชีวิตชาวอีสานเหนือ", 
    image: "https://placehold.co/300x200/FFDEAD/B39B7D?text=บ้านด่านซ้าย", 
    category: "วัฒนธรรม" 
  },
  { 
    id: "5", 
    name: "แก่งคุดคู้", 
    description: "แก่งหินกลางแม่น้ำโขงกั้นพรมแดนไทย-ลาว", 
    image: "https://placehold.co/300x200/FFDEAD/B39B7D?text=แก่งคุดคู้", 
    category: "ธรรมชาติ" 
  },
  { 
    id: "6", 
    name: "ปราสาทพนมรุ้ง", 
    description: "ปราสาทหินทรายสีชมพู สร้างบนภูเขาไฟที่ดับแล้ว", 
    image: "https://placehold.co/300x200/FFDEAD/B39B7D?text=ปราสาทพนมรุ้ง", 
    category: "โบราณสถาน" 
  },
];

// Tour packages
const TOUR_PACKAGES = [
  { id: "1", name: "แพ็คเกจทัวร์อีสานเหนือ 3 วัน 2 คืน", price: 4500, image: "https://placehold.co/400x200/FFDEAD/B39B7D?text=ทัวร์อีสานเหนือ" },
  { id: "2", name: "เส้นทางบุญ นมัสการพระธาตุ 2 วัน 1 คืน", price: 2500, image: "https://placehold.co/400x200/FFDEAD/B39B7D?text=เส้นทางบุญ" },
  { id: "3", name: "ตามรอยวัฒนธรรมและประเพณีอีสาน 4 วัน 3 คืน", price: 5900, image: "https://placehold.co/400x200/FFDEAD/B39B7D?text=วัฒนธรรมอีสาน" },
];

const TourDerWang = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FFF8E7]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#FFDEAD] px-4 py-3 flex items-center justify-between safe-top">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FFE4B5]/50"
          >
            <ChevronLeft className="w-5 h-5 text-[#B39B7D]" />
          </button>
          <h1 
            className="text-xl font-bold text-[#B39B7D]"
            style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
          >
            ทัวร์ เดอ วังฯ
          </h1>
        </div>
        
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-full bg-[#FFE4B5] text-sm font-medium text-[#B39B7D]">
            TH
          </button>
          <button className="px-3 py-1 rounded-full bg-transparent text-sm font-medium text-[#B39B7D]">
            EN
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto momentum-scroll">
        <Tabs defaultValue="home" value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="home" className="p-0 mt-0">
            <div className="relative w-full h-64">
              <img 
                src="https://placehold.co/800x600/FFDEAD/B39B7D?text=Tour+Der+Wang" 
                alt="Tour Der Wang" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h2 
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                >
                  ทัวร์ เดอ วังฯ
                </h2>
                <p 
                  className="text-sm opacity-90"
                  style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                >
                  สัมผัสวัฒนธรรมอีสานแท้ๆ กับประสบการณ์การท่องเที่ยวที่น่าประทับใจ
                </p>
              </div>
            </div>
            
            <div className="p-4">
              <h3 
                className="text-lg font-semibold mb-3 text-[#B39B7D]"
                style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
              >
                แพ็คเกจยอดนิยม
              </h3>
              
              <div className="grid gap-4 mb-6">
                {TOUR_PACKAGES.map((tour) => (
                  <div 
                    key={tour.id}
                    className="bg-[#FFDEAD]/30 rounded-xl overflow-hidden"
                  >
                    <img 
                      src={tour.image} 
                      alt={tour.name} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-3">
                      <h4 
                        className="font-medium text-[#B39B7D]"
                        style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                      >
                        {tour.name}
                      </h4>
                      <div className="flex justify-between items-center mt-2">
                        <p 
                          className="text-[#B39B7D] font-bold"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          ฿{tour.price.toLocaleString()}
                        </p>
                        <Button 
                          className="bg-[#FFD700] hover:bg-[#FFD700]/80 text-[#B39B7D] rounded-full px-4"
                          style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                        >
                          จองเลย
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 
                className="text-lg font-semibold mb-3 text-[#B39B7D]"
                style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
              >
                สถานที่ท่องเที่ยวแนะนำ
              </h3>
              
              <div className="grid grid-cols-2 gap-3 mb-20">
                {TOURISM_SPOTS.map((spot) => (
                  <div 
                    key={spot.id}
                    className="bg-[#FFDEAD]/30 rounded-xl overflow-hidden"
                  >
                    <div className="relative">
                      <img 
                        src={spot.image} 
                        alt={spot.name} 
                        className="w-full h-32 object-cover"
                      />
                      <span 
                        className="absolute top-2 right-2 px-2 py-0.5 bg-[#FFD700]/80 rounded-full text-[10px] text-[#B39B7D] font-medium"
                        style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                      >
                        {spot.category}
                      </span>
                    </div>
                    <div className="p-2">
                      <h4 
                        className="font-medium text-sm text-[#B39B7D] truncate"
                        style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                      >
                        {spot.name}
                      </h4>
                      <p 
                        className="text-xs text-[#B39B7D]/70 line-clamp-2 h-8"
                        style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                      >
                        {spot.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="explore" className="p-4 mt-0 mb-20">
            <h2 
              className="text-xl font-bold mb-4 text-[#B39B7D]"
              style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
            >
              ค้นหาสถานที่ท่องเที่ยว
            </h2>
            
            <div className="relative mb-4">
              <Input 
                placeholder="ค้นหา..." 
                className="bg-[#FFDEAD]/30 border-[#FFE4B5] rounded-full pl-10 pr-4 text-[#B39B7D]"
                style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
              />
              <Compass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B39B7D]" />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 hide-scrollbar">
              {["ทั้งหมด", "วัด", "ธรรมชาติ", "วัฒนธรรม", "โบราณสถาน", "อาหาร"].map((category) => (
                <button 
                  key={category}
                  className="px-3 py-1.5 bg-[#FFDEAD] rounded-full text-sm whitespace-nowrap text-[#B39B7D]"
                  style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="grid gap-4">
              {TOURISM_SPOTS.map((spot) => (
                <div 
                  key={spot.id}
                  className="bg-[#FFDEAD]/30 rounded-xl overflow-hidden flex"
                >
                  <img 
                    src={spot.image} 
                    alt={spot.name} 
                    className="w-24 h-24 object-cover"
                  />
                  <div className="p-3 flex-1">
                    <div className="flex justify-between">
                      <h4 
                        className="font-medium text-[#B39B7D]"
                        style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                      >
                        {spot.name}
                      </h4>
                      <button>
                        <Heart className="w-5 h-5 text-[#B39B7D]/70" />
                      </button>
                    </div>
                    <p 
                      className="text-xs text-[#B39B7D]/70 line-clamp-2 mt-1"
                      style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                    >
                      {spot.description}
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span 
                        className="px-2 py-0.5 bg-[#FFD700]/80 rounded-full text-[10px] text-[#B39B7D] font-medium"
                        style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                      >
                        {spot.category}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-3 text-xs text-[#B39B7D] hover:bg-[#FFDEAD]"
                        style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                      >
                        ดูรายละเอียด
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="booking" className="p-4 mt-0 mb-20">
            <h2 
              className="text-xl font-bold mb-4 text-[#B39B7D]"
              style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
            >
              จองทัวร์
            </h2>
            
            <div className="bg-[#FFDEAD]/30 rounded-xl p-4 mb-4">
              <h3 
                className="font-medium text-[#B39B7D] mb-2"
                style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
              >
                เลือกวันเดินทาง
              </h3>
              
              <div className="bg-white rounded-xl overflow-hidden">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="border-0"
                  classNames={{
                    day_selected: "bg-[#FFD700] text-[#B39B7D] hover:bg-[#FFD700]/90 focus:bg-[#FFD700]/90",
                    day_today: "bg-[#FFDEAD] text-[#B39B7D]",
                    day: "focus:bg-[#FFDEAD]/50 aria-selected:bg-[#FFD700]"
                  }}
                />
              </div>
            </div>
            
            <div className="bg-[#FFDEAD]/30 rounded-xl p-4 mb-4">
              <h3 
                className="font-medium text-[#B39B7D] mb-3"
                style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
              >
                เลือกแพ็คเกจทัวร์
              </h3>
              
              <div className="space-y-3">
                {TOUR_PACKAGES.map((tour) => (
                  <div 
                    key={tour.id}
                    className="flex items-center gap-3 bg-white p-3 rounded-xl"
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-[#B39B7D] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#B39B7D]" />
                    </div>
                    <div className="flex-1">
                      <h4 
                        className="font-medium text-sm text-[#B39B7D]"
                        style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                      >
                        {tour.name}
                      </h4>
                      <p 
                        className="text-[#B39B7D] text-xs"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        ฿{tour.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#FFDEAD]/30 rounded-xl p-4 mb-6">
              <h3 
                className="font-medium text-[#B39B7D] mb-3"
                style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
              >
                ข้อมูลผู้จอง
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label 
                    className="block text-sm text-[#B39B7D] mb-1"
                    style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                  >
                    ชื่อ-นามสกุล
                  </label>
                  <Input 
                    placeholder="ระบุชื่อ-นามสกุล" 
                    className="bg-white border-[#FFE4B5] text-[#B39B7D]"
                    style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                  />
                </div>
                
                <div>
                  <label 
                    className="block text-sm text-[#B39B7D] mb-1"
                    style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                  >
                    เบอร์โทรศัพท์
                  </label>
                  <Input 
                    placeholder="ระบุเบอร์โทรศัพท์" 
                    className="bg-white border-[#FFE4B5] text-[#B39B7D]"
                    style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                  />
                </div>
                
                <div>
                  <label 
                    className="block text-sm text-[#B39B7D] mb-1"
                    style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                  >
                    อีเมล
                  </label>
                  <Input 
                    placeholder="ระบุอีเมล" 
                    type="email"
                    className="bg-white border-[#FFE4B5] text-[#B39B7D]"
                    style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                  />
                </div>
                
                <div>
                  <label 
                    className="block text-sm text-[#B39B7D] mb-1"
                    style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                  >
                    จำนวนผู้เดินทาง
                  </label>
                  <Input 
                    placeholder="ระบุจำนวนผู้เดินทาง" 
                    type="number"
                    className="bg-white border-[#FFE4B5] text-[#B39B7D]"
                    style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                  />
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full bg-[#FFD700] hover:bg-[#FFD700]/80 text-[#B39B7D] rounded-xl py-6"
              style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
            >
              ดำเนินการจอง
            </Button>
          </TabsContent>
          
          <TabsContent value="profile" className="p-4 mt-0">
            <div className="flex flex-col items-center mb-6 pt-4">
              <div className="w-24 h-24 rounded-full bg-[#FFDEAD] mb-3 flex items-center justify-center">
                <User className="w-12 h-12 text-[#B39B7D]" />
              </div>
              <h2 
                className="text-xl font-bold text-[#B39B7D]"
                style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
              >
                ยินดีต้อนรับ
              </h2>
              <p 
                className="text-sm text-[#B39B7D]/70"
                style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
              >
                เข้าสู่ระบบเพื่อจัดการข้อมูลของคุณ
              </p>
            </div>
            
            <Button 
              className="w-full bg-[#FFD700] hover:bg-[#FFD700]/80 text-[#B39B7D] rounded-xl py-6 mb-4"
              style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
            >
              เข้าสู่ระบบ
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-[#FFE4B5] text-[#B39B7D] rounded-xl py-6 mb-6"
              style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
            >
              สมัครสมาชิก
            </Button>
            
            <div className="space-y-3 mb-20">
              <div className="flex items-center gap-3 p-3 bg-[#FFDEAD]/30 rounded-xl">
                <CalendarIcon className="w-5 h-5 text-[#B39B7D]" />
                <span 
                  className="text-[#B39B7D]"
                  style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                >
                  ประวัติการจอง
                </span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-[#FFDEAD]/30 rounded-xl">
                <Heart className="w-5 h-5 text-[#B39B7D]" />
                <span 
                  className="text-[#B39B7D]"
                  style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                >
                  รายการโปรด
                </span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-[#FFDEAD]/30 rounded-xl">
                <Map className="w-5 h-5 text-[#B39B7D]" />
                <span 
                  className="text-[#B39B7D]"
                  style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                >
                  แผนที่ออฟไลน์
                </span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#FFDEAD] h-16 flex items-center justify-around px-2 shadow-lg safe-bottom">
        <button 
          onClick={() => setActiveTab("home")}
          className={cn(
            "flex flex-col items-center justify-center h-full w-16",
            activeTab === "home" ? "text-[#B39B7D]" : "text-[#B39B7D]/60"
          )}
        >
          <Home className="h-5 w-5" />
          <span 
            className="text-xs mt-0.5"
            style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
          >
            หน้าแรก
          </span>
        </button>
        
        <button 
          onClick={() => setActiveTab("explore")}
          className={cn(
            "flex flex-col items-center justify-center h-full w-16",
            activeTab === "explore" ? "text-[#B39B7D]" : "text-[#B39B7D]/60"
          )}
        >
          <Compass className="h-5 w-5" />
          <span 
            className="text-xs mt-0.5"
            style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
          >
            ค้นหา
          </span>
        </button>
        
        <button 
          onClick={() => setActiveTab("booking")}
          className={cn(
            "flex flex-col items-center justify-center h-full w-16",
            activeTab === "booking" ? "text-[#B39B7D]" : "text-[#B39B7D]/60"
          )}
        >
          <CalendarIcon className="h-5 w-5" />
          <span 
            className="text-xs mt-0.5"
            style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
          >
            จองทัวร์
          </span>
        </button>
        
        <button 
          onClick={() => setActiveTab("profile")}
          className={cn(
            "flex flex-col items-center justify-center h-full w-16",
            activeTab === "profile" ? "text-[#B39B7D]" : "text-[#B39B7D]/60"
          )}
        >
          <User className="h-5 w-5" />
          <span 
            className="text-xs mt-0.5"
            style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
          >
            โปรไฟล์
          </span>
        </button>
      </div>
      
      {/* Chat UI */}
      <ThaiChatUI />
    </div>
  );
};

export default TourDerWang;
