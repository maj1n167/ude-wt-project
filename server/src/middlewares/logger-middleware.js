const requestLogger = (req, _, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
};

module.exports = requestLogger;
