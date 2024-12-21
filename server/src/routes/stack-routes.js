const express = require('express');
const requestLogger = require('../middlewares/logger-middleware');
const router = express.Router();

const stackController = require('../controllers/cardstack-controller');

router.get('/', requestLogger, stackController.getStacks);

router.post('/create', requestLogger, stackController.createStack);

router.delete('/:stackId', requestLogger, stackController.deleteStack);

module.exports = router;