import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Profile, LocalDatabaseState } from './types';

interface ProfileStore extends Pick<LocalDatabaseState, 'profiles'> {
  getProfile: (userId: string) => Promise<Profile | null>;
  updateProfile: (userId: string, updates: Partial<Profile>) => Promise<void>;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      profiles: [],
      getProfile: async (userId: string) => {
        return get().profiles.find(p => p.id === userId) || null;
      },
      updateProfile: async (userId: string, updates: Partial<Profile>) => {
        set(state => ({
          profiles: state.profiles.map(profile =>
            profile.id === userId
              ? { ...profile, ...updates, updated_at: new Date().toISOString() }
              : profile
          )
        }));
      }
    }),
    {
      name: 'profile-storage',
      partialize: (state) => ({ profiles: state.profiles })
    }
  )
);