import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import LoginForm from '../components/Form/LoginForm';
import { isAuthenticated } from '../services/authService';

const Login: React.FC = () => {
  const navigate = useNavigate();
  
  // Redirect to admin dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin');
    }
  }, [navigate]);
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
          <p className="mt-2 text-lg text-gray-600">
            Login to the administrative dashboard to manage complaints.
          </p>
        </div>
        
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;