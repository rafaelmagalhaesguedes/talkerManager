// routes/talker.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const HTTP_OK_STATUS = 200;
const router = express.Router();
const readTalkers = path.resolve(__dirname, '../talker.json');

router.get('/talker', async (_request, response) => {
  try {
    const data = await fs.readFile(readTalkers, 'utf-8');
    const talkers = JSON.parse(data);
    return response.status(HTTP_OK_STATUS).json(talkers);
  } catch (error) {
    console.error(`Error: ${error}`);
    return response.status(HTTP_OK_STATUS).json([]);
  }
});

router.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  try {
    const data = await fs.readFile(readTalkers, 'utf-8');
    const talkers = JSON.parse(data);
    const talker = talkers.find((element) => element.id === Number(id));
    if (!talker) {
      return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return response.status(HTTP_OK_STATUS).json(talker);
  } catch (error) {
    console.error(`Error: ${error}`);
    return response.status(HTTP_OK_STATUS).json([]);
  }
});

module.exports = router;