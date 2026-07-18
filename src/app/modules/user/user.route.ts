import { Router } from "express";
import { userController } from "./user.controller";
import z from "zod";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";

export const userRoutes = Router();

userRoutes.post("/register",
      async (req, res, next) => {
            const body = req.body;
            req.body = await z.parseAsync(createUserZodSchema, body);
            next()
      },
      userController.registerUser);
userRoutes.get("/all-user", userController.getAllUser);
userRoutes.get("/:userId", userController.getUserById);
userRoutes.patch("/:userId", async (req, res, next) => {
      const body = req.body;
      req.body = await z.parseAsync(updateUserZodSchema, body);
      next()
},
      userController.updateUser);
userRoutes.delete("/:userId", userController.deleteUser);