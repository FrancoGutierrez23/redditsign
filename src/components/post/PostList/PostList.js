// src/components/PostList.js
import React from 'react';
import { useSelector } from 'react-redux';

const PostList = () => {
  const posts = useSelector((state) => state.posts.posts);

  return (
    <div>
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.data.id}>
              <h3 className='post_title'>{post.data.title}</h3>
              {post.data.url.includes('jpeg') || post.data.url.includes('png') ? (
                <img src={post.data.url} alt={post.data.title} style={{ width: '100px' }} className='post_img' />
              ) : (
                post.data.thumbnail_width === null ? <img src='https://cdn.iconscout.com/icon/free/png-256/free-article-1767419-1505279.png' alt={post.data.title} className='post_img' /> : <img src={post.data.thumbnail} alt={post.data.title} className='post_img' />
              )}
              <span className='post_author' >Author: {post.data.author}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
