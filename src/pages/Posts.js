import { useEffect, useState, useContext } from 'react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

function Posts() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
    fetch(`${apiUrl}/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        console.log('API not available, using demo mode');
        // Set demo posts for testing
        setPosts([
          {
            _id: 'demo1',
            title: 'Welcome to BlogSpace!',
            content: 'This is a demo post to show how the posts section works. Create an account and start writing your own amazing content!',
            authorId: { _id: 'demo-user', username: 'Demo User', email: 'demo@example.com' },
            createdAt: new Date().toISOString()
          },
          {
            _id: 'demo2',
            title: 'Getting Started with Blogging',
            content: 'Learn how to write engaging blog posts that capture your readers attention. Share your experiences, insights, and stories with the world.',
            authorId: { _id: 'demo-user2', username: 'Writer', email: 'writer@example.com' },
            createdAt: new Date().toISOString()
          }
        ]);
      });
  }, []);

  const handlePostAdded = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleDelete = async (id) => {
    try {
                  const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPosts(posts.filter((p) => p._id !== id));
      notyf.success('Post deleted successfully! 🗑️');
    } catch (err) {
      notyf.error(err.message);
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      {user && <PostForm onPostAdded={handlePostAdded} />}
      {posts.map((p) => (
                                <PostCard key={p._id} post={p} onDelete={(user?.id === p.authorId?._id || user?.isAdmin) ? handleDelete : null} />
      ))}
    </div>
  );
}

export default Posts;