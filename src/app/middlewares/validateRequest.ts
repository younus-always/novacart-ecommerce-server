import { NextFunction, Request, Response } from "express";
import z, { ZodObject } from "zod";

export const validateRequest = (zodSchema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
      try {
            if (req.body.data) {
                  req.body = JSON.parse(req.body.data)
            };
            req.body = await z.parseAsync(zodSchema, req.body);
            next();
      } catch (error) {
            next(error)
      };
};