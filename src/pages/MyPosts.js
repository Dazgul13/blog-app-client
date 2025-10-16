import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import PostCard from '../components/PostCard';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

function MyPosts() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMyPosts();
    }
  }, [user]);

  const fetchMyPosts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/my-posts`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch your posts');
      }
      
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      notyf.error('Failed to load your posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${user?.token}` 
        }
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      setPosts(posts.filter((p) => p._id !== id));
      notyf.success('Post deleted successfully');
    } catch (err) {
      notyf.error(err.message);
    }
  };

  if (!user) {
    return (
      <div className="container">
        <div className="glass-card text-center">
          <h2>Authentication Required</h2>
          <p>Please login to view your posts.</p>
          <Link to="/login" className="btn btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>📝 My Posts</h1>
        <p>Manage and view all your published posts</p>
        <Link to="/add-post" className="btn btn-primary">
          ✨ Create New Post
        </Link>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner">⏳</div>
          <p>Loading your posts...</p>
        </div>
      ) : posts.length > 0 ? (
        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard 
              key={post._id} 
              post={post} 
              onDelete={handleDelete}
              showActions={true}
            />
          ))}
        </div>
      ) : (
        <div className="no-posts-message">
          <div className="glass-card text-center">
            <h3>No Posts Yet</h3>
            <p>You haven't created any posts yet. Start sharing your thoughts with the world!</p>
            <Link to="/add-post" className="btn btn-primary">
              ✍️ Write Your First Post
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPosts;