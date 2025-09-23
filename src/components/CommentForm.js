import React, { useState, useContext } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import UserContext from '../context/UserContext';

const notyf = new Notyf();

function CommentForm({ postId, onCommentAdded }) {
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
                  const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify({ comment })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add comment');
      onCommentAdded(data);
      setComment('');
      notyf.success('Comment added successfully');
    } catch (err) {
      notyf.error(err.message);
    }
  };

  return (
        <form onSubmit={handleSubmit} className="glass-form">
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        required
      />
      <button type="submit" className="btn">Post</button>
    </form>
  );
}

export default CommentForm;
