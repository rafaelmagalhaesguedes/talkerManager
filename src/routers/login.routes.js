const express = require('express');
const crypto = require('crypto');
const { validateEmail, validatePassword } = require('../utils/loginValidation');

const router = express.Router();

router.use(express.json());

router.post('/login', validateEmail, validatePassword, (_req, resp) => {
  const token = crypto.randomBytes(8).toString('hex');
  return resp.status(200).json({ token });
});

module.exports = router;