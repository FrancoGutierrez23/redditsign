// src/components/post/PostList/PostList.js
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../redux/postsSlice';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import PostItem from '../PostItem/PostItem';
import './PostList.css';

const PostList = ({ posts }) => {
  const dispatch = useDispatch();
  const after = useSelector((state) => state.posts.after);
  const selectedSubreddit = useSelector((state) => state.posts.selectedSubreddit);
  
  // Callback to fetch the next page of posts
  const fetchMorePosts = useCallback(async () => {
    if (after) {
      dispatch(fetchPosts({ subreddit: selectedSubreddit, after }));
    }
  }, [dispatch, selectedSubreddit, after]);

  // Use the custom hook for infinite scroll
  const [isFetching] = useInfiniteScroll(fetchMorePosts);

  return (
    <main className='post-list'>
      {posts.length === 0 ? (
        <p className='no_posts_fallback_text'>No posts available.</p>
      ) : (
        <ul className='posts_container'>
          {posts.map((post) => (
            <li key={post.data.id} id={post.data.name} className='post'>
              <PostItem post={post.data} />
            </li>
          ))}
        </ul>
      )}
      {isFetching && <p>Loading more posts...</p>}
    </main>
  );
};

export default React.memo(PostList);
