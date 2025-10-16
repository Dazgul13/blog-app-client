import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

function Home() {
  const { user } = useContext(UserContext);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedPosts();
  }, []);

  const fetchFeaturedPosts = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      const response = await fetch(`${apiUrl}/posts?limit=3&featured=true`);
      if (!response.ok) {
        throw new Error('Failed to fetch featured posts');
      }
      const data = await response.json();
      setFeaturedPosts(Array.isArray(data) ? data.slice(0, 3) : []); // Get top 3 posts as featured
    } catch (error) {
      console.error('Error fetching featured posts:', error);
      // Fallback: fetch regular posts
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
        const response = await fetch(`${apiUrl}/posts?limit=3`);
        if (response.ok) {
          const data = await response.json();
          setFeaturedPosts(Array.isArray(data) ? data.slice(0, 3) : []);
        }
      } catch (fallbackError) {
        console.log('API not available, using demo mode');
        // Set demo posts for testing
        setFeaturedPosts([
          {
            _id: 'demo1',
            title: 'Welcome to BlogSpace!',
            content: 'This is a demo post to show how the featured posts section works. Create an account and start writing your own amazing content!',
            authorId: { email: 'demo@example.com' },
            createdAt: new Date().toISOString()
          },
          {
            _id: 'demo2',
            title: 'Getting Started with Blogging',
            content: 'Learn how to write engaging blog posts that capture your readers attention. Share your experiences, insights, and stories with the world.',
            authorId: { email: 'writer@example.com' },
            createdAt: new Date().toISOString()
          }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="container">
      {/* Hero Banner */}
      <div className="hero-banner">
        <h1>Welcome to BlogSpace</h1>
        <p className="tagline">
          Share your thoughts, connect with others, and discover amazing stories
        </p>
        <div className="hero-actions">
          <Link to="/posts" className="hero-cta">
            📚 Explore Posts
          </Link>
          {user && (
            <Link to="/add-post" className="hero-cta secondary">
              ✍️ Write a Post
            </Link>
          )}
        </div>
      </div>

      {/* Welcome Section */}
      <div className="welcome-section">
        <h2>Discover Amazing Content</h2>
        <p>
          Join our community of writers and readers. Share your experiences, 
          learn from others, and be part of meaningful conversations.
        </p>
      </div>

      {/* Featured Posts Section */}
      <div className="featured-section">
        <h2 className="section-title">✨ Featured Posts</h2>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner">⏳</div>
            <p>Loading featured posts...</p>
          </div>
        ) : featuredPosts.length > 0 ? (
          <div className="featured-posts-grid">
            {featuredPosts.map((post, index) => (
              <div key={post._id} className="featured-post-card">
                <div className="featured-badge">Featured</div>
                <h3 className="featured-post-title">{post.title}</h3>
                <p className="featured-post-excerpt">
                  {truncateText(post.content)}
                </p>
                <div className="featured-post-meta">
                  <span className="featured-post-author">
                    👤 {post.authorId?.email?.split('@')[0] || 'Anonymous'}
                  </span>
                  <span className="featured-post-date">
                    📅 {formatDate(post.createdAt)}
                  </span>
                </div>
                <Link 
                  to={`/posts/${post._id}`} 
                  className="read-more-btn"
                >
                  Read More 📖
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-posts-message">
            <div className="glass-card text-center">
              <h3>No Featured Posts Yet</h3>
              <p>Be the first to create amazing content!</p>
              {user ? (
                <Link to="/add-post" className="btn btn-primary">
                  ✍️ Write Your First Post
                </Link>
              ) : (
                <Link to="/register" className="btn btn-primary">
                  🚀 Join Our Community
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        <div className="feature-card">
          <h3>📝 Easy Writing</h3>
          <p>
            Create beautiful posts with our intuitive editor. 
            Share your thoughts and stories effortlessly.
          </p>
        </div>
        <div className="feature-card">
          <h3>🌟 Discover Content</h3>
          <p>
            Explore a wide variety of topics and discover 
            new perspectives from our community of writers.
          </p>
        </div>
        <div className="feature-card">
          <h3>💬 Engage & Connect</h3>
          <p>
            Comment on posts, connect with authors, and 
            build meaningful relationships in our community.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      {!user && (
        <div className="cta-section">
          <div className="glass-card text-center">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of writers and readers in our growing community.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary">
                🚀 Join Now
              </Link>
              <Link to="/posts" className="btn btn-secondary">
                📚 Browse Posts
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
