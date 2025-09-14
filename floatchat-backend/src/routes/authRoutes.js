const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validation = require('../middleware/validation');

// Simple routes without authentication
router.post('/register', validation.register, authController.register);
router.post('/login', validation.login, authController.login);
router.post('/logout', authController.logout);
router.get('/profile/:userId', authController.getProfile);

module.exports = router;
