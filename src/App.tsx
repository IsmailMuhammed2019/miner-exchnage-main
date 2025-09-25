import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import CooperativeDashboard from './pages/CooperativeDashboard';
import CSRDashboard from './pages/CSRDashboard';
import ComplianceDashboard from './pages/ComplianceDashboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import MemberAreaDashboard from './pages/MemberAreaDashboard';
import MemberLogin from './pages/MemberLogin';
import MemberRegister from './pages/MemberRegister';
import MemberDashboard from './pages/MemberDashboard';
import SmartDashboard from './components/SmartDashboard';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProtectedRoute><SmartDashboard /></ProtectedRoute>} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="member-login" element={<MemberLogin />} />
            <Route path="member-register" element={<MemberRegister />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <SmartDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="cooperative"
              element={
                <ProtectedRoute adminOnly>
                  <CooperativeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="csr"
              element={
                <ProtectedRoute>
                  <CSRDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="compliance"
              element={
                <ProtectedRoute>
                  <ComplianceDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="analytics"
              element={
                <ProtectedRoute>
                  <AnalyticsDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="member-area"
              element={
                <ProtectedRoute>
                  <MemberAreaDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="member-dashboard"
              element={
                <ProtectedRoute>
                  <MemberDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}