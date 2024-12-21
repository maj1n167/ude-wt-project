const express = require('express');
const requestLogger = require('../middlewares/logger-middleware');
const router = express.Router();

const cardStackController = require('../controllers/cardstack-controller');

router.get('/', requestLogger, cardStackController.getCardStacks);

module.exports = router;