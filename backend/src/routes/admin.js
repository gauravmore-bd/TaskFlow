const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  getDashboardStats,
} = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/authMiddleware');

// All routes are admin-protected
router.use(protectAdmin);

router.get('/users', getAllUsers);
router.delete('/users/:userId', deleteUser);
router.get('/dashboard', getDashboardStats);

module.exports = router;
