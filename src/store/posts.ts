import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Post, Comment } from '../types';
import { useAuthStore } from './auth';

interface PostsState {
  posts: Post[];
  addPost: (userId: string, content: string, media?: string[]) => void;
  deletePost: (postId: string) => void;
  likePost: (postId: string, userId: string) => void;
  addComment: (postId: string, userId: string, content: string, parentId?: string) => void;
  deleteComment: (postId: string, commentId: string) => void;
  likeComment: (postId: string, commentId: string, userId: string) => void;
  updatePostUser: (postId: string, profilePicture: string) => void;
  setPosts: (posts: Post[]) => void;
}

const usePostsStoreBase = create<PostsState>((set, get) => {
  const loadPostsFromLocalStorage = () => {
    const { user } = useAuthStore.getState();
    if (user) {
      const storedPosts = localStorage.getItem(`posts_${user.id}`);
      if (storedPosts) {
        try {
          return JSON.parse(storedPosts) as Post[];
        } catch (error) {
          console.error('Error parsing posts from local storage:', error);
          return [];
        }
      }
    }
    return [];
  };

  return {
    posts: loadPostsFromLocalStorage(),
    addPost: (userId, content, media) => {
      const newPost: Post = {
        id: uuidv4(),
        userId,
        content,
        media,
        createdAt: new Date(),
        likes: [],
        comments: [],
      };
      set((state) => {
        const updatedPosts = [newPost, ...state.posts];
        const { user } = useAuthStore.getState();
        if (user) {
          localStorage.setItem(`posts_${user.id}`, JSON.stringify(updatedPosts));
        }
        console.log('addPost - New post added:', newPost);
        console.log('addPost - Updated posts:', updatedPosts);
        return { posts: updatedPosts };
      });
    },
    deletePost: (postId) => {
      set((state) => {
        const updatedPosts = state.posts.filter((post) => post.id !== postId);
        const { user } = useAuthStore.getState();
        if (user) {
          localStorage.setItem(`posts_${user.id}`, JSON.stringify(updatedPosts));
        }
        console.log('deletePost - Post deleted:', postId);
        console.log('deletePost - Updated posts:', updatedPosts);
        return { posts: updatedPosts };
      });
    },
    likePost: (postId, userId) => {
      set((state) => {
        const updatedPosts = state.posts.map((post) => {
          if (post.id === postId) {
            const likes = post.likes.includes(userId)
              ? post.likes.filter((id) => id !== userId)
              : [...post.likes, userId];
            return { ...post, likes };
          }
          return post;
        });
        const { user } = useAuthStore.getState();
        if (user) {
          localStorage.setItem(`posts_${user.id}`, JSON.stringify(updatedPosts));
        }
        console.log('likePost - Post liked:', postId);
        console.log('likePost - Updated posts:', updatedPosts);
        return { posts: updatedPosts };
      });
    },
    addComment: (postId, userId, content, parentId) => {
      const newComment: Comment = {
        id: uuidv4(),
        userId,
        content,
        createdAt: new Date(), // Ensure createdAt is a Date object
        likes: [],
        replies: [],
      };
      set((state) => {
        const updatedPosts = state.posts.map((post) => {
          if (post.id === postId) {
            if (parentId) {
              const addReplyToComment = (comments: Comment[]): Comment[] => {
                return comments.map((comment) => {
                  if (comment.id === parentId) {
                    return {
                      ...comment,
                      replies: [...comment.replies, newComment],
                    };
                  }
                  return {
                    ...comment,
                    replies: addReplyToComment(comment.replies),
                  };
                });
              };
              return {
                ...post,
                comments: addReplyToComment(post.comments),
              };
            } else {
              return {
                ...post,
                comments: [...post.comments, newComment],
              };
            }
          }
          return post;
        });
        const { user } = useAuthStore.getState();
        if (user) {
          localStorage.setItem(`posts_${user.id}`, JSON.stringify(updatedPosts));
        }
        console.log('addComment - New comment added:', newComment);
        console.log('addComment - Updated posts:', updatedPosts);
        return { posts: updatedPosts };
      });
    },
    deleteComment: (postId, commentId) => {
      set((state) => {
        const updatedPosts = state.posts.map((post) => {
          if (post.id === postId) {
            const deleteCommentFromComments = (comments: Comment[]): Comment[] => {
              return comments.filter((comment) => {
                if (comment.id === commentId) {
                  return false;
                }
                comment.replies = deleteCommentFromComments(comment.replies);
                return true;
              });
            };
            return {
              ...post,
              comments: deleteCommentFromComments(post.comments),
            };
          }
          return post;
        });
        const { user } = useAuthStore.getState();
        if (user) {
          localStorage.setItem(`posts_${user.id}`, JSON.stringify(updatedPosts));
        }
        console.log('deleteComment - Comment deleted:', commentId);
        console.log('deleteComment - Updated posts:', updatedPosts);
        return { posts: updatedPosts };
      });
    },
    likeComment: (postId, commentId, userId) => {
      set((state) => {
        const updatedPosts = state.posts.map((post) => {
          if (post.id === postId) {
            const likeCommentInComments = (comments: Comment[]): Comment[] => {
              return comments.map((comment) => {
                if (comment.id === commentId) {
                  const likes = comment.likes.includes(userId)
                    ? comment.likes.filter((id) => id !== userId)
                    : [...comment.likes, userId];
                  return {
                    ...comment,
                    likes,
                  };
                }
                comment.replies = likeCommentInComments(comment.replies);
                return comment;
              });
            };
            return {
              ...post,
              comments: likeCommentInComments(post.comments),
            };
          }
          return post;
        });
        const { user } = useAuthStore.getState();
        if (user) {
          localStorage.setItem(`posts_${user.id}`, JSON.stringify(updatedPosts));
        }
        console.log('likeComment - Comment liked:', commentId);
        console.log('likeComment - Updated posts:', updatedPosts);
        return { posts: updatedPosts };
      });
    },
    updatePostUser: (postId: string, profilePicture: string) => {
      set((state) => {
        const updatedPosts = state.posts.map((post) => {
          if (post.id === postId) {
            return { ...post, userProfilePicture: profilePicture };
          }
          return post;
        });
        const { user } = useAuthStore.getState();
        if (user) {
          localStorage.setItem(`posts_${user.id}`, JSON.stringify(updatedPosts));
        }
        console.log('updatePostUser - Post updated:', postId);
        console.log('updatePostUser - Updated posts:', updatedPosts);
        return { posts: updatedPosts };
      });
    },
    setPosts: (posts: Post[]) => {
      set({ posts });
    },
  };
});

export const usePostsStore = usePostsStoreBase;
