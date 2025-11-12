import toast from 'react-hot-toast';
import { create } from 'zustand';
import { postService } from '../services/postService';
import logger from '../utils/logger';

const usePostStore = create((set) => ({
  posts: [],
  loading: false,
  error: null,
  
  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      logger.posts.fetch();
      const data = await postService.getPosts();
      logger.posts.fetchSuccess(data.posts?.length || 0);
      set({ posts: data.posts, loading: false });
    } catch (error) {
      logger.posts.fetchError(error);
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Error fetching posts');
    }
  },
  
  createPost: async (postData) => {
    set({ loading: true, error: null });
    try {
      logger.posts.create(postData.title);
      const newPost = await postService.createPost(postData);
      logger.posts.createSuccess(newPost._id);
      set((state) => ({ posts: [newPost, ...state.posts], loading: false }));
      toast.success('Post created successfully!');
    } catch (error) {
      logger.posts.createError(error);
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Error creating post');
    }
  },
  
  updatePost: async (id, postData) => {
    set({ loading: true, error: null });
    try {
      logger.posts.update(id);
      const updatedPost = await postService.updatePost(id, postData);
      logger.posts.updateSuccess(id);
      set((state) => ({
        posts: state.posts.map(post => post._id === id ? updatedPost : post),
        loading: false
      }));
      toast.success('Post updated successfully!');
    } catch (error) {
      logger.posts.updateError(error);
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Error updating post');
    }
  },
  
  deletePost: async (id) => {
    set({ loading: true, error: null });
    try {
      logger.posts.delete(id);
      await postService.deletePost(id);
      logger.posts.deleteSuccess(id);
      set((state) => ({
        posts: state.posts.filter(post => post._id !== id),
        loading: false
      }));
      toast.success('Post deleted successfully!');
    } catch (error) {
      logger.posts.deleteError(error);
      set({ error: error.message, loading: false });
      toast.error(error.message || 'Error deleting post');
    }
  }
}));

export { usePostStore };
