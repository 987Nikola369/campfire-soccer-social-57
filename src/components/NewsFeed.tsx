import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageSquare, Image as ImageIcon, Video, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';
import { Post, Comment, Reply, Notification } from "@/types/post";

const NewsFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const { toast } = useToast();

  // Load posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!newPost.trim() && !mediaFile) return;

    const newPostObj: Post = {
      id: uuidv4(),
      userId: "current-user", // In a real app, this would come from auth
      userName: "Nikola", // In a real app, this would come from auth
      content: newPost,
      mediaUrl: mediaPreview || undefined,
      mediaType: mediaFile?.type.startsWith('image/') ? 'image' : 'video',
      createdAt: new Date().toISOString(),
      likes: [],
      comments: []
    };

    setPosts(prev => [newPostObj, ...prev]);
    setNewPost("");
    setMediaFile(null);
    setMediaPreview(null);
    
    toast({
      title: "Success",
      description: "Post created successfully",
    });
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const userId = "current-user";
        const hasLiked = post.likes.includes(userId);
        
        // Only create notification if it's not a self-like
        if (!hasLiked && post.userId !== userId) {
          const notification: Notification = {
            id: uuidv4(),
            userId: post.userId,
            type: 'like',
            postId: post.id,
            actorId: userId,
            actorName: "Nikola",
            read: false,
            createdAt: new Date().toISOString()
          };
          
          // Save notification to localStorage
          const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
          localStorage.setItem('notifications', JSON.stringify([notification, ...notifications]));
        }
        
        return {
          ...post,
          likes: hasLiked 
            ? post.likes.filter(id => id !== userId)
            : [...post.likes, userId]
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: string, content: string) => {
    if (!content.trim()) return;
    
    const newComment: Comment = {
      id: uuidv4(),
      userId: "current-user",
      userName: "Nikola",
      content,
      createdAt: new Date().toISOString(),
      likes: [],
      replies: []
    };

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        // Create notification for comment
        if (post.userId !== "current-user") {
          const notification: Notification = {
            id: uuidv4(),
            userId: post.userId,
            type: 'comment',
            postId: post.id,
            actorId: "current-user",
            actorName: "Nikola",
            read: false,
            createdAt: new Date().toISOString()
          };
          
          const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
          localStorage.setItem('notifications', JSON.stringify([notification, ...notifications]));
        }
        
        return {
          ...post,
          comments: [newComment, ...post.comments]
        };
      }
      return post;
    }));
  };

  return (
    <div className="space-y-4 py-4">
      <Card className="p-4 bg-[#1a1d21]/90 backdrop-blur-lg border-none">
        <Textarea
          placeholder="Share something with the team..."
          className="bg-[#2a2d31] border-none text-gray-300 mb-4 min-h-[96px] resize-none"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        {mediaPreview && (
          <div className="mb-4 relative">
            {mediaFile?.type.startsWith('image/') ? (
              <img src={mediaPreview} alt="Upload preview" className="w-full max-h-96 object-cover rounded-lg" />
            ) : (
              <video src={mediaPreview} className="w-full max-h-96 rounded-lg" controls />
            )}
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => {
                setMediaFile(null);
                setMediaPreview(null);
              }}
            >
              Remove
            </Button>
          </div>
        )}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2">
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white hover:bg-[#2a2d31] gap-2 flex-1 sm:flex-none"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              <ImageIcon className="w-5 h-5" />
              Image
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white hover:bg-[#2a2d31] gap-2 flex-1 sm:flex-none"
              onClick={() => document.getElementById('video-upload')?.click()}
            >
              <Video className="w-5 h-5" />
              Video
            </Button>
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleMediaUpload}
            />
            <input
              type="file"
              id="video-upload"
              className="hidden"
              accept="video/*"
              onChange={handleMediaUpload}
            />
          </div>
          <Button 
            className="bg-[#E41E12] hover:bg-[#E41E12]/90 text-white px-6 w-full sm:w-auto"
            onClick={handlePost}
            disabled={!newPost.trim() && !mediaFile}
          >
            Post
          </Button>
        </div>
      </Card>

      {posts.map((post) => (
        <Card key={post.id} className="p-4 bg-[#1a1d21]/90 backdrop-blur-lg border-none">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarFallback className="bg-[#2a2d31] text-white">
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
          
          <p className="mb-4 text-gray-200 break-words">{post.content}</p>
          
          {post.mediaUrl && (
            <div className="mb-4">
              {post.mediaType === 'image' ? (
                <img src={post.mediaUrl} alt="Post media" className="w-full max-h-96 object-cover rounded-lg" />
              ) : (
                <video src={post.mediaUrl} className="w-full max-h-96 rounded-lg" controls />
              )}
            </div>
          )}

          <div className="flex gap-4 text-gray-400">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`hover:bg-[#2a2d31] gap-2 ${
                post.likes.includes("current-user") ? "text-[#E41E12]" : ""
              }`}
              onClick={() => handleLike(post.id)}
            >
              <Heart className="w-4 h-4" />
              {post.likes.length}
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-[#2a2d31] gap-2">
              <MessageSquare className="w-4 h-4" />
              {post.comments.length}
            </Button>
          </div>

          <div className="mt-4 space-y-4">
            <div className="flex gap-2 flex-col sm:flex-row">
              <Textarea
                placeholder="Write a comment..."
                className="bg-[#2a2d31] border-none text-gray-300 resize-none min-h-[40px] flex-1"
                id={`comment-${post.id}`}
              />
              <Button
                size="sm"
                className="bg-[#E41E12] hover:bg-[#E41E12]/90 w-full sm:w-auto"
                onClick={() => {
                  const textarea = document.getElementById(`comment-${post.id}`) as HTMLTextAreaElement;
                  handleComment(post.id, textarea.value);
                  textarea.value = '';
                }}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {post.comments.map((comment) => (
              <div key={comment.id} className="pl-4 sm:pl-8 pt-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {comment.userName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-sm">{comment.userName}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-300 break-words">{comment.content}</p>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NewsFeed;
