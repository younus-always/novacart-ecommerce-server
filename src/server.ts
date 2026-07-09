/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;


const startServer = async () => {
      try {
            await mongoose.connect(envVars.DB_URL);
            console.log("Database connected");

            server = app.listen(envVars.PORT, () => {
                  console.log(`Server listening on port:${envVars.PORT}`);
            });
      } catch (error) {
            console.log("Server running failed!", error);
      }
};
startServer();



/**
 * unhandledRejection
 * Promise.reject(new Error("I forgot to handle promise error"))
 * 
 * uncaughtException
 * throw new Error("I forgot to handle local error")
 */


process.on("unhandledRejection", () => {
      console.log("Unhandled Rejection Detected. Server Shutting Down....");

      if (server) {
            server.close(() => {
                  process.exit(1);
            });
      };

      process.exit(1);
});

process.on("uncaughtException", () => {
      console.log("Uncaught Exception Detected. Server Shutting Down....");

      if (server) {
            server.close(() => {
                  process.exit(1);
            });
      };

      process.exit(1);
});


process.on("SIGINT", () => {
      console.log("SIGINT Signal Received. Server Shutting Down....");

      if (server) {
            server.close(() => {
                  process.exit(1);
            });
      };

      process.exit(1);
});

process.on("SIGTERM", () => {
      console.log("SIGTERM Signal Received. Server Shutting Down....");

      if (server) {
            server.close(() => {
                  process.exit(1);
            });
      };

      process.exit(1);
});