// src/components/post/PostComments/PostComments.js
import React from 'react';
import './PostComments.css';
import { useSelector, useDispatch } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { closeCommentsModal } from '../../../redux/postItemSlice';
import PostItem from '../PostItem/PostItem'; // Import the new PostItem component

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
        {/* Use the PostItem component to display the selected post */}
        <PostItem post={post} />

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
