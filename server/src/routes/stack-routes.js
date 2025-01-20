const express = require("express");
const router = express.Router();

const requestLogger = require("../middlewares/logger-middleware");
const stackController = require("../controllers/stack-controller");

router.get("/", requestLogger, stackController.getPublicStacks);
router.get("/search", requestLogger, stackController.searchStacks);
router.get("/own", requestLogger, stackController.getMyStacks);

router.post("/create", requestLogger, stackController.createStack);

router.get("/:stackId", requestLogger, stackController.getStackById);
router.delete("/:stackId", requestLogger, stackController.deleteStack);
router.put("/:stackId", requestLogger, stackController.updateStack);

module.exports = router;
