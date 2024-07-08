import React, { useState, useEffect } from 'react';
import './PostItem.css';
import { useDispatch } from 'react-redux';
import { selectPost, fetchComments } from '../../../redux/postItemSlice';
import { timeAgo } from '../../utils';
import upVotes from '../../../assets/up_votes.png';
import downVotes from '../../../assets/down_votes.png';
import turnOffArrow from '../../../assets/turn_off_arrow.png';
import commentsIcon from '../../../assets/comments.jpg';
import { formatRedditText } from '../../utils'; // Import the format function

const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [shouldPreload, setShouldPreload] = useState(true);
  const [upvoteIconSrc, setUpvoteIconSrc] = useState(turnOffArrow);
  const [downvoteIconSrc, setDownvoteIconSrc] = useState(turnOffArrow);
  const [voteCount, setVoteCount] = useState(post.ups);

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
    const imageFormats = ['jpeg', 'jpg', 'png'];
    return imageFormats.some(format => post.url.includes(format));
  };

  const renderPostImage = () => {
    const width = post.thumbnail_width * 2 || 320;
    const height = post.thumbnail_height * 2 || 320;

    if (isImagePost()) {
      return (
        <img
          src={post.url.includes('jpeg' || 'jpg' || 'png')? post.url : post.thumbnail}
          alt={post.title}
          className={`post_img ${imageLoaded ? 'loaded' : ''}`}
          loading={shouldPreload ? 'eager' : 'lazy'}
          onLoad={handleImageLoaded}
          style={{width: width, height: height}}
        />
      );
    } else if (!post.thumbnail_width) {
      return (
        <></>
      );
    } else if (post.is_video) {
      return (
        <video 
          style={{width: width, height: height}}
          className='post_vid'
          loading='lazy'
          controls>
          <source src={post.media.reddit_video.fallback_url} type='video/mp4' />
        </video>
      )
    } else if(post.url.includes('gallery')) {
      
      const imgId = post.gallery_data.items[0].media_id;
      const imgOrigin = post.media_metadata[imgId].s.u
      const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;
      const match = imgOrigin.match(imageRegex);
  
      if (match) {
        const imageUrl = match[0];
        return (
          <img
            src={imageUrl.slice(0, 8) + 'i' + imageUrl.slice(15)} // Assuming you need to modify the URL for some reason
            alt="comment-img"
            width={width}
            height={height}
            onLoad={handleImageLoaded}
            className={`post_img ${imageLoaded ? 'loaded' : ''}`}
            loading={shouldPreload ? 'eager' : 'lazy'}
          />
        );
      }
    } else {
      return (
        <img
          src={post.url.includes('jpeg' || 'jpg' || 'png')? post.url : post.thumbnail}
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

  return (
    <>
      <div className='post_info'>
        <span className='post_author'>{post.author} in <a href={post.subreddit_name_prefixed}>{post.subreddit_name_prefixed}</a></span>
        <span className='post_time'>{timeAgo(post.created)}</span>
      </div>

      <h3 className='post_title' onClick={handleCommentsClick}>{post.title}</h3>

        
        <div onClick={handleCommentsClick} dangerouslySetInnerHTML={{__html: formatRedditText(post.selftext)}}></div>

      {renderPostImage()}

      <div className='interactions'>
        <div className='vote_container'>
          <button className='upvote_button' onClick={handleUpvoteClick}>
            <img alt='up votes' src={upvoteIconSrc} className='upvote_icon' />
          </button>
          <span className='ups_number'>{voteCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          <button className='downvote_button' onClick={handleDownvoteClick}>
            <img alt='down votes' src={downvoteIconSrc} className='downvote_icon' />
          </button>
        </div>

        <div className='comments_container' onClick={handleCommentsClick}>
          <button onClick={handleCommentsClick} className='comments_button'>
            <img className='comments_icon' alt='comments' src={commentsIcon} />
          </button>
          <span className='num_comments'>{post.num_comments.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        </div>
      </div>
    </>
  );
};

export default React.memo(PostItem);

