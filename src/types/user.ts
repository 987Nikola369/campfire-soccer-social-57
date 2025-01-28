export type UserRole = 'standard' | 'coach' | 'super_user';

export interface User {
  id: string;
  email: string;
  userName: string;
  role: UserRole;
  avatarUrl?: string;
  joinDate: string;
}