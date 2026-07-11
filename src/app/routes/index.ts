import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";

export const router = Router();

router.use("/user", userRoutes);