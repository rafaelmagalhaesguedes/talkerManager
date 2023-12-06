const express = require('express');
const crypto = require('crypto');
const { validateEmail, validatePassword } = require('../middlewares/login.validation');

const router = express.Router();

router.use(express.json());

router.post('/login', validateEmail, validatePassword, (_req, resp) => {
  const token = crypto.randomBytes(8).toString('hex');
  return resp.status(200).json({ token });
});

module.exports = router;