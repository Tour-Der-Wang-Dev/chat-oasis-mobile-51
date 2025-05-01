
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Camera, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AccountSettings() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+66 89 123 4567",
    notifications: {
      chat: true,
      promotions: false,
      updates: true,
    },
    language: "th",
    textSize: "medium",
  });

  return (
    <div className="min-h-screen pb-20 bg-[#FFF8E7]">
      <header className="sticky top-0 z-10 bg-[#FFDEAD] px-4 py-3 flex items-center gap-3 safe-top">
        <button 
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FFE4B5]/50"
        >
          <ArrowLeft className="w-5 h-5 text-[#B39B7D]" />
        </button>
        <div>
          <h1 
            className="text-xl font-bold text-[#B39B7D]"
            style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
          >
            การตั้งค่าบัญชี
          </h1>
          <p className="text-xs text-[#B39B7D]/70">จัดการข้อมูลส่วนตัวและการตั้งค่า</p>
        </div>
      </header>
      
      <main className="p-4">
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-3">
            <Avatar className="h-24 w-24 border-2 border-[#FFD700]">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback className="bg-[#FFDEAD] text-[#B39B7D] text-xl">JD</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 bg-[#FFD700] w-8 h-8 rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4 text-[#B39B7D]" />
            </button>
          </div>
          
          <h2 
            className="text-lg font-semibold text-[#B39B7D]"
            style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
          >
            {user.name}
          </h2>
          <p className="text-sm text-[#B39B7D]/70">{user.email}</p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 
              className="font-medium mb-3 text-[#B39B7D]"
              style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
            >
              ข้อมูลส่วนตัว
            </h3>
            
            <div className="space-y-3">
              <div>
                <Label 
                  htmlFor="name"
                  className="text-sm text-[#B39B7D]/80 mb-1 block"
                  style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                >
                  ชื่อ-นามสกุล
                </Label>
                <Input 
                  id="name"
                  value={user.name}
                  onChange={(e) => setUser({...user, name: e.target.value})}
                  className="border-[#FFDEAD] focus:border-[#FFD700] focus:ring-[#FFD700]/20"
                />
              </div>
              
              <div>
                <Label 
                  htmlFor="email"
                  className="text-sm text-[#B39B7D]/80 mb-1 block"
                  style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                >
                  อีเมล
                </Label>
                <Input 
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({...user, email: e.target.value})}
                  className="border-[#FFDEAD] focus:border-[#FFD700] focus:ring-[#FFD700]/20"
                />
              </div>
              
              <div>
                <Label 
                  htmlFor="phone"
                  className="text-sm text-[#B39B7D]/80 mb-1 block"
                  style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                >
                  เบอร์โทรศัพท์
                </Label>
                <Input 
                  id="phone"
                  value={user.phone}
                  onChange={(e) => setUser({...user, phone: e.target.value})}
                  className="border-[#FFDEAD] focus:border-[#FFD700] focus:ring-[#FFD700]/20"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 
              className="font-medium mb-3 text-[#B39B7D]"
              style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
            >
              การแจ้งเตือน
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label 
                  htmlFor="notif-chat"
                  className="text-[#B39B7D]"
                  style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                >
                  ข้อความแชท
                </Label>
                <Switch 
                  id="notif-chat"
                  checked={user.notifications.chat}
                  onCheckedChange={(checked) => 
                    setUser({
                      ...user, 
                      notifications: {...user.notifications, chat: checked}
                    })
                  }
                  className="data-[state=checked]:bg-[#FFD700]"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label 
                  htmlFor="notif-promo"
                  className="text-[#B39B7D]"
                  style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                >
                  โปรโมชันและข้อเสนอ
                </Label>
                <Switch 
                  id="notif-promo"
                  checked={user.notifications.promotions}
                  onCheckedChange={(checked) => 
                    setUser({
                      ...user, 
                      notifications: {...user.notifications, promotions: checked}
                    })
                  }
                  className="data-[state=checked]:bg-[#FFD700]"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label 
                  htmlFor="notif-updates"
                  className="text-[#B39B7D]"
                  style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                >
                  อัพเดทระบบ
                </Label>
                <Switch 
                  id="notif-updates"
                  checked={user.notifications.updates}
                  onCheckedChange={(checked) => 
                    setUser({
                      ...user, 
                      notifications: {...user.notifications, updates: checked}
                    })
                  }
                  className="data-[state=checked]:bg-[#FFD700]"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 
              className="font-medium mb-3 text-[#B39B7D]"
              style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
            >
              การตั้งค่าแอป
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p 
                    className="text-[#B39B7D]"
                    style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                  >
                    ภาษา
                  </p>
                  <p 
                    className="text-xs text-[#B39B7D]/70"
                    style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                  >
                    {user.language === 'th' ? 'ภาษาไทย' : 'English'}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#FFDEAD] text-[#B39B7D]"
                  onClick={() => setUser({...user, language: user.language === 'th' ? 'en' : 'th'})}
                >
                  เปลี่ยน
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p 
                    className="text-[#B39B7D]"
                    style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                  >
                    ขนาดตัวอักษร
                  </p>
                  <p 
                    className="text-xs text-[#B39B7D]/70"
                    style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
                  >
                    {user.textSize === 'small' ? 'เล็ก' : user.textSize === 'medium' ? 'กลาง' : 'ใหญ่'}
                  </p>
                </div>
                <div className="flex gap-1">
                  {['small', 'medium', 'large'].map((size) => (
                    <button 
                      key={size}
                      onClick={() => setUser({...user, textSize: size})}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        user.textSize === size ? 'bg-[#FFD700] text-[#B39B7D]' : 'bg-[#FFDEAD]/50 text-[#B39B7D]/70'
                      }`}
                    >
                      <span className={size === 'small' ? 'text-xs' : size === 'medium' ? 'text-sm' : 'text-base'}>
                        A
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 
              className="font-medium mb-3 text-[#B39B7D]"
              style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
            >
              ความเป็นส่วนตัวและความปลอดภัย
            </h3>
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start text-[#B39B7D] border-[#FFDEAD]"
                style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
              >
                เปลี่ยนรหัสผ่าน
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start text-[#B39B7D] border-[#FFDEAD]"
                style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
              >
                การตั้งค่าความเป็นส่วนตัว
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-500 border-[#FFDEAD]"
                style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
              >
                ลบบัญชี
              </Button>
            </div>
          </div>
          
          <Button 
            variant="outline"
            className="w-full flex items-center gap-2 justify-center text-[#B39B7D] border-[#FFDEAD] mt-4"
            style={{ fontFamily: 'Sukhumvit Set, Roboto, sans-serif' }}
          >
            <LogOut className="w-4 h-4" />
            ออกจากระบบ
          </Button>
        </div>
      </main>
    </div>
  );
}
