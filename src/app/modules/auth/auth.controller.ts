import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';

const loginUser = catchAsync(async (req: Request, res: Response) => {
      const { email, password } = req.body;
      const data = await authService.loginUser(email, password);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User logged in successful",
            data
      })
});


export const authController = {
      loginUser,
};