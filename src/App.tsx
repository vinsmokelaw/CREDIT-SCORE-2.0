import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Navbar } from './components/Layout/Navbar';
import { Landing } from './pages/Landing';
import { Signup } from './pages/auth/Signup';
import { Login } from './pages/auth/Login';
import { ClientDashboard } from './pages/dashboards/ClientDashboard';
import { BankDashboard } from './pages/dashboards/BankDashboard';

// Protected Route Component
function ProtectedRoute({ children, allowedUserTypes }: { children: React.ReactNode; allowedUserTypes?: string[] }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedUserTypes && profile && !allowedUserTypes.includes(profile.user_type)) {
    return <Navigate to={profile.user_type === 'bank' ? '/bank-dashboard' : '/client-dashboard'} replace />;
  }

  return <>{children}</>;
}

// Dashboard Router Component
function DashboardRouter() {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (profile?.user_type === 'bank') {
    return <Navigate to="/bank-dashboard" replace />;
  } else if (profile?.user_type === 'client') {
    return <Navigate to="/client-dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
}

function AppContent() {
  const { user, profile } = useAuth();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={!user ? <Signup /> : <DashboardRouter />} />
        <Route path="/login" element={!user ? <Login /> : <DashboardRouter />} />
        
        <Route 
          path="/client-dashboard" 
          element={
            <ProtectedRoute allowedUserTypes={['client']}>
              <ClientDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/bank-dashboard" 
          element={
            <ProtectedRoute allowedUserTypes={['bank']}>
              <BankDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;