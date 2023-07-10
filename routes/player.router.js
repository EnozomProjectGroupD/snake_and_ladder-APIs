import { Router } from "express";
import playerController from "../controllers/player.controller.js";

const playerRouter = Router();
playerRouter.post("/create", playerController.createPlayer);
playerRouter.post("/move", playerController.movePLayer);
playerRouter.post("/position", playerController.getPosition);

export default playerRouter;
