import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

function CommentList({ comments, onCommentDeleted }) {
  const { user } = useContext(UserContext);
  const { id: postId } = useParams(); // Get postId from URL

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete comment');
      notyf.success('Comment deleted successfully');
      if (onCommentDeleted) onCommentDeleted(commentId); // Notify parent to update comments
    } catch (err) {
      notyf.error(err.message);
    }
  };

  if (!comments || comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
      {comments.map((c) => (
        <li
          key={c._id} // Use c._id as key
          style={{ borderBottom: '1px solid #eee', padding: '0.5rem 0' }}
        >
          {c.comment} — <em>{c.userId?.username || 'User'}</em>
                    {(user?.id === c.userId._id || user?.isAdmin) && (
            <button onClick={() => handleDeleteComment(c._id)} className="btn btn-danger" style={{ marginLeft: '0.5rem' }}>
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default CommentList;