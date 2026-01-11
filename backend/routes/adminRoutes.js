const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware');
const { checkAdmin } = require('../middleware/roleMiddleware');
const {
  getJobApplications,
  getMyJobs,
  getDashboardStats
} = require('../controllers/adminController');

// GET /api/admin/jobs/:jobId/applications - Get applicants for a job
router.get('/jobs/:jobId/applications', checkAuth, checkAdmin, getJobApplications);

// GET /api/admin/my-jobs - Get jobs created by admin
router.get('/my-jobs', checkAuth, checkAdmin, getMyJobs);

// GET /api/admin/dashboard - Get dashboard statistics
router.get('/dashboard', checkAuth, checkAdmin, getDashboardStats);

module.exports = router;