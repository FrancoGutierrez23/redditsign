// src/components/layout/Subreddits/SubredditList.js

import './SubredditList.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../post/PostList/PostList';
import { fetchPosts } from '../../../redux/postsSlice';

const SubredditList = () => {
  const dispatch = useDispatch();
  
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  const [selectedSubreddit, setSelectedSubreddit] = useState('pics');
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Fetch posts for the selected subreddit or search results
  useEffect(() => {
    if (!isSearchActive) {
      dispatch(fetchPosts(selectedSubreddit));
    }
  }, [dispatch, selectedSubreddit, isSearchActive]);

  // Log the posts to verify the state after search
  console.log('Current posts:', posts);

  return (
    <div className="container">
      <aside className="subreddit_list">
        <h3 className="subreddits_title">Subreddits</h3>
        {['pics', 'funny', 'nature', 'technology', 'gaming', 'paranormal'].map((sub) => (
          <button
            key={sub}
            className={`subreddit_option ${selectedSubreddit === sub ? 'active' : ''}`}
            onClick={() => {
              setSelectedSubreddit(sub);
              setIsSearchActive(false); // Deactivate search view
            }}
          >
            {sub}
          </button>
        ))}
      </aside>
      <main className="posts_container">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <PostList posts={posts} />
      </main>
    </div>
  );
};

export default React.memo(SubredditList);
