// src/components/post/PostItem/PostItem.js
import React from 'react';
import './PostItem.css';
import { MdInsertComment } from "react-icons/md";
import { GiFrozenArrow, GiFlamingArrow } from "react-icons/gi";
import { timeAgo } from '../../utils';

const PostItem = ({ post, onClick }) => {
  return (
    <div className='post_container'>
      <div className='post_info'>
        <span className='post_author'>{post.author} in <a href='www'>{post.subreddit_name_prefixed}</a></span>
        <span className='post_time'> {timeAgo(post.created)}</span>
      </div>

      <h3 className='post_title'>{post.title}</h3>

      {post.url.includes('jpeg') || post.url.includes('png') || post.url.includes('jpg') ? (
        <img src={post.url} alt={post.title} className='post_img' style={{width: post.thumbnail_width || '100px', height: post.thumbnail_height || '100px'}} />
      ) : (
        post.thumbnail_width === null ? <img src='https://cdn.iconscout.com/icon/free/png-256/free-article-1767419-1505279.png' alt={post.title} className='post_img' style={{width: post.thumbnail_width  || '100px', height: post.thumbnail_height || '100px'}} /> : <img src={post.thumbnail} alt={post.title} className='post_img' style={{width: post.thumbnail_width || '100px', height: post.thumbnail_height || '100px'}} />
      )}

      <div className='interactions'>
      <div className='vote_container'>
        <button className='upvote_button'><GiFlamingArrow className='upvote_icon' /></button>
        <span className='ups_number'>{post.ups}</span>
        <button className='downvote_button'><GiFrozenArrow className='downvote_icon' /></button>
      </div>

      <div className='comments_container'>
        <span className='num_comments'>{post.num_comments}</span>
        {onClick && (
          <button onClick={onClick} className='comment_button'>
            <MdInsertComment className='comment_button_icon' />
          </button>
        )}
      </div>
      </div>

    </div>
  );
};

export default PostItem;
