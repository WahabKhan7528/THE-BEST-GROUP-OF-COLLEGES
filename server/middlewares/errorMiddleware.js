import ApiError from "../utils/ApiError.js";

export const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  console.error("[errorHandler]", {
    path: req.originalUrl,
    method: req.method,
    message: err.message,
    name: err.name,
    code: err.code,
    stack: err.stack,
  });

  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyValue || {}).join(", ");
    message = `Duplicate value for: ${duplicateField}`;
    statusCode = 409;
  }

  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  if (err.name === "JsonWebTokenError") message = "Invalid token";
  if (err.name === "TokenExpiredError") message = "Token expired";

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
