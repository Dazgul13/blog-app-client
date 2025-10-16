import { useEffect, useState, useContext } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import UserContext from '../context/UserContext';

const notyf = new Notyf();

function Dashboard() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
            fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      headers: { Authorization: `Bearer ${user?.token}` }
    })
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(() => notyf.error('Failed to load posts'));
  }, [user]);

  const deletePost = async (postId) => {
    try {
                  const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      setPosts(posts.filter(post => post._id !== postId));
      notyf.success('Post deleted');
    } catch (err) {
      notyf.error(err.message);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            {post.title} — {post.author?.username}
                        <button onClick={() => deletePost(post._id)} className="btn btn-danger">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
