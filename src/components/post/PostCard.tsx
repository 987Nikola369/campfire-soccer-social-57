import React, { useState, useEffect, useCallback } from 'react';
import { MoreHorizontal, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/auth'; // Import useAuthStore
import { usePostsStore } from '../../store/posts';
import { CommentSection } from './CommentSection';
import { LikeButton } from './LikeButton'; // Import LikeButton
import { Menu } from '@headlessui/react';
import { Trash2 } from 'lucide-react';

interface PostCardProps {
  post: {
    id: string;
    userId: string;
    content: string;
    media?: string[];
    createdAt: Date;
    likes: string[];
    comments: Comment[];
    userProfilePicture?: string;
  };
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user: loggedInUser, users } = useAuthStore();
  const { likePost, deletePost } = usePostsStore();
  const [isLiked, setIsLiked] = useState(post.likes.includes(loggedInUser?.id || ''));
  const [postUser, setPostUser] = useState({username: "User Name", profilePicture: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150"})

  useEffect(() => {
    const poster = users?.find(u => u.id === post.userId)
    if(poster){
      setPostUser(poster)
    }
  }, [post, users])

  const handleLike = useCallback(() => {
    if (!loggedInUser) return;
    likePost(post.id, loggedInUser.id);
    setIsLiked(!isLiked);
  }, [likePost, loggedInUser, post.id, isLiked]);

  if (!post) {
    return <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 mb-4">Loading...</div>;
  }

  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 mb-4"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <img
            src={post.userProfilePicture || postUser?.profilePicture || 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150'} // Replace with user profile pic
            alt={postUser?.username}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-white font-medium">{postUser?.username}</span>
          <span className="text-gray-400 text-sm"> · {post.createdAt instanceof Date ? post.createdAt.toLocaleDateString() : 'Invalid Date'}</span>
        </div>
        {loggedInUser?.id === post.userId && (
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="text-gray-400 hover:text-white transition-colors">
              <MoreHorizontal size={16} />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-700 rounded-md bg-[#16171E] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
                      onClick={() => deletePost(post.id)}
                    >
                      <Trash2
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Delete Post
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        )}
      </div>
      {post.content && <p className="text-white">{post.content}</p>}
      {post.media && post.media.length > 0 && (
        <div className="mt-2">
          {post.media.map((url, index) => (
            <motion.img
              key={index}
              src={url}
              alt="Post Media"
              className="rounded-lg w-full mt-2"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            />
          ))}
        </div>
      )}
      <div className="flex items-center justify-between mt-3">
        <LikeButton
          likes={post.likes}
          onLike={handleLike}
          className={`flex items-center space-x-1 text-gray-400 hover:text-[#E41E12] transition-colors ${isLiked ? 'text-[#E41E12]' : ''}`}
        />
        <motion.button
          className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Rocket size={16} />
          <span>{post.comments.length} Comments</span>
        </motion.button>
      </div>
      <CommentSection postId={post.id} />
    </motion.div>
  );
};
