const express = require("express");
const requestLogger = require("../middlewares/logger-middleware");
const router = express.Router();

// controllers, multiple ones if needed
const cardController = require("../controllers/card-controller");

// append your routes between these two comments.
router.get("/:stackId", requestLogger, cardController.getCards);
router.post("/:stackId", requestLogger, cardController.createCard);
router.put("/:stackId/:cardId", requestLogger, cardController.updateCard);
router.delete("/:stackId/:cardId", requestLogger, cardController.deleteCard);

module.exports = router;
