const express = require('express');
const requestLogger = require('../middlewares/logger-middleware');
const router = express.Router();

// controllers, multiple ones if needed
const exampleController = require('../controllers/example-controller');

// append your routes between these two comments.

// the rest is standardized and don't need to be changed.

module.exports = router;