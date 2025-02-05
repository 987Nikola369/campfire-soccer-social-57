import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageSquare, MoreVertical, Trash2 } from "lucide-react";
import { Post } from "@/types/post";
import CommentSection from "./CommentSection";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onLikeComment: (commentId: string) => void;
  onReplyComment: (commentId: string, content: string) => void;
  onDelete?: (postId: string) => void;
}

const PostCard = ({ 
  post, 
  onLike, 
  onComment, 
  onLikeComment,
  onReplyComment,
  onDelete 
}: PostCardProps) => {
  const [avatarImage] = useState<string | null>(() => localStorage.getItem('avatarImage'));
  const { toast } = useToast();

  const handleDelete = () => {
    if (onDelete) {
      onDelete(post.id);
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    }
  };

  return (
    <Card className="bg-[#1a1d21]/60 backdrop-blur-lg border-none shadow-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              {avatarImage ? (
                <img src={avatarImage} alt={post.userName} className="object-cover" />
              ) : (
                <AvatarFallback>
                  {post.userName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="font-semibold">{post.userName}</h3>
              <p className="text-sm text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          {onDelete && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#E41E12] border-none">
                <DropdownMenuItem 
                  className="text-white focus:text-white focus:bg-[#ff2a1f]"
                  onClick={handleDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        <p className="text-gray-300 mb-4 break-words">{post.content}</p>
        
        {post.mediaUrl && (
          <div className="mb-4 rounded-lg overflow-hidden">
            {post.mediaType === 'image' ? (
              <img src={post.mediaUrl} alt="Post media" className="w-full object-cover" />
            ) : (
              <video src={post.mediaUrl} className="w-full" controls />
            )}
          </div>
        )}
        
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`p-0 h-auto hover:scale-105 transition-transform ${
              post.likes.includes("current-user") ? "text-[#E41E12]" : "text-gray-400"
            }`}
            onClick={() => onLike(post.id)}
          >
            <Heart className="w-5 h-5 mr-1" />
            {post.likes.length}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto text-gray-400 hover:scale-105 transition-transform"
          >
            <MessageSquare className="w-5 h-5 mr-1" />
            {post.comments.length}
          </Button>
        </div>
      </div>
      
      <div className="border-t border-[#2a2d31] p-4 bg-[#1a1d21]/60 backdrop-blur-lg">
        <CommentSection
          postId={post.id}
          comments={post.comments}
          onComment={onComment}
          onLikeComment={onLikeComment}
          onReplyComment={onReplyComment}
        />
      </div>
    </Card>
  );
};

export default PostCard;