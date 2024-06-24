// src/components/layout/Subreddits/SubredditList.js

import './SubredditList.css';
import React, { useState, Suspense } from 'react';
import { useSuspenseFetch } from '../../../hooks/useSuspenseFetch';
import { fetchPostsData } from '../../../api';
import PostList from '../../post/PostList/PostList';

const SubredditList = () => {
  const [selectedSubreddit, setSelectedSubreddit] = useState('pics');

  // This fetches the posts for the selected subreddit using the Suspense-friendly fetch function
  const posts = useSuspenseFetch(selectedSubreddit, () => fetchPostsData(selectedSubreddit));

  // Log the posts data to verify
  console.log('Fetched posts:', posts);

  return (
    <div className="container">
      <aside className="subreddit_list">
        <h3 className="subreddits_title">Subreddits</h3>
        {['pics', 'funny', 'nature', 'technology', 'gaming', 'paranormal'].map((sub) => (
          <button
            key={sub}
            className={`subreddit_option ${selectedSubreddit === sub ? 'active' : ''}`}
            onClick={() => setSelectedSubreddit(sub)}
          >
            {sub}
          </button>
        ))}
      </aside>
      <main className="posts_container">
        <Suspense fallback={<p>Loading posts...</p>}>
          {/* Render the PostList component with the fetched posts */}
          <PostList posts={posts} />
        </Suspense>
      </main>
    </div>
  );
};

export default SubredditList;
