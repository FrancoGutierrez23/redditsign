// src/redux/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Asynchronous thunk action to fetch posts from a subreddit
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({ subreddit, after = '' }, thunkAPI) => {
  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json?after=${after}`);
    const data = await response.json();

    if (data.data.children.length === 0) {
      // Handle case where no more posts are available
      console.log('No more posts available.');
      return { posts: [], after: '' };
    }

    return { posts: data.data.children, after: data.data.after };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Handle error
  }
});

// Asynchronous thunk action to fetch posts based on a search query
export const fetchSearchResults = createAsyncThunk('posts/fetchSearchResults', async (query, thunkAPI) => {
  try {
    const response = await fetch(`https://www.reddit.com/search.json?q=${query}`);
    const data = await response.json();
    return data.data.children;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Handle error
  }
});

// Create a slice for posts
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
    after: '', // To keep track of the pagination token
    selectedSubreddit: 'pics' // Default subreddit
  },
  reducers: {
    resetPosts: (state) => {
      state.posts = [];
      state.after = '';
      state.selectedSubreddit = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, ...action.payload.posts];
        state.after = action.payload.after;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.after = ''; // Reset 'after' for search results
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetPosts } = postsSlice.actions;
export default postsSlice.reducer;
