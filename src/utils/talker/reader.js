const fs = require('fs').promises;
const path = require('path');

// Middleware to read talker.json
async function readTalkerFile(req, res, next) {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../../talker.json'), 'utf-8');
    req.talkers = JSON.parse(data);
  } catch (error) {
    console.error(`Error: ${error}`);
    req.talkers = [];
  }
  return next();
}

module.exports = readTalkerFile;