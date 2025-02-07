import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthUser } from '../auth';

interface AuthStore {
  currentUser: AuthUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (user: AuthUser) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      currentUser: null,
      signIn: async (email: string, password: string) => {
        // Placeholder for actual sign-in logic
        // In a real application, you would verify the email and password
        // and fetch the user data from a database or API
        const mockUser: AuthUser = {
          id: 'mock-user-id', // Replace with actual user ID
          email,
          username: email.split('@')[0]
        };
        set({ currentUser: mockUser });
        window.dispatchEvent(new CustomEvent('local-auth-change', {
          detail: { event: 'SIGNED_IN', session: { user: mockUser } }
        }));
      },
      signUp: (user: AuthUser) => {
        set({ currentUser: user });
        window.dispatchEvent(new CustomEvent('local-auth-change', {
          detail: { event: 'SIGNED_UP', session: { user: user } }
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
