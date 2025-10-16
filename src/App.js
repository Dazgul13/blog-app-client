import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserContext from './context/UserContext';

// Import all pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Posts from './pages/Posts';
import PostDetails from './pages/PostDetails';
import Dashboard from './pages/Dashboard';
import EditPost from './pages/EditPost';
import FindPost from './pages/FindPost';
import AddPost from './pages/AddPost';
import MyPosts from './pages/MyPosts';
import TestPage from './pages/TestPage';

// Simple inline navbar to avoid file corruption issues
function AppNavbar() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    window.location.href = '/'; // Refresh to home page
  };

  return (
    <nav style={{
      background: 'linear-gradient(to right top, #fcdfb2, #cabe93, #9c9c78, #717b5e, #4c5b46)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(76, 91, 70, 0.2)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.5rem' }}>✍️</span>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>BlogSpace</span>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <a href="/" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)' }}>🏠 Home</a>
        <a href="/posts" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)' }}>📚 Posts</a>
        {user && <a href="/add-post" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.2)', fontWeight: 'bold' }}>✨ Add Post</a>}
        {user && <a href="/my-posts" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)' }}>📝 My Posts</a>}
        <a href="/find-post" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)' }}>🔍 Search</a>
        <a href="/test" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)' }}>🧪 Test</a>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ color: 'white', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
              👤 Welcome, {user.email?.split('@')[0] || 'User'}
            </span>
            {user.isAdmin && <a href="/dashboard" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(255,100,100,0.3)' }}>⚙️ Dashboard</a>}
            <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>🚪 Logout</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="/login" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)' }}>🔑 Login</a>
            <a href="/register" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.2)', fontWeight: 'bold' }}>✨ Join Us</a>
          </div>
        )}
      </div>
    </nav>
  );
}

function App() {
  const { user } = useContext(UserContext);

  return (
    <div className="app" style={{ minHeight: '100vh', padding: '1rem' }}>
      {/* Demo Mode Notification */}
      <div style={{ 
        background: 'linear-gradient(to right, #fcdfb2, #cabe93)', 
        color: '#4c5b46', 
        padding: '0.5rem 1rem', 
        textAlign: 'center', 
        borderRadius: '8px', 
        marginBottom: '1rem',
        fontSize: '0.9rem',
        fontWeight: '500'
      }}>
        🧪 Demo Mode: Backend API not available. Using local storage for authentication.
      </div>
      
      <AppNavbar />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/posts/:id/edit" element={user ? <EditPost /> : <Navigate to="/login" />} />
          <Route path="/add-post" element={user ? <AddPost /> : <Navigate to="/login" />} />
          <Route path="/my-posts" element={user ? <MyPosts /> : <Navigate to="/login" />} />
          <Route path="/find-post" element={<FindPost />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={user?.isAdmin ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;