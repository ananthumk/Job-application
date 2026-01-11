const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware');
const { checkCandidate } = require('../middleware/roleMiddleware');
const {
  applyToJob,
  getMyApplications
} = require('../controllers/applicationController');

// GET /api/applications/my - Get my applications (Candidate only)
router.get('/my', checkAuth, checkCandidate, getMyApplications);

// POST /api/applications/:jobId - Apply to job (Candidate only)
router.post('/:jobId', checkAuth, checkCandidate, applyToJob);

module.exports = router;