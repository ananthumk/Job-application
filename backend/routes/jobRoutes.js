const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { checkAuth } = require('../middleware/authMiddleware');
const { checkAdmin } = require('../middleware/roleMiddleware');
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} = require('../controllers/jobController');

const jobValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('job_type').trim().notEmpty().withMessage('Job type is required')
];

// POST /api/jobs - Create job (Admin only)
router.post('/', checkAuth, checkAdmin, jobValidation, createJob);

// GET /api/jobs - Get all jobs (Public)
router.get('/', getAllJobs);

// GET /api/jobs/:id - Get job by ID (Public)
router.get('/:id', getJobById);

// PUT /api/jobs/:id - Update job (Admin only)
router.put('/:id', checkAuth, checkAdmin, jobValidation, updateJob);

// DELETE /api/jobs/:id - Delete job (Admin only)
router.delete('/:id', checkAuth, checkAdmin, deleteJob);

module.exports = router;