import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FindPost() {
  const [postId, setPostId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postId) {
      navigate(`/posts/${postId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-form">
      <h2>Find Post by ID</h2>
      <input
        type="text"
        placeholder="Enter Post ID"
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
        required
      />
      <button type="submit" className="btn">Find Post</button>
    </form>
  );
}

export default FindPost;
