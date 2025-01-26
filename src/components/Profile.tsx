import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const [showCoverUpload, setShowCoverUpload] = useState(false);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved images from localStorage on component mount
    const savedCoverImage = localStorage.getItem('coverImage');
    const savedAvatarImage = localStorage.getItem('avatarImage');
    if (savedCoverImage) setCoverImage(savedCoverImage);
    if (savedAvatarImage) setAvatarImage(savedAvatarImage);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'avatar') => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      if (type === 'cover') {
        setCoverImage(imageUrl);
        localStorage.setItem('coverImage', imageUrl);
      } else {
        setAvatarImage(imageUrl);
        localStorage.setItem('avatarImage', imageUrl);
      }
      
      toast({
        title: "Success",
        description: `${type === 'cover' ? 'Cover' : 'Profile'} image updated successfully`,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="relative" 
           onMouseEnter={() => setShowCoverUpload(true)}
           onMouseLeave={() => setShowCoverUpload(false)}>
        <div 
          className="h-48 w-full rounded-t-lg bg-cover bg-center"
          style={{
            backgroundImage: coverImage ? `url(${coverImage})` : 'linear-gradient(to right, #231F20, #E41E12)'
          }}
        ></div>
        {showCoverUpload && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70"
            onClick={() => document.getElementById('cover-upload')?.click()}
          >
            <Camera className="mr-2 h-4 w-4" />
            Update Cover
          </Button>
        )}
        <input
          type="file"
          id="cover-upload"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, 'cover')}
        />
        
        <div className="absolute -bottom-16 left-8"
             onMouseEnter={() => setShowAvatarUpload(true)}
             onMouseLeave={() => setShowAvatarUpload(false)}>
          <Avatar className="h-32 w-32 border-4 border-background relative">
            {avatarImage ? (
              <AvatarImage src={avatarImage} alt="Profile" />
            ) : (
              <AvatarFallback className="text-4xl">NI</AvatarFallback>
            )}
            {showAvatarUpload && (
              <Button
                variant="secondary"
                size="sm"
                className="absolute inset-0 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center"
                onClick={() => document.getElementById('avatar-upload')?.click()}
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </Avatar>
          <input
            type="file"
            id="avatar-upload"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, 'avatar')}
          />
        </div>
      </div>
      
      <div className="mt-20 px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Nikola</h1>
            <p className="text-muted-foreground">Member since 1/25/2025</p>
          </div>
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