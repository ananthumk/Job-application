import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, User } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../../components/Loader';

export const Applicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      
      // Fetch job details
      const jobResponse = await axiosInstance.get(`/jobs/${jobId}`);
      setJobTitle(jobResponse.data.job.title);

      // Fetch applicants
      const response = await axiosInstance.get(`/admin/jobs/${jobId}/applications`);
      setApplicants(response.data.applications);
      setError('');
    } catch (err) {
      setError('Failed to fetch applicants');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/admin/jobs')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6"
        >
          <ArrowLeft size={18} />
          Back to Jobs
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Applicants</h1>
          <p className="text-gray-600">Job: <span className="font-semibold text-gray-900">{jobTitle}</span></p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Applicants List */}
        {applicants.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No applicants yet for this job</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600 mb-6">
              Total Applicants: <span className="font-bold text-gray-900">{applicants.length}</span>
            </p>
            
            {applicants.map(applicant => (
              <div
                key={applicant.application_id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{applicant.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mt-2">
                        <Mail size={16} />
                        <a
                          href={`mailto:${applicant.email}`}
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {applicant.email}
                        </a>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Applied: {new Date(applicant.applied_at).toLocaleDateString()} at {new Date(applicant.applied_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full md:w-auto">
                    <a
                      href={`mailto:${applicant.email}`}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition text-center"
                    >
                      Contact
                    </a>
                    <button
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
                    >
                      View Profile
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

export default Applicants;
