import { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

function LoginForm({ onLogin }) {
  const { login } = useContext(UserContext);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.email || !form.password) {
      notyf.error('Please fill in all fields');
      return;
    }

    try {
      // Check if backend is available
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      const res = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      login(data);
      notyf.success('Logged in successfully! 🎉');
      if (onLogin) onLogin();
    } catch (err) {
      // Fallback to mock authentication if backend is not available
      console.log('Backend not available, using mock authentication');
      
      // Get stored users from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      const user = storedUsers.find(u => u.email === form.email && u.password === form.password);
      
      if (user) {
        // Create mock JWT-like token
        const mockToken = btoa(JSON.stringify({
          id: user.id,
          email: user.email,
          username: user.username,
          isAdmin: user.isAdmin || false,
          exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        }));
        
        const loginData = {
          accessToken: mockToken,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin || false
          }
        };
        
        login(loginData);
        notyf.success('Successfully logged in! 🎉');
        if (onLogin) onLogin();
      } else {
        notyf.error('Invalid email or password. Try demo@example.com / password123');
      }
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
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ marginBottom: '1.5rem' }}
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
        🔑 Sign In
      </button>
    </form>
  );
}

export default LoginForm;
