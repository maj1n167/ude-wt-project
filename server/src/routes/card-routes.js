const express = require('express');
const requestLogger = require('../middlewares/logger-middleware');
const router = express.Router();

// controllers, multiple ones if needed
const cardController = require('../controllers/card-controller');

// append your routes between these two comments.
router.get('/:stackId', requestLogger, cardController.getCards);
router.post('/:stackId', requestLogger, cardController.createCard);
router.put('/:cardId', requestLogger, cardController.updateCard);
router.delete('/:cardId', requestLogger, cardController.deleteCard);
// the rest is standardized and don't need to be changed.

module.exports = router;