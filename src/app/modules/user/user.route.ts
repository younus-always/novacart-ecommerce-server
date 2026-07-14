import { Router } from "express";
import { userController } from "./user.controller";

export const userRoutes = Router();

userRoutes.post("/register", userController.registerUser);
userRoutes.get("/", userController.getAllUser);
userRoutes.get("/:userId", userController.getUserById);
userRoutes.patch("/:userId", userController.updateUser);
userRoutes.delete("/:userId", userController.deleteUser);