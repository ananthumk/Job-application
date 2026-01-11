const pool = require('../config/db');

// Apply to Job (Candidate Only)
const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const user_id = req.user.user_id;

    // Check if job exists
    const jobCheck = await pool.query(
      'SELECT * FROM jobs WHERE job_id = $1',
      [jobId]
    );

    if (jobCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already applied
    const existingApplication = await pool.query(
      'SELECT * FROM applications WHERE user_id = $1 AND job_id = $2',
      [user_id, jobId]
    );

    if (existingApplication.rows.length > 0) {
      return res.status(400).json({ message: 'You have already applied to this job' });
    }

    // Create application
    const result = await pool.query(
      'INSERT INTO applications (user_id, job_id) VALUES ($1, $2) RETURNING *',
      [user_id, jobId]
    );

    res.status(201).json({
      message: 'Application submitted successfully',
      application: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get My Applications (Candidate Only)
const getMyApplications = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const result = await pool.query(
      `SELECT a.*, j.title, j.description, j.location, j.job_type, j.created_at as job_created_at
       FROM applications a
       JOIN jobs j ON a.job_id = j.job_id
       WHERE a.user_id = $1
       ORDER BY a.applied_at DESC`,
      [user_id]
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

module.exports = {
  applyToJob,
  getMyApplications
};