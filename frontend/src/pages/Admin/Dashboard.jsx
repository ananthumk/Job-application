import React, { useState, useEffect } from 'react';
import { Briefcase, Users, UserCheck, TrendingUp } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../../components/Loader';

export const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/dashboard');
      setStats(response.data.dashboard);
      setError('');
    } catch (err) {
      setError('Failed to fetch dashboard statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Overview of your recruitment activity</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Statistics Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Jobs */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Jobs Posted</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total_jobs}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase size={24} className="text-blue-600" />
                </div>
              </div>
            </div>

            {/* Total Applications */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Applications</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total_applications}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <UserCheck size={24} className="text-green-600" />
                </div>
              </div>
            </div>

            {/* Total Candidates */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Candidates</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total_candidates}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users size={24} className="text-purple-600" />
                </div>
              </div>
            </div>

            {/* Avg Applications Per Job */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg. Applications/Job</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.total_jobs > 0 ? Math.round(stats.total_applications / stats.total_jobs * 10) / 10 : 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp size={24} className="text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">System Overview</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  Total Users: <span className="font-bold">{stats?.total_users || 0}</span>
                </p>
                <p className="text-gray-700">
                  Job Postings: <span className="font-bold">{stats?.total_jobs || 0}</span>
                </p>
                <p className="text-gray-700">
                  Active Candidates: <span className="font-bold">{stats?.total_candidates || 0}</span>
                </p>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Application Metrics</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  Total Applications: <span className="font-bold">{stats?.total_applications || 0}</span>
                </p>
                <p className="text-gray-700">
                  Avg. per Job: <span className="font-bold">
                    {stats && stats.total_jobs > 0 ? Math.round(stats.total_applications / stats.total_jobs * 10) / 10 : 0}
                  </span>
                </p>
                <p className="text-gray-700">
                  Engagement Rate: <span className="font-bold">
                    {stats && stats.total_candidates > 0
                      ? Math.round((stats.total_applications / stats.total_candidates) * 100)
                      : 0}%
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
