const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware');
const { checkCandidate } = require('../middleware/roleMiddleware');
const {
  saveFavourite,
  removeFavourite,
  getMyFavourites
} = require('../controllers/favouriteController');

// GET /api/favourites/my - Get my favourites (Candidate only)
router.get('/my', checkAuth, checkCandidate, getMyFavourites);

// POST /api/favourites/:jobId - Save job to favourites (Candidate only)
router.post('/:jobId', checkAuth, checkCandidate, saveFavourite);

// DELETE /api/favourites/:jobId - Remove favourite (Candidate only)
router.delete('/:jobId', checkAuth, checkCandidate, removeFavourite);

module.exports = router;