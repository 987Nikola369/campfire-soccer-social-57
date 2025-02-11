import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePostsStore } from '../store/posts';
import { PostCard } from '../components/post/PostCard';
import { CreatePost } from '../components/post/CreatePost';
import { useAuthStore } from '../store/auth';
import { AcademyFeed } from '../components/AcademyFeed';

export const Home: React.FC = () => {
  const { posts, addPost } = usePostsStore();
  const { user } = useAuthStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('Home - Posts retrieved:', posts);
  }, [posts]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-4 pt-16" // Added pt-16 for more top spacing
    >
      <CreatePost />
      {user && user.role === 'Student' && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Academy Feed</h2>
          <AcademyFeed />
        </div>
      )}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </motion.div>
  );
};
