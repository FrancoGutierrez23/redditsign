import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPost, fetchComments } from '../../../redux/postItemSlice';
import { MdInsertComment } from "react-icons/md";
import { GiFrozenArrow } from "react-icons/gi";
import { GiFlamingArrow } from "react-icons/gi";

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
        <p className='no_posts_fallback_text'>No posts available.</p>
      ) : (
        <ul className='posts_container'>
          {posts.map((post) => (
            <li key={post.data.id} id={post.data.name} className='post'>
              <h3 className='post_title'>{post.data.title}</h3>

              {post.data.url.includes('jpeg') || post.data.url.includes('png') ? (
                <img src={post.data.url} alt={post.data.title} style={{ width: '100px' }} className='post_img' />
              ) : (
                post.data.thumbnail_width === null ? <img src='https://cdn.iconscout.com/icon/free/png-256/free-article-1767419-1505279.png' alt={post.data.title} className='post_img' /> : <img src={post.data.thumbnail} alt={post.data.title} className='post_img' />
              )}<br></br>

              <span className='post_author' >Author: {post.data.author}</span>

              <div className='vote_container'>
                <button className='upvote_button'><GiFlamingArrow className='upvote_icon' /></button>
                  <span className='ups_number' >{post.data.ups}</span>
                <button className='downvote_button'><GiFrozenArrow className='downvote_icon' /></button>
              </div>

              <div className='comments_container'>
                <span className='num_comments'>{post.data.num_comments}</span>
                <button onClick={() => handlePostClick(post.data)} className='comment_button' ><MdInsertComment className='comment_button_icon' /></button>
              </div>


            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default PostList;
