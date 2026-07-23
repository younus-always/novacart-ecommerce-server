import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { envVars } from "../../config/env";

const loginUser = catchAsync(async (req: Request, res: Response) => {
      const { email, password } = req.body;
      const data = await authService.loginUser(email, password);

      res.cookie("accessToken", data.accessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: envVars.NODE_ENV !== "development"
      });
      res.cookie("refreshToken", data.refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: envVars.NODE_ENV !== "development"
      });

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User logged in successful",
            data
      })
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
      res.clearCookie("accessToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: envVars.NODE_ENV !== "development"
      });
      res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: envVars.NODE_ENV !== "development"
      });

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User logout successful",
            data: null
      });
});


export const authController = {
      loginUser,
      logoutUser
};