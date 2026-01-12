import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Users, Plus } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../../components/Loader';

export const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/my-jobs');
      setJobs(response.data.jobs);
      setError('');
    } catch (err) {
      setError('Failed to fetch jobs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await axiosInstance.delete(`/jobs/${jobId}`);
        setJobs(jobs.filter(job => job.job_id !== jobId));
        alert('Job deleted successfully');
      } catch (err) {
        console.error('Failed to delete job:', err);
        alert('Failed to delete job');
      }
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Job Postings</h1>
            <p className="text-gray-600">Manage and track your job postings</p>
          </div>
          <button
            onClick={() => navigate('/admin/jobs/create')}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition"
          >
            <Plus size={20} />
            Create Job
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Jobs Table */}
        {jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">You haven't created any jobs yet</p>
            <button
              onClick={() => navigate('/admin/jobs/create')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              Create Your First Job
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Job Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Applicants</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Posted</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job.job_id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{job.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{job.description?.substring(0, 50)}...</p>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{job.location}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {job.job_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Users size={16} className="text-gray-500" />
                        <span className="font-semibold text-gray-900">{job.applicant_count || 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(job.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => navigate(`/admin/jobs/${job.job_id}/applicants`)}
                          className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition"
                          title="View Applicants"
                        >
                          <Users size={18} />
                        </button>
                        <button
                          onClick={() => navigate(`/admin/jobs/${job.job_id}/edit`)}
                          className="p-2 hover:bg-yellow-100 rounded-lg text-yellow-600 transition"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(job.job_id)}
                          className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobs;
