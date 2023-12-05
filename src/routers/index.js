const express = require('express');

const router = express.Router();

const talkerRoutes = require('./talker.routes');
const loginRoutes = require('./login.routes');

router.use(talkerRoutes);
router.use(loginRoutes);

module.exports = router;