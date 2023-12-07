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
};