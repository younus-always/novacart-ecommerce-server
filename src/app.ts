import express, { Application, Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { routeNotFound } from "./app/middlewares/notFound";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

const app: Application = express();

app.use(express.json());
app.use(cors());
// routes
app.use("/api/v1", router);


app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
            status: 200,
            success: true,
            date: new Date().toLocaleDateString(),
            message: "Welcome NovaCart E-Commerce Server",
      });
});


app.use(globalErrorHandler);
app.use(routeNotFound);


export default app;