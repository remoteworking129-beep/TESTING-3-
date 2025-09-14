const { validationResult } = require('express-validator');
const ChatSession = require('../models/ChatSession');
const apiResponse = require('../utils/apiResponse');
const logger = require('../config/logger');

/**
 * Send message to chat service
 */
const sendMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(apiResponse.error('Validation failed', errors.array()));
    }

    const { question, sessionId, userId } = req.body;
    // Use a default userId if none provided
    const finalUserId = userId || 'anonymous-user';

    // Create or find chat session
    let chatSession;
    if (sessionId) {
      chatSession = await ChatSession.findOne({ _id: sessionId, userId: finalUserId });
      if (!chatSession) {
        return res.status(404).json(apiResponse.error('Chat session not found'));
      }
    } else {
      chatSession = new ChatSession({
        userId: finalUserId,
        messages: []
      });
    }

    // Add user message to session
    chatSession.messages.push({
      type: 'user',
      content: question,
      timestamp: new Date()
    });

    // TODO: Integrate with actual AI/RAG service
    // For now, return a placeholder response
    const aiResponse = `I received your question: "${question}". This is a placeholder response. The actual AI integration needs to be implemented.`;
    
    chatSession.messages.push({
      type: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    });

    await chatSession.save();

    logger.info(`Chat message processed for user ${finalUserId}`);

    res.json(apiResponse.success('Message sent successfully', {
      sessionId: chatSession._id,
      response: aiResponse,
      timestamp: new Date()
    }));

  } catch (error) {
    logger.error('Send message error:', error);
    res.status(500).json(apiResponse.error('Failed to send message'));
  }
};

/**
 * Simulate chain operation
 */
const simulateChain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(apiResponse.error('Validation failed', errors.array()));
    }

    const { query, userId } = req.body;
    const finalUserId = userId || 'anonymous-user';

    logger.info(`Chain simulation requested by user ${finalUserId}: ${query}`);

    // TODO: Implement actual chain simulation logic
    const simulationResult = {
      query,
      simulation: "Chain simulation placeholder - implement actual logic",
      timestamp: new Date(),
      userId: finalUserId
    };

    res.json(apiResponse.success('Chain simulation completed', simulationResult));

  } catch (error) {
    logger.error('Chain simulation error:', error);
    res.status(500).json(apiResponse.error('Failed to simulate chain'));
  }
};

/**
 * Get chat history for user
 */
const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.query;
    const finalUserId = userId || 'anonymous-user';
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const chatSessions = await ChatSession.find({ userId: finalUserId })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('_id messages updatedAt createdAt');

    const total = await ChatSession.countDocuments({ userId: finalUserId });

    logger.info(`Chat history retrieved for user ${finalUserId}`);

    res.json(apiResponse.success('Chat history retrieved', {
      sessions: chatSessions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }));

  } catch (error) {
    logger.error('Get chat history error:', error);
    res.status(500).json(apiResponse.error('Failed to get chat history'));
  }
};

module.exports = {
  sendMessage,
  simulateChain,
  getChatHistory
};