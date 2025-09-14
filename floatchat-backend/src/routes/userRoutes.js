const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validation = require('../middleware/validation');
const { body } = require('express-validator');

router.get('/profile/:userId', userController.getProfile);
router.put('/profile', validation.updateProfile, userController.updateProfile);
router.put('/password', validation.changePassword, userController.changePassword);
router.delete('/account', userController.deactivateAccount);

module.exports = router;
