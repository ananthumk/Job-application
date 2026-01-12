import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../../components/Loader';

export const JobForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const isEdit = !!jobId;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    job_type: 'Full-time'
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchJob();
    }
  }, [jobId]);

  const fetchJob = async () => {
    try {
      setFetching(true);
      const response = await axiosInstance.get(`/jobs/${jobId}`);
      setFormData({
        title: response.data.job.title,
        description: response.data.job.description,
        location: response.data.job.location,
        job_type: response.data.job.job_type
      });
      setError('');
    } catch (err) {
      setError('Failed to fetch job details');
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim() || !formData.description.trim() || !formData.location.trim()) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      setError('');

      if (isEdit) {
        await axiosInstance.put(`/jobs/${jobId}`, formData);
        alert('Job updated successfully');
      } else {
        await axiosInstance.post('/jobs', formData);
        alert('Job created successfully');
      }

      navigate('/admin/jobs');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to save job';
      setError(errorMessage);
      console.error('Error saving job:', err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/admin/jobs')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6"
        >
          <ArrowLeft size={18} />
          Back to Jobs
        </button>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isEdit ? 'Edit Job' : 'Create New Job'}
          </h1>
          <p className="text-gray-600 mb-8">
            {isEdit ? 'Update the job details' : 'Fill in the details to create a new job posting'}
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Job Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Senior React Developer"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Remote, New York, USA"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Job Type */}
            <div>
              <label htmlFor="job_type" className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <select
                id="job_type"
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            {/* Job Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a detailed job description..."
                rows="10"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                Provide detailed information about the role, responsibilities, and requirements.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : isEdit ? 'Update Job' : 'Create Job'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/jobs')}
                className="flex-1 bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 font-medium transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
