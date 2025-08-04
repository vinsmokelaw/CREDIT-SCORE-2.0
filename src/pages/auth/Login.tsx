import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grape, ArrowRight, Shield } from 'lucide-react';
import { Button } from '../../components/UI/Button';
import { Card } from '../../components/UI/Card';
import { useAuth } from '../../hooks/useAuth';

export function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(formData.email, formData.password);
      // Navigation will be handled by the auth state change
    } catch (error: any) {
      setError(error.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-2">
              <Grape className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Berries
            </span>
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to access your dashboard
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
              Forgot password?
            </Link>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Shield className="h-4 w-4 mr-2" />
            <span>Secure login with bank-grade encryption</span>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-semibold">
              Sign up here
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}