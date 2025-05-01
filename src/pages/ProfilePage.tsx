
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight, User, Calendar, Heart, Map, Settings, Bell, CreditCard, HelpCircle, LogOut } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";

const ProfilePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = true; // This would normally come from your auth state

  const menuItems = [
    { icon: <Calendar className="w-5 h-5" />, label: "ประวัติการจอง", path: "/bookings" },
    { icon: <Heart className="w-5 h-5" />, label: "รายการโปรด", path: "/favorites" },
    { icon: <Map className="w-5 h-5" />, label: "แผนที่ออฟไลน์", path: "/offline-maps" },
    { icon: <Bell className="w-5 h-5" />, label: "การแจ้งเตือน", path: "/notifications" },
    { icon: <CreditCard className="w-5 h-5" />, label: "การชำระเงิน", path: "/payments" },
    { icon: <Settings className="w-5 h-5" />, label: "การตั้งค่า", path: "/account-settings" },
    { icon: <HelpCircle className="w-5 h-5" />, label: "ช่วยเหลือ", path: "/help" },
  ];

  return (
    <MobileLayout>
      <header className="bg-[#FFDEAD] p-4 pb-6 shadow-sm safe-top">
        <h1 
          className="text-xl font-bold text-[#B39B7D]"
          style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
        >
          โปรไฟล์
        </h1>
        <p 
          className="text-xs text-[#B39B7D]/80"
          style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
        >
          จัดการข้อมูลส่วนตัวและการตั้งค่า
        </p>
      </header>
      
      <main className="px-4 py-6 bg-[#FFF8E7] flex-1">
        {isLoggedIn ? (
          <>
            <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex items-center">
              <Avatar className="h-16 w-16 border-2 border-[#FFD700]">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback className="bg-[#FFDEAD] text-[#B39B7D]">JD</AvatarFallback>
              </Avatar>
              
              <div className="ml-4 flex-1">
                <h2 
                  className="text-lg font-semibold text-[#B39B7D]"
                  style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                >
                  Jane Doe
                </h2>
                <p 
                  className="text-xs text-[#B39B7D]/70"
                  style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                >
                  jane.doe@example.com
                </p>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-1 h-8 text-xs text-[#B39B7D] hover:bg-[#FFDEAD]/20 p-0"
                  onClick={() => navigate("/account-settings")}
                  style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                >
                  แก้ไขโปรไฟล์
                </Button>
              </div>
              
              <ChevronRight className="w-5 h-5 text-[#B39B7D]/50" />
            </div>
            
            <div className="space-y-3">
              {menuItems.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-sm flex items-center hover:bg-[#FFDEAD]/10 transition-colors cursor-pointer"
                  onClick={() => navigate(item.path)}
                >
                  <div className="w-8 h-8 rounded-full bg-[#FFDEAD]/50 flex items-center justify-center mr-3">
                    <span className="text-[#B39B7D]">{item.icon}</span>
                  </div>
                  <span 
                    className="flex-1 text-[#B39B7D]"
                    style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                  >
                    {item.label}
                  </span>
                  <ChevronRight className="w-5 h-5 text-[#B39B7D]/50" />
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline"
              className="w-full mt-6 flex items-center gap-2 text-[#B39B7D] border-[#FFDEAD]"
              style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
            >
              <LogOut className="w-4 h-4" />
              ออกจากระบบ
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-24 h-24 rounded-full bg-[#FFDEAD] mb-4 flex items-center justify-center">
              <User className="w-12 h-12 text-[#B39B7D]" />
            </div>
            
            <h2 
              className="text-xl font-bold text-[#B39B7D] mb-2"
              style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
            >
              ยินดีต้อนรับ
            </h2>
            
            <p 
              className="text-sm text-[#B39B7D]/70 mb-6 text-center"
              style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
            >
              เข้าสู่ระบบเพื่อจัดการข้อมูลของคุณและเข้าถึงบริการทั้งหมด
            </p>
            
            <Button 
              className="w-full bg-[#FFD700] hover:bg-[#FFD700]/80 text-[#B39B7D] rounded-xl py-6 mb-4"
              style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
            >
              เข้าสู่ระบบ
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-[#FFE4B5] text-[#B39B7D] rounded-xl py-6"
              style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
            >
              สมัครสมาชิก
            </Button>
          </div>
        )}
      </main>
    </MobileLayout>
  );
};

export default ProfilePage;
