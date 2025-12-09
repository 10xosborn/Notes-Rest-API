const errorHandler = (err, req, res, next) => {
  console.error(err.stack || (''));
  console.error(err.message);
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
};

module.exports = errorHandler;
