import React from 'react';
import { Heart, MapPin, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export const JobCard = ({ job, isFavorite, onSave, onRemoveFavorite, showActions = true }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <Link to={`/jobs/${job.job_id}`} className="text-xl font-bold text-blue-600 hover:text-blue-800">
            {job.title}
          </Link>
          <p className="text-gray-600 text-sm mt-1">{job.description?.substring(0, 100)}...</p>
        </div>
        {showActions && (
          <button
            onClick={() => isFavorite ? onRemoveFavorite(job.job_id) : onSave(job.job_id)}
            className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <Heart
              size={20}
              className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
            />
          </button>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-700">
          <MapPin size={16} className="mr-2 text-gray-500" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <Briefcase size={16} className="mr-2 text-gray-500" />
          <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
            {job.job_type}
          </span>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Posted: {new Date(job.created_at).toLocaleDateString()}
      </div>
    </div>
  );
};

export default JobCard;
