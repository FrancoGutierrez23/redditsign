// src/components/post/PostItem/PostComments.js
import React from 'react';
import { useSelector } from 'react-redux';

const PostComments = () => {
  const { post, comments, loading, error } = useSelector((state) => state.postItem);

  if (!post) {
    return <p>Select a post to view comments.</p>;
  }

  return (
    <div>
      <h3>Comments for "{post.title}"</h3>
      {loading && <p>Loading comments...</p>}
      {error && <p>Error loading comments: {error}</p>}
      {!loading && comments.length === 0 && <p>No comments available.</p>}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p><strong>{comment.author}</strong>: {comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostComments;
