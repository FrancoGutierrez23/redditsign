
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Asynchronous thunk action to fetch comments of a selected post
export const fetchComments = createAsyncThunk(
  'postItem/fetchComments',
  async (permalink, thunkAPI) => {
    try {
      // Removing the last character from permalink
      const trimmedPermalink = permalink.slice(0, -1);
      const response = await fetch(`https://www.reddit.com${trimmedPermalink}.json`);
      const data = await response.json();
      // The comments are usually in the second element of the array
      const comments = data[1].data.children.map(child => child.data);
      console.log(comments);
      return comments;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create a slice for the selected post and its comments
const postItemSlice = createSlice({
  name: 'postItem',
  initialState: {
    post: null,
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    selectPost: (state, action) => {
      state.post = action.payload;
      state.comments = []; // Reset comments when a new post is selected
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { selectPost } = postItemSlice.actions;
export default postItemSlice.reducer;
