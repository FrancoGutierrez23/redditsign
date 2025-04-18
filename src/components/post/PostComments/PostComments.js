import React from "react";
import "./PostComments.css";
import { useSelector, useDispatch } from "react-redux";
import { closeCommentsModal } from "../../../redux/postItemSlice";
import PostItem from "../PostItem/PostItem";

const PostComments = () => {
  const dispatch = useDispatch();
  const {
    post,
    comments = [],
    loading,
    error,
    isModalOpen,
  } = useSelector((state) => state.postItem);

  if (!isModalOpen) {
    return null; // Don't render the modal if it's not open
  }

  const handleClose = () => {
    dispatch(closeCommentsModal()); // Action to close the modal
  };

  const handleImgComment = (comment) => {
    if (typeof comment.body_html !== "string") {
      return <></>;
    }
    const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;
    const match = comment.body_html.match(imageRegex);

    if (match) {
      const imageUrl = match[0];
      return (
        <img
          src={imageUrl.slice(0, 8) + "i" + imageUrl.slice(15)}
          alt="comment-img"
          width="320px"
          className="comment_img"
        />
      );
    } else {
      return null;
    }
  };

  const handleTextComment = (text) => {
    if (text) {
      return <p>{text.match(/([A-Za-z0-9]+( [A-Za-z0-9]+)+)/g) || null}</p>;
    } else {
      return null;
    }
  };

  return (
    <div open className="comments-modal" role="dialog">
      <button onClick={handleClose} className="modal-close-button">
        <span className="close_icon" alt="close">
          X
        </span>
      </button>
      <div className="modal-content">
        <PostItem post={post} context="modal" className="focus" />

        <h4>Comments</h4>
        {loading && (
          <div className="comments_loader" data-testid="comments-loader"></div>
        )}
        {error && <p>Error loading comments: {error}</p>}
        {!loading && comments && comments.length === 0 && (
          <span className="posts_fallback">No comments available.</span>
        )}
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id} data-testid="comment">
              <p>
                <strong>{comment.author ? `${comment.author}:` : null}</strong>
              </p>
              {handleTextComment(comment.body)}
              {handleImgComment(comment)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostComments;
