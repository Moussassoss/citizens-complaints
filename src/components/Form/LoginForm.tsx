import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Alert from '../UI/Alert';
import { login } from '../../services/authService';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      navigate('/admin');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Login</h2>
        
        {error && (
          <Alert
            variant="error"
            message={error}
            dismissible
            onDismiss={() => setError(null)}
            className="mb-6"
          />
        )}
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            leftIcon={<Mail className="h-5 w-5" />}
            required
          />
          
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            leftIcon={<Lock className="h-5 w-5" />}
            required
          />
          
          <div className="mt-6">
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
            >
              Login
            </Button>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p className="text-center">
              Demo accounts: <br />
              RTDA (Rwanda Transport Development Agency): rtda@example.com / password123<br />
              REG (Rwanda Energy Group): reg@example.com / password123 <br />
              WASAC (Water and Sanitation Corporation): wasac@example.com / password123 <br />
              NIDA (National Identification Agency): nida@example.com / password123 <br />
              MINISANTE (Ministry of Health): health@example.com / password123 <br />
              MINIEDUC (Ministry of Education): educ@example.com / password123 <br />
              DISTRICT OFFICE : district@example.com / password123 <br />
              DGIE (Directorate General of Immigration and Emigration): dgie@example.com / password123 <br />
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;