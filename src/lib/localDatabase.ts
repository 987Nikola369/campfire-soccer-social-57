import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { AuthUser } from './auth';
import { Post, Comment, Reply, Notification } from '@/types/post';

interface Profile {
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

interface ChatRoom {
  id: string;
  name: string;
  is_group?: boolean;
  created_at: string;
}

interface ChatRoomMember {
  room_id: string;
  user_id: string;
  joined_at: string;
}

interface Message {
  id: string;
  room_id?: string;
  sender_id?: string;
  content: string;
  media_url?: string;
  created_at: string;
  read_at?: string;
}

interface LocalDatabaseState {
  currentUser: AuthUser | null;
  profiles: Profile[];
  posts: Post[];
  comments: Comment[];
  likes: { id: string; post_id: string; user_id: string; created_at: string; }[];
  notifications: Notification[];
  chatRooms: ChatRoom[];
  chatRoomMembers: ChatRoomMember[];
  messages: Message[];
  mediaFiles: { [key: string]: string }; // Store base64 strings

  // Auth operations
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;

  // Profile operations
  getProfile: (userId: string) => Promise<Profile | null>;
  updateProfile: (userId: string, updates: Partial<Profile>) => Promise<void>;

  // Post operations
  createPost: (post: Omit<Post, 'id' | 'createdAt'>) => Promise<Post>;
  getPosts: () => Promise<Post[]>;
  updatePost: (id: string, updates: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;

  // Comment operations
  addComment: (postId: string, content: string, userId: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;

  // Like operations
  toggleLike: (postId: string, userId: string) => Promise<void>;

  // Chat operations
  createChatRoom: (name: string, members: string[]) => Promise<string>;
  sendMessage: (roomId: string, content: string, senderId: string, mediaUrl?: string) => Promise<void>;
  getMessages: (roomId: string) => Promise<Message[]>;

  // Media operations
  uploadMedia: (file: File) => Promise<string>;
}

const useLocalDatabase = create<LocalDatabaseState>((set, get) => ({
  currentUser: null,
  profiles: [],
  posts: [],
  comments: [],
  likes: [],
  notifications: [],
  chatRooms: [],
  chatRoomMembers: [],
  messages: [],
  mediaFiles: {},

  signIn: async (email: string, password: string) => {
    // Simulate authentication
    const mockUser: AuthUser = {
      id: 'mock-user-id',
      email,
      username: email.split('@')[0]
    };
    set({ currentUser: mockUser });

    // Dispatch auth change event
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
    
    const newProfile: Profile = {
      id: mockUser.id,
      username,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      role: 'user'
    };

    set(state => ({
      currentUser: mockUser,
      profiles: [...state.profiles, newProfile]
    }));

    window.dispatchEvent(new CustomEvent('local-auth-change', {
      detail: { event: 'SIGNED_UP', session: { user: mockUser } }
    }));
  },

  signOut: async () => {
    set({ currentUser: null });
    window.dispatchEvent(new CustomEvent('local-auth-change', {
      detail: { event: 'SIGNED_OUT', session: null }
    }));
  },

  getProfile: async (userId: string) => {
    const { profiles } = get();
    return profiles.find(p => p.id === userId) || null;
  },

  updateProfile: async (userId: string, updates: Partial<Profile>) => {
    set(state => ({
      profiles: state.profiles.map(profile =>
        profile.id === userId
          ? { ...profile, ...updates, updated_at: new Date().toISOString() }
          : profile
      )
    }));
  },

  createPost: async (post: Omit<Post, 'id' | 'createdAt'>) => {
    const newPost: Post = {
      ...post,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      likes: [],
      comments: []
    };

    set(state => ({ posts: [newPost, ...state.posts] }));
    return newPost;
  },

  getPosts: async () => {
    return get().posts;
  },

  updatePost: async (id: string, updates: Partial<Post>) => {
    set(state => ({
      posts: state.posts.map(post =>
        post.id === id ? { ...post, ...updates } : post
      )
    }));
  },

  deletePost: async (id: string) => {
    set(state => ({
      posts: state.posts.filter(post => post.id !== id)
    }));
  },

  addComment: async (postId: string, content: string, userId: string) => {
    const newComment: Comment = {
      id: uuidv4(),
      userId,
      userName: get().profiles.find(p => p.id === userId)?.username || 'Unknown User',
      content,
      createdAt: new Date().toISOString(),
      likes: [],
      replies: []
    };

    set(state => ({
      posts: state.posts.map(post =>
        post.id === postId
          ? { ...post, comments: [newComment, ...post.comments] }
          : post
      )
    }));
  },

  deleteComment: async (commentId: string) => {
    set(state => ({
      posts: state.posts.map(post => ({
        ...post,
        comments: post.comments.filter(comment => comment.id !== commentId)
      }))
    }));
  },

  toggleLike: async (postId: string, userId: string) => {
    const newLike = {
      id: uuidv4(),
      post_id: postId,
      user_id: userId,
      created_at: new Date().toISOString()
    };

    set(state => {
      const existingLike = state.likes.find(
        like => like.post_id === postId && like.user_id === userId
      );

      if (existingLike) {
        return {
          likes: state.likes.filter(like => like.id !== existingLike.id)
        };
      }

      return {
        likes: [...state.likes, newLike]
      };
    });
  },

  createChatRoom: async (name: string, members: string[]) => {
    const roomId = uuidv4();
    const now = new Date().toISOString();

    const newRoom: ChatRoom = {
      id: roomId,
      name,
      created_at: now,
      is_group: members.length > 2
    };

    const newMembers: ChatRoomMember[] = members.map(userId => ({
      room_id: roomId,
      user_id: userId,
      joined_at: now
    }));

    set(state => ({
      chatRooms: [...state.chatRooms, newRoom],
      chatRoomMembers: [...state.chatRoomMembers, ...newMembers]
    }));

    return roomId;
  },

  sendMessage: async (roomId: string, content: string, senderId: string, mediaUrl?: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      room_id: roomId,
      sender_id: senderId,
      content,
      media_url: mediaUrl,
      created_at: new Date().toISOString()
    };

    set(state => ({
      messages: [...state.messages, newMessage]
    }));
  },

  getMessages: async (roomId: string) => {
    return get().messages.filter(message => message.room_id === roomId);
  },

  uploadMedia: async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const fileId = uuidv4();
        set(state => ({
          mediaFiles: {
            ...state.mediaFiles,
            [fileId]: base64String
          }
        }));
        resolve(fileId);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}));

// Add listener for auth state changes
window.addEventListener('local-auth-change', ((event: CustomEvent) => {
  const { event: eventType, session } = event.detail;
  console.log('Auth state changed:', eventType, session);
}) as EventListener);

export default useLocalDatabase;