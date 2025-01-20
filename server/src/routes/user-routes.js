const express = require("express");
const requestLogger = require("../middlewares/logger-middleware");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.post("/register", requestLogger, userController.register);
router.post("/login", requestLogger, userController.login);
router.post("/logout", requestLogger, userController.logout);
router.get("/check", requestLogger, userController.checkToken);
router.get("/", requestLogger, userController.getCurrentUser);

module.exports = router;
