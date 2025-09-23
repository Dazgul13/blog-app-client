import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import UserContext from '../context/UserContext';

const notyf = new Notyf();

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
                if (user?.id !== data.authorId?._id && !user?.isAdmin) {
          notyf.error('You are not authorized to edit this post');
          navigate('/posts');
        }
        setForm({ title: data.title, content: data.content });
      })
      .catch(() => notyf.error('Failed to fetch post'));
  }, [id, user, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update post');
      notyf.success('Post updated successfully');
      navigate(`/posts/${id}`);
    } catch (err) {
      notyf.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-form">
      <h2>Edit Post</h2>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit" className="btn">Update Post</button>
    </form>
  );
}

export default EditPost;
