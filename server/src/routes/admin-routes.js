const express = require("express");
const adminController = require("../controllers/admin-controller");

const router = express.Router();

// Route to serve the admin page
router.get("/", adminController.getAdminPage);

// Route to handle admin actions
router.post("/", adminController.handleAdminAction);

module.exports = router;
