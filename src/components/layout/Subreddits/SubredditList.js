import './SubredditList.css'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../redux/postsSlice';

const SubredditList = () => {
    const dispatch = useDispatch();
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);
  const [subreddit, setSubreddit] = useState('pics'); 

  useEffect(() => {
    dispatch(fetchPosts(subreddit));
  }, [dispatch, subreddit]);

  return (
    <aside className="subreddit_list">
      <h3 className='subreddits_title'>Subrredits</h3>
        {['pics', 'funny', 'nature', 'technology', 'gaming', 'paranormal'].map((sub) => (
          <button key={sub} className='subreddit_option' onClick={() => {
            setSubreddit(sub);
            dispatch(fetchPosts(sub));
          }}>{sub}</button>
        ))}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </aside>
  )
}

export default SubredditList;
