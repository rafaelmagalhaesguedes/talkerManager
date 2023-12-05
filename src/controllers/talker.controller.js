const fs = require('fs').promises;
const path = require('path');
const validation = require('../middlewares/validation');
const filter = require('../utils/talker/filters');

const readTalkerFile = path.resolve(__dirname, '../talker.json');

// Read only
const getAllTalkers = async (_req, res) => {
  try {
    const data = await fs.readFile(readTalkerFile, 'utf-8');
    const talkers = JSON.parse(data);
    return res.status(200).json(talkers);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao ler o arquivo de palestrantes' });
  }
};

// Search by Date
const searchByDate = (req, res) => {
  const { q, rate, date } = req.query;

  validation.validateFilterRate(rate, res);
  validation.validateFilterDate(date, res);

  const filteredTalkers = filter.filterTalkers(req.talkers, q, rate, date);

  return res.status(200).json(filteredTalkers);
};

// Search by Rate
const searchByRate = (req, res) => {
  const { q, rate } = req.query;

  if (rate && (!Number.isInteger(Number(rate)) || rate < 1 || rate > 5)) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  let filteredTalkers = filter.filterByRate(req.talkers, rate);
  filteredTalkers = filter.filterBySearchTerm(filteredTalkers, q);

  return res.status(200).json(filteredTalkers);
};

// Search by Name
const searchByName = (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === '') {
    return res.status(200).json(req.talkers);
  }

  const filteredTalkers = req.talkers.filter((talker) => talker.name.includes(q));
  return res.status(200).json(filteredTalkers);
};
  
// Search by ID
const searchById = (req, resp) => {
  const { id } = req.params;
  const talker = req.talkers.find((element) => element.id === Number(id));
  if (!talker) {
    return resp.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return resp.status(200).json(talker);
};

// Create Talker
const createTalker = async (req, res, next) => {
  try {
    const { name, age, talk } = req.body;
    const newTalker = { id: req.talkers.length + 1, name, age, talk };
    req.talkers.push(newTalker);
    await fs.writeFile(readTalkerFile, JSON.stringify(req.talkers));
    return res.status(201).json(newTalker);
  } catch (error) {
    next(error);
  }
};

// Update Talker
const updateTalker = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const data = await fs.readFile(readTalkerFile, 'utf-8');
    const talkers = JSON.parse(data);
    const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));

    if (talkerIndex === -1) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    const updatedTalker = { id: Number(id), name, age, talk };
    talkers[talkerIndex] = updatedTalker;
    await fs.writeFile(readTalkerFile, JSON.stringify(talkers));
    return res.status(200).json(updatedTalker);
  } catch (error) {
    next(error);
  }
};

// Delete Talker
const deleteTalker = async (req, res, next) => {
  try {
    const { id } = req.params;
    const talkerIndex = req.talkers.findIndex((talker) => talker.id === Number(id));

    if (talkerIndex === -1) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    req.talkers.splice(talkerIndex, 1);
    await fs.writeFile(readTalkerFile, JSON.stringify(req.talkers));

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTalkers,
  searchByDate,
  searchByRate,
  searchByName,
  searchById,
  createTalker,
  updateTalker,
  deleteTalker,
};