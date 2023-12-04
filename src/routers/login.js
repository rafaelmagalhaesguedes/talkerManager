const express = require('express');

const crypto = require('crypto');

const router = express.Router();

router.use(express.json());

// POST /login endpoint
router.post('/login', (request, response) => {
  const { email, password } = request.body;
  if (!email) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = crypto.randomBytes(8).toString('hex');
  return response.status(200).json({ token });
});

module.exports = router;