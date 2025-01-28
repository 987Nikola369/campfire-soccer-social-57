import { useState, useEffect } from "react";
import { Post } from "@/types/post";
import { User, UserRole } from "@/types/user";
import PostCreationForm from "@/components/post/PostCreationForm";
import PostCard from "@/components/post/PostCard";
import { useToast } from "@/components/ui/use-toast";

const Academy = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // For now, we'll simulate a logged-in user with a specific role
    // This should be replaced with actual authentication later
    const mockUser: User = {
      id: "current-user",
      email: "user@example.com",
      userName: "Nikola",
      role: "standard" as UserRole, // Change this to test different roles
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
    <div className="space-y-4 py-4">
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