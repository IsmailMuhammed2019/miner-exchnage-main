import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Building2, Users, BarChart2, ShoppingBag, Globe, Heart, FileCheck, PieChart, Users2, Shield, TrendingUp, Star, ArrowRight } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white rounded-full shadow-lg">
                  <Building2 className="h-12 w-12 text-indigo-600" />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Welcome to <span className="text-indigo-600">Miner Exchange</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Your comprehensive platform for managing mining operations, trading minerals, and ensuring compliance
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">$2.4M</div>
                  <div className="text-sm text-gray-600">Total Transactions</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">1,250+</div>
                  <div className="text-sm text-gray-600">Active Members</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <Shield className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">Compliance Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-lg text-gray-600">Everything you need to manage your mining operations</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/dashboard"
              className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-indigo-100 rounded-xl group-hover:bg-indigo-200 transition-colors">
                  <BarChart2 className="h-8 w-8 text-indigo-600" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 ml-auto group-hover:text-indigo-600 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Dashboard</h3>
              <p className="text-gray-600 mb-4">
                View your listings, manage mineral submissions, and track your mining activities
              </p>
              <div className="flex items-center text-indigo-600 font-medium">
                <span>Access Dashboard</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/marketplace"
              className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                  <ShoppingBag className="h-8 w-8 text-green-600" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 ml-auto group-hover:text-green-600 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Marketplace</h3>
              <p className="text-gray-600 mb-4">
                Browse and purchase mining resources from verified sellers worldwide
              </p>
              <div className="flex items-center text-green-600 font-medium">
                <span>Explore Marketplace</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/csr"
              className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 ml-auto group-hover:text-red-600 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">CSR Initiatives</h3>
              <p className="text-gray-600 mb-4">
                Track community development projects and manage social responsibility programs
              </p>
              <div className="flex items-center text-red-600 font-medium">
                <span>View CSR Projects</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/compliance"
              className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <FileCheck className="h-8 w-8 text-blue-600" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 ml-auto group-hover:text-blue-600 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compliance & Permits</h3>
              <p className="text-gray-600 mb-4">
                Manage mining permits, track compliance status, and receive renewal alerts
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                <span>Manage Compliance</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/analytics"
              className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                  <PieChart className="h-8 w-8 text-purple-600" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 ml-auto group-hover:text-purple-600 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics & Reporting</h3>
              <p className="text-gray-600 mb-4">
                View insights on submissions, transactions, and compliance in real-time
              </p>
              <div className="flex items-center text-purple-600 font-medium">
                <span>View Analytics</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/member-area"
              className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition-colors">
                  <Users2 className="h-8 w-8 text-orange-600" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 ml-auto group-hover:text-orange-600 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Member Area</h3>
              <p className="text-gray-600 mb-4">
                Manage members, track submissions, and view cooperative totals
              </p>
              <div className="flex items-center text-orange-600 font-medium">
                <span>Manage Members</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-lg opacity-75"></div>
                <div className="relative bg-white p-6 rounded-full shadow-2xl">
                  <img 
                    src="/logo.png"
                    alt="Miner Exchange Logo"
                    className="h-16 w-auto object-contain"
                    onError={(e) => {
                      // Fallback to cloudinary logo if local logo fails
                      e.currentTarget.src = "https://res.cloudinary.com/dyas8qe3h/image/upload/v1734950125/Miner_LOGO_tfptqo.webp";
                    }}
                  />
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