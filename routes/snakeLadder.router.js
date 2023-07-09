import { Router } from "express";
import snakeLadderController from "../controllers/snakeLadder.controller.js";

const router = Router();

router.get("/get-all", snakeLadderController.getAllSnakeLadders);
router.post("/get", snakeLadderController.getSnakeLadder);
router.post("/add", snakeLadderController.addSnakeLadder);
export default router;
