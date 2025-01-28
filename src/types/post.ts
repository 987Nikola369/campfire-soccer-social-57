export type Post = {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
};

export type Comment = {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  likes: string[];
  replies: Reply[];
};

export type Reply = {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  likes: string[];
};

export type NotificationType = 
  | 'like' 
  | 'comment' 
  | 'reply' 
  | 'comment_like'
  | 'academy_post';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  postId: string;
  actorId: string;
  actorName: string;
  read: boolean;
  createdAt: string;
}
