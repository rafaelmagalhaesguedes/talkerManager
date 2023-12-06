const fs = require('fs').promises;
const path = require('path');

async function readTalkerFile(req, _res, next) {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'), 'utf-8');
    req.talkers = JSON.parse(data);
  } catch (error) {
    console.error(`Error: ${error}`);
    req.talkers = [];
  }
  return next();
}

module.exports = readTalkerFile;