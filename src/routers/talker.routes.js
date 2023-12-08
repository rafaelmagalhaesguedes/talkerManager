const express = require('express');
const validation = require('../middlewares/talker.validation');
const { talkerController } = require('../controllers');
const { findAll } = require('../daos/talker.dao');

const router = express.Router();
router.use(express.json());

// Read only database
router.get('/talker/db', findAll);

// Read only file
router.get('/talker', talkerController.getAllTalkers);

// Search by Date
router.get('/talker/search',
  validation.validateToken,
  validation.validateFilterDate,
  validation.validateFilterRate,
  validation.validateData,
  talkerController.searchByDate);

// Search by Rate
router.get('/talker/search',
  validation.validateToken,
  validation.validateData,
  talkerController.searchByRate);

// Search by Name
router.get('/talker/search',
  validation.validateToken,
  validation.validateData,
  talkerController.searchByName);
  
// Read by ID
router.get('/talker/:id',
  validation.validateData,
  talkerController.searchById);

// Create
router.post('/talker',
  validation.validateToken,
  validation.validateData,
  validation.validateName,
  validation.validateAge,
  validation.validateTalkExistence,
  validation.validateWatchedAt,
  validation.validateRate,
  talkerController.createTalker);

// Update
router.put('/talker/:id',
  validation.validateToken,
  validation.validateData,
  validation.validateName,
  validation.validateAge,
  validation.validateTalkExistence,
  validation.validateWatchedAt,
  validation.validateRate,
  talkerController.updateTalker);

// Update Rate Taker By Id
router.patch('/talker/rate/:id',
  validation.validateToken,
  validation.validateTalkerRate,
  validation.validateData,
  talkerController.updateTalkerRate);

// Delete
router.delete('/talker/:id',
  validation.validateToken,
  validation.validateData,
  talkerController.deleteTalker);

module.exports = router;