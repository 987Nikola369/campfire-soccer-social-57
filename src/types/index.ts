export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  coverPhoto?: string;
  joinDate: Date;
  bio?: string;
  role: 'Student' | 'Coach' | 'Academy';
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  media?: string[];
  createdAt: Date;
  updatedAt?: Date;
  likes: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  likes: string[];
  replies: Comment[];
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  media?: string[];
  createdAt: Date;
  read: boolean;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage?: Message;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'message';
  referenceId: string;
  read: boolean;
  createdAt: Date;
}
