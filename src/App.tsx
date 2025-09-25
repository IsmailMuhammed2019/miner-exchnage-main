import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import AuthLayout from './components/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
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
          {/* Auth pages without header */}
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
          <Route path="/member-login" element={<AuthLayout><MemberLogin /></AuthLayout>} />
          <Route path="/member-register" element={<AuthLayout><MemberRegister /></AuthLayout>} />
          
          {/* Main app with header */}
          <Route path="/" element={<Layout />}>
            <Route index element={<ProtectedRoute><SmartDashboard /></ProtectedRoute>} />
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