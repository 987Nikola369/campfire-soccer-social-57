import { useAuthStore } from '@/lib/store/authStore';
import { useProfileStore } from '@/lib/store/profileStore';

export const supabase = {
  auth: {
    getSession: async () => {
      const currentUser = useAuthStore.getState().currentUser;
      return { 
        data: { 
          session: currentUser ? { user: currentUser } : null 
        } 
      };
    },
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      const handler = (event: CustomEvent) => {
        callback(event.detail.event, event.detail.session);
      };
      
      window.addEventListener('local-auth-change', handler as EventListener);
      return { 
        subscription: { 
          unsubscribe: () => {
            window.removeEventListener('local-auth-change', handler as EventListener);
          }
        } 
      };
    },
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      await useAuthStore.getState().signIn(email, password);
      return { data: { user: useAuthStore.getState().currentUser }, error: null };
    },
    signOut: async () => {
      await useAuthStore.getState().signOut();
      return { error: null };
    }
  },
  from: (table: string) => ({
    select: () => ({
      eq: (column: string, value: any) => ({
        single: async () => {
          switch (table) {
            case 'profiles':
              return { data: await useProfileStore.getState().getProfile(value) };
            default:
              return { data: null };
          }
        }
      })
    })
  })
};
