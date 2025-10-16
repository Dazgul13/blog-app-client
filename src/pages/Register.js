import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import UserContext from '../context/UserContext';

function Register() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (user) {
    navigate('/posts');
  }

  return (
    <div className="container">
      <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="form-header">
          <h2>✨ Join BlogSpace</h2>
          <p>Create your account and start sharing your stories</p>
        </div>
        
        <RegisterForm onRegister={() => navigate('/login')} />
        
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(156, 156, 120, 0.1)', borderRadius: '12px' }}>
          <h4>📝 Getting Started</h4>
          <ul style={{ fontSize: '0.9rem', margin: 0 }}>
            <li>Create your account with a valid email</li>
            <li>Choose a strong password (8+ characters)</li>
            <li>Start writing and sharing your thoughts</li>
            <li>Connect with other writers in the community</li>
          </ul>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p>Already have an account? <a href="/login" style={{ color: '#717b5e', fontWeight: 'bold' }}>Sign in here</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
