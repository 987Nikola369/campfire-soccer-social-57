import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/auth'; // Import useAuthStore
import { usePostsStore } from '../../store/posts';
import { Comment } from '../../types';
import { LikeButton } from './LikeButton'; // Import LikeButton
import { Send } from 'lucide-react'; // Import Send icon
import { ErrorBoundary } from './ErrorBoundary'; // Import ErrorBoundary
import { Menu } from '@headlessui/react';
import { Trash2 } from 'lucide-react';
import { MoreHorizontal } from 'lucide-react'; // Import MoreHorizontal icon

interface CommentCardProps {
  comment: Comment;
  postId: string;
}

export const CommentCard: React.FC<CommentCardProps> = ({ comment, postId }) => {
  const { user: loggedInUser, users } = useAuthStore();
  const { likeComment, addComment, deleteComment } = usePostsStore();
  const [isLiked, setIsLiked] = useState(comment.likes.includes(loggedInUser?.id || ''));
  const [replyContent, setReplyContent] = useState('');
  const [isReplyVisible, setIsReplyVisible] = useState(false);
  const [commenter, setCommenter] = useState({username: "User Name", profilePicture: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150"})

  useEffect(() => {
    const commenter = users?.find(u => u.id === comment.userId)
    if(commenter){
      setCommenter(commenter)
      console.log('useEffect - Commenter found:', commenter);
    } else {
      console.log('useEffect - Commenter not found for userId:', comment.userId);
    }
  }, [comment, users])

  const handleLike = useCallback(() => {
    if (!loggedInUser) return;
    likeComment(postId, comment.id, loggedInUser.id);
    setIsLiked(!isLiked);
    console.log('handleLike - Comment liked:', comment.id);
  }, [likeComment, loggedInUser, postId, comment.id, isLiked]);

  const handleAddReply = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!loggedInUser || !replyContent.trim()) return;
    addComment(postId, loggedInUser.id, replyContent, comment.id);
    setReplyContent('');
    setIsReplyVisible(false);
    console.log('handleAddReply - Reply added:', replyContent);
  }, [addComment, loggedInUser, postId, comment.id, replyContent]);

  const handleDeleteComment = () => {
    deleteComment(postId, comment.id);
    console.log('handleDeleteComment - Comment deleted:', comment.id);
  };

  return (
    <motion.div
      className="bg-[#16171E] rounded-lg p-4 mb-2"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <img
            src={commenter?.profilePicture || "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150"} // Replace with user profile pic
            alt={commenter?.username}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-white font-medium">{commenter?.username}</span> {/* Replace with username */}
          <span className="text-gray-400 text-sm"> · {comment.createdAt instanceof Date ? comment.createdAt.toLocaleDateString() : 'Invalid Date'}</span>
        </div>
        {loggedInUser?.id === comment.userId && (
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="text-gray-400 hover:text-white transition-colors">
              <MoreHorizontal size={16} />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={handleDeleteComment}
                    >
                      <Trash2
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Delete Comment
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        )}
      </div>
      <p className="text-white">{comment.content}</p>

      <div className="flex items-center justify-between mt-3">
        <LikeButton
          likes={comment.likes}
          onLike={handleLike}
          className="text-gray-400 hover:text-[#E41E12] transition-colors"
        />
        <motion.button
          type="button"
          className="bg-gray-900/50 backdrop-blur-sm rounded-full p-2 text-gray-400 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsReplyVisible(!isReplyVisible)}
        >
          <span className="text-sm">Reply</span>
        </motion.button>
      </div>

      {isReplyVisible && (
        <form onSubmit={handleAddReply} className="flex space-x-4 mt-2">
          <motion.img
            src={loggedInUser?.profilePicture || 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150'}
            alt={loggedInUser?.username || 'User'}
            className="h-6 w-6 rounded-full object-cover"
            whileHover={{ scale: 1.1 }}
          />
          <div className="flex-1 relative">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Reply..."
              className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none p-2 border border-gray-700 rounded-full"
              rows={1}
            />
          </div>
          <motion.button
            type="submit"
            disabled={replyContent.trim() === ''}
            className="bg-[#E41E12] text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#E41E12]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send size={20} />
          </motion.button>
        </form>
      )}

      {comment.replies.length > 0 && (
        <motion.div
          className="ml-8 mt-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {comment.replies.map((reply) => (
            <ErrorBoundary key={reply.id} fallback={<p className="text-red-500">Failed to load reply</p>}>
              <CommentCard comment={reply} postId={postId} />
            </ErrorBoundary>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
