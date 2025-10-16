import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

function PostDetails() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [post, setPost] = useState(null);

  useEffect(() => {
            fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch(() => notyf.error('Failed to fetch post'));
  }, [id]);

  const handleCommentAdded = (updatedPost) => {
    setPost(updatedPost);
  };

  const handleCommentDeleted = (commentId) => {
    setPost((prevPost) => ({
      ...prevPost,
      comments: prevPost.comments.filter((comment) => comment._id !== commentId),
    }));
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="glass-card">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>
        <strong>Author:</strong> {post.authorId?.username || 'Unknown'}
      </p>
      {(user?.id === post.authorId?._id || user?.isAdmin) && (
        <Link to={`/posts/${post._id}/edit`} className="btn">
          Edit Post
        </Link>
      )}

      <h3>Comments</h3>
      <CommentList comments={post.comments} onCommentDeleted={handleCommentDeleted} />
      {user && <CommentForm postId={id} onCommentAdded={handleCommentAdded} />}
    </div>
  );
}

export default PostDetails;
