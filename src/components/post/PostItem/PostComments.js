import React from 'react';
import { useSelector } from 'react-redux';

const PostComments = () => {
  const { post, comments, loading, error } = useSelector((state) => state.postItem);
  const posts = useSelector((state) => state.posts.posts);
  if (!post) {
    return <p>Select a post to view comments.</p>;
  }

  return (
    <dialog className='comments' style={{display: 'block'}}>
      <h3>Comments for "{post.title}"</h3>
      <div>{posts[0].data.title} {post.id}</div>
      {loading && <p>Loading comments...</p>}
      {error && <p>Error loading comments: {error}</p>}
      {!loading && comments.length === 0 && <p>No comments available.</p>}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} id={comment.id}>
            <p><strong>{comment.author}</strong>: {comment.body}</p>
          </li>
        ))}
      </ul>
    </dialog>
  );
};

export default PostComments;
