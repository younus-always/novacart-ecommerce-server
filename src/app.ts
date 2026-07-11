import express, { Application, Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";

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


app.use((req: Request, res: Response) => {
      res.status(404).json({
            status: false,
            statusCode: 404,
            message: "Route Not Found!"
      });
});

export default app;