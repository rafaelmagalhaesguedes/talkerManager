const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const validation = require('../middlewares/talker/talkerValidation');
const readTalkerFile = require('../middlewares/talker/readTalker');

const router = express.Router();
router.use(express.json());

// Read
router.get('/talker', readTalkerFile, (req, resp) => {
  resp.status(200).json(req.talkers);
});

// Search
router.get('/talker/search',
  validation.validateToken,
  readTalkerFile,
  (req, res) => {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(200).json(req.talkers);
    }

    const filteredTalkers = req.talkers.filter((talker) => talker.name.includes(q));
    return res.status(200).json(filteredTalkers);
  });

// Read by ID
router.get('/talker/:id', readTalkerFile, (req, resp) => {
  const { id } = req.params;
  const talker = req.talkers.find((element) => element.id === Number(id));
  if (!talker) {
    return resp.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return resp.status(200).json(talker);
});

// Create
router.post('/talker',
  readTalkerFile,
  validation.validateToken,
  validation.validateName,
  validation.validateAge,
  validation.validateTalkExistence,
  validation.validateWatchedAt,
  validation.validateRate,
  async (req, res, next) => {
    try {
      const { name, age, talk } = req.body;
      const newTalker = { id: req.talkers.length + 1, name, age, talk };
      req.talkers.push(newTalker);
      await fs.writeFile(path.resolve(__dirname, '../talker.json'), JSON.stringify(req.talkers));
      return res.status(201).json(newTalker);
    } catch (error) {
      next(error);
    }
  });

// Update
router.put('/talker/:id',
  readTalkerFile,
  validation.validateToken,
  validation.validateName,
  validation.validateAge,
  validation.validateTalkExistence,
  validation.validateWatchedAt,
  validation.validateRate,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, age, talk } = req.body;
      const data = await fs.readFile(path.resolve(__dirname, '../talker.json'), 'utf-8');
      const talkers = JSON.parse(data);
      const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));

      if (talkerIndex === -1) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }

      const updatedTalker = { id: Number(id), name, age, talk };
      talkers[talkerIndex] = updatedTalker;
      await fs.writeFile(path.resolve(__dirname, '../talker.json'), JSON.stringify(talkers));
      return res.status(200).json(updatedTalker);
    } catch (error) {
      next(error);
    }
  });

// Delete
router.delete('/talker/:id',
  validation.validateToken,
  readTalkerFile,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const talkerIndex = req.talkers.findIndex((talker) => talker.id === Number(id));

      if (talkerIndex === -1) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }

      req.talkers.splice(talkerIndex, 1);
      await fs.writeFile(path.resolve(__dirname, '../talker.json'), JSON.stringify(req.talkers));

      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

module.exports = router;