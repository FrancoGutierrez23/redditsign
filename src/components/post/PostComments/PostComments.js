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

  const handleImgComment = (comment) => {
    if (typeof comment.body_html !== 'string') {
      return <></>;
    }
    const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;
    const match = comment.body_html.match(imageRegex);

    if (match) {
      const imageUrl = match[0];
      return (
        <img
          src={imageUrl.slice(0, 8) + 'i' + imageUrl.slice(15)} // Assuming you need to modify the URL for some reason
          alt="comment-img"
          width="320px"
          className="comment_img" // Add a class for styling purposes
        />
      );
    }
  };

  const handleTextComment = (text) => {

  if (text) {
    return (
      <p>
        {text.match(/([A-Za-z0-9]+( [A-Za-z0-9]+)+)/g)}
      </p>
    )
  }
      

  }

  return (
    <dialog open className="comments-modal">
      <button onClick={handleClose} className="modal-close-button">
        <span className="close_icon">X</span>
      </button>
      <div className="modal-content">
        <PostItem post={post} className="focus" />

        <h4>Comments</h4>
        {loading && <p>Loading comments...</p>}
        {error && <p>Error loading comments: {error}</p>}
        {!loading && comments.length === 0 && (
          <span className="posts_fallback">No comments available.</span>
        )}
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>
                <strong>{comment.author? `${comment.author}:` : null}</strong>
              </p>
              {handleTextComment(comment.body)}
              {handleImgComment(comment)}
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
};

export default PostComments;
