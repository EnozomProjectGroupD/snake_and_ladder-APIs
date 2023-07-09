import { Router } from "express";
import playerController from "../controllers/player.controller.js";

const playerRouter = Router();
playerRouter.post("/move", playerController.movePLayer);
playerRouter.get("/position", playerController.getPosition);

export default playerRouter;
