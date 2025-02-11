import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePostsStore } from '../store/posts';
import { PostCard } from '../components/post/PostCard';
import { useAuthStore } from '../store/auth';

export const AcademyFeed: React.FC = () => {
  const { posts } = usePostsStore();
  const { user } = useAuthStore();
  const academyPosts = posts.filter(post => post.userId === 'academy'); // Assuming 'academy' is a special user ID

  useEffect(() => {
    console.log('AcademyFeed - Academy posts retrieved:', academyPosts);
  }, [academyPosts]);

  if (!user || (user.role !== 'Coach' && user.role !== 'Academy')) {
    return <p className="text-gray-400">This content is only available for Coaches and the Academy.</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-4"
    >
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
