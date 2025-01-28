import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types/user';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  role: UserRole;
  canPostToAcademy: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // For development, we'll set a default user if none exists
  useEffect(() => {
    if (!user) {
      const defaultUser: User = {
        id: "current-user",
        email: "nikola@example.com",
        userName: "Nikola",
        role: "super_user", // Default role for testing
        joinDate: new Date().toISOString(),
      };
      setUser(defaultUser);
      localStorage.setItem('currentUser', JSON.stringify(defaultUser));
    }
  }, [user]);

  const isAuthenticated = !!user;
  const role = user?.role || 'standard';
  const canPostToAcademy = role === 'super_user' || role === 'coach';

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      isAuthenticated, 
      role,
      canPostToAcademy 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}