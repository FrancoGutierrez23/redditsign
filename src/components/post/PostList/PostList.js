// src/components/post/PostList/PostList.js

import './PostList.css';
import React from 'react';
import PropTypes from 'prop-types';
import PostItem from '../PostItem/PostItem';

const PostList = ({ posts = [] }) => {
  // Ensure posts is never undefined; use a default empty array if it is.
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
    </main>
  );
};

// Define the expected prop types for PostList
PostList.propTypes = {
  posts: PropTypes.array // Expecting an array for posts
};

export default PostList;
