const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';
const readTalkers = path.resolve(__dirname, './talker.json');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// GET /talker endpoint
app.get('/talker', async (_request, response) => {
  try {
    const data = await fs.readFile(readTalkers, 'utf-8');
    const talkers = JSON.parse(data);
    return response.status(HTTP_OK_STATUS).json(talkers);
  } catch (error) {
    console.error(`Error: ${error}`);
    return response.status(HTTP_OK_STATUS).json([]);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
