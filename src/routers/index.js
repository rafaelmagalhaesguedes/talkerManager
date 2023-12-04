// index.js
const express = require('express');

const router = express.Router();

const talkerRoutes = require('./talker');
const loginRoutes = require('./login');

router.use(talkerRoutes);
router.use(loginRoutes);

module.exports = router;