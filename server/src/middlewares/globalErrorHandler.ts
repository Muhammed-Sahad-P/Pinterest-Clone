import type { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/error/customError";
import {
  castErrorHandler,
  duplicateKeyErrorHandler,
  validationErrorHandler,
} from "../utils/error/handleErrors";

const errorResponse = (error: CustomError, res: Response) => {
  res.status(error.statusCode).json({
    status: error.status,
    statusCode: error.statusCode,
    message: error.message,
    errorCode: error.errorCode,
  });
};

export const globalErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(`
    🔴 ERROR OCCURRED:
    - Status: ${error?.status || "fail"}
    - Code: ${error?.statusCode || 500}
    - Message: ${error?.message || "Internal Server Error"}
    - Stack: ${error?.stack || "No stack available"}
  `);

  if (error instanceof CustomError) {
    errorResponse(error, res);
    return;
  }

  if (error.name === "CastError") {
    const castError = castErrorHandler(error);
    errorResponse(castError, res);
    return;
  }

  if (error.code === 11000) {
    const duplicateKeyError = duplicateKeyErrorHandler(error);
    errorResponse(duplicateKeyError, res);
    return;
  }

  if (error.name === "ValidationError") {
    const validationError = validationErrorHandler(error);
    errorResponse(validationError, res);
    return;
  }

  // default error if none of the above match
  res.status(500).json({
    status: "fail",
    statusCode: 500,
    message: error?.message || "Something went wrong",
  });
};
