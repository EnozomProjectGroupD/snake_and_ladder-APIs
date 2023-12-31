import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import allRoutes from "./routes/index.router.js";
import { seedBoard, seedSnakeLadder } from "./database/seedBoard.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api", allRoutes);

export default app;
