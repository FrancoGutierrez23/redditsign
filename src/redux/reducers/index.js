// redux/reducers/index.js
import { combineReducers } from 'redux';
import postsReducer from '../postsSlice'; // Import the slice reducer

const rootReducer = combineReducers({
  posts: postsReducer,
  // Add other slice reducers here if needed
});

export default rootReducer;
