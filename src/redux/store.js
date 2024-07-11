import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import postItemReducer from './postItemSlice'

const store = configureStore({
  reducer: {
    posts: postsReducer,
    postItem: postItemReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
