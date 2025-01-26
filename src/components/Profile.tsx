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
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="relative" 
           onMouseEnter={() => setShowCoverUpload(true)}
           onMouseLeave={() => setShowCoverUpload(false)}>
        <div 
          className="h-48 w-full rounded-t-lg bg-cover bg-center"
          style={{
            backgroundImage: pendingCoverImage || coverImage ? 
              `url(${pendingCoverImage || coverImage})` : 
              'linear-gradient(to right, #231F20, #E41E12)'
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
        
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
             onMouseEnter={() => setShowAvatarUpload(true)}
             onMouseLeave={() => setShowAvatarUpload(false)}>
          <Avatar className="h-32 w-32 border-4 border-background relative">
            {(pendingAvatarImage || avatarImage) ? (
              <AvatarImage src={pendingAvatarImage || avatarImage} alt="Profile" />
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
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Nikola</h1>
          <p className="text-muted-foreground">Member since 1/25/2025</p>
          {hasChanges && (
            <Button 
              variant="secondary" 
              className="mt-4 bg-[#2a2d31] hover:bg-[#3a3d41] text-white border-none"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          )}
        </div>
        
        <div className="mt-8">
          <Card className="bg-[#1a1d21]/90 backdrop-blur-lg border-none p-6">
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            {posts.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No posts yet</p>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} className="p-4 bg-[#2a2d31] border-none">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar>
                        <AvatarFallback className="bg-[#3a3d41] text-white">
                          {post.userName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-white">{post.userName}</h3>
                        <p className="text-sm text-gray-400">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <p className="mb-4 text-gray-200">{post.content}</p>
                    
                    {post.mediaUrl && (
                      <div className="mb-4">
                        {post.mediaType === 'image' ? (
                          <img src={post.mediaUrl} alt="Post media" className="max-h-96 rounded-lg" />
                        ) : (
                          <video src={post.mediaUrl} className="max-h-96 rounded-lg" controls />
                        )}
                      </div>
                    )}

                    <div className="flex gap-4 text-gray-400">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes.length}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments.length}</span>
                      </div>
                    </div>
                  </Card>
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
