import { Router } from "express";
import userRouter from "./user.router.js";
import playerRouter from "./player.router.js";
import gameRouter from "./game.router.js";
import boardRouter from "./board.router.js";
import snakeLadderRouter from "./snakeLadder.router.js";

const router = Router();

router.use("/user", userRouter);
router.use("/player", playerRouter);
router.use("/board", boardRouter);
router.use("/snake-ladder", snakeLadderRouter);
router.use("/game", gameRouter);

export default router;
