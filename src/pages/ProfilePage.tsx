
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-16">
      <header className="bg-primary p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground">Your account settings</p>
      </header>
      
      <main className="p-4">
        <div className="flex flex-col items-center mb-8 pt-4">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          
          <h2 className="text-xl font-semibold">Jane Doe</h2>
          <p className="text-sm text-muted-foreground">jane.doe@example.com</p>
          
          <Button variant="outline" className="mt-4">
            Edit Profile
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-card rounded-xl p-4">
            <h3 className="font-medium mb-2">App Settings</h3>
            <div className="space-y-1">
              <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg cursor-pointer">
                <span>Notifications</span>
                <span className="text-muted-foreground">On</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg cursor-pointer">
                <span>Chat History</span>
                <span className="text-muted-foreground">Saved</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg cursor-pointer">
                <span>Text Size</span>
                <span className="text-muted-foreground">Medium</span>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-4">
            <h3 className="font-medium mb-2">Account</h3>
            <div className="space-y-1">
              <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg cursor-pointer">
                <span>Privacy Settings</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg cursor-pointer">
                <span>Change Password</span>
              </div>
              <div className="flex items-center justify-between p-2 text-destructive/80 hover:bg-muted/50 rounded-lg cursor-pointer">
                <span>Delete Account</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <Button variant="ghost" className="w-full" onClick={() => {}}>
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
