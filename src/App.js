// src/App.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './redux/postsSlice';
import PostList from './components/post/PostList/PostList';
import PostComments from './components/post/PostItem/PostComments';
import Header from './components/layout/Header/Header';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);
  const [subreddit, setSubreddit] = useState('pics'); // Default subreddit is 'pics'

  // Fetch posts whenever the selected subreddit changes
  useEffect(() => {
    dispatch(fetchPosts(subreddit));
  }, [dispatch, subreddit]);

  return (
    <div className="App">
      <Header />
      <div className="subreddit-list">
        {['pics', 'funny', 'nature', 'technology', 'gaming'].map((sub) => (
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
