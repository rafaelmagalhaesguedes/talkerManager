const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

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

// GET /talker/:id endpoint
app.get('/talker/:id', async (request, response) => {
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

// POST /login endpoint
app.post('/login', (request, response) => {
  const { email, password } = request.body;
  const token = crypto.randomBytes(8).toString('hex');
  return response.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
