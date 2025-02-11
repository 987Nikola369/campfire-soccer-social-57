import React from 'react';
import { Bell, Home, MessageCircle, Users, LogOut, Rocket as RocketIcon, GraduationCap } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export const TopNavigation: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 h-16 bg-[#231F20]/95 backdrop-blur-sm border-b border-gray-800 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RocketIcon className="h-8 w-8 text-[#E41E12]" />
        </motion.div>
        
        <div className="flex items-center space-x-4">
          <motion.button 
            className="text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={20} />
          </motion.button>
          
          <Link to="/profile">
            <motion.img
              src={user?.profilePicture || 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150'}
              alt={user?.username}
              className="h-8 w-8 rounded-full object-cover"
              whileHover={{ scale: 1.1 }}
            />
          </Link>
          <motion.button
            onClick={logout}
            className="text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={20} />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export const BottomNavigation: React.FC = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: GraduationCap, label: 'Academy', path: '/academy' },
    { icon: Users, label: 'Directory', path: '/directory' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' }
  ];

  const location = useLocation();

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 h-16 bg-[#231F20]/95 backdrop-blur-sm border-t border-gray-800 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-center">
        <div className="grid grid-cols-4 w-full text-center">
          {navItems.map((item, index) => (
            <Link to={item.path} key={index} className="flex flex-col items-center justify-center">
              <motion.button
                className={`text-gray-400 hover:text-[#E41E12] transition-colors ${location.pathname === item.path ? 'text-[#E41E12]' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon size={24} />
              </motion.button>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};
