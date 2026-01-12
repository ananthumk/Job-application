import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Users, ArrowRight } from 'lucide-react';

export const Home = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (user) {
    // Redirect authenticated users to appropriate page
    if (isAdmin) {
      navigate('/admin/jobs');
    } else {
      navigate('/jobs');
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Dream <span className="text-blue-600">Job</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with top employers and discover opportunities that match your skills and aspirations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/register')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 transition"
            >
              Get Started <ArrowRight size={20} />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 font-semibold transition"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          {/* For Job Seekers */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-blue-600">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Briefcase size={28} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">For Job Seekers</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Browse thousands of job opportunities
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Save your favorite jobs for later
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Track all your applications in one place
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Get instant notifications
              </li>
            </ul>
            <button
              onClick={() => navigate('/register')}
              className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
            >
              Start Applying
            </button>
          </div>

          {/* For Employers */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-green-600">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Users size={28} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">For Employers</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Post job openings instantly
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Manage applications efficiently
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                View detailed candidate profiles
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Track recruitment metrics
              </li>
            </ul>
            <button
              onClick={() => {
                localStorage.setItem('signupRole', 'admin');
                navigate('/register');
              }}
              className="mt-6 w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold transition"
            >
              Post a Job
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">10K+</p>
            <p className="text-gray-600 font-medium">Active Job Listings</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">50K+</p>
            <p className="text-gray-600 font-medium">Job Seekers</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">1K+</p>
            <p className="text-gray-600 font-medium">Companies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
