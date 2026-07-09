import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

const startServer = async () => {
      try {
            await mongoose.connect("mongodb://localhost:27017/novacart_db");
            console.log("Database connected");

            server = app.listen(4000, () => {
                  console.log("Server listening on port:4000");
            });
      } catch (error) {
            console.log("Server running failed!", error);
      }
};
startServer();