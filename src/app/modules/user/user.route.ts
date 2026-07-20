import { Router } from "express";
import { userController } from "./user.controller";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";

export const userRoutes = Router();

userRoutes.post("/register",
      validateRequest(createUserZodSchema),
      userController.registerUser
);

userRoutes.get("/all-user", userController.getAllUser);
userRoutes.get("/:userId", userController.getUserById);

userRoutes.patch("/:userId",
      validateRequest(updateUserZodSchema),
      userController.updateUser
);

userRoutes.delete("/:userId", userController.deleteUser);