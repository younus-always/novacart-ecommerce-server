import { Router } from "express";
import { authController } from "./auth.controller";

export const authRoutes = Router();

authRoutes.post("/login", authController.loginUser);
authRoutes.post("/logout", authController.logoutUser);
