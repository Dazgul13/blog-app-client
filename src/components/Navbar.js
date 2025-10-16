import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

function Navbar() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <nav className="modern-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span>✍️ BlogSpace</span>
        </Link>

        <div className="navbar-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/posts" className="nav-link">Posts</Link>
          {user && <Link to="/add-post" className="nav-link">Add Post</Link>}
        </div>

        <div className="navbar-actions">
          {user ? (
            <div>
              <span>Welcome, {user.email?.split('@')[0]}</span>
              <button onClick={handleLogout} className="btn">Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
