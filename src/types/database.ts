
export interface User {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
  coverPhoto?: string;
  createdAt: Date;
  isCoach?: boolean;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
  likes: string[]; // Array of user IDs
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
  parentId?: string; // For nested comments
  likes: string[]; // Array of user IDs
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'message';
  referenceId: string; // ID of the post/comment/message
  createdAt: Date;
  read: boolean;
}
