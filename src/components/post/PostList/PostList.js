// src/components/PostList.js
import React from 'react';
import { useSelector } from 'react-redux';
import { MdInsertComment } from "react-icons/md";
import { GiFrozenArrow } from "react-icons/gi";
import { GiFlamingArrow } from "react-icons/gi";

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
              )}<br></br>

              <span className='post_author' >Author: {post.data.author}</span>

              <div className='vote_container'>
                <button><GiFlamingArrow /></button>
                  <span className='ups_number' >{post.data.ups}</span>
                <button><GiFrozenArrow /></button>
              </div>

              <div className='comments_container'>
                <span className='num_comments'>{post.data.num_comments}</span>
                <button><MdInsertComment /></button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
