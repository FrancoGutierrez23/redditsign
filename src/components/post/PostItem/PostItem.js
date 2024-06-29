// src/components/post/PostItem/PostItem.js
import React, { useState, useEffect } from 'react';
import './PostItem.css';
import { useDispatch } from 'react-redux';
import { selectPost, fetchComments } from '../../../redux/postItemSlice';
import { timeAgo } from '../../utils';
import upVotes from '../../../assets/up_votes.png';
import downVotes from '../../../assets/down_votes.png';
import turnOffArrow from '../../../assets/turn_off_arrow.png';
import commentsIcon from '../../../assets/comments.jpg'

const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false); // State to track image loading
  const [shouldPreload, setShouldPreload] = useState(true); // State to control preload
  const [upvoteIconSrc, setUpvoteIconSrc] = useState(turnOffArrow); // State for upvote icon
  const [downvoteIconSrc, setDownvoteIconSrc] = useState(turnOffArrow); // State for downvote icon
  const [voteCount, setVoteCount] = useState(post.ups); // State to track the current vote count

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
    const width = post.thumbnail_width * 2 || 320; // Default width if not provided
    const height = post.thumbnail_height * 2 || 320; // Default height if not provided

    if (isImagePost()) {
      return (
        <img
          src={post.url}
          alt={post.title}
          className={`post_img ${imageLoaded ? 'loaded' : ''}`}
          loading={shouldPreload ? 'eager' : 'lazy'}
          onLoad={handleImageLoaded}
          width={width}
          height={height}
        />
      );
    } else if (!post.thumbnail_width) {
      return (
        <></>
      );
    } else {
      return (
        <img
          src={post.thumbnail}
          alt={post.title}
          className={`post_img ${imageLoaded ? 'loaded' : ''}`}
          loading={shouldPreload ? 'eager' : 'lazy'}
          onLoad={handleImageLoaded}
          width={width}
          height={height}
        />
      );
    }
  };

  // Handler for upvote button click
  const handleUpvoteClick = () => {
    if (upvoteIconSrc === turnOffArrow) {
      // Change to upVotes and increment the vote count
      setUpvoteIconSrc(upVotes);
      setVoteCount(voteCount + 1);

      // If downvote is active, reset it
      if (downvoteIconSrc === downVotes) {
        setDownvoteIconSrc(turnOffArrow);
        setVoteCount(voteCount + 2); // Cancel the downvote effect and add upvote effect
      }
    } else {
      // Change back to turnOffArrow and decrement the vote count
      setUpvoteIconSrc(turnOffArrow);
      setVoteCount(voteCount - 1);
    }
  };

  // Handler for downvote button click
  const handleDownvoteClick = () => {
    if (downvoteIconSrc === turnOffArrow) {
      // Change to downVotes and decrement the vote count
      setDownvoteIconSrc(downVotes);
      setVoteCount(voteCount - 1);

      // If upvote is active, reset it
      if (upvoteIconSrc === upVotes) {
        setUpvoteIconSrc(turnOffArrow);
        setVoteCount(voteCount - 2); // Cancel the upvote effect and add downvote effect
      }
    } else {
      // Change back to turnOffArrow and increment the vote count
      setDownvoteIconSrc(turnOffArrow);
      setVoteCount(voteCount + 1);
    }
  };

  return (
    <>
      <div className='post_info'>
        <span className='post_author'>{post.author} in <a href={post.subreddit_name_prefixed}>{post.subreddit_name_prefixed}</a></span>
        <span className='post_time'>{timeAgo(post.created)}</span>
      </div>

      <h3 className='post_title'>{post.title}</h3>

      {renderPostImage()}

      <div className='interactions'>
        <div className='vote_container'>
          <button className='upvote_button' onClick={handleUpvoteClick}>
            <img alt='up votes' src={upvoteIconSrc} className='upvote_icon' />
          </button>
          <span className='ups_number'>{voteCount}</span>
          <button className='downvote_button' onClick={handleDownvoteClick}>
            <img alt='down votes' src={downvoteIconSrc} className='downvote_icon' />
          </button>
        </div>

        <div className='comments_container'>
          <button onClick={handleCommentsClick} className='comments_button'>
            <img className='comments_icon' alt='comments' src={commentsIcon} />
          </button>
          <span className='num_comments'>{post.num_comments}</span>
        </div>
      </div>
    </>
  );
};

export default React.memo(PostItem);
