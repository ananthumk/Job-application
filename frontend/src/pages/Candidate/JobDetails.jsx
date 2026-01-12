import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, Heart, Send } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    fetchJob();
    checkApplicationStatus();
    checkFavoriteStatus();
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/jobs/${id}`);
      setJob(response.data.job);
      setError('');
    } catch (err) {
      setError('Failed to fetch job details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkApplicationStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axiosInstance.get('/applications/my');
        const applied = response.data.applications.some(app => app.job_id === parseInt(id));
        setHasApplied(applied);
      }
    } catch (err) {
      console.error('Error checking application status:', err);
    }
  };

  const checkFavoriteStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axiosInstance.get('/favourites/my');
        const isFav = response.data.favourites.some(fav => fav.job_id === parseInt(id));
        setIsFavorite(isFav);
      }
    } catch (err) {
      console.error('Error checking favorite status:', err);
    }
  };

  const handleApply = async () => {
    try {
      setApplying(true);
      await axiosInstance.post(`/applications/${id}`);
      setHasApplied(true);
      alert('Application submitted successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to apply for job';
      alert(errorMessage);
      console.error('Error applying for job:', err);
    } finally {
      setApplying(false);
    }
  };

  const handleSaveFavorite = async () => {
    try {
      if (isFavorite) {
        await axiosInstance.delete(`/favourites/${id}`);
        setIsFavorite(false);
        alert('Job removed from favorites');
      } else {
        await axiosInstance.post(`/favourites/${id}`);
        setIsFavorite(true);
        alert('Job saved to favorites');
      }
    } catch (err) {
      console.error('Error updating favorite:', err);
    }
  };

  if (loading) return <Loader fullScreen />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate('/jobs')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <p className="text-gray-500 text-lg">Job not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/jobs')}
          className="text-blue-600 hover:text-blue-800 font-medium mb-6 flex items-center gap-2"
        >
          ← Back to Jobs
        </button>

        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <MapPin size={20} className="mr-3 text-blue-600" />
                  <span className="text-lg">{job.location}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Briefcase size={20} className="mr-3 text-blue-600" />
                  <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                    {job.job_type}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">
                  Posted: {new Date(job.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <button
                onClick={handleApply}
                disabled={hasApplied || applying}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                  hasApplied
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Send size={18} />
                {hasApplied ? 'Already Applied' : 'Apply Now'}
              </button>
              <button
                onClick={handleSaveFavorite}
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg font-medium hover:border-red-500 hover:text-red-500 transition"
              >
                <Heart
                  size={18}
                  className={isFavorite ? 'fill-red-500 text-red-500' : ''}
                />
                {isFavorite ? 'Saved' : 'Save Job'}
              </button>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Type</h3>
                <p className="text-gray-700">{job.job_type}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                <p className="text-gray-700">{job.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
