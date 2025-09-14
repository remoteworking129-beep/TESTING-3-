const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');
const { body } = require('express-validator');

// Natural language to MongoDB query
router.post('/translate',
  [
    body('question').notEmpty().withMessage('Question is required'),
    body('userId').optional().isString()
  ],
  queryController.translateAndExecute
);

// Explain query translation
router.post('/explain',
  [
    body('question').notEmpty().withMessage('Question is required'),
    body('userId').optional().isString()
  ],
  queryController.explainQuery
);

module.exports = router;

