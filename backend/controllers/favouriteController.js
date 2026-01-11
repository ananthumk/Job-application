const pool = require('../config/db');

// Save Job to Favourites (Candidate Only)
const saveFavourite = async (req, res) => {
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

    // Check if already saved
    const existingFavourite = await pool.query(
      'SELECT * FROM favourites WHERE user_id = $1 AND job_id = $2',
      [user_id, jobId]
    );

    if (existingFavourite.rows.length > 0) {
      return res.status(400).json({ message: 'Job already saved to favourites' });
    }

    // Save favourite
    const result = await pool.query(
      'INSERT INTO favourites (user_id, job_id) VALUES ($1, $2) RETURNING *',
      [user_id, jobId]
    );

    res.status(201).json({
      message: 'Job saved to favourites',
      favourite: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove Favourite (Candidate Only)
const removeFavourite = async (req, res) => {
  try {
    const { jobId } = req.params;
    const user_id = req.user.user_id;

    const result = await pool.query(
      'DELETE FROM favourites WHERE user_id = $1 AND job_id = $2 RETURNING *',
      [user_id, jobId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Favourite not found' });
    }

    res.json({ message: 'Job removed from favourites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get My Favourites (Candidate Only)
const getMyFavourites = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const result = await pool.query(
      `SELECT f.*, j.title, j.description, j.location, j.job_type, j.created_at as job_created_at
       FROM favourites f
       JOIN jobs j ON f.job_id = j.job_id
       WHERE f.user_id = $1
       ORDER BY f.saved_at DESC`,
      [user_id]
    );

    res.json({
      count: result.rows.length,
      favourites: result.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  saveFavourite,
  removeFavourite,
  getMyFavourites
};