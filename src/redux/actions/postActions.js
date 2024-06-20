import { FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } from './types';


// Action to fetch posts from a subreddit
export const fetchPosts = (subreddit) => async (dispatch) => {
  dispatch({ type: FETCH_POSTS_REQUEST });

  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    dispatch({
      type: FETCH_POSTS_SUCCESS,
      payload: response.data.data.children.map(child => child.data)
    });
  } catch (error) {
    dispatch({
      type: FETCH_POSTS_FAILURE,
      payload: error.message
    });
  }
};
