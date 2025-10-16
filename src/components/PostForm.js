import { useState, useContext } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import UserContext from '../context/UserContext';

const notyf = new Notyf();

function PostForm({ onPostAdded }) {
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({ title: '', content: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
                  const res = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create post');
      onPostAdded(data);
      setForm({ title: '', content: '' });
      notyf.success('Post created successfully');
    } catch (err) {
      notyf.error(err.message);
    }
  };

  return (
        <form onSubmit={handleSubmit} className="glass-form">
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
      <button type="submit" className="btn">Add Post</button>
    </form>
  );
}

export default PostForm;
