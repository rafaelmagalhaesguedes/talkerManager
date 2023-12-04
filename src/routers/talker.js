const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const HTTP_OK_STATUS = 200;
const router = express.Router();
const readTalkers = path.resolve(__dirname, '../talker.json');

// Middleware to read talker.json
async function readTalkerFile(req, res, next) {
  try {
    const data = await fs.readFile(readTalkers, 'utf-8');
    req.talkers = JSON.parse(data);
  } catch (error) {
    console.error(`Error: ${error}`);
    req.talkers = [];
  }
  next();
}

router.get('/talker', readTalkerFile, (request, response) => {
  response.status(HTTP_OK_STATUS).json(request.talkers);
});

router.get('/talker/:id', readTalkerFile, (request, response) => {
  const { id } = request.params;
  const talker = request.talkers.find((element) => element.id === Number(id));
  if (!talker) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(HTTP_OK_STATUS).json(talker);
});

module.exports = router;