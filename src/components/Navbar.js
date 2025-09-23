import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const notyf = new Notyf();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    notyf.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav>
      <h2>Movie Catalog / Blog App</h2>
      <ul>
        {user ? (
          <>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            {user.isAdmin && <li><Link to="/admin">Admin</Link></li>}
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
