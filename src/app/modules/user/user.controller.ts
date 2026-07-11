import { Request, Response } from "express";
import { userService } from "./user.service";
import httpStatus from "http-status-codes";


const registerUser = async (req: Request, res: Response) => {
      const data = await userService.registerUser(req.body);

      res.status(httpStatus.CREATED).json({
            success: true,
            statusCode: httpStatus.CREATED,
            message: "User Registered Successfully",
            data
      });
};

const getAllUser = async (req: Request, res: Response) => {
      const data = await userService.getAllUser();

      res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "All User Retrieved Successfully",
            data
      });
};

const getUserById = async (req: Request, res: Response) => {
      const userId = req.params.userId as string;
      const data = await userService.getUserById(userId);

      res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "User Retrieved Successfully",
            data
      });
};

const updateUser = async (req: Request, res: Response) => {
      const userId = req.params.userId as string;
      const body = req.body;
      const data = await userService.updateUser(userId, body);

      res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "User Updated Successfully",
            data
      });
};

const deleteUser = async (req: Request, res: Response) => {
      const userId = req.params.userId as string;
      const data = await userService.deleteUser(userId);

      res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "User Deleted Successfully",
            data
      });
};


export const userController = {
      registerUser,
      getAllUser,
      getUserById,
      updateUser,
      deleteUser
};