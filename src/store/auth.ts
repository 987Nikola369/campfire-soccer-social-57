
import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  profilePicture?: string;
}

interface AuthState {
  user: User | null;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  logout: () => set({ user: null }),
}));
