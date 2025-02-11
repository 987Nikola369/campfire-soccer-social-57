import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export const Messages: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-4 pt-16" // Added pt-16 for more top spacing
    >
      <p className="text-gray-400">Coming soon...</p>
    </motion.div>
  );
};
