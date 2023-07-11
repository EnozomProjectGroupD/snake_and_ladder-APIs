import { Router } from "express";
import snakeLadderController from "../controllers/snakeLadder.controller.js";
import {auth} from "../middlewares/auth.js";

const router = Router();

router.get("/get-all", auth, snakeLadderController.getAllSnakeLadders);
//router.post("/get", auth, snakeLadderController.getSnakeLadder);
router.post("/add", auth, snakeLadderController.addSnakeLadder);
export default router;
