const express = require("express");
const requestLogger = require("../middlewares/logger-middleware");
const router = express.Router();

// controllers, multiple ones if needed
const trainingController = require("../controllers/training-controller");

// append your routes between these two comments.
router.get("/", requestLogger, trainingController.getTrainingStatus);
router.put("/", requestLogger, trainingController.resetTrainingStatus);
router.delete(
  "/:stackId",
  requestLogger,
  trainingController.removeTrainingStatus,
);

router.post("/start", requestLogger, trainingController.startTraining);
router.post("/finish", requestLogger, trainingController.finishTraining);
// the rest is standardized and don't need to be changed.

module.exports = router;
