/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { envVars } from "../config/env";

export const globalErrorHandler = (err: any, _req: Request, res: Response, next: NextFunction) => {
      if (envVars.NODE_ENV === "development") {
            console.log("from global error", err);
      };

      let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      let message = err.message || "Something went wrong!";

      res.status(statusCode).json({
            success: false,
            statusCode,
            message,
            errorDetails: err
      });
};