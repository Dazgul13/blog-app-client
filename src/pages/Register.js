import React, { useContext } from 'react';
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
    <div>
      <h2>Register</h2>
            <RegisterForm onRegister={() => navigate('/login')} />
    </div>
  );
}

export default Register;
