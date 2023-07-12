import { Router } from "express";
import boardController from "../controllers/board.controller.js";
import uploadFile from "../middlewares/upload.js";
import { auth } from "../middlewares/auth.js";

const boardRouter = Router();

boardRouter
  .route("/image")
  .post(uploadFile.single("image"), boardController.createBoard)
  .put(uploadFile.single("image"), boardController.updateBoard);

boardRouter.get("/get/:id", boardController.getBoard);
boardRouter.get("/get-all", boardController.getAllBoards);
export default boardRouter;
