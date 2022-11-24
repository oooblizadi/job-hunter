import validator from "validator";

import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { CustomError } from "../utilities/errors";
import { CustomRequest } from "../interfaces/CustomRequest";

export const xssHandlerMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body) {
      for (const key of Object.keys(req.body)) {
        if (key === "password") continue;

        const value = req.body[key];
        if (typeof value === "string") {
          req.body[key] = validator.escape(value);
        }
      }
    }

    next();
  } catch (error) {
    throw new CustomError(`${error}`, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
