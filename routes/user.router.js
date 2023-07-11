import { Router } from "express";
import userController from "../controllers/user.controller.js";
import verifySignUp from "./../middlewares/verifySignUp.js";

const router = Router();

router.post("/sign-up", verifySignUp, userController.signUp);
router.post("/log-in", userController.logIn);
router.post("/log-out", userController.logOut);

export default router;
