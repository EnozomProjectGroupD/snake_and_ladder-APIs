import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.post("/sign-up", userController.signUp);
router.post("/log-in", userController.logIn);

export default router;
