import { mockSupabase } from '@/lib/localDatabase';

// Export the mock client instead of the real Supabase client
export const supabase = mockSupabase;