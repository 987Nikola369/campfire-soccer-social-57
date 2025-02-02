import { AuthUser } from '../auth';
import { Post, Comment, Reply, Notification } from '@/types/post';

export interface Profile {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  age?: number;
  team?: string;
  position?: string;
  is_parent?: boolean;
  created_at: string;
  updated_at: string;
  role?: 'user' | 'coach' | 'super_user';
}

export interface ChatRoom {
  id: string;
  name: string;
  is_group?: boolean;
  created_at: string;
}

export interface ChatRoomMember {
  room_id: string;
  user_id: string;
  joined_at: string;
}

export interface Message {
  id: string;
  room_id?: string;
  sender_id?: string;
  content: string;
  media_url?: string;
  created_at: string;
  read_at?: string;
}

export interface LocalDatabaseState {
  currentUser: AuthUser | null;
  profiles: Profile[];
  posts: Post[];
  comments: Comment[];
  likes: { id: string; post_id: string; user_id: string; created_at: string; }[];
  notifications: Notification[];
  chatRooms: ChatRoom[];
  chatRoomMembers: ChatRoomMember[];
  messages: Message[];
  mediaFiles: { [key: string]: string };
}