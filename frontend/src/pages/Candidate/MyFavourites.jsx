import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, Trash2 } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../../components/Loader';

export const MyFavourites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/favourites/my');
      setFavorites(response.data.favourites);
      setError('');
    } catch (err) {
      setError('Failed to fetch favorites');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (jobId) => {
    try {
      await axiosInstance.delete(`/favourites/${jobId}`);
      setFavorites(favorites.filter(fav => fav.job_id !== jobId));
    } catch (err) {
      console.error('Failed to remove favorite:', err);
      alert('Failed to remove from favorites');
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Saved Jobs</h1>
          <p className="text-gray-600">Your collection of jobs you want to apply to later</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Favorites List */}
        {favorites.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">You haven't saved any jobs yet</p>
            <button
              onClick={() => navigate('/jobs')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map(fav => (
              <div
                key={fav.favourite_id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => navigate(`/jobs/${fav.job_id}`)}
                  >
                    <h3 className="text-xl font-bold text-blue-600 hover:text-blue-800">
                      {fav.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">
                      {fav.description?.substring(0, 100)}...
                    </p>

                    <div className="space-y-2 mt-4">
                      <div className="flex items-center text-gray-700">
                        <MapPin size={16} className="mr-2 text-gray-500" />
                        <span>{fav.location}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Briefcase size={16} className="mr-2 text-gray-500" />
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                          {fav.job_type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full md:w-auto">
                    <button
                      onClick={() => navigate(`/jobs/${fav.job_id}`)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleRemoveFavorite(fav.job_id)}
                      className="flex items-center justify-center gap-2 px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 font-medium transition"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
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

export default MyFavourites;
