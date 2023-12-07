const connection = require('../db/connection');

const findAll = async (_req, res) => {
  const [rows] = await connection.execute('SELECT * FROM talkers');
  
  const talkers = rows.map((row) => ({
    name: row.name,
    age: row.age,
    id: row.id,
    talk: {
      watchedAt: row.talk_watched_at,
      rate: row.talk_rate,
    },
  }));
  
  res.status(200).json(talkers);
};

module.exports = {
  findAll,
};