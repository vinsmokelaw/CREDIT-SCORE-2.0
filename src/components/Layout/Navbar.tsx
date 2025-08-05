import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../UI/Button';
import { useAuth } from '../../hooks/useAuth';
import { Grape, LogOut, User, Menu, X } from 'lucide-react';

export function Navbar() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-2">
              <Grape className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Berries
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors">
              How it Works
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-purple-600 transition-colors">
              Testimonials
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 hidden lg:block">
                  {profile?.full_name || user.email}
                </span>
                <Link 
                  to={profile?.user_type === 'bank' ? '/bank-dashboard' : '/client-dashboard'}
                  className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {/* Navigation Links */}
              <div className="space-y-3">
                <a 
                  href="#features" 
                  className="block text-gray-700 hover:text-purple-600 transition-colors py-2"
                  onClick={closeMenu}
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  className="block text-gray-700 hover:text-purple-600 transition-colors py-2"
                  onClick={closeMenu}
                >
                  How it Works
                </a>
                <a 
                  href="#testimonials" 
                  className="block text-gray-700 hover:text-purple-600 transition-colors py-2"
                  onClick={closeMenu}
                >
                  Testimonials
                </a>
              </div>

              <div className="border-t border-gray-200 pt-4">
                {user ? (
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600 py-2">
                      {profile?.full_name || user.email}
                    </div>
                    <Link 
                      to={profile?.user_type === 'bank' ? '/bank-dashboard' : '/client-dashboard'}
                      className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors py-2"
                      onClick={closeMenu}
                    >
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors py-2 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link to="/login" onClick={closeMenu}>
                      <Button variant="ghost" size="sm" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={closeMenu}>
                      <Button size="sm" className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}