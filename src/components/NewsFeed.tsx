import { useState, useEffect } from "react";
import { Post } from "@/types/post";
import PostCreationForm from "./post/PostCreationForm";
import PostCard from "./post/PostCard";

const NewsFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

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
    if (!content.trim()) {
      const savedPosts = localStorage.getItem('posts');
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      }
      return;
    }
    
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
  };

  const handleDelete = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
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
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default NewsFeed;