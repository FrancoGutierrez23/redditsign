// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
