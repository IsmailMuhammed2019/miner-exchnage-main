import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Plus, 
  Package, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  ArrowRight, 
  Star, 
  Shield, 
  MapPin,
  Calendar,
  BarChart3,
  Settings,
  Bell
} from 'lucide-react';

export default function MemberDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalListings: 0,
    totalRevenue: 0,
    activeConnections: 0,
    rating: 4.8
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalListings: 12,
        totalRevenue: 24500,
        activeConnections: 8,
        rating: 4.8
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img 
                src="/logo.png"
                alt="Miner Exchange Logo"
                className="h-16 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://res.cloudinary.com/dyas8qe3h/image/upload/v1734950125/Miner_LOGO_tfptqo.webp";
                }}
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome back, {user?.email?.split('@')[0]}!
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Manage your mineral listings and track your mining operations
            </p>
            
            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button className="group flex items-center px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg">
                <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform" />
                New Listing
              </button>
              <Link to="/marketplace" className="group flex items-center px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 transform hover:-translate-y-0.5">
                <Activity className="h-5 w-5 mr-2" />
                Browse Marketplace
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Listings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalListings}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm text-blue-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+2 this month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Connections</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeConnections}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm text-purple-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+3 new this week</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm text-yellow-600">
              <Star className="h-4 w-4 mr-1" />
              <span>Based on 24 reviews</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                  View all
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg mr-4">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">New listing created</p>
                    <p className="text-sm text-gray-500">Gold ore - 500kg • 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg mr-4">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Payment received</p>
                    <p className="text-sm text-gray-500">$2,500 from Copper Mining Co. • 1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                  <div className="p-2 bg-purple-100 rounded-lg mr-4">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">New connection</p>
                    <p className="text-sm text-gray-500">Connected with Silver Valley Mining • 3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                  <Plus className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="text-indigo-700 font-medium">Create New Listing</span>
                </button>
                <Link to="/marketplace" className="w-full flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <Activity className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-green-700 font-medium">Browse Marketplace</span>
                </Link>
                <button className="w-full flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <BarChart3 className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-purple-700 font-medium">View Analytics</span>
                </button>
                <button className="w-full flex items-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  <Settings className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="text-orange-700 font-medium">Account Settings</span>
                </button>
              </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Profile</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-indigo-600 font-bold text-lg">
                      {user?.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user?.email?.split('@')[0]}</p>
                    <p className="text-sm text-gray-500">Member since 2024</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Sierra Leone</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>Verified Member</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/marketplace" className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Marketplace</h3>
              <Package className="h-6 w-6" />
            </div>
            <p className="text-indigo-100 mb-4">
              Discover new minerals and connect with verified sellers
            </p>
            <div className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors inline-block">
              Explore
            </div>
          </Link>

          <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Analytics</h3>
              <TrendingUp className="h-6 w-6" />
            </div>
            <p className="text-green-100 mb-4">
              Track your performance and optimize your operations
            </p>
            <div className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors inline-block">
              View Reports
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Compliance</h3>
              <Shield className="h-6 w-6" />
            </div>
            <p className="text-orange-100 mb-4">
              Stay compliant with mining regulations and permits
            </p>
            <div className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors inline-block">
              Check Status
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
