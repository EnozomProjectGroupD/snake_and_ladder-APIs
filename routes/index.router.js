import { Router } from "express";
import userRouter from "./user.router.js";
import playerRouter from "./player.router.js";

const router = Router();

router.use("/user", userRouter);
router.use("/player", playerRouter);
export default router;
