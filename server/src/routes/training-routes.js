const express = require("express");
const requestLogger = require("../middlewares/logger-middleware");
const router = express.Router();

// controllers, multiple ones if needed
const trainingController = require("../controllers/training-controller");

// append your routes between these two comments.
router.get("/", requestLogger, trainingController.getTrainingStatus);

router.post("/:stackId", requestLogger, trainingController.startTraining);
router.post("/", requestLogger, trainingController.finishTraining);

router.put("/:stackId", requestLogger, trainingController.resetTrainingStatus);
router.delete(
  "/:stackId",
  requestLogger,
  trainingController.removeTrainingStatus,
);
// the rest is standardized and don't need to be changed.

module.exports = router;
