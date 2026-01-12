import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Briefcase } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../../components/Loader';

export const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/applications/my');
      setApplications(response.data.applications);
      setError('');
    } catch (err) {
      setError('Failed to fetch applications');
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-600">Track all your job applications in one place</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Applications List */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">You haven't applied to any jobs yet</p>
            <button
              onClick={() => navigate('/jobs')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map(app => (
              <div
                key={app.application_id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1 cursor-pointer" onClick={() => navigate(`/jobs/${app.job_id}`)}>
                    <h3 className="text-xl font-bold text-blue-600 hover:text-blue-800">
                      {app.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">{app.description?.substring(0, 100)}...</p>
                    
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center text-gray-700">
                        <MapPin size={16} className="mr-2 text-gray-500" />
                        <span>{app.location}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Briefcase size={16} className="mr-2 text-gray-500" />
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                          {app.job_type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right w-full md:w-auto">
                    <p className="text-sm text-gray-500 mb-2">
                      Applied: {new Date(app.applied_at).toLocaleDateString()}
                    </p>
                    <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
                      Applied
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
