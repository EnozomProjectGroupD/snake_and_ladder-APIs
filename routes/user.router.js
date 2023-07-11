import { Router } from "express";
import userController from "../controllers/user.controller.js";
import verifySignUp from "./../middlewares/verifySignUp.js";
import {auth} from "../middlewares/auth.js";

const router = Router();

router.post("/sign-up", verifySignUp, userController.signUp);
router.post("/log-in", userController.logIn);
router.post("/log-out", userController.logOut);
router.get("/get-user", auth, userController.getUser);

export default router;
