
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { User, Post, Comment, Message, Notification } from '../types/database';

interface DatabaseStore {
  users: User[];
  posts: Post[];
  comments: Comment[];
  messages: Message[];
  notifications: Notification[];
  
  // User operations
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => User;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUser: (id: string) => User | undefined;
  
  // Post operations
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'likes'>) => Post;
  updatePost: (id: string, data: Partial<Post>) => void;
  deletePost: (id: string) => void;
  likePost: (postId: string, userId: string) => void;
  unlikePost: (postId: string, userId: string) => void;
  
  // Comment operations
  addComment: (comment: Omit<Comment, 'id' | 'createdAt' | 'likes'>) => Comment;
  deleteComment: (id: string) => void;
  likeComment: (commentId: string, userId: string) => void;
  unlikeComment: (commentId: string, userId: string) => void;
  
  // Message operations
  addMessage: (message: Omit<Message, 'id' | 'createdAt' | 'read'>) => Message;
  markMessageAsRead: (id: string) => void;
  
  // Notification operations
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => Notification;
  markNotificationAsRead: (id: string) => void;
}

export const useDatabase = create<DatabaseStore>((set, get) => ({
  users: [],
  posts: [],
  comments: [],
  messages: [],
  notifications: [],

  // User operations
  addUser: (userData) => {
    const user: User = {
      id: uuidv4(),
      createdAt: new Date(),
      ...userData,
    };
    set((state) => ({ users: [...state.users, user] }));
    return user;
  },

  updateUser: (id, data) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...data } : user
      ),
    }));
  },

  deleteUser: (id) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
  },

  getUser: (id) => {
    return get().users.find((user) => user.id === id);
  },

  // Post operations
  addPost: (postData) => {
    const post: Post = {
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: [],
      ...postData,
    };
    set((state) => ({ posts: [...state.posts, post] }));
    return post;
  },

  updatePost: (id, data) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, ...data, updatedAt: new Date() } : post
      ),
    }));
  },

  deletePost: (id) => {
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
      comments: state.comments.filter((comment) => comment.postId !== id),
    }));
  },

  likePost: (postId, userId) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId && !post.likes.includes(userId)
          ? { ...post, likes: [...post.likes, userId] }
          : post
      ),
    }));
  },

  unlikePost: (postId, userId) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes.filter((id) => id !== userId) }
          : post
      ),
    }));
  },

  // Comment operations
  addComment: (commentData) => {
    const comment: Comment = {
      id: uuidv4(),
      createdAt: new Date(),
      likes: [],
      ...commentData,
    };
    set((state) => ({ comments: [...state.comments, comment] }));
    return comment;
  },

  deleteComment: (id) => {
    set((state) => ({
      comments: state.comments.filter((comment) => comment.id !== id),
    }));
  },

  likeComment: (commentId, userId) => {
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === commentId && !comment.likes.includes(userId)
          ? { ...comment, likes: [...comment.likes, userId] }
          : comment
      ),
    }));
  },

  unlikeComment: (commentId, userId) => {
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes.filter((id) => id !== userId) }
          : comment
      ),
    }));
  },

  // Message operations
  addMessage: (messageData) => {
    const message: Message = {
      id: uuidv4(),
      createdAt: new Date(),
      read: false,
      ...messageData,
    };
    set((state) => ({ messages: [...state.messages, message] }));
    return message;
  },

  markMessageAsRead: (id) => {
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === id ? { ...message, read: true } : message
      ),
    }));
  },

  // Notification operations
  addNotification: (notificationData) => {
    const notification: Notification = {
      id: uuidv4(),
      createdAt: new Date(),
      read: false,
      ...notificationData,
    };
    set((state) => ({ notifications: [...state.notifications, notification] }));
    return notification;
  },

  markNotificationAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      ),
    }));
  },
}));
