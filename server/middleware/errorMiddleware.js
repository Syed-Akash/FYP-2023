import "dotenv/config.js";
const notFound = (req, res, next) => {
  const notFoundErr = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(notFoundErr);
};

//Custom error handler
const errorMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    stack: "production" === "production" ? null : err.stack,
  });
};

export { errorMiddleware, notFound };
