import { useState, useEffect } from "react";
import { Post } from "@/types/post";
import { User, UserRole } from "@/types/user";
import PostCreationForm from "@/components/post/PostCreationForm";
import PostCard from "@/components/post/PostCard";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Academy = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Mock users data
    const mockUsers: User[] = [
      {
        id: "1",
        email: "keto@example.com",
        userName: "Keto",
        role: "standard",
        joinDate: "2025-01-25"
      },
      {
        id: "2",
        email: "martin@example.com",
        userName: "Martin",
        role: "standard",
        joinDate: "2025-01-25"
      },
      {
        id: "3",
        email: "nikola@example.com",
        userName: "Nikola",
        role: "super_user",
        joinDate: "2025-01-25"
      }
    ];
    setUsers(mockUsers);

    // For now, we'll simulate a logged-in user with a specific role
    const mockUser: User = {
      id: "current-user",
      email: "user@example.com",
      userName: "Nikola",
      role: "super_user" as UserRole,
      joinDate: new Date().toISOString()
    };
    setCurrentUser(mockUser);

    // Load existing posts
    const savedPosts = localStorage.getItem('academy_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Initialize with sample posts if none exist
      const samplePosts: Post[] = [
        {
          id: "1",
          userId: "academy",
          userName: "Academy Staff",
          content: "Welcome to our new training facility! We're excited to announce the opening of our state-of-the-art indoor training center.",
          createdAt: new Date().toISOString(),
          likes: [],
          comments: [],
          mediaUrl: "/lovable-uploads/1c1d9558-65a2-46c7-95bb-c69e831d91a7.png",
          mediaType: "image"
        },
        {
          id: "2",
          userId: "academy",
          userName: "Academy Staff",
          content: "Congratulations to our U17 team for winning the regional championship! Your dedication and hard work paid off.",
          createdAt: new Date().toISOString(),
          likes: [],
          comments: [],
          mediaUrl: "/lovable-uploads/1621746e-2299-451a-9e17-01589d3389cf.png",
          mediaType: "image"
        }
      ];
      setPosts(samplePosts);
      localStorage.setItem('academy_posts', JSON.stringify(samplePosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('academy_posts', JSON.stringify(posts));
  }, [posts]);

  const canPost = (role: UserRole): boolean => {
    return role === 'coach' || role === 'super_user';
  };

  const handleNewPost = (newPost: Post) => {
    if (!currentUser || !canPost(currentUser.role)) {
      toast({
        title: "Permission Denied",
        description: "Only coaches and administrators can post in the Academy Feed.",
        variant: "destructive"
      });
      return;
    }

    // Create notification for super_user posts
    if (currentUser.role === 'super_user') {
      const notification = {
        id: crypto.randomUUID(),
        userId: "all",
        type: "academy_post",
        postId: newPost.id,
        actorId: currentUser.id,
        actorName: currentUser.userName,
        read: false,
        createdAt: new Date().toISOString()
      };
      
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      localStorage.setItem('notifications', JSON.stringify([notification, ...notifications]));
    }

    setPosts(prev => [newPost, ...prev]);
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const userId = "current-user";
        const hasLiked = post.likes.includes(userId);
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
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: crypto.randomUUID(),
          userId: "current-user",
          userName: currentUser?.userName || "Anonymous",
          content,
          createdAt: new Date().toISOString(),
          likes: [],
          replies: []
        };
        
        return {
          ...post,
          comments: [newComment, ...post.comments]
        };
      }
      return post;
    }));
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-[#1a1d21]/90 backdrop-blur-lg border-none">
        <h2 className="text-xl font-semibold mb-4 text-[#E41E12]">Users</h2>
        <div className="flex flex-wrap gap-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center gap-2 bg-[#2a2d31] p-2 rounded-lg">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-[#3a3d41] text-white">
                  {user.userName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-white">{user.userName}</p>
                <p className="text-xs text-gray-400">Member since {new Date(user.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {currentUser && canPost(currentUser.role) && (
        <PostCreationForm onPostCreated={handleNewPost} />
      )}
      
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={handleLike}
          onComment={handleComment}
        />
      ))}
    </div>
  );
};

export default Academy;