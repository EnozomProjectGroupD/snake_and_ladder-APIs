import { Router } from "express";
import playerController from "../controllers/player.controller.js";
import {auth} from "../middlewares/auth.js";

const playerRouter = Router();
playerRouter.post("/create", auth, playerController.joinPlayer);
playerRouter.post("/move", auth, playerController.movePlayer);
playerRouter.get("/position", auth, playerController.getPosition);
playerRouter.get("/leave-player", auth, playerController.leavePlayer);

export default playerRouter;
