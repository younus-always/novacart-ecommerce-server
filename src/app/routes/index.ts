import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { productRoutes } from "../modules/product/product.route";

export const router = Router();

const Routes = [
      {
            path: "/user",
            route: userRoutes
      },
      {
            path:"/product",
            route:productRoutes
      }
];


Routes.forEach(route => {
      router.use(route.path, route.route);
});