import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageSquare } from "lucide-react";
import { Post, Notification } from "@/types/post";
import { v4 as uuidv4 } from 'uuid';
import CommentSection from "./CommentSection";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
}

const PostCard = ({ post, onLike, onComment }: PostCardProps) => {
  const [avatarImage] = useState<string | null>(() => localStorage.getItem('avatarImage'));

  const createNotification = (type: 'like' | 'comment') => {
    // Only create notification if it's not a self-interaction
    if (post.userId === "current-user") return;

    const notification: Notification = {
      id: uuidv4(),
      userId: post.userId,
      type,
      postId: post.id,
      actorId: "current-user",
      actorName: "Nikola",
      read: false,
      createdAt: new Date().toISOString()
    };
    
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    localStorage.setItem('notifications', JSON.stringify([notification, ...notifications]));
  };

  const handleLike = () => {
    onLike(post.id);
    if (!post.likes.includes("current-user")) {
      createNotification('like');
    }
  };

  const handleComment = (postId: string, content: string) => {
    onComment(postId, content);
    createNotification('comment');
  };

  return (
    <Card className="p-4 bg-[#1a1d21]/90 backdrop-blur-lg border-none">
      <div className="flex items-center gap-3 mb-4">
        <Avatar>
          {avatarImage ? (
            <img src={avatarImage} alt={post.userName} className="object-cover" />
          ) : (
            <AvatarFallback className="bg-[#2a2d31] text-white">
              {post.userName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
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
          onClick={handleLike}
        >
          <Heart className="w-4 h-4" />
          {post.likes.length}
        </Button>
        <Button variant="ghost" size="sm" className="hover:bg-[#2a2d31] gap-2">
          <MessageSquare className="w-4 h-4" />
          {post.comments.length}
        </Button>
      </div>

      <CommentSection
        postId={post.id}
        comments={post.comments}
        onComment={handleComment}
      />
    </Card>
  );
};

export default PostCard;