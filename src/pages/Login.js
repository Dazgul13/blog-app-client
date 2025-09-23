import React, { useContext } from 'react';
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
    <div>
      <h2>Login</h2>
      <LoginForm onLogin={() => navigate('/posts')} />
    </div>
  );
}

export default Login;
