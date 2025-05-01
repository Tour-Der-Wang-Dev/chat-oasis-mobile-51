import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { userService, User } from "@/lib/api/services/userService";
import { useApi } from "@/hooks/use-api";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Use our API hook to fetch profile data
  const {
    execute: fetchProfile,
    data: profile,
    loading: isLoading,
    error: profileError
  } = useApi<User>(userService.fetchProfile);
  
  // Use another instance for profile updates
  const {
    execute: updateProfile,
    loading: isUpdating,
    error: updateError
  } = useApi<User, Partial<User>>(
    userService.updateProfile,
    {
      onSuccess: (data) => {
        // On successful update, exit edit mode
        setIsEditing(false);
      }
    }
  );
  
  // Fetch profile data when component mounts
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  
  // Local state for editing profile
  const [editedProfile, setEditedProfile] = useState<Partial<User>>({
    name: '',
    email: ''
  });
  
  // Update local state when profile data is loaded
  useEffect(() => {
    if (profile) {
      setEditedProfile({
        name: profile.name,
        email: profile.email
      });
    }
  }, [profile]);
  
  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveProfile = () => {
    updateProfile(editedProfile);
  };
  
  // Combined error from fetch or update
  const error = profileError || updateError;
  
  // Loading placeholder
  if (isLoading && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 safe-bottom">
      <header className="bg-primary p-3 sm:p-4 shadow-sm safe-top">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">Your account settings</p>
      </header>
      
      <main className="p-3 sm:p-4">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error.message || "Failed to load profile data"}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex flex-col items-center mb-6 sm:mb-8 pt-2 sm:pt-4">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24 mb-3 sm:mb-4">
            <AvatarImage src={profile?.avatar || "https://github.com/shadcn.png"} alt={profile?.name || "User"} />
            <AvatarFallback>{profile?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          
          {!isEditing ? (
            <>
              <h2 className="text-lg sm:text-xl font-semibold">{profile?.name || "User"}</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">{profile?.email || "user@example.com"}</p>
              
              <Button 
                variant="outline" 
                className="mt-3 sm:mt-4 text-sm py-1.5"
                onClick={handleEditToggle}
                disabled={isLoading}
              >
                Edit Profile
              </Button>
            </>
          ) : (
            <>
              <div className="w-full max-w-xs space-y-2 my-2">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs text-muted-foreground">Name</label>
                  <input
                    id="name"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleInputChange}
                    className="w-full p-2 text-sm border rounded"
                  />
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs text-muted-foreground">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={editedProfile.email}
                    onChange={handleInputChange}
                    className="w-full p-2 text-sm border rounded"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 mt-3">
                <Button 
                  variant="outline"
                  onClick={handleEditToggle}
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveProfile}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </>
          )}
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
