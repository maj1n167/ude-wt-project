const express = require('express');
const requestLogger = require('../middlewares/logger-middleware');
const router = express.Router();

const cardstackController = require('../controllers/cardstack-controller');

module.exports = router;