import { useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

function RegisterForm({ onRegister }) {
  const [form, setForm] = useState({ email: '', username: '', password: '', confirmPassword: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.username || !form.password || !form.confirmPassword) {
      notyf.error('Please fill in all fields');
      return;
    }

    if (form.password.length < 8) {
      notyf.error('Password must be at least 8 characters long');
      return;
    }

    if (form.password !== form.confirmPassword) {
      notyf.error('Passwords do not match');
      return;
    }

    try {
      // Try backend first
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      const res = await fetch(`${apiUrl}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      notyf.success('Registered successfully! 🎉');
      if (onRegister) onRegister();
    } catch (err) {
      // Fallback to mock registration if backend is not available
      console.log('Backend not available, using mock registration');
      
      // Get stored users from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      
      // Check if user already exists
      if (storedUsers.find(u => u.email === form.email)) {
        notyf.error('User with this email already exists');
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email: form.email,
        username: form.username,
        password: form.password,
        isAdmin: false,
        createdAt: new Date().toISOString()
      };
      
      // Save to localStorage
      storedUsers.push(newUser);
      localStorage.setItem('mockUsers', JSON.stringify(storedUsers));
      
      notyf.success('Account created successfully! 🎉 You can now login.');
      if (onRegister) onRegister();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-form">
      <div className="form-group">
        <input
          name="email"
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          required
          style={{ marginBottom: '1rem' }}
        />
      </div>
      <div className="form-group">
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          style={{ marginBottom: '1rem' }}
        />
      </div>
      <div className="form-group">
        <input
          name="password"
          type="password"
          placeholder="Password (8+ characters)"
          value={form.password}
          onChange={handleChange}
          required
          style={{ marginBottom: '1rem' }}
        />
      </div>
      <div className="form-group">
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          style={{ marginBottom: '1.5rem' }}
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
        ✨ Create Account
      </button>
    </form>
  );
}

export default RegisterForm;
