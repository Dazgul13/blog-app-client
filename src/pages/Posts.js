import React, { useEffect, useState, useContext } from 'react';
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
            fetch(`${process.env.REACT_APP_API_URL}/posts`)
            .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch(() => notyf.error('Failed to fetch posts'));
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
      notyf.success('Post deleted');
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