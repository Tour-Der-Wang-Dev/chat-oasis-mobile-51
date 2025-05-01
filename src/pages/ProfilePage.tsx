
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20 safe-bottom">
      <header className="bg-primary p-3 sm:p-4 shadow-sm safe-top">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">Your account settings</p>
      </header>
      
      <main className="p-3 sm:p-4">
        <div className="flex flex-col items-center mb-6 sm:mb-8 pt-2 sm:pt-4">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24 mb-3 sm:mb-4">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          
          <h2 className="text-lg sm:text-xl font-semibold">Jane Doe</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">jane.doe@example.com</p>
          
          <Button variant="outline" className="mt-3 sm:mt-4 text-sm py-1.5">
            Edit Profile
          </Button>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-card rounded-xl p-3 sm:p-4">
            <h3 className="font-medium mb-2 text-sm sm:text-base text-left">App Settings</h3>
            <div className="space-y-1">
              <div className="flex items-center justify-between p-2 hover:bg-muted/50 active:bg-muted rounded-lg cursor-pointer text-sm">
                <span>Notifications</span>
                <span className="text-muted-foreground text-xs sm:text-sm">On</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-muted/50 active:bg-muted rounded-lg cursor-pointer text-sm">
                <span>Chat History</span>
                <span className="text-muted-foreground text-xs sm:text-sm">Saved</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-muted/50 active:bg-muted rounded-lg cursor-pointer text-sm">
                <span>Text Size</span>
                <span className="text-muted-foreground text-xs sm:text-sm">Medium</span>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-3 sm:p-4">
            <h3 className="font-medium mb-2 text-sm sm:text-base text-left">Account</h3>
            <div className="space-y-1">
              <div className="flex items-center justify-between p-2 hover:bg-muted/50 active:bg-muted rounded-lg cursor-pointer text-sm">
                <span>Privacy Settings</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-muted/50 active:bg-muted rounded-lg cursor-pointer text-sm">
                <span>Change Password</span>
              </div>
              <div className="flex items-center justify-between p-2 text-destructive/80 hover:bg-muted/50 active:bg-muted rounded-lg cursor-pointer text-sm">
                <span>Delete Account</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8">
            <Button variant="ghost" className="w-full text-sm" onClick={() => {}}>
              Sign Out
            </Button>
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;
