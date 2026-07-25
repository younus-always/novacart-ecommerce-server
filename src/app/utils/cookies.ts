import { Response } from "express";
import { envVars } from "../config/env";

export const setAuthCookie = (res: Response, tokenName: string, token: string) => {
      res.cookie(tokenName, token, {
            httpOnly: true,
            sameSite: "lax",
            secure: envVars.NODE_ENV !== "development"
      });
};

export const clearCookie = (res: Response, tokenName: string) => {
      res.clearCookie(tokenName, {
            httpOnly: true,
            sameSite: "lax",
            secure: envVars.NODE_ENV !== "development"
      });
};
