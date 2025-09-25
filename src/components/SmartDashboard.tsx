import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Dashboard from '../pages/Dashboard';
import MemberDashboard from '../pages/MemberDashboard';
import CooperativeDashboard from '../pages/CooperativeDashboard';

export default function SmartDashboard() {
  const { userType, isAdmin } = useAuth();

  // Show loading while determining user type
  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Route to appropriate dashboard based on user type
  switch (userType) {
    case 'member':
      return <MemberDashboard />;
    case 'cooperative':
      if (isAdmin) {
        return <CooperativeDashboard />;
      } else {
        return <Dashboard />; // Regular cooperative member
      }
    default:
      return <Dashboard />; // Fallback to default dashboard
  }
}
