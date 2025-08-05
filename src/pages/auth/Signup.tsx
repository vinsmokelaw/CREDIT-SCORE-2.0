import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grape, User, Building, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { Button } from '../../components/UI/Button';
import { Card } from '../../components/UI/Card';
import { useAuth } from '../../hooks/useAuth';
import { UserType } from '../../lib/supabase';

export function Signup() {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userType) {
      setError('Please select your account type');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signUp(formData.email, formData.password, {
        full_name: formData.fullName,
        user_type: userType
      });
      
      navigate(userType === 'bank' ? '/bank-dashboard' : '/client-dashboard');
    } catch (error: any) {
      setError(error.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4 pt-20">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <Link to="/" className="inline-flex items-center space-x-2 mb-8">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-2">
                <Grape className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Berries
              </span>
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Account Type
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              Select the option that best describes your role
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <Card 
              className="p-6 sm:p-8 cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-transparent hover:border-purple-200"
              onClick={() => setUserType('client')}
            >
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Individual Client</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Perfect for individuals looking to understand and improve their credit score with AI-powered insights and predictions.
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center text-green-600 text-sm sm:text-base">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>Personal credit score tracking</span>
                  </div>
                  <div className="flex items-center text-green-600 text-sm sm:text-base">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>AI-powered predictions</span>
                  </div>
                  <div className="flex items-center text-green-600 text-sm sm:text-base">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>Educational resources</span>
                  </div>
                  <div className="flex items-center text-green-600 text-sm sm:text-base">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>Credit improvement tips</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card 
              className="p-6 sm:p-8 cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-transparent hover:border-purple-200"
              onClick={() => setUserType('bank')}
            >
              <div className="text-center">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Building className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Bank Representative</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Designed for financial institutions to assess client creditworthiness and make informed lending decisions.
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center text-green-600 text-sm sm:text-base">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>Advanced analytics dashboard</span>  
                  </div>
                  <div className="flex items-center text-green-600 text-sm sm:text-base">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>Bulk credit assessments</span>
                  </div>
                  <div className="flex items-center text-green-600 text-sm sm:text-base">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>Risk management tools</span>
                  </div>
                  <div className="flex items-center text-green-600 text-sm sm:text-base">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>Compliance reporting</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4 pt-20">
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
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            {userType === 'client' ? (
              <User className="h-6 w-6 text-purple-600" />
            ) : (
              <Building className="h-6 w-6 text-purple-600" />
            )}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {userType === 'client' ? 'Individual' : 'Bank'} Account
            </h1>
          </div>
          
          <button 
            onClick={() => setUserType(null)}
            className="text-sm text-purple-600 hover:text-purple-700"
          >
            ← Change account type
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your full name"
            />
          </div>

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
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Confirm your password"
            />
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Shield className="h-4 w-4 mr-2" />
            <span>Your data is protected with bank-grade security</span>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}