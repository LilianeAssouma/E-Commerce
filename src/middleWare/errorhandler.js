import AppError from "../utils/appError";

export const handleNotFoundError = (req, res, next) => {
  const errorMessage = `Can't find ${req.originalUrl} on this server!`;
  const error = new AppError(errorMessage, 404);
  next(error);
};

export const globalControllerHandler = (err, req, res, next) => {
  console.error(err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

    if (error.statusCode === 404) {
      error.message = `Can't find ${req.originalUrl} on this server!`;
    }

    sendErrorProd(error, res);
  }
};


  
 