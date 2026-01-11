const pool = require('../config/db');

// Get applications for a specific job (Admin Only)
const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const result = await pool.query(
      `SELECT a.*, u.name, u.email 
       FROM applications a
       JOIN users u ON a.user_id = u.user_id
       WHERE a.job_id = $1
       ORDER BY a.applied_at DESC`,
      [jobId]
    );

    res.json({
      count: result.rows.length,
      applications: result.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get jobs created by admin (Admin Only)
const getMyJobs = async (req, res) => {
  try {
    const admin_id = req.user.user_id;

    const result = await pool.query(
      `SELECT j.*, COUNT(a.application_id) as applicant_count
       FROM jobs j
       LEFT JOIN applications a ON j.job_id = a.job_id
       WHERE j.created_by = $1
       GROUP BY j.job_id
       ORDER BY j.created_at DESC`,
      [admin_id]
    );

    res.json({
      count: result.rows.length,
      jobs: result.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get dashboard statistics (Admin Only)
const getDashboardStats = async (req, res) => {
  try {
    const admin_id = req.user.user_id;

    // Get total jobs created by admin
    const jobStats = await pool.query(
      'SELECT COUNT(*) as total_jobs FROM jobs WHERE created_by = $1',
      [admin_id]
    );

    // Get total applications for admin's jobs
    const appStats = await pool.query(
      `SELECT COUNT(*) as total_applications 
       FROM applications a
       JOIN jobs j ON a.job_id = j.job_id
       WHERE j.created_by = $1`,
      [admin_id]
    );

    // Get total users in system
    const userStats = await pool.query(
      'SELECT COUNT(*) as total_users FROM users'
    );

    // Get total candidates
    const candidateStats = await pool.query(
      "SELECT COUNT(*) as total_candidates FROM users WHERE role = 'candidate'"
    );

    res.json({
      dashboard: {
        total_jobs: parseInt(jobStats.rows[0].total_jobs),
        total_applications: parseInt(appStats.rows[0].total_applications),
        total_users: parseInt(userStats.rows[0].total_users),
        total_candidates: parseInt(candidateStats.rows[0].total_candidates)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getJobApplications,
  getMyJobs,
  getDashboardStats
};