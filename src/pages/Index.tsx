
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/auth';

const Index = () => {
  const { user } = useAuthStore();

  console.log('Index page - Current user:', user);

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name || 'User'}!</h1>
      <div className="space-y-6">
        <div className="p-6 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Latest Updates</h2>
          <p className="text-gray-300">
            Stay tuned for the latest updates from Rocket Football Academy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
