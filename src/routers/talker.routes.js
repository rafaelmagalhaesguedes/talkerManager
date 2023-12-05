const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const validation = require('../middlewares/talker/talkerValidation');
const readTalkerFile = require('../middlewares/talker/readTalker');

const router = express.Router();
router.use(express.json());

router.get('/talker', readTalkerFile, (req, resp) => {
  resp.status(200).json(req.talkers);
});

router.get('/talker/:id', readTalkerFile, (req, resp) => {
  const { id } = req.params;
  const talker = req.talkers.find((element) => element.id === Number(id));
  if (!talker) {
    return resp.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return resp.status(200).json(talker);
});

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

module.exports = router;