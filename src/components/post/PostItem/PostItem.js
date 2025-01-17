import React, { useState, useEffect } from 'react';
import './PostItem.css';
import { useDispatch } from 'react-redux';
import { selectPost, fetchComments } from '../../../redux/postItemSlice';
import upVotes from '../../../assets/up_votes.png';
import downVotes from '../../../assets/down_votes.png';
import turnOffArrow from '../../../assets/turn_off_arrow.png';
import commentsIcon from '../../../assets/comments.jpg';
import { formatRedditText, timeAgo } from '../../utils';
import { handleMedia } from './handleMediaHelper';

const formatCommentsCount = (numComments) => {
  if (typeof numComments === 'number') {
    return numComments.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return "0";
};

const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [shouldPreload, setShouldPreload] = useState(true);
  const [upvoteIconSrc, setUpvoteIconSrc] = useState(turnOffArrow);
  const [downvoteIconSrc, setDownvoteIconSrc] = useState(turnOffArrow);
  const [voteCount, setVoteCount] = useState(post ? post.ups || 0 : 0);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    if (imageLoaded) {
      setShouldPreload(false);
    }
  }, [imageLoaded]);

  const handleCommentsClick = () => {
    dispatch(selectPost(post));
    dispatch(fetchComments(post.permalink));
  };

  const isImagePost = () => {
    const imageFormats = ['jpeg', 'jpg', 'png', 'gif'];
    const test = imageFormats.some(format => post?.url?.includes(format) || post?.thumbnail?.includes(format));
    return test;
  };


  const handleUpvoteClick = () => {
    if (upvoteIconSrc === turnOffArrow) {
      setUpvoteIconSrc(upVotes);
      setVoteCount(voteCount + 1);
      if (downvoteIconSrc === downVotes) {
        setDownvoteIconSrc(turnOffArrow);
        setVoteCount(voteCount + 2);
      }
    } else {
      setUpvoteIconSrc(turnOffArrow);
      setVoteCount(voteCount - 1);
    }
  };

  const handleDownvoteClick = () => {
    if (downvoteIconSrc === turnOffArrow) {
      setDownvoteIconSrc(downVotes);
      setVoteCount(voteCount - 1);
      if (upvoteIconSrc === upVotes) {
        setUpvoteIconSrc(turnOffArrow);
        setVoteCount(voteCount - 2);
      }
    } else {
      setDownvoteIconSrc(turnOffArrow);
      setVoteCount(voteCount + 1);
    }
  };

  const renderVoteCount = () => {
    // Safely handle voteCount formatting
    if (typeof voteCount === 'number') {
      return voteCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "0";
  };

  const parser = new DOMParser();

  return (
    <>
      <div className='post_info'>
        <span className='post_author'>{post.author} in <a href={post.subreddit_name_prefixed}>{post.subreddit_name_prefixed}</a></span>
        <span className='post_time'>{timeAgo(post.created)}</span>
      </div>

      <h3 className='post_title' onClick={handleCommentsClick} >{parser.parseFromString(post.title, "text/html").documentElement.textContent}</h3>

        
        <div className='post_text' onClick={handleCommentsClick} dangerouslySetInnerHTML={{__html: formatRedditText(post.selftext)}}></div>

      
      {isImagePost()?
        <div className='post_media'>{handleMedia(post, isImagePost, imageLoaded, shouldPreload, handleImageLoaded)}</div>
        : null}

      <div className='interactions'>
        <div className='vote_container'>
          <button className='upvote_button' onClick={handleUpvoteClick}>
            <img alt='up votes' src={upvoteIconSrc} className='upvote_icon' />
          </button>
          <span className='ups_number'>{renderVoteCount()}</span>
          <button className='downvote_button' onClick={handleDownvoteClick}>
            <img alt='down votes' src={downvoteIconSrc} className='downvote_icon' />
          </button>
        </div>

        <div className='comments_container' onClick={handleCommentsClick}>
          <button onClick={handleCommentsClick} className='comments_button' data-testid="comments-button">
            <img className='comments_icon' alt='comments' src={commentsIcon} />
          </button>
          <span className='num_comments'>{formatCommentsCount(post.num_comments)}</span>
        </div>
      </div>
    </>
  );
};

export default React.memo(PostItem);