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
    <div className="mt-4 space-y-4">
      <div className="flex gap-2 items-center">
        <Textarea
          placeholder="Write a comment..."
          className="bg-[#1e2124] border-none text-gray-300 resize-none h-10 min-h-[40px] rounded-full px-4 py-2"
          id={`comment-${postId}`}
        />
        <Button
          size="icon"
          className="bg-[#E41E12] hover:bg-[#E41E12]/90 w-10 h-10 rounded-full flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
          onClick={() => {
            const textarea = document.getElementById(`comment-${postId}`) as HTMLTextAreaElement;
            onComment(postId, textarea.value);
            textarea.value = '';
          }}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      
      {comments.map((comment) => (
        <div key={comment.id} className="pl-4 sm:pl-8 pt-2">
          <div className="bg-[#1e2124] rounded-lg p-2">
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
              <span className="font-semibold text-sm text-white">{comment.userName}</span>
              <span className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-300 break-words pl-8">{comment.content}</p>
          </div>
          
          <div className="flex gap-4 mt-2 pl-8">
            <Button
              variant="ghost"
              size="sm"
              className={`p-0 h-auto hover:bg-transparent ${
                comment.likes.includes("current-user") ? "text-[#E41E12]" : "text-gray-500"
              } hover:text-[#E41E12] transition-colors flex items-center gap-1`}
              onClick={() => onLikeComment(comment.id)}
            >
              <Heart className="w-4 h-4" />
              <span className="text-xs">{comment.likes.length}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto text-gray-500 hover:text-white hover:bg-transparent transition-colors flex items-center gap-1"
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            >
              <span className="text-xs">Reply</span>
            </Button>
          </div>

          {replyingTo === comment.id && (
            <div className="mt-2 flex gap-2 pl-8 animate-fade-in">
              <Textarea
                placeholder="Write a reply..."
                className="bg-[#1e2124] border-none text-gray-300 resize-none h-10 min-h-[40px] flex-1 text-sm rounded-full px-4 py-2"
                id={`reply-${comment.id}`}
              />
              <Button
                size="icon"
                className="bg-[#E41E12] hover:bg-[#E41E12]/90 w-10 h-10 rounded-full flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                onClick={() => handleReplySubmit(comment.id)}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          )}

          {comment.replies.map((reply) => (
            <div key={reply.id} className="ml-8 mt-2">
              <div className="bg-[#1e2124] rounded-lg p-2">
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
                  <span className="font-semibold text-sm text-white">{reply.userName}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(reply.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                    })}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-300 break-words pl-7">{reply.content}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={`p-0 h-auto mt-1 ml-8 hover:bg-transparent ${
                  reply.likes.includes("current-user") ? "text-[#E41E12]" : "text-gray-500"
                } hover:text-[#E41E12] transition-colors flex items-center gap-1`}
                onClick={() => onLikeComment(reply.id)}
              >
                <Heart className="w-3 h-3" />
                <span className="text-xs">{reply.likes.length}</span>
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
