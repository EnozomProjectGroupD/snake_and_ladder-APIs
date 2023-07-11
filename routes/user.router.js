import { Router } from "express";
import userController from "../controllers/user.controller.js";
import verifyPassword from "../middlewares/verifyPassword.js";
const router = Router();
router.post("/sign-up", verifyPassword, userController.signUp);
router.post("/log-in", userController.logIn);

export default router;
