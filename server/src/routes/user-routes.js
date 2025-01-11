const express = require("express");
const requestLogger = require("../middlewares/logger-middleware");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
