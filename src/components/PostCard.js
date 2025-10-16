import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

function PostCard({ post, onDelete }) {
  const { user } = useContext(UserContext);

  return (
    <div className="glass-card">
      <h3>
        <Link to={`/posts/${post._id}`}>{post.title}</Link>
      </h3>
      <p>{post.content.slice(0, 100)}...</p>
      <p>
        <strong>Author:</strong> {post.authorId?.username || 'Unknown'}
      </p>
      {(user?.id === post.authorId?._id || user?.isAdmin) && (
        <div style={{ marginTop: '1rem' }}>
          <Link to={`/posts/${post._id}/edit`} className="btn" style={{ marginRight: '0.5rem' }}>
            Edit
          </Link>
          {onDelete && (
            <button onClick={() => onDelete(post._id)} className="btn btn-danger">
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default PostCard;
