import React, { useContext } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import UserContext from './context/UserContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Posts from './pages/Posts';
import PostDetails from './pages/PostDetails';
import Dashboard from './pages/Dashboard';
import EditPost from './pages/EditPost';
import FindPost from './pages/FindPost'; // Import FindPost

const notyf = new Notyf();

function App() {
  const { user, logout } = useContext(UserContext);

  return (
    <div>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/find-post">Find Post</Link> {/* New Find Post Link */}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            {user.isAdmin && <Link to="/dashboard">Dashboard</Link>}
            <button onClick={() => { logout(); notyf.success('Logged out'); }} className="btn">
              Logout
            </button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/:id/edit" element={user ? <EditPost /> : <Navigate to="/login" />} />
        <Route path="/find-post" element={<FindPost />} /> {/* New Find Post Route */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/dashboard" element={user?.isAdmin ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
