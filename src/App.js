// src/App.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './redux/postsSlice';
import PostList from './components/post/PostList/PostList';
import PostComments from './components/post/PostItem/PostComments';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  // List of predefined subreddits
  const subreddits = ['pics', 'funny', 'nature', 'technology', 'gaming'];

  // State for managing the current subreddit
  const [subreddit, setSubreddit] = useState('pics'); // Default subreddit is 'pics'

  // Fetch posts whenever the selected subreddit changes
  useEffect(() => {
    dispatch(fetchPosts(subreddit));
  }, [dispatch, subreddit]);

  return (
    <div className="App">
      <h1>Reddit Viewer</h1>
      <div className="subreddit-list">
        {subreddits.map((sub) => (
          <button key={sub} onClick={() => {
            setSubreddit(sub);
            dispatch(fetchPosts(sub));
          }}>{sub}</button>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <PostList />
      <PostComments />
    </div>
  );
};

export default App;
