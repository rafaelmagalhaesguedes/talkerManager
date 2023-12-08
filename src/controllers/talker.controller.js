const talkerData = require('../services/talkerData');

// Read only
const getAllTalkers = async (_req, res) => {
  try {
    const talkers = await talkerData.readTalkers();
    return res.status(200).json(talkers);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao ler o arquivo de palestrantes' });
  }
};

// Search by Date
const searchByDate = (req, res) => {
  const { q, rate, date } = req.query;
  const filteredTalkers = talkerData.filterTalkers(req.talkers, q, rate, date);
  return res.status(200).json(filteredTalkers);
};

// Search by Rate
const searchByRate = (req, res) => {
  const { q, rate } = req.query;
  let filteredTalkers = talkerData.filterByRate(req.talkers, rate);
  filteredTalkers = talkerData.filterBySearchTerm(filteredTalkers, q);
  return res.status(200).json(filteredTalkers);
};

// Search by Name
const searchByName = (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === '') { 
    return res.status(200).json(req.talkers);
  }
  
  const filteredTalkers = talkerData.filterBySearchTerm(req.talkers, q);

  return res.status(200).json(filteredTalkers);
};
  
// Search by ID
const searchById = (req, resp) => {
  const { id } = req.params;

  const talker = talkerData.filterSearchById(req.talkers, id);
  
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
    
    await talkerData.writeTalkers(req.talkers);
    
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
    const updatedTalker = { id: Number(id), name, age, talk };

    const result = await talkerData.updateTalkerById(id, updatedTalker);

    if (!result) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(200).json(updatedTalker);
  } catch (error) {
    next(error);
  }
};

// Update Rate Talker by ID
const updateTalkerRate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rate } = req.body;

    const result = await talkerData.updateTalkerRateById(id, rate);

    if (!result) throw new Error('Pessoa palestrante não encontrada');

    return res.status(204).end();
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
    await talkerData.writeTalkers(req.talkers);

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
  updateTalkerRate,
  deleteTalker,
};