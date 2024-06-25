// src/components/post/PostItem/PostItem.js

import React, { useState, useEffect } from 'react';
import './PostItem.css';
import { MdInsertComment } from "react-icons/md";
import { GiFrozenArrow, GiFlamingArrow } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import { selectPost, fetchComments } from '../../../redux/postItemSlice';
import { timeAgo } from '../../utils';

const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false); // State to track image loading
  const [shouldPreload, setShouldPreload] = useState(true); // State to control preload

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    // Disable preload after the first image is loaded
    if (imageLoaded) {
      setShouldPreload(false);
    }
  }, [imageLoaded]);

  const handleCommentsClick = () => {
    dispatch(selectPost(post));
    dispatch(fetchComments(post.permalink));
  };

  // Helper to determine if the post is an image post
  const isImagePost = () => {
    const imageFormats = ['jpeg', 'jpg', 'png'];
    return imageFormats.some(format => post.url.includes(format));
  };

  // Helper to render post image
  const renderPostImage = () => {
    if (isImagePost()) {
      return (
        <img
          src={post.url}
          alt={post.title}
          className={`post_img ${imageLoaded ? 'loaded' : ''}`}
          loading={shouldPreload ? 'eager' : 'lazy'} // Use 'eager' for above-the-fold images
          onLoad={handleImageLoaded}
          width="320" // Set explicit width
          height="320" // Set explicit height
        />
      );
    } else if (!post.thumbnail_width) {
      return (
        <img
          src='https://cdn.iconscout.com/icon/free/png-256/free-article-1767419-1505279.png'
          alt={post.title}
          className={`post_img ${imageLoaded ? 'loaded' : ''}`}
          loading={shouldPreload ? 'eager' : 'lazy'} // Use 'eager' for above-the-fold images
          onLoad={handleImageLoaded}
          width="320" // Set explicit width
          height="320" // Set explicit height
        />
      );
    } else {
      return (
        <img
          src={post.thumbnail}
          alt={post.title}
          className={`post_img ${imageLoaded ? 'loaded' : ''}`}
          loading={shouldPreload ? 'eager' : 'lazy'} // Use 'eager' for above-the-fold images
          onLoad={handleImageLoaded}
          width="320" // Set explicit width
          height="320" // Set explicit height
        />
      );
    }
  };

  return (
    <div className='post_container'>
      <div className='post_info'>
        <span className='post_author'>{post.author} in <a href={post.subreddit_name_prefixed}>{post.subreddit_name_prefixed}</a></span>
        <span className='post_time'>{timeAgo(post.created)}</span>
      </div>

      <h3 className='post_title'>{post.title}</h3>

      {renderPostImage()}

      <div className='interactions'>
        <div className='vote_container'>
          <button className='upvote_button'><GiFlamingArrow className='upvote_icon' /></button>
          <span className='ups_number'>{post.ups}</span>
          <button className='downvote_button'><GiFrozenArrow className='downvote_icon' /></button>
        </div>

        <div className='comments_container'>
          <span className='num_comments'>{post.num_comments}</span>
          <button onClick={handleCommentsClick}><MdInsertComment /></button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PostItem);
