const express = require('express');
const { talkerController } = require('../controllers');
const validation = require('../middlewares/validation');
const readTalkerFile = require('../utils/talker/reader');

const router = express.Router();
router.use(express.json());

// Read All
router.get('/talker',
  talkerController.getAllTalkers);

// Search by Date
router.get('/talker/search',
  validation.validateToken,
  readTalkerFile,
  talkerController.searchByDate);

// Search by Rate
router.get('/talker/search',
  validation.validateToken,
  readTalkerFile,
  talkerController.searchByRate);

// Search by Name
router.get('/talker/search',
  validation.validateToken,
  readTalkerFile,
  talkerController.searchByName);
  
// Read by ID
router.get('/talker/:id',
  readTalkerFile,
  talkerController.searchById);

// Create
router.post('/talker',
  readTalkerFile,
  validation.validateToken,
  validation.validateName,
  validation.validateAge,
  validation.validateTalkExistence,
  validation.validateWatchedAt,
  validation.validateRate,
  talkerController.createTalker);

// Update
router.put('/talker/:id',
  readTalkerFile,
  validation.validateToken,
  validation.validateName,
  validation.validateAge,
  validation.validateTalkExistence,
  validation.validateWatchedAt,
  validation.validateRate,
  talkerController.updateTalker);

// Delete
router.delete('/talker/:id',
  validation.validateToken,
  readTalkerFile,
  talkerController.deleteTalker);

module.exports = router;