import { Request, Response } from "express";
import { userService } from "./user.service";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


const registerUser = catchAsync(async (req: Request, res: Response) => {
      const data = await userService.registerUser(req.body);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "User Registered Successfully",
            data
      });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
      const data = await userService.getAllUser();

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "All User Retrieved Successfully",
            data:data.data,
            meta:data.meta
      });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
      const userId = req.params.userId as string;
      const data = await userService.getUserById(userId);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User Retrieved Successfully",
            data
      });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
      const userId = req.params.userId as string;
      const body = req.body;
      const data = await userService.updateUser(userId, body);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User Updated Successfully",
            data
      });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
      const userId = req.params.userId as string;
      const data = await userService.deleteUser(userId);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User Deleted Successfully",
            data
      });
});


export const userController = {
      registerUser,
      getAllUser,
      getUserById,
      updateUser,
      deleteUser
};