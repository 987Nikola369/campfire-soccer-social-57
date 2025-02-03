import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageSquare } from "lucide-react";
import { Post } from "@/types/post";
import CommentSection from "./CommentSection";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
}

const PostCard = ({ post, onLike, onComment }: PostCardProps) => {
  const [avatarImage] = useState<string | null>(() => localStorage.getItem('avatarImage'));

  return (
    <Card className="p-4 bg-[#1a1d21] border-none shadow-lg animate-fade-in">
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

      <div className="flex gap-4 text-gray-400 mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`hover:bg-[#2a2d31] gap-2 hover:scale-105 transition-transform ${
            post.likes.includes("current-user") ? "text-[#E41E12]" : ""
          }`}
          onClick={() => onLike(post.id)}
        >
          <Heart className="w-4 h-4" />
          {post.likes.length}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="hover:bg-[#2a2d31] gap-2 hover:scale-105 transition-transform"
        >
          <MessageSquare className="w-4 h-4" />
          {post.comments.length}
        </Button>
      </div>

      <CommentSection
        postId={post.id}
        comments={post.comments}
        onComment={onComment}
        onLikeComment={() => {}}
        onReplyComment={() => {}}
      />
    </Card>
  );
};

export default PostCard;