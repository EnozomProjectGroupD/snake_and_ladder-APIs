import { Router } from "express";
import userRouter from "./user.router.js";
import playerRouter from "./player.router.js";
import gameRouter from "./game.router.js";
const router = Router();

router.use("/user", userRouter);
router.use("/player", playerRouter);
router.use("/game", gameRouter);
export default router;
