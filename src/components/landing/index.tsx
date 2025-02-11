
import { motion } from 'framer-motion';

export const Landing = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-accent flex items-center justify-center"
    >
      <h1 className="text-4xl font-bold">Welcome to Rocket Football Academy</h1>
    </motion.div>
  );
};
