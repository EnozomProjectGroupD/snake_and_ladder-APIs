import { Router } from "express";
import gameController from "../controllers/game.controller.js";
import { auth } from "../middlewares/auth.js";
const gameRouter = Router();

gameRouter.post("/create", auth, gameController.createGame);
gameRouter.get("/get/:id", auth, gameController.getGame);
gameRouter.get("/get-all", auth, gameController.getGames);
gameRouter.get("/start-game/:id", auth, gameController.startGame);
gameRouter.put("/update/:id", auth, gameController.updateGame);
gameRouter.get("/get-winner/:id", auth, gameController.getWinner);

export default gameRouter;
