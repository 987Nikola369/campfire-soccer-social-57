import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Heart, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Post } from "@/types/post";

const Profile = () => {
  const [showCoverUpload, setShowCoverUpload] = useState(false);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [pendingCoverImage, setPendingCoverImage] = useState<string | null>(null);
  const [pendingAvatarImage, setPendingAvatarImage] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Load saved images from localStorage on component mount
    const savedCoverImage = localStorage.getItem('coverImage');
    const savedAvatarImage = localStorage.getItem('avatarImage');
    if (savedCoverImage) setCoverImage(savedCoverImage);
    if (savedAvatarImage) setAvatarImage(savedAvatarImage);
  }, []);

  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      const allPosts = JSON.parse(savedPosts);
      // Filter posts to show only the current user's posts
      const userPosts = allPosts.filter((post: Post) => post.userId === "current-user");
      setPosts(userPosts);
    }
  }, []);

  const cropToSquare = (imageUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = Math.min(img.width, img.height);
        canvas.width = size;
        canvas.height = size;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(imageUrl);
        
        const offsetX = (img.width - size) / 2;
        const offsetY = (img.height - size) / 2;
        
        ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = imageUrl;
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'avatar') => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageUrl = reader.result as string;
      if (type === 'cover') {
        setPendingCoverImage(imageUrl);
      } else {
        const croppedImage = await cropToSquare(imageUrl);
        setPendingAvatarImage(croppedImage);
      }
      setHasChanges(true);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = () => {
    if (pendingCoverImage) {
      setCoverImage(pendingCoverImage);
      localStorage.setItem('coverImage', pendingCoverImage);
    }
    if (pendingAvatarImage) {
      setAvatarImage(pendingAvatarImage);
      localStorage.setItem('avatarImage', pendingAvatarImage);
    }
    setHasChanges(false);
    toast({
      title: "Success",
      description: "Profile images updated successfully",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in duration-700 ease-in-out">
      <div className="relative mt-[-5rem]" 
           onMouseEnter={() => setShowCoverUpload(true)}
           onMouseLeave={() => setShowCoverUpload(false)}>
        <div 
          className="h-48 w-full rounded-b-lg bg-cover bg-center"
          style={{
            backgroundImage: pendingCoverImage || coverImage ? 
              `url(${pendingCoverImage || coverImage})` : 
              'linear-gradient(to right, #231F20, #E41E12)'
          }}
        ></div>
        {showCoverUpload && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 bg-[#E41E12] hover:bg-[#ff2a1f] rounded-full transition-colors ease-in-out"
            onClick={() => document.getElementById('cover-upload')?.click()}
          >
            <Camera className="h-4 w-4 text-white" />
          </Button>
        )}
        <input
          type="file"
          id="cover-upload"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, 'cover')}
        />
        
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
             onMouseEnter={() => setShowAvatarUpload(true)}
             onMouseLeave={() => setShowAvatarUpload(false)}>
          <Avatar className="h-32 w-32 border-4 border-[#E41E12] relative">
            {(pendingAvatarImage || avatarImage) ? (
              <AvatarImage src={pendingAvatarImage || avatarImage} alt="Profile" />
            ) : (
              <AvatarFallback className="text-4xl">NI</AvatarFallback>
            )}
            {showAvatarUpload && (
              <Button
                variant="secondary"
                size="icon"
                className="absolute inset-0 bg-[#E41E12] hover:bg-[#ff2a1f] rounded-full flex items-center justify-center transition-colors ease-in-out"
                onClick={() => document.getElementById('avatar-upload')?.click()}
              >
                <Camera className="h-4 w-4 text-white" />
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
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-[#E41E12]">Nikola</h1>
          <p className="text-muted-foreground">Member since 1/25/2025</p>
          {hasChanges && (
            <Button 
              variant="secondary" 
              className="mt-4 bg-[#2a2d31] hover:bg-[#3a3d41] text-white border-none transition-colors ease-in-out"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          )}
        </div>
        
        <div className="mt-8">
          <Card className="bg-[#1a1d21]/90 backdrop-blur-lg border-none p-6 animate-in fade-in duration-700 ease-in-out">
            <h2 className="text-xl font-semibold mb-4 text-[#E41E12]">Posts</h2>
            {posts.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No posts yet</p>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onComment={handleComment}
                    onLikeComment={handleLikeComment}
                    onReplyComment={handleReplyComment}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
