// redux/postItemSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk(
  'postItem/fetchComments',
  async (permalink, thunkAPI) => {
    try {
      const trimmedPermalink = permalink.slice(0, -1);
      const response = await fetch(`https://www.reddit.com${trimmedPermalink}.json`);
      const data = await response.json();
      const comments = data[1].data.children.map(child => child.data);
      return comments;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const postItemSlice = createSlice({
  name: 'postItem',
  initialState: {
    post: null,
    comments: [],
    loading: false,
    error: null,
    isModalOpen: false, // Add a state for modal visibility
  },
  reducers: {
    selectPost: (state, action) => {
      state.post = action.payload;
      state.comments = [];
      state.isModalOpen = true; // Open the modal when a post is selected
    },
    closeCommentsModal: (state) => {
      state.isModalOpen = false; // Close the modal
      state.post = null;
      state.comments = [];
    }
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

export const { selectPost, closeCommentsModal } = postItemSlice.actions;
export default postItemSlice.reducer;



