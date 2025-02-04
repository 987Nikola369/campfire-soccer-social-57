import { useState, useEffect } from "react";
import { Post } from "@/types/post";
import PostCreationForm from "./post/PostCreationForm";
import PostCard from "./post/PostCard";
import { useToast } from "@/components/ui/use-toast";

const NewsFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleNewPost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
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
    
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: crypto.randomUUID(),
          userId: "current-user",
          userName: "Nikola",
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

    toast({
      title: "Success",
      description: "Comment added successfully",
    });
  };

  const handleLikeComment = (commentId: string) => {
    setPosts(prev => prev.map(post => ({
      ...post,
      comments: post.comments.map(comment => {
        if (comment.id === commentId) {
          const userId = "current-user";
          const hasLiked = comment.likes.includes(userId);
          return {
            ...comment,
            likes: hasLiked
              ? comment.likes.filter(id => id !== userId)
              : [...comment.likes, userId]
          };
        }
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id === commentId) {
              const userId = "current-user";
              const hasLiked = reply.likes.includes(userId);
              return {
                ...reply,
                likes: hasLiked
                  ? reply.likes.filter(id => id !== userId)
                  : [...reply.likes, userId]
              };
            }
            return reply;
          })
        };
      })
    })));
  };

  const handleReplyComment = (commentId: string, content: string) => {
    if (!content.trim()) return;

    setPosts(prev => prev.map(post => ({
      ...post,
      comments: post.comments.map(comment => {
        if (comment.id === commentId) {
          const newReply = {
            id: crypto.randomUUID(),
            userId: "current-user",
            userName: "Nikola",
            content,
            createdAt: new Date().toISOString(),
            likes: []
          };
          return {
            ...comment,
            replies: [newReply, ...comment.replies]
          };
        }
        return comment;
      })
    })));

    toast({
      title: "Success",
      description: "Reply added successfully",
    });
  };

  const handleDelete = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    toast({
      title: "Success",
      description: "Post deleted successfully",
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 py-4">
      <div className="bg-[#1a1d21] rounded-lg p-4 shadow-lg">
        <PostCreationForm onPostCreated={handleNewPost} />
      </div>
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
  );
};

export default NewsFeed;