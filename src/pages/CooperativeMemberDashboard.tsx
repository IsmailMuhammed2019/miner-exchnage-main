import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DataService, DynamicStats } from '../services/dataService';
import { 
  TrendingUp, 
  Package, 
  Users, 
  DollarSign, 
  Activity, 
  ArrowRight, 
  Star, 
  Shield, 
  Building2, 
  Globe, 
  Heart, 
  FileCheck, 
  PieChart, 
  Users2,
  BarChart3,
  Settings,
  Bell,
  MapPin,
  Calendar
} from 'lucide-react';

export default function CooperativeMemberDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DynamicStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (user) {
        setLoading(true);
        try {
          const dynamicStats = await DataService.getStats();
          setStats(dynamicStats);
        } catch (error) {
          console.error('Error fetching stats:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStats();
  }, [user]);

  // Show public landing page for non-authenticated users
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4 group">
                  <img 
                    src="/logo.png"
                    alt="Miner Exchange Logo"
                    className="h-24 w-auto object-contain transition-transform group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://res.cloudinary.com/dyas8qe3h/image/upload/v1734950125/Miner_LOGO_tfptqo.webp";
                    }}
                  />
                  <div className="text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:to-purple-300 transition-all duration-300">
                      Miner Exchange
                    </h1>
                    <p className="text-sm text-indigo-200 font-medium tracking-wide">
                      MINING PLATFORM
                    </p>
                  </div>
                </div>
              </div>
              
              <h1 className="text-6xl font-extrabold text-white mb-6">
                Welcome to <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Miner Exchange</span>
              </h1>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                The premier platform for mining cooperatives to manage resources, ensure compliance, and connect with global markets
              </p>
              
              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-black">$2.4M+</div>
                  <div className="text-sm text-gray-300">Total Transactions</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Users className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-black">1,250+</div>
                  <div className="text-sm text-gray-300">Active Members</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Shield className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-black">98%</div>
                  <div className="text-sm text-gray-300">Compliance Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Globe className="h-8 w-8 text-orange-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-black">25+</div>
                  <div className="text-sm text-gray-300">Countries</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <Link
                  to="/login"
                  className="group relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="flex items-center">
                    <span>Sign In</span>
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  to="/register"
                  className="group px-8 py-4 text-lg font-semibold text-indigo-600 bg-white hover:bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-indigo-200"
                >
                  <span className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2" />
                    <span>Register Your Cooperative</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Miner Exchange?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive tools and features designed specifically for mining cooperatives
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="group text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="inline-flex p-4 bg-indigo-100 rounded-2xl mb-6 group-hover:bg-indigo-200 transition-colors">
                  <Globe className="h-12 w-12 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Network</h3>
                <p className="text-gray-600 mb-6">
                  Connect with verified buyers and sellers worldwide. Access international markets and expand your reach.
                </p>
                <div className="flex items-center justify-center text-indigo-600 font-semibold">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
              <div className="group text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="inline-flex p-4 bg-green-100 rounded-2xl mb-6 group-hover:bg-green-200 transition-colors">
                  <Building2 className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cooperative Management</h3>
                <p className="text-gray-600 mb-6">
                  Efficiently manage your mining cooperative with tools for member management, compliance tracking, and reporting.
                </p>
                <div className="flex items-center justify-center text-green-600 font-semibold">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
              <div className="group text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="inline-flex p-4 bg-purple-100 rounded-2xl mb-6 group-hover:bg-purple-200 transition-colors">
                  <Users className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Member Support</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive tools for cooperative members including submission tracking, analytics, and compliance management.
                </p>
                <div className="flex items-center justify-center text-purple-600 font-semibold">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Mining Cooperatives Worldwide</h3>
                <p className="text-lg text-gray-600">Join thousands of satisfied users who have transformed their mining operations</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">4.9/5</div>
                  <div className="text-gray-600">User Rating</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-2">99.9%</div>
                  <div className="text-gray-600">Uptime Guarantee</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-2">24/7</div>
                  <div className="text-gray-600">Support Available</div>
                </div>
              </div>
            </div>
          </div>
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
              Manage your cooperative's mineral listings and track mining operations
            </p>
            
            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/marketplace" className="group flex items-center px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg">
                <Package className="h-5 w-5 mr-2" />
                Browse Marketplace
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/analytics" className="group flex items-center px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 transform hover:-translate-y-0.5">
                <Activity className="h-5 w-5 mr-2" />
                View Analytics
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : `$${stats?.totalRevenue.toLocaleString() || '0'}`}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+{stats?.revenueGrowth || 0}% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : stats?.activeListings || 0}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm text-blue-600">
              <Star className="h-4 w-4 mr-1" />
              <span>{stats?.averageRating.toFixed(1) || '0.0'} average rating</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : stats?.totalSubmissions || 0}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm text-purple-600">
              <Shield className="h-4 w-4 mr-1" />
              <span>{stats?.complianceRate.toFixed(0) || 0}% compliance rate</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Network Size</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : stats?.networkSize || 0}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm text-orange-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+{stats?.newConnections || 0} new connections</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Cooperative Overview */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Cooperative Overview</h2>
                <Link to="/cooperative" className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                  Manage
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg mr-4">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Active Members</p>
                    <p className="text-sm text-gray-500">{stats?.networkSize || 0} cooperative members</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg mr-4">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Total Listings</p>
                    <p className="text-sm text-gray-500">{stats?.activeListings || 0} active mineral listings</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                  <div className="p-2 bg-purple-100 rounded-lg mr-4">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Compliance Status</p>
                    <p className="text-sm text-gray-500">{stats?.complianceRate.toFixed(0) || 0}% compliance rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
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
                    <p className="font-medium text-gray-900">New member joined</p>
                    <p className="text-sm text-gray-500">John Doe joined the cooperative • 3 days ago</p>
                  </div>
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

          <Link to="/analytics" className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
          </Link>

          <Link to="/compliance" className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
          </Link>
        </div>
      </div>
    </div>
  );
}
