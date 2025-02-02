import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { AuthUser } from '../auth';
import { LocalDatabaseState } from './types';

interface AuthStore extends Pick<LocalDatabaseState, 'currentUser'> {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      currentUser: null,
      signIn: async (email: string, password: string) => {
        const mockUser: AuthUser = {
          id: 'mock-user-id',
          email,
          username: email.split('@')[0]
        };
        set({ currentUser: mockUser });
        window.dispatchEvent(new CustomEvent('local-auth-change', {
          detail: { event: 'SIGNED_IN', session: { user: mockUser } }
        }));
      },
      signUp: async (email: string, password: string, username: string) => {
        const mockUser: AuthUser = {
          id: uuidv4(),
          email,
          username
        };
        set({ currentUser: mockUser });
        window.dispatchEvent(new CustomEvent('local-auth-change', {
          detail: { event: 'SIGNED_UP', session: { user: mockUser } }
        }));
      },
      signOut: async () => {
        set({ currentUser: null });
        window.dispatchEvent(new CustomEvent('local-auth-change', {
          detail: { event: 'SIGNED_OUT', session: null }
        }));
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ currentUser: state.currentUser })
    }
  )
);