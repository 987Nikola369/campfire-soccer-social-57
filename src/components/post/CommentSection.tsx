import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/auth'; // Import useAuthStore
import { usePostsStore } from '../../store/posts';
import { Comment } from '../../types';
import { CommentCard } from './CommentCard';
import { Send } from 'lucide-react'; // Import Send icon
import { ErrorBoundary } from './ErrorBoundary'; // Import ErrorBoundary

interface CommentSectionProps {
  postId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { user } = useAuthStore();
  const { posts, addComment } = usePostsStore();
  const [commentContent, setCommentContent] = useState('');
  const post = posts.find((p) => p.id === postId);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log('CommentSection - Post retrieved:', post);
  }, [post]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !commentContent.trim()) return;
    addComment(postId, user.id, commentContent);
    setCommentContent('');
    if (commentInputRef.current) {
      commentInputRef.current.value = ''; // Clear the textarea
    }
    console.log('CommentSection - Comment added:', commentContent);
  };

  if (!post) {
    console.log('CommentSection - No post found for postId:', postId);
    return <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 text-center text-gray-400">No post found</div>;
  }

  return (
    <motion.div
      className="mt-4"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <form onSubmit={handleAddComment} className="flex space-x-4 mb-4">
        <motion.img
          src={user?.profilePicture || 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150'}
          alt={user?.username || 'User'}
          className="h-8 w-8 rounded-full object-cover"
          whileHover={{ scale: 1.1 }}
        />
        <div className="flex-1 relative">
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Add a comment..."
            className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none p-2 border border-gray-700 rounded-full"
            rows={1}
            ref={commentInputRef}
          />
        </div>
        <motion.button
          type="submit"
          disabled={commentContent.trim() === ''}
          className="bg-[#E41E12] text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#E41E12]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Send size={20} />
        </motion.button>
      </form>

      {post?.comments.map((comment) => (
        <ErrorBoundary key={comment.id} fallback={<p className="text-red-500">Failed to load comment</p>}>
          <CommentCard comment={comment} postId={postId} />
        </ErrorBoundary>
      ))}
    </motion.div>
  );
};
