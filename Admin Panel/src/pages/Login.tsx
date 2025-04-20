
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    const user = sessionStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
