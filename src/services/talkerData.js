const fs = require('fs').promises;
const path = require('path');

const readTalkerFile = path.resolve(__dirname, '../talker.json');

// Read File
const readTalkers = async () => {
  const data = await fs.readFile(readTalkerFile, 'utf-8');
  return JSON.parse(data);
};

// Write File
const writeTalkers = async (talkers) => {
  await fs.writeFile(readTalkerFile, JSON.stringify(talkers));
};

// Update Talker
const updateTalkerById = async (id, updatedTalker) => {
  const talkers = await readTalkers();
  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));

  if (talkerIndex === -1) {
    return null;
  }

  talkers[talkerIndex] = updatedTalker;
  await writeTalkers(talkers);
  return updatedTalker;
};

// Update Talker Rate
const updateTalkerRateById = async (id, rate) => {
  const talkers = await readTalkers();
  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));

  if (talkerIndex === -1) {
    return null;
  }

  talkers[talkerIndex].talk.rate = rate;
  await writeTalkers(talkers);
  return talkers[talkerIndex];
};

// Filter by Search Term
const filterBySearchTerm = (talkers, q) => {
  if (!q || q.trim() === '') return talkers;
  return talkers.filter((talker) => talker.name.includes(q));
};

// Filter by Rate
const filterByRate = (talkers, rate) => {
  if (!rate) return talkers;
  return talkers.filter((talker) => talker.talk.rate === Number(rate));
};

// Filter Search By Id
const filterSearchById = (talkers, id) => {
  if (!id) return talkers;
  return talkers.find((talker) => talker.id === Number(id));
};

// Filter Talkers
const filterTalkers = (talkers, q, rate, date) => {
  let filteredTalkers = talkers;

  if (rate) {
    filteredTalkers = filteredTalkers.filter((talker) => talker.talk.rate === Number(rate));
  }

  if (date) {
    filteredTalkers = filteredTalkers.filter((talker) => talker.talk.watchedAt === date);
  }

  if (q && q.trim() !== '') {
    filteredTalkers = filteredTalkers.filter((talker) => talker.name.includes(q));
  }

  return filteredTalkers;
};

module.exports = {
  readTalkers,
  writeTalkers,
  updateTalkerById,
  updateTalkerRateById,
  filterBySearchTerm,
  filterByRate,
  filterTalkers,
  filterSearchById,
};