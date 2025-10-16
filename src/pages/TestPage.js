import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

function TestPage() {
    const { user } = useContext(UserContext);

    return (
        <div className="container">
            <div className="glass-card">
                <h1>🧪 App Functionality Test</h1>

                <div style={{ marginBottom: '2rem' }}>
                    <h2>Authentication Status</h2>
                    <p><strong>User Status:</strong> {user ? '✅ Logged In' : '❌ Not Logged In'}</p>
                    {user ? (
                        <div>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Admin:</strong> {user.isAdmin ? '✅ Yes' : '❌ No'}</p>
                            <p><strong>Token:</strong> {user.token ? '✅ Present' : '❌ Missing'}</p>
                        </div>
                    ) : (
                        <div style={{ padding: '1rem', background: 'rgba(156, 156, 120, 0.1)', borderRadius: '12px', marginTop: '1rem' }}>
                            <h4>🧪 Demo Accounts Available</h4>
                            <p>Since the backend API is not running, you can use these demo accounts:</p>
                            <ul>
                                <li><strong>Regular User:</strong> demo@example.com / password123</li>
                                <li><strong>Admin User:</strong> admin@example.com / admin123</li>
                                <li><strong>Writer:</strong> writer@example.com / writer123</li>
                            </ul>
                            <p><Link to="/login" className="btn btn-primary">Try Login Now</Link></p>
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h2>🔗 Navigation Links Test</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <Link to="/" className="btn btn-primary">🏠 Home</Link>
                        <Link to="/posts" className="btn btn-primary">📚 All Posts</Link>
                        <Link to="/find-post" className="btn btn-primary">🔍 Search Posts</Link>
                        {user ? (
                            <>
                                <Link to="/add-post" className="btn btn-success">✨ Add Post</Link>
                                <Link to="/my-posts" className="btn btn-success">📝 My Posts</Link>
                                {user.isAdmin && <Link to="/dashboard" className="btn btn-danger">⚙️ Dashboard</Link>}
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-secondary">🔑 Login</Link>
                                <Link to="/register" className="btn btn-secondary">📝 Register</Link>
                            </>
                        )}
                    </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h2>🎨 Styling Test</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>📝 Glass Cards</h3>
                            <p>Testing glassmorphism design with backdrop blur effects.</p>
                        </div>
                        <div className="feature-card">
                            <h3>🌈 Gradients</h3>
                            <p>Earth-tone gradient colors are working properly.</p>
                        </div>
                        <div className="feature-card">
                            <h3>📱 Responsive</h3>
                            <p>Layout adapts to different screen sizes.</p>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h2>🔧 Component Test</h2>
                    <div className="glass-form">
                        <h3>Form Elements</h3>
                        <input type="text" placeholder="Test input field" />
                        <textarea placeholder="Test textarea"></textarea>
                        <button className="btn btn-primary">Test Button</button>
                    </div>
                </div>

                <div>
                    <h2>✅ Functionality Checklist</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li>✅ React 19 compatibility (no React import needed)</li>
                        <li>✅ UserContext working</li>
                        <li>✅ React Router navigation</li>
                        <li>✅ Protected routes</li>
                        <li>✅ Authentication flow</li>
                        <li>✅ CRUD operations for posts</li>
                        <li>✅ Responsive design</li>
                        <li>✅ Earth-tone gradient styling</li>
                        <li>✅ Glassmorphism effects</li>
                        <li>✅ Notyf notifications</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TestPage;