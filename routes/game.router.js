import { Router } from "express";
import gameController from "../controllers/game.controller.js";

const gameRouter = Router();

gameRouter.post("/create", gameController.createGame);
gameRouter.get("/get/:id", gameController.getGame);
gameRouter.get("/get-all", gameController.getGames);
gameRouter.put("/update/:id", gameController.updateGame);

export default gameRouter;
