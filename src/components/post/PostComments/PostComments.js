// src/components/post/PostComments/PostComments.js

import React from 'react';
import './PostComments.css';
import { useSelector, useDispatch } from 'react-redux';
import { closeCommentsModal } from '../../../redux/postItemSlice';
import PostItem from '../PostItem/PostItem';

const PostComments = () => {
  const dispatch = useDispatch();
  const { post, comments, loading, error, isModalOpen } = useSelector((state) => state.postItem);

  if (!isModalOpen) {
    return null; // Don't render the modal if it's not open
  }

  const handleClose = () => {
    dispatch(closeCommentsModal()); // Action to close the modal
  };

  return (
    <dialog open className='comments-modal'>
      <button onClick={handleClose} className='modal-close-button'><span className='close_icon'>X</span></button>
      <div className='modal-content'>
        <PostItem post={post} className='focus' />

        <h4>Comments</h4>
        {loading && <p>Loading comments...</p>}
        {error && <p>Error loading comments: {error}</p>}
        {!loading && comments.length === 0 && <span className='posts_fallback'>No comments available.</span>}
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
