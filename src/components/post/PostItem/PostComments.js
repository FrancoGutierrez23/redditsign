// src/components/post/PostItem/PostComments.js
import React from 'react';
import './PostComments.css';
import { useSelector, useDispatch } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { closeCommentsModal } from '../../../redux/postItemSlice'; // New action to handle modal state

const PostComments = () => {
  const dispatch = useDispatch();
  const { post, comments, loading, error } = useSelector((state) => state.postItem);

  if (!post) {
    return null; // Don't render anything if no post is selected
  }

  const handleClose = () => {
    dispatch(closeCommentsModal()); // Action to close the modal
  };

  return (
    <dialog open className='comments-modal'>
      <button onClick={handleClose} className='modal-close-button'><MdClose /></button>
      <div className='modal-content'>
        {/* Display the selected post */}
        <div className='selected-post'>
          <h3>{post.title}</h3>
          {post.url.includes('jpeg') || post.url.includes('png') ? (
            <img src={post.url} alt={post.title} style={{ width: '100px' }} />
          ) : (
            post.thumbnail_width === null ? <img src='https://cdn.iconscout.com/icon/free/png-256/free-article-1767419-1505279.png' alt={post.title} /> : <img src={post.thumbnail} alt={post.title} />
          )}
          <p>Author: {post.author}</p>
          <p>Score: {post.ups}</p>
          <p>{post.selftext}</p>
        </div>

        {/* Display the comments */}
        <h4>Comments</h4>
        {loading && <p>Loading comments...</p>}
        {error && <p>Error loading comments: {error}</p>}
        {!loading && comments.length === 0 && <p>No comments available.</p>}
        <ul className='comments-list'>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p><strong>{comment.author}</strong>: {comment.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
};

export default PostComments;
