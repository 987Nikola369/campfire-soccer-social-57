import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react'; // Import Rocket icon
import { useAuthStore } from '../../store/auth'; // Import useAuthStore

interface LikeButtonProps {
  likes: string[];
  onLike: () => void;
  className?: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ likes, onLike, className = '' }) => {
  const { user } = useAuthStore();

  return (
    <motion.button
      onClick={onLike}
      className={`p-2 rounded-full ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      whileFocus={{ outline: '2px solid #E41E12' }} // Add red outline on focus
    >
      <Rocket size={24} fill={likes.includes(user?.id || '') ? '#E41E12' : 'none'} strokeWidth={1.5} />
      {likes.length > 0 && (
        <span className="ml-1 text-gray-400 hover:text-[#E41E12] transition-colors">
          {likes.length}
        </span>
      )}
    </motion.button>
  );
};
