const express = require('express');
const router = express.Router();
const { login, initAdmin } = require('../controllers/authController');

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/init (optional, remove in production)
router.post('/init', initAdmin);

module.exports = router;
