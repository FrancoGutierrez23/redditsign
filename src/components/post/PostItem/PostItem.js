import React from 'react';
import './PostItem.css';
import { MdInsertComment } from "react-icons/md";
import { GiFrozenArrow, GiFlamingArrow } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import { selectPost, fetchComments } from '../../../redux/postItemSlice';
import { timeAgo } from '../../utils';

const PostItem = ({ post }) => {
  const dispatch = useDispatch();

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
      return <img src={post.url} alt={post.title} className='post_img' loading="lazy" />;
    }
    if (!post.thumbnail_width) {
      return <img src='https://cdn.iconscout.com/icon/free/png-256/free-article-1767419-1505279.png' alt={post.title} className='post_img' loading="lazy" />;
    }
    return <img src={post.thumbnail} alt={post.title} className='post_img' loading="lazy" />;
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

export default React.memo(PostItem); // React.memo to prevent unnecessary re-renders
