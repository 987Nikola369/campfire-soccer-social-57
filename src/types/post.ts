export interface Post {
  id: string;
  userId: string;
  userName: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  createdAt: string;
  likes: string[]; // Array of userIds
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  likes: string[];
  replies: Reply[];
}

export interface Reply {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  likes: string[];
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'reply' | 'comment_like';
  postId: string;
  actorId: string;
  actorName: string;
  read: boolean;
  createdAt: string;
}