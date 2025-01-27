import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Heart, Reply } from "lucide-react";
import { Comment } from "@/types/post";

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onComment: (postId: string, content: string) => void;
  onLikeComment: (commentId: string) => void;
  onReplyComment: (commentId: string, content: string) => void;
}

const CommentSection = ({ 
  postId, 
  comments, 
  onComment, 
  onLikeComment,
  onReplyComment 
}: CommentSectionProps) => {
  const [avatarImage] = useState<string | null>(() => localStorage.getItem('avatarImage'));
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleReplySubmit = (commentId: string) => {
    const textarea = document.getElementById(`reply-${commentId}`) as HTMLTextAreaElement;
    if (textarea.value.trim()) {
      onReplyComment(commentId, textarea.value);
      textarea.value = '';
      setReplyingTo(null);
    }
  };

  return (
    <div className="mt-4 space-y-4 animate-fade-in">
      <div className="flex gap-2 items-center">
        <Textarea
          placeholder="Write a comment..."
          className="bg-[#2a2d31] border-none text-gray-300 resize-none min-h-[40px] flex-1"
          id={`comment-${postId}`}
        />
        <Button
          size="icon"
          className="bg-[#E41E12] hover:bg-[#E41E12]/90 shrink-0 hover:scale-105 transition-transform rounded-full !h-10 !w-10 !p-0"
          onClick={() => {
            const textarea = document.getElementById(`comment-${postId}`) as HTMLTextAreaElement;
            onComment(postId, textarea.value);
            textarea.value = '';
          }}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
      
      {comments.map((comment) => (
        <div key={comment.id} className="pl-4 sm:pl-8 pt-2 animate-fade-in">
          <div className="flex items-center gap-2 flex-wrap">
            <Avatar className="h-6 w-6">
              {avatarImage ? (
                <img src={avatarImage} alt={comment.userName} className="object-cover" />
              ) : (
                <AvatarFallback className="text-xs">
                  {comment.userName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="font-semibold text-sm">{comment.userName}</span>
            <span className="text-xs text-gray-400">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-300 break-words">{comment.content}</p>
          
          <div className="flex gap-2 mt-2">
            <Button
              variant="ghost"
              size="sm"
              className={`p-0 h-auto hover:scale-105 transition-transform ${
                comment.likes.includes("current-user") ? "text-[#E41E12]" : "text-gray-400"
              }`}
              onClick={() => onLikeComment(comment.id)}
            >
              <Heart className="w-4 h-4 mr-1" />
              {comment.likes.length}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto text-gray-400 hover:scale-105 transition-transform"
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            >
              <Reply className="w-4 h-4 mr-1" />
              Reply
            </Button>
          </div>

          {replyingTo === comment.id && (
            <div className="mt-2 flex gap-2 animate-fade-in">
              <Textarea
                placeholder="Write a reply..."
                className="bg-[#2a2d31] border-none text-gray-300 resize-none min-h-[40px] flex-1 text-sm"
                id={`reply-${comment.id}`}
              />
              <Button
                size="icon"
                className="bg-[#E41E12] hover:bg-[#E41E12]/90 hover:scale-105 transition-transform rounded-full !h-10 !w-10 !p-0"
                onClick={() => handleReplySubmit(comment.id)}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          )}

          {comment.replies.map((reply) => (
            <div key={reply.id} className="ml-8 mt-2 animate-fade-in">
              <div className="flex items-center gap-2 flex-wrap">
                <Avatar className="h-5 w-5">
                  {avatarImage ? (
                    <img src={avatarImage} alt={reply.userName} className="object-cover" />
                  ) : (
                    <AvatarFallback className="text-xs">
                      {reply.userName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="font-semibold text-sm">{reply.userName}</span>
                <span className="text-xs text-gray-400">
                  {new Date(reply.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-300 break-words">{reply.content}</p>
              <Button
                variant="ghost"
                size="sm"
                className={`p-0 h-auto mt-1 hover:scale-105 transition-transform ${
                  reply.likes.includes("current-user") ? "text-[#E41E12]" : "text-gray-400"
                }`}
                onClick={() => onLikeComment(reply.id)}
              >
                <Heart className="w-3 h-3 mr-1" />
                {reply.likes.length}
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
