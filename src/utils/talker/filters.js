const fs = require('fs').promises;
const path = require('path');
const readTalkerFile = require('./reader');

module.exports = {
  filterBySearchTerm(talkers, q) {
    if (!q || q.trim() === '') return talkers;
    return talkers.filter((talker) => talker.name.includes(q));
  },

  filterByRate(talkers, rate) {
    if (!rate) return talkers;
    return talkers.filter((talker) => talker.talk.rate === Number(rate));
  },

  filterTalkers(talkers, q, rate, date) {
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
  },

  validateRateTalker(rate, res) {
    if (!rate || !Number.isInteger(rate) || rate < 1 || rate > 5) {
      return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
  },
  
  async findTalkerIndex(id) {
    const talkers = await readTalkerFile();
    return talkers.findIndex((talker) => talker.id === Number(id));
  },
  
  async updateTalkerRate(talkerIndex, rate) {
    const talkers = await readTalkerFile();
    talkers[talkerIndex].talk.rate = rate;
    await fs.writeFile(path.join(__dirname, '..', 'talker.json'), JSON.stringify(talkers));
  },
};