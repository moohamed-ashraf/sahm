const express = require('express');
const { getDashboardStats } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/stats', protect, getDashboardStats);

module.exports = router;

