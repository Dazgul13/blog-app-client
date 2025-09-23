import React, { useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

function RegisterForm({ onRegister }) {
  const [form, setForm] = useState({ email: '', username: '', password: '', confirmPassword: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 8) {
      notyf.error('Password must be at least 8 characters long');
      return;
    }

    if (form.password !== form.confirmPassword) {
      notyf.error('Passwords do not match');
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      notyf.success('Registered successfully');
      if (onRegister) onRegister();
    } catch (err) {
      notyf.error(err.message);
    }
  };

  return (
        <form onSubmit={handleSubmit} className="glass-form">
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn">Register</button>
    </form>
  );
}

export default RegisterForm;
