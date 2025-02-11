import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePostsStore } from '../store/posts';
import { PostCard } from '../components/post/PostCard';
import { useAuthStore } from '../store/auth';
import { CreatePost } from '../components/post/CreatePost';

export const Academy: React.FC = () => {
  const { posts, addPost } = usePostsStore();
  const { user } = useAuthStore();
  const academyPosts = posts.filter(post => post.userId === 'academy' || (user && (user.role === 'Coach' || user.role === 'Academy') && post.userId === user.id));

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('Academy - Academy posts retrieved:', academyPosts);
  }, [academyPosts]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-4 pt-16" // Added pt-16 for more top spacing
    >
      {user && user.role === 'Academy' && (
        <CreatePost />
      )}
      {academyPosts.length === 0 ? (
        <p className="text-gray-400">No posts available.</p>
      ) : (
        academyPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </motion.div>
  );
};
