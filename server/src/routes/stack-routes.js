const express = require('express');
const requestLogger = require('../middlewares/logger-middleware');
const router = express.Router();

const stackController = require('../controllers/stack-controller');

router.get('/', requestLogger, stackController.getStacks);

router.post('/create', requestLogger, stackController.createStack);

router.get('/:stackId', requestLogger, stackController.getStackById);
router.delete('/:stackId', requestLogger, stackController.deleteStack);
router.put('/:stackId', requestLogger, stackController.updateStack);

module.exports = router;