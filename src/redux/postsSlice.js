// redux/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Asynchronous thunk action to fetch posts from a subreddit
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (subreddit, thunkAPI) => {
    try {
      const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
      const data = await response.json();
      console.log(data.data.children)
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
    },
    reducers: {
      // You can add normal reducers here if needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.loading = false;
          state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    }
  });
  
  export default postsSlice.reducer;