import { Router } from "express";
import gameController from "../controllers/game.controller.js";
import { auth } from "../middlewares/auth.js";
const gameRouter = Router();

gameRouter.post("/create", auth, gameController.createGame);
gameRouter.get("/get/:id", auth, gameController.getGame);
gameRouter.get("/get-all", auth, gameController.getGames);
gameRouter.put("/update/:id", auth, gameController.updateGame);

export default gameRouter;
