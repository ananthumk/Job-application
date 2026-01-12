import React, { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import JobCard from '../../components/JobCard';
import Loader from '../../components/Loader';

export const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');

  useEffect(() => {
    fetchJobs();
    fetchFavorites();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (locationFilter) params.append('location', locationFilter);
      if (jobTypeFilter) params.append('job_type', jobTypeFilter);

      const response = await axiosInstance.get(`/jobs?${params.toString()}`);
      setJobs(response.data.jobs);
      setError('');
    } catch (err) {
      setError('Failed to fetch jobs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axiosInstance.get('/favourites/my');
        const favoriteIds = response.data.favourites.map(f => f.job_id);
        setFavorites(favoriteIds);
      }
    } catch (err) {
      console.error('Failed to fetch favorites:', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleSaveFavorite = async (jobId) => {
    try {
      await axiosInstance.post(`/favourites/${jobId}`);
      setFavorites([...favorites, jobId]);
    } catch (err) {
      console.error('Failed to save favorite:', err);
    }
  };

  const handleRemoveFavorite = async (jobId) => {
    try {
      await axiosInstance.delete(`/favourites/${jobId}`);
      setFavorites(favorites.filter(id => id !== jobId));
    } catch (err) {
      console.error('Failed to remove favorite:', err);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Next Job</h1>
          <p className="text-gray-600">Explore thousands of job opportunities with all the information you need</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative col-span-1 md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by job title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
              <button
                type="submit"
                className="md:col-span-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition"
              >
                Search Jobs
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Jobs List */}
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs found. Try different filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map(job => (
              <JobCard
                key={job.job_id}
                job={job}
                isFavorite={favorites.includes(job.job_id)}
                onSave={handleSaveFavorite}
                onRemoveFavorite={handleRemoveFavorite}
                showActions={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
