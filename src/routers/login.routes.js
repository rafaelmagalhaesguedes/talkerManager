const express = require('express');
const { getToken } = require('../controllers/login.controller');
const { validateEmail, validatePassword } = require('../middlewares/login.validation');

const router = express.Router();

router.use(express.json());

router.post('/login', validateEmail, validatePassword, getToken);

module.exports = router;