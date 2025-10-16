import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import UserContext from '../context/UserContext';

function Login() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (user) {
    navigate('/posts');
  }

  return (
    <div className="container">
      <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="form-header">
          <h2>🔑 Welcome Back</h2>
          <p>Sign in to your BlogSpace account</p>
        </div>
        
        <LoginForm onLogin={() => navigate('/posts')} />
        
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(156, 156, 120, 0.1)', borderRadius: '12px' }}>
          <h4>🧪 Demo Accounts</h4>
          <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Try these demo accounts:</p>
          <ul style={{ fontSize: '0.85rem', margin: 0 }}>
            <li><strong>Regular User:</strong> demo@example.com / password123</li>
            <li><strong>Admin User:</strong> admin@example.com / admin123</li>
            <li><strong>Writer:</strong> writer@example.com / writer123</li>
          </ul>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p>Don't have an account? <a href="/register" style={{ color: '#717b5e', fontWeight: 'bold' }}>Sign up here</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
