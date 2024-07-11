import { combineReducers } from 'redux';
import postsReducer from '../postsSlice';
import { postItemSlice } from '../postsSlice';

const rootReducer = combineReducers({
  posts: postsReducer,
  postItem: postItemSlice.reducer,
});

export default rootReducer;

