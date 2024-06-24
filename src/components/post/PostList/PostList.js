// src/components/post/PostList/PostList.js
import './PostList.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPost, fetchComments } from '../../../redux/postItemSlice';
import PostItem from '../PostItem/PostItem'; // Import the new PostItem component

const PostList = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  const handlePostClick = (post) => {
    dispatch(selectPost(post)); // Select the post
    dispatch(fetchComments(post.permalink)); // Fetch comments for the selected post
  };

  return (
    <main className='post-list'>
      {posts.length === 0 ? (
        <p className='no_posts_fallback_text'>Loading posts...</p>
      ) : (
        <ul className='posts_container'>
          {posts.map((post) => (
            <li key={post.data.id} id={post.data.name} className='post'>
              <PostItem post={post.data} onClick={() => handlePostClick(post.data)} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default PostList;
