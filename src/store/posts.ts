
import { create } from 'zustand';

interface Post {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
}

interface PostsState {
  posts: Post[];
}

export const usePostsStore = create<PostsState>(() => ({
  posts: [],
}));
