import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/auth';
import { MessageSquare } from 'lucide-react';

export const Leaderboard: React.FC = () => {
  const { users } = useAuthStore();
  const [sortBy, setSortBy] = useState('joinDate');
  const [filterRole, setFilterRole] = useState('All');
  const [sortedUsers, setSortedUsers] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('Leaderboard - Users retrieved:', users);
  }, [users]);

  useEffect(() => {
    let sorted = [...(users || [])];

    if (filterRole !== 'All') {
      sorted = sorted.filter(user => user.role === filterRole);
    }

    sorted = sorted.sort((a, b) => {
      if (sortBy === 'joinDate') {
        let aJoinDate = a?.joinDate;
        if (typeof aJoinDate === 'string') {
          aJoinDate = new Date(aJoinDate);
        }
        let bJoinDate = b?.joinDate;
        if (typeof bJoinDate === 'string') {
          bJoinDate = new Date(bJoinDate);
        }

        const aTime = aJoinDate instanceof Date && !isNaN(aJoinDate.getTime()) ? aJoinDate.getTime() : 0;
        const bTime = bJoinDate instanceof Date && !isNaN(bJoinDate.getTime()) ? bJoinDate.getTime() : 0;
        return aTime - bTime;
      }
      // Add sorting logic for activity here if you have an activity field
      return 0;
    });

    setSortedUsers(sorted);
  }, [users, sortBy, filterRole]);

  const formatDate = (date: any): string => {
    if (!date) return 'N/A';
    try {
      const dateObj = (typeof date === 'string') ? new Date(date) : (date instanceof Date ? date : null);
      if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
        return dateObj.toLocaleDateString();
      }
      return 'Invalid Date';
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'Invalid Date';
    }
  };

  if (!users) {
    return <p>Loading...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-4 pt-16"
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="sortBy" className="mr-2 text-gray-400">Sort By:</label>
          <select
            id="sortBy"
            className="bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:border-primary"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="joinDate">Join Date</option>
            {/* Add more sorting options here */}
          </select>
        </div>
        <div>
          <label htmlFor="filterRole" className="mr-2 text-gray-400">Filter Role:</label>
          <select
            id="filterRole"
            className="bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:border-primary"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Student">Student</option>
            <option value="Coach">Coach</option>
            <option value="Academy">Academy</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedUsers.map((u) => (
          <motion.div
            key={u?.id}
            className="neo-blur rounded-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img src={u?.coverPhoto || 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150'} alt="Cover" className="w-full h-32 object-cover" />
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={u?.profilePicture || 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150'} alt={u?.username} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-white font-medium">{u?.username}</p>
                  <p className="text-gray-400 text-sm">Role: {u?.role}</p>
                  <p className="text-gray-400 text-sm">Member since {formatDate(u?.joinDate)}</p>
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

export default Leaderboard;
