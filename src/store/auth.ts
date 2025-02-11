import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types';
import { usePostsStore } from './posts';

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, phone: string, email: string, password: string, footballExperience: string, role: 'Student' | 'Coach' | 'Academy') => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  users: User[]; // Added users array
  removeAcademyUser: () => void;
}

const parseUser = (user: User | null): User | null => {
  if (!user) return null;
  return {
    ...user,
    joinDate: new Date(user.joinDate),
  };
};

const serializeUser = (user: User | null): string | null => {
  if (!user) return null;
  return JSON.stringify({
    ...user,
    joinDate: user.joinDate.toISOString(),
    profilePicture: user.profilePicture,
    coverPhoto: user.coverPhoto,
    username: user.username,
    email: user.email,
    password: user.password,
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    footballExperience: user.footballExperience,
    role: user.role
  });
};

export const useAuthStore = create<AuthState>((set, get) => {
  const loadUsersFromLocalStorage = () => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers) as User[];
        // Ensure joinDate is a Date object
        return parsedUsers.map(user => ({
          ...user,
          joinDate: new Date(user.joinDate)
        }));
      } catch (error) {
        console.error('Error parsing users from local storage:', error);
        return [];
      }
    }
    return [];
  };

  const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
         return {
          ...parsedUser,
          joinDate: new Date(parsedUser.joinDate)
        };
      } catch (error) {
        console.error('Error parsing user from local storage:', error);
        return null;
      }
    }
    return null;
  };

  return {
    user: loadUserFromLocalStorage(),
    users: loadUsersFromLocalStorage(), // Initialize users from local storage
    login: async (email: string, password: string) => {
      // Simulate API call - check if user exists in local storage
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[];
      const user = storedUsers.find(u => u.email === email && u.password === password);
      if (user) {
        set({ user: parseUser(user) });
        console.log('login - User logged in:', user);
        return;
      }
      alert('Invalid credentials');
    },
    register: async (firstName: string, lastName: string, phone: string, email: string, password: string, footballExperience: string, role: 'Student' | 'Coach' | 'Academy') => {
      // Simulate API call
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[];
      const existingUser = storedUsers.find(u => u.email === email);
      if (existingUser) {
        alert('User already exists');
        return;
      }

      const profilePicture = localStorage.getItem(`profilePicture_${email}`) || 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150';
      const coverPhoto = localStorage.getItem(`coverPhoto_${email}`) || 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150';

      const newUser: User = {
        id: uuidv4(),
        username: firstName,
        email,
        password,
        joinDate: new Date(),
        profilePicture: profilePicture,
        coverPhoto: coverPhoto,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        footballExperience: footballExperience,
        role: role
      };

      set((state) => {
        const updatedUsers = [...state.users, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers.map(user => ({...user, joinDate: user.joinDate.toISOString()})))); // Update users in local storage
        localStorage.setItem('user', serializeUser(newUser));
        console.log('register - New user registered:', newUser);
        console.log('register - Updated users:', updatedUsers);
        return { user: newUser, users: updatedUsers };
      });
    },
    logout: () => {
      set({ user: null });
      localStorage.removeItem('user');
      console.log('logout - User logged out');
    },
    updateUser: (updatedUser: User) => {
      set((state) => {
        const updatedUsers = state.users.map(u => (u.id === updatedUser.id ? updatedUser : u));
        localStorage.setItem('users', JSON.stringify(updatedUsers.map(user => ({...user, joinDate: user.joinDate.toISOString()}))));
        localStorage.setItem('user', serializeUser(updatedUser));
        console.log('updateUser - Updated user:', updatedUser);
        console.log('updateUser - Updated users:', updatedUsers);
        return { user: updatedUser, users: updatedUsers };
      });
    },
    removeAcademyUser: () => {
      set((state) => {
        let updatedUsers = state.users.filter(user => user.role !== 'Academy');
        
        // Remove profile and cover photos from localStorage
        const academyUser = state.users.find(user => user.role === 'Academy');
        if (academyUser) {
          localStorage.removeItem(`profilePicture_${academyUser.email}`);
          localStorage.removeItem(`coverPhoto_${academyUser.email}`);
        }

        localStorage.setItem('users', JSON.stringify(updatedUsers.map(user => ({...user, joinDate: user.joinDate.toISOString()}))));
        
        // If the current user is the Academy user, log them out
        let newUser = state.user;
        if (state.user && state.user.role === 'Academy') {
          localStorage.removeItem('user');
          newUser = null;
        }

        console.log('removeAcademyUser - Academy user completely removed');
        console.log('removeAcademyUser - Updated users:', updatedUsers);
        return { user: newUser, users: updatedUsers };
      });
    },
  };
});
