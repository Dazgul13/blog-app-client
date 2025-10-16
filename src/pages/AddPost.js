import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

function AddPost() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      notyf.error('Please login to create a post');
      navigate('/login');
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      notyf.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          content: formData.content.trim(),
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      notyf.success('Post created successfully! 🎉');
      navigate('/posts');
    } catch (error) {
      notyf.error(error.message || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="container">
        <div className="glass-card text-center">
          <h2>Authentication Required</h2>
          <p>Please login to create a new post.</p>
          <button 
            onClick={() => navigate('/login')} 
            className="btn btn-primary"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="glass-form">
        <div className="form-header">
          <h2>✍️ Create New Post</h2>
          <p>Share your thoughts with the world</p>
        </div>

        <form onSubmit={handleSubmit} className="add-post-form">
          <div className="form-group">
            <label htmlFor="title">Post Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter an engaging title for your post..."
              required
              maxLength="100"
            />
            <small className="char-count">
              {formData.title.length}/100 characters
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="content">Post Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your post content here... Share your ideas, experiences, or stories!"
              required
              rows="12"
              maxLength="5000"
            />
            <small className="char-count">
              {formData.content.length}/5000 characters
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (optional)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Enter tags separated by commas (e.g., technology, lifestyle, tips)"
            />
            <small className="form-help">
              Tags help others discover your post. Separate multiple tags with commas.
            </small>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/posts')}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner">⏳</span>
                  Publishing...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Publish Post
                </>
              )}
            </button>
          </div>
        </form>

        <div className="post-tips">
          <h4>💡 Writing Tips</h4>
          <ul>
            <li>Use a clear, descriptive title that captures your main idea</li>
            <li>Break up long paragraphs for better readability</li>
            <li>Add relevant tags to help others find your content</li>
            <li>Proofread your content before publishing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddPost;