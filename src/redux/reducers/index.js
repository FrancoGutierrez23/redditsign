// redux/reducers/index.js
import { combineReducers } from 'redux';
import postsReducer from '../postsSlice'; // Import the slice reducer
import { postItemSlice } from '../postsSlice'; // Import the postItem slice

const rootReducer = combineReducers({
  posts: postsReducer,
  postItem: postItemSlice.reducer,
  // Add other slice reducers here if needed
});

export default rootReducer;

