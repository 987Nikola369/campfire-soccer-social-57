import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { Comment } from "@/types/post";

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onComment: (postId: string, content: string) => void;
}

const CommentSection = ({ postId, comments, onComment }: CommentSectionProps) => {
  const [avatarImage] = useState<string | null>(() => localStorage.getItem('avatarImage'));

  return (
    <div className="mt-4 space-y-4">
      <div className="flex gap-2 flex-col sm:flex-row">
        <Textarea
          placeholder="Write a comment..."
          className="bg-[#2a2d31] border-none text-gray-300 resize-none min-h-[40px] flex-1"
          id={`comment-${postId}`}
        />
        <Button
          size="sm"
          className="bg-[#E41E12] hover:bg-[#E41E12]/90 w-full sm:w-auto"
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
        </div>
      ))}
    </div>
  );
};

export default CommentSection;