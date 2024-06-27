// src/components/layout/Subreddits/SubredditList.js
import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import { fetchPosts, resetPosts } from '../../../redux/postsSlice';
import './SubredditList.css';

const SubredditList = () => {
  const dispatch = useDispatch();
  const [selectedSubreddit, setSelectedSubreddit] = useState('pics');
  
  useEffect(() => {
    dispatch(resetPosts()); // Reset posts when subreddit changes
    dispatch(fetchPosts({ subreddit: selectedSubreddit, after: null }));
  }, [dispatch, selectedSubreddit]);

  return (
    <aside className="subreddit_list">
      <h3 className="subreddits_title">Subreddits</h3>
      {['pics', 'funny', 'nature', 'technology', 'gaming', 'paranormal', 'news', 'AskReddit', 'aww', 'todayilearned', 'science', 'movies'].map((sub) => (
        <button
          key={sub}
          className={`subreddit_option ${selectedSubreddit === sub ? 'active' : ''}`}
          onClick={() => setSelectedSubreddit(sub)}
        >
          <span className={`subreddit_option_icon ${selectedSubreddit === sub ? 'active_subreddit_option_icon' : ''}`} >{`>`}</span>{sub}
        </button>
      ))}
    </aside>
  );
};

export default React.memo(SubredditList);
