import SnakeLadder from "../models/Snake_Ladder.js";
import Board from "../models/Board.js";
import fs from "fs";
const createBoard = async (req, res) => {
  try {
    const imageFile = req.file;
    // console.log(imageFile.buffer);
   const board =  await Board.create({
      Buffer: imageFile.buffer,
    });
    res.status(201).json({ message: "Board created successfully"  , board: board});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBoard = async (req, res) => {
  try {
    const imageFile = req.file;
    const board = await Board.findByPk(req.body.id);
    board.Buffer = imageFile.buffer;
    await Board.update(board, { where: { id: req.body.id } });
    res.status(200).json({ message: "Board updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBoard = async (req, res) => { 
  try {
    const id = req.params.id;
    const board = await Board.findOne({
      where: { id: id },
      attributes: ["id", "Buffer"],
      include: [
        {
          model: SnakeLadder,
          as: "snakeLadders",
          attributes: ["id", "start", "end", "type"],
        },
      ],
    });
    res.status(200).json({ message: "success", board: board });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.findAll();
    res.status(200).json({ message: "success", boards: boards });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createBoard,
  updateBoard,
  getBoard,
  getAllBoards,
};