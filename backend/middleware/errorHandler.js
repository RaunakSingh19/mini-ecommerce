// const errorHandler = (
//   err,
//   req,
//   res,
//   next
// ) => {
//   console.error(err);

//   res.status(500).json({
//     success: false,
//     message: err.message,
//   }); 
// };

// module.exports = errorHandler;
// middleware/errorHandler.js
// ================================================================
// FIXED ERROR HANDLER MIDDLEWARE
// ================================================================

const errorHandler = (err, req, res, next) => {
  console.error("❌ ==========================================");
  console.error("❌ ERROR HANDLER MIDDLEWARE TRIGGERED");
  console.error("❌ ==========================================");
  console.error("Error Message:", err.message);
  console.error("Error Code:", err.code);
  console.error("Error Stack:", err.stack);
  console.error("Request URL:", req.originalUrl);
  console.error("Request Method:", req.method);
  console.error("❌ ==========================================\n");

  // Handle different error types
  let statusCode = 500;
  let message = "Internal Server Error";
  let errorDetails = {};

  // Multer errors (file upload)
  if (err.name === "MulterError") {
    statusCode = 400;
    if (err.code === "LIMIT_FILE_SIZE") {
      message = "File size exceeds 10MB limit";
    } else if (err.code === "FILE_TOO_LARGE") {
      message = "One or more files are too large";
    } else {
      message = err.message;
    }
  }
  // Mongoose validation errors
  else if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
    errorDetails = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }
  // Mongoose cast errors (invalid ID)
  else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }
  // Mongoose duplicate key errors
  else if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyPattern)[0];
    message = `${field} already exists`;
  }
  // JSON parsing errors
  else if (err instanceof SyntaxError) {
    statusCode = 400;
    message = "Invalid JSON in request body";
  }
  // Custom errors with statusCode
  else if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Send response
  res.status(statusCode).json({
    success: false,
    message: message,
    ...(errorDetails.length > 0 && { errors: errorDetails }),
    ...(process.env.NODE_ENV === "development" && {
      debug: {
        errorName: err.name,
        errorCode: err.code,
        stack: err.stack,
      },
    }),
    timestamp: new Date().toISOString(),
  });
};

module.exports = errorHandler;
