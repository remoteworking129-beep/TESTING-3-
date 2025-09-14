
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { body } = require('express-validator');

// Chat with RAG-LLM service
router.post('/message', 
  [
    body('question').notEmpty().withMessage('Question is required'),
    body('sessionId').optional().isString(),
    body('userId').optional().isString()
  ],
  chatController.sendMessage
);

// Chain simulation
router.post('/simulate',
  [
    body('query').notEmpty().withMessage('Query is required'),
    body('userId').optional().isString()
  ],
  chatController.simulateChain
);

// Chat history
router.get('/history',
  chatController.getChatHistory
);

module.exports = router;

