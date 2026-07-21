import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { productRoutes } from "../modules/product/product.route";
import { authRoutes } from "../modules/auth/auth.route";

export const router = Router();

const Routes = [
      {
            path: "/user",
            route: userRoutes
      },
      {
            path: "/auth",
            route: authRoutes
      },
      {
            path: "/product",
            route: productRoutes
      }
];


Routes.forEach(route => {
      router.use(route.path, route.route);
});