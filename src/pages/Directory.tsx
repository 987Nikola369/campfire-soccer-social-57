import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/auth';
import { MessageSquare } from 'lucide-react';

export const Directory: React.FC = () => {
  const { user, users } = useAuthStore(); // Assuming you have a way to get all users

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('Directory - Users retrieved:', users);
  }, [users]);

  if (!users) {
    return <p>Loading...</p>; // Or redirect to login
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-4 pt-16" // Added pt-16 for more top spacing
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <motion.div
            key={u.id}
            className="neo-blur rounded-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img src={u.coverPhoto || 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150'} alt="Cover" className="w-full h-32 object-cover" />
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={u.profilePicture || 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150'} alt={u.username} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-white font-medium">{u.username}</p>
                  <p className="text-gray-400 text-sm">Member since {u.joinDate.toLocaleDateString()}</p>
                </div>
              </div>
              <motion.button
                className="bg-primary text-white rounded-full p-2 hover:bg-primary-dark transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <MessageSquare size={20} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Directory;
