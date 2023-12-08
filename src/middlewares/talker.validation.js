const fs = require('fs').promises;
const path = require('path');

const readTalkerFile = path.resolve(__dirname, '../talker.json');

module.exports = {
  validateToken(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (req.headers.authorization.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    return next();
  },

  async validateData(req, _res, next) {
    try {
      const data = await fs.readFile(readTalkerFile, 'utf-8');
      req.talkers = JSON.parse(data);
    } catch (error) {
      console.error(`Error: ${error}`);
      req.talkers = [];
    }
    return next();
  },

  validateName(req, res, next) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    return next();
  },

  validateAge(req, res, next) {
    const { age } = req.body;
    if (!age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (!Number.isInteger(age) || age < 18) {
      return res.status(400)
        .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
    }
    return next();
  },

  validateTalkExistence(req, res, next) {
    const { talk } = req.body;
    if (!talk) {
      return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    return next();
  },

  validateWatchedAt(req, res, next) {
    const { talk: { watchedAt } = {} } = req.body;
    if (!watchedAt) {
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(watchedAt)) {
      return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    return next();
  },

  validateRate(req, res, next) {
    const { talk: { rate } = {} } = req.body;
    if (rate === undefined) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
      return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    return next();
  },

  validateTalkerRate(req, res, next) {
    const { rate } = req.body;
    if (rate === undefined) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
      return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    return next();
  },

  validateFilterRate(req, res, next) {
    const { rate } = req.query;
    if (rate && (!Number.isInteger(Number(rate)) || rate < 1 || rate > 5)) {
      return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    next();
  },

  validateFilterDate(req, res, next) {
    const { date } = req.query;
    if (date && !/^(\d{2}\/){2}\d{4}$/.test(date)) {
      return res.status(400)
        .json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
  },
  
};