import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Profile = () => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="relative">
        <div className="h-48 w-full bg-gradient-to-r from-[#231F20] to-[#E41E12] rounded-t-lg"></div>
        <div className="absolute -bottom-16 left-8">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarFallback className="text-4xl">NI</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <div className="mt-20 px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Nikola</h1>
            <p className="text-muted-foreground">Member since 1/25/2025</p>
          </div>
          <Button variant="secondary" className="bg-[#2a2d31] hover:bg-[#3a3d41] text-white border-none">
            Edit Profile
          </Button>
        </div>
        
        <div className="mt-8">
          <Card className="bg-[#1a1d21]/90 backdrop-blur-lg border-none p-6">
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            <p className="text-muted-foreground text-center py-8">No posts yet</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;